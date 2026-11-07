'use client';

/**
 * The walking 3D character: Sanaullah's own rigged avatar, dressed in a navy three-piece suit
 * (see src/lib/avatar.ts). It walks while the page scrolls, blinks, and its head follows the cursor.
 * If WebGL or the model is unavailable, the photo is shown instead.
 */
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { CanvasTexture, DoubleSide, TextureLoader, type Group, type Object3D } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { createPoser, dressAvatar } from '@/lib/avatar';

const MODEL = '/models/avatar.fbx';
const OUTFIT = '/models/outfit-navy.jpg';
const OUTFIT_NORMAL = '/models/outfit-normal.jpg';

type Poser = (phase: number, amount: number, time: number, look: { x: number; y: number }, gesture?: number, gAmount?: number) => void;
interface Loaded {
  model: Object3D;
  pose: Poser;
}

function makeShadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  if (g) {
    const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    grad.addColorStop(0, 'rgba(40,28,18,0.38)');
    grad.addColorStop(1, 'rgba(40,28,18,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
  }
  return new CanvasTexture(c);
}

function Figure({
  walking,
  chapter,
  look,
  loaded,
}: {
  walking: MutableRefObject<boolean>;
  chapter: MutableRefObject<number>;
  look: MutableRefObject<{ x: number; y: number }>;
  loaded: Loaded;
}) {
  const phase = useRef(0);
  const amount = useRef(0);
  const yaw = useRef(0.32);
  const gest = useRef(0);
  const holder = useRef<Group>(null);
  const smoothLook = useRef({ x: 0, y: 0 });
  const shadow = useMemo(() => makeShadowTexture(), []);

  useFrame((state, dt) => {
    const step = Math.min(dt, 0.05);
    const w = walking.current ? 1 : 0;
    amount.current += (w - amount.current) * Math.min(1, step * 8);
    phase.current += step * (w ? 7.2 : 2.5 * amount.current);
    smoothLook.current.x += (look.current.x - smoothLook.current.x) * Math.min(1, step * 5);
    smoothLook.current.y += (look.current.y - smoothLook.current.y) * Math.min(1, step * 5);
    // turn side-on to walk, then back toward the text when he stops
    const target = 0.32 + (1.4 - 0.32) * amount.current;
    yaw.current += (target - yaw.current) * Math.min(1, step * 6);
    // the gesture fades in a moment after the avatar stops
    gest.current += ((w ? 0 : 1) - gest.current) * Math.min(1, step * (w ? 10 : 2.2));
    if (holder.current) holder.current.rotation.y = yaw.current;
    loaded.pose(phase.current, amount.current, state.clock.elapsedTime, smoothLook.current, chapter.current, gest.current);
  });

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <planeGeometry args={[1.5, 0.9]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} side={DoubleSide} />
      </mesh>
      <group ref={holder}>
        <primitive object={loaded.model} />
      </group>
    </>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function StoryAvatar({
  walking,
  chapter,
  photo,
}: {
  walking: MutableRefObject<boolean>;
  chapter: MutableRefObject<number>;
  photo: string;
}) {
  const [state, setState] = useState<'checking' | 'loading' | 'ready' | 'fallback'>('checking');
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [visible, setVisible] = useState(true);
  const look = useRef({ x: 0, y: 0 });
  const wrap = useRef<HTMLDivElement>(null);

  // load + dress the model
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowEnd = (nav.deviceMemory ?? 8) < 2 || nav.connection?.saveData === true;
    if (lowEnd || !hasWebGL()) {
      setState('fallback');
      return;
    }
    let cancelled = false;
    setState('loading');
    (async () => {
      try {
        const tl = new TextureLoader();
        const [model, map, normalMap] = await Promise.all([new FBXLoader().loadAsync(MODEL), tl.loadAsync(OUTFIT), tl.loadAsync(OUTFIT_NORMAL)]);
        if (cancelled) return;
        const rig = dressAvatar(model, { map, normalMap });
        const pose = createPoser(model, rig.bones) as Poser;
        pose(0, 0, 0, { x: 0, y: 0 });
        setLoaded({ model, pose });
        setState('ready');
      } catch (err) {
        console.error('Avatar failed to load, showing photo instead.', err);
        if (!cancelled) setState('fallback');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // head follows the cursor
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      look.current.x = (e.clientX / window.innerWidth - 0.2) * 1.6; // the character stands on the left
      look.current.y = -(e.clientY / window.innerHeight - 0.45) * 1.4;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // pause rendering when scrolled away
  useEffect(() => {
    const el = wrap.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="journey-avatar-3d" aria-hidden="true" ref={wrap}>
      {state === 'ready' && loaded ? (
        <Canvas
          flat
          dpr={[1, 2]}
          frameloop={visible ? 'always' : 'never'}
          camera={{ position: [0, 0.93, 4.7], fov: 24, near: 0.1, far: 50 }}
          onCreated={({ camera }) => camera.lookAt(0, 0.93, 0)}
          gl={{ alpha: true, antialias: true }}
        >
          <hemisphereLight args={['#fff6ea', '#a08a74', 1.5]} />
          <directionalLight position={[2, 4, 5]} intensity={2.2} />
          <Figure walking={walking} chapter={chapter} look={look} loaded={loaded} />
        </Canvas>
      ) : (
        <div className="avatar-fallback">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {state === 'fallback' || state === 'loading' ? <img src={photo} alt="" /> : null}
        </div>
      )}
    </div>
  );
}

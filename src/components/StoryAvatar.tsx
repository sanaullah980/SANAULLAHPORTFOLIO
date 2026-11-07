'use client';

/**
 * The walking 3D character: Sanaullah's own rigged avatar, dressed in a navy three-piece suit
 * (see src/lib/avatar.ts). It walks while the page scrolls, blinks, and its head follows the cursor.
 * If WebGL or the model is unavailable, the photo is shown instead.
 */
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import { TextureLoader, type Object3D } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { createPoser, dressAvatar } from '@/lib/avatar';

const MODEL = '/models/avatar.fbx';
const OUTFIT = '/models/outfit-navy.jpg';
const OUTFIT_NORMAL = '/models/outfit-normal.jpg';

type Poser = (phase: number, amount: number, time: number, look: { x: number; y: number }) => void;
interface Loaded {
  model: Object3D;
  pose: Poser;
}

function Figure({ walking, look, loaded }: { walking: MutableRefObject<boolean>; look: MutableRefObject<{ x: number; y: number }>; loaded: Loaded }) {
  const phase = useRef(0);
  const amount = useRef(0);
  const smoothLook = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    const step = Math.min(dt, 0.05);
    amount.current += ((walking.current ? 1 : 0) - amount.current) * Math.min(1, step * 8);
    phase.current += step * (walking.current ? 7.2 : 2.5 * amount.current);
    smoothLook.current.x += (look.current.x - smoothLook.current.x) * Math.min(1, step * 5);
    smoothLook.current.y += (look.current.y - smoothLook.current.y) * Math.min(1, step * 5);
    loaded.pose(phase.current, amount.current, state.clock.elapsedTime, smoothLook.current);
  });

  return <primitive object={loaded.model} />;
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function StoryAvatar({ walking, photo }: { walking: MutableRefObject<boolean>; photo: string }) {
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
          <hemisphereLight args={['#ffffff', '#998877', 1.5]} />
          <directionalLight position={[2, 4, 5]} intensity={2.2} />
          <Figure walking={walking} look={look} loaded={loaded} />
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

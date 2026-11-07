'use client';

/**
 * Real 3D avatar (react-three-fiber + FBXLoader).
 * Loads /models/avatar.fbx (rigged body, face blend-shapes and outfit mesh) and restyles the outfit
 * with /models/outfit-formal.jpg (white shirt, charcoal trousers, black shoes).
 *
 *  - variant "walk":     full body, walks in place while the Journey section scrolls
 *  - variant "portrait": head-and-shoulders bust for the hero
 *
 * Posing is done procedurally from the skeleton, so no animation clips are required.
 * If WebGL or the model is unavailable, the original photo is shown instead.
 */
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { Box3, Mesh, Object3D, Quaternion, RepeatWrapping, SRGBColorSpace, TextureLoader, Vector3 } from 'three';
import type { Group, Material, SkinnedMesh } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';

type Variant = 'walk' | 'portrait';
type Look = MutableRefObject<{ x: number; y: number }>;

const MODEL_URL = '/models/avatar.fbx';
const OUTFIT_URL = '/models/outfit-formal.jpg';
const HEIGHT = 2.3; // model is normalised to this height (scene units)
const AXIS_X = new Vector3(1, 0, 0);
const AXIS_Y = new Vector3(0, 1, 0);

interface Rig {
  bone: Object3D;
  base: Quaternion;
  axisX: Vector3; // world X expressed in the bone's own frame
  axisY: Vector3; // world Y expressed in the bone's own frame
}

function makeRig(bone: Object3D | null | undefined): Rig | null {
  if (!bone) return null;
  const inv = bone.getWorldQuaternion(new Quaternion()).invert();
  return {
    bone,
    base: bone.quaternion.clone(),
    axisX: AXIS_X.clone().applyQuaternion(inv),
    axisY: AXIS_Y.clone().applyQuaternion(inv),
  };
}

/** Rotate an upper arm so it hangs down at the character's side (the source model is in a T-pose). */
function lowerArm(arm?: Object3D | null, fore?: Object3D | null) {
  if (!arm || !fore || !arm.parent) return;
  arm.updateWorldMatrix(true, true);
  const a = arm.getWorldPosition(new Vector3());
  const dir = fore.getWorldPosition(new Vector3()).sub(a).normalize();
  const side = dir.x >= 0 ? 1 : -1;
  const target = new Vector3(side * 0.14, -1, 0.02).normalize();
  const delta = new Quaternion().setFromUnitVectors(dir, target);
  const armW = arm.getWorldQuaternion(new Quaternion());
  const parentInv = arm.parent.getWorldQuaternion(new Quaternion()).invert();
  arm.quaternion.copy(parentInv.multiply(delta.multiply(armW)));
  arm.updateWorldMatrix(false, true);
}

function prepare(source: Group, outfit: import('three').Texture) {
  const root = cloneSkinned(source) as Group;
  root.updateMatrixWorld(true);

  // 1. materials: formal outfit texture, softer highlights, no culling glitches on skinned meshes
  root.traverse((o) => {
    const m = o as Mesh;
    if (!m.isMesh) return;
    m.frustumCulled = false;
    const isOutfit = m.name.toLowerCase().includes('outfit');
    const restyle = (mat: Material) => {
      const c = mat.clone() as Material & { map?: import('three').Texture | null; shininess?: number; specular?: { setScalar(n: number): void } };
      if (typeof c.shininess === 'number') c.shininess = 10;
      c.specular?.setScalar(0.06);
      if (isOutfit || mat.name.toLowerCase().includes('outfit')) {
        c.map = outfit;
        c.needsUpdate = true;
      }
      return c;
    };
    m.material = Array.isArray(m.material) ? m.material.map(restyle) : restyle(m.material);
  });

  // 2. pose: arms down
  lowerArm(root.getObjectByName('LeftArm'), root.getObjectByName('LeftForeArm'));
  lowerArm(root.getObjectByName('RightArm'), root.getObjectByName('RightForeArm'));
  root.updateMatrixWorld(true);
  root.traverse((o) => {
    const s = o as SkinnedMesh;
    if (s.isSkinnedMesh) s.skeleton.update();
  });

  // 3. which way does it face? (a +Z-facing model has its left arm on +X)
  const leftArm = root.getObjectByName('LeftArm');
  const flip = leftArm ? leftArm.getWorldPosition(new Vector3()).x < 0 : false;

  // 4. normalise size and put the feet on y = 0
  let scale = 0.01;
  const offset = new Vector3();
  try {
    const box = new Box3().setFromObject(root, true);
    const size = box.getSize(new Vector3());
    if (Number.isFinite(size.y) && size.y > 0) {
      scale = HEIGHT / size.y;
      const c = box.getCenter(new Vector3());
      offset.set(-c.x, -box.min.y, -c.z);
    }
  } catch {
    /* keep defaults */
  }

  const rigs = {
    head: makeRig(root.getObjectByName('Head')),
    neck: makeRig(root.getObjectByName('Neck')),
    spine: makeRig(root.getObjectByName('Spine2') ?? root.getObjectByName('Spine1')),
    armL: makeRig(root.getObjectByName('LeftArm')),
    armR: makeRig(root.getObjectByName('RightArm')),
    legL: makeRig(root.getObjectByName('LeftUpLeg')),
    legR: makeRig(root.getObjectByName('RightUpLeg')),
  };
  return { root, scale, offset, flip, rigs };
}

const tmpQ = new Quaternion();
const tmpQ2 = new Quaternion();
function swing(rig: Rig | null, angle: number) {
  if (!rig) return;
  rig.bone.quaternion.copy(rig.base).multiply(tmpQ.setFromAxisAngle(rig.axisX, angle));
}

function AvatarModel({
  variant,
  walking,
  look,
  onReady,
}: {
  variant: Variant;
  walking?: MutableRefObject<boolean>;
  look: Look;
  onReady: () => void;
}) {
  const fbx = useLoader(FBXLoader, MODEL_URL);
  const outfit = useLoader(TextureLoader, OUTFIT_URL);
  outfit.colorSpace = SRGBColorSpace;
  outfit.wrapS = outfit.wrapT = RepeatWrapping;

  const model = useMemo(() => prepare(fbx, outfit), [fbx, outfit]);
  const group = useRef<Group>(null);
  const phase = useRef(0);
  const amount = useRef(0);
  const yaw = useRef(0);
  const pitch = useRef(0);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const dir = model.flip ? -1 : 1;
    const going = variant === 'walk' && walking?.current ? 1 : 0;
    amount.current += (going - amount.current) * Math.min(1, dt * 10);
    phase.current += dt * (going ? 8 : 1.2);
    const s = Math.sin(phase.current) * amount.current;

    const { rigs } = model;
    swing(rigs.legL, -s * 0.6);
    swing(rigs.legR, s * 0.6);
    swing(rigs.armL, s * 0.5);
    swing(rigs.armR, -s * 0.5);
    swing(rigs.spine, Math.sin(t * 1.6) * 0.012 + Math.abs(s) * 0.02);

    // head (and a little neck) follow the cursor
    yaw.current += (look.current.x * 0.55 - yaw.current) * 0.07;
    pitch.current += (-look.current.y * 0.26 - pitch.current) * 0.07;
    for (const [rig, k] of [
      [rigs.head, 1],
      [rigs.neck, 0.35],
    ] as const) {
      if (!rig) continue;
      rig.bone.quaternion
        .copy(rig.base)
        .multiply(tmpQ.setFromAxisAngle(rig.axisY, yaw.current * k * dir))
        .multiply(tmpQ2.setFromAxisAngle(rig.axisX, pitch.current * k * dir));
    }

    if (group.current) {
      group.current.position.y = Math.abs(s) * 0.05 + Math.sin(t * 1.6) * 0.008;
    }
  });

  return (
    <group ref={group} rotation={[0, model.flip ? Math.PI : 0, 0]}>
      <group scale={model.scale}>
        <primitive object={model.root} position={model.offset} />
      </group>
      {variant === 'walk' && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.6, 32]} />
          <meshBasicMaterial color="#141413" transparent opacity={0.16} />
        </mesh>
      )}
    </group>
  );
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function AvatarCanvas({
  variant,
  walking,
  photo,
}: {
  variant: Variant;
  walking?: MutableRefObject<boolean>;
  photo: string;
}) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const look = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowEnd = (nav.deviceMemory ?? 8) < 2 || nav.connection?.saveData === true;
    setSupported(!lowEnd && hasWebGL());
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      look.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      look.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const markReady = useMemo(() => () => setReady(true), []);

  if (supported === null) return null;

  const portrait = variant === 'portrait';
  const fallback = portrait ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="profile-photo" src={photo} alt="" />
  ) : (
    <div className="avatar-fallback">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" />
    </div>
  );

  const scene =
    supported ? (
      <Boundary fallback={fallback}>
        <Canvas
          dpr={[1, 2]}
          camera={portrait ? { position: [0, 1.86, 3.15], fov: 24 } : { position: [0, 1.4, 6], fov: 28 }}
          onCreated={({ camera }) => camera.lookAt(0, portrait ? 1.8 : 1.35, 0)}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[2, 3.5, 4]} intensity={2.2} />
          <directionalLight position={[-3, 1.5, 2]} intensity={0.7} color="#FFD9BF" />
          <Suspense fallback={null}>
            <AvatarModel variant={variant} walking={walking} look={look} onReady={markReady} />
          </Suspense>
        </Canvas>
        {portrait && !ready && fallback}
      </Boundary>
    ) : (
      fallback
    );

  return portrait ? (
    <div className="avatar-stage" aria-hidden="true">
      {scene}
    </div>
  ) : (
    <div className="journey-avatar-3d" aria-hidden="true">
      {scene}
    </div>
  );
}

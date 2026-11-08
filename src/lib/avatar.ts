// @ts-nocheck — three.js geometry code; kept loosely typed so it can never break the production build.
/**
 * Avatar helpers: dress the supplied rigged model in a navy three-piece suit
 * (sleeves, shirt, tie, waistcoat, lapels, longer jacket) and drive a walk cycle.
 *
 * Everything added here is fitted to the model's real surface by ray-casting, and is skinned to
 * the model's own skeleton, so it deforms with the body.
 */
import * as THREE from 'three';

const V3 = THREE.Vector3;
const srgb = (r: number, g: number, b: number) => new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);

/* ───────────────────────── dressing ───────────────────────── */

export function dressAvatar(model: THREE.Object3D, textures: { map: THREE.Texture; normalMap: THREE.Texture }) {
  const outfit = model.getObjectByName('outfit') as THREE.SkinnedMesh;
  const body = model.getObjectByName('AvatarBody') as THREE.SkinnedMesh;
  const bones: Record<string, THREE.Bone> = {};
  model.traverse((o) => {
    // the file contains nested duplicates with the same name; the first (outermost) one carries the rest
    if ((o as THREE.Bone).isBone && !bones[o.name]) bones[o.name] = o as THREE.Bone;
  });

  // navy fabric on the original clothes
  textures.map.colorSpace = THREE.SRGBColorSpace;
  outfit.material.map = textures.map;
  outfit.material.normalMap = textures.normalMap;
  outfit.material.needsUpdate = true;

  // keep only the blink and smile shapes (the file ships ~90 face shapes we don't need)
  model.traverse((o) => {
    if (!o.isMesh || !o.geometry?.morphAttributes?.position) return;
    const dict = o.morphTargetDictionary || {};
    const keep = Object.keys(dict).filter((k) => /^(eyeBlink(Left|Right)|mouthSmile(Left|Right))$/.test(k));
    if (!keep.length) {
      o.geometry.morphAttributes = {};
      o.morphTargetInfluences = undefined;
      o.morphTargetDictionary = undefined;
      return;
    }
    o.geometry.morphAttributes.position = keep.map((k) => o.geometry.morphAttributes.position[dict[k]]);
    const d: Record<string, number> = {};
    keep.forEach((k, i) => (d[k] = i));
    o.morphTargetDictionary = d;
    o.morphTargetInfluences = keep.map(() => 0);
  });

  model.updateMatrixWorld(true);
  model.traverse((o) => o.isSkinnedMesh && o.skeleton.update());

  // Neither mesh's own skeleton has all the bones we need, so build a small skeleton of our own.
  // The model is in its bind (T) pose right now, so inverse bind matrices are just inverse world matrices.
  const used = ['Hips', 'Spine', 'Spine2', 'Neck', 'Head', 'LeftArm', 'LeftForeArm', 'RightArm', 'RightForeArm', 'LeftUpLeg', 'RightUpLeg'];
  const skeleton = new THREE.Skeleton(
    used.map((n) => bones[n]),
    used.map((n) => bones[n].matrixWorld.clone().invert()),
  );
  const idx = (n: string) => used.indexOf(n);
  // Ray-casting against skinned meshes re-skins every vertex per ray, which is very slow.
  // Snapshot the rest pose into plain static meshes and cast against those instead.
  const bake = (m: THREE.SkinnedMesh) => {
    const g = m.geometry.clone();
    const p = g.attributes.position;
    const v = new V3();
    const arr = new Float32Array(p.count * 3);
    for (let i = 0; i < p.count; i++) {
      m.getVertexPosition(i, v);
      v.applyMatrix4(m.matrixWorld);
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    }
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    g.deleteAttribute('skinIndex');
    g.deleteAttribute('skinWeight');
    g.morphAttributes = {};
    const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ side: THREE.FrontSide }));
    mesh.updateMatrixWorld(true);
    return mesh;
  };
  const staticOutfit = bake(outfit);
  const staticBody = bake(body);
  const headMesh = model.getObjectByName('AvatarHead') as THREE.SkinnedMesh;
  const staticHead = headMesh ? bake(headMesh) : null;
  const rc = new THREE.Raycaster();
  const targets = [staticOutfit, staticBody, ...(staticHead ? [staticHead] : [])];
  const hit = (origin: THREE.Vector3, dir: THREE.Vector3) => {
    rc.set(origin, dir);
    const h = rc.intersectObjects(targets, false);
    return h.length ? h[0] : null;
  };
  const frontZ = (x: number, y: number) => {
    const h = hit(new V3(x, y, 1.2), new V3(0, 0, -1));
    return h ? h.point.z : null;
  };

  /** Build a SkinnedMesh from world-space vertices. weights(v) -> [[boneIndex, weight], ...] */
  function skinned(positions: number[], index: number[], material: THREE.Material, weights: (p: THREE.Vector3) => [number, number][]) {
    const geo = new THREE.BufferGeometry();
    const local = new V3();
    const arr = new Float32Array(positions.length);
    const si: number[] = [];
    const sw: number[] = [];
    for (let i = 0; i < positions.length; i += 3) {
      local.set(positions[i], positions[i + 1], positions[i + 2]);
      const w = weights(local.clone());
      outfit.worldToLocal(local);
      arr[i] = local.x;
      arr[i + 1] = local.y;
      arr[i + 2] = local.z;
      const sorted = w.slice(0, 4);
      const total = sorted.reduce((s, e) => s + e[1], 0) || 1;
      for (let k = 0; k < 4; k++) {
        si.push(sorted[k] ? sorted[k][0] : 0);
        sw.push(sorted[k] ? sorted[k][1] / total : 0);
      }
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
    geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
    geo.setIndex(index);
    geo.computeVertexNormals();
    const mesh = new THREE.SkinnedMesh(geo, material);
    mesh.frustumCulled = false;
    mesh.name = 'suit-part';
    outfit.parent.add(mesh);
    mesh.position.copy(outfit.position);
    mesh.quaternion.copy(outfit.quaternion);
    mesh.scale.copy(outfit.scale);
    mesh.updateMatrixWorld(true);
    mesh.bind(skeleton, outfit.matrixWorld.clone());
    return mesh;
  }

  const mat = (c: THREE.Color, rough = 0.85, metal = 0, side = THREE.DoubleSide) =>
    new THREE.MeshStandardMaterial({ color: c, roughness: rough, metalness: metal, side });
  // same lighting model as the model's own clothes, so jacket pieces match its fabric exactly
  const cloth = (c: THREE.Color) => new THREE.MeshPhongMaterial({ color: c, specular: 0x000000, shininess: 0, side: THREE.DoubleSide });

  const NAVY = srgb(29, 37, 59);
  const VEST = srgb(27, 34, 54);
  const LAPEL = srgb(39, 48, 74);
  const SHIRT = srgb(238, 239, 243);
  const TIE = srgb(22, 24, 32);

  const idxHips = idx('Hips');
  const idxSpine = idx('Spine');
  const idxSpine2 = idx('Spine2');
  const idxNeck = idx('Neck');

  /* ---------- 1. front panels (vest, shirt, lapels, tie), fitted to the torso ---------- */
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
  const ow = (y: number) => (y >= 1.04 ? 0.086 * clamp01((y - 1.04) / 0.46) : 0.0); // jacket opening half-width

  /** A panel made of horizontal rows: xl(y), xr(y) give the left/right edge; z is fitted to the surface. */
  function rowsPanel(yTop: number, yBot: number, rows: number, cols: number, xl: (y: number) => number, xr: (y: number) => number, off: number, material: THREE.Material, w?: (p: THREE.Vector3) => [number, number][]) {
    const pos: number[] = [];
    const ind: number[] = [];
    for (let r = 0; r <= rows; r++) {
      const y = lerp(yTop, yBot, r / rows);
      const a = xl(y);
      const b = xr(y);
      for (let c = 0; c <= cols; c++) {
        const x = lerp(a, b, c / cols);
        const z = frontZ(x, y);
        pos.push(x, y, (z ?? 0.1) + off);
      }
    }
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const i = r * (cols + 1) + c;
        ind.push(i, i + cols + 1, i + 1, i + 1, i + cols + 1, i + cols + 2);
      }
    return skinned(pos, ind, material, w || (() => [[idxSpine2, 1]]));
  }
  const torsoW = (p: THREE.Vector3): [number, number][] => (p.y > 1.46 ? [[idxSpine2, 0.55], [idxNeck, 0.45]] : [[idxSpine2, 1]]);

  // waistcoat inside the jacket opening
  rowsPanel(1.4, 1.045, 14, 6, (y) => -ow(y), (y) => ow(y), 0.004, mat(VEST, 0.8), torsoW);
  // white shirt in the V above the waistcoat
  const shirtHalf = (y: number) => Math.min(ow(y), 0.062, 0.07 * clamp01((y - 1.32) / 0.08));
  rowsPanel(1.505, 1.32, 12, 6, (y) => -shirtHalf(y), (y) => shirtHalf(y), 0.007, mat(SHIRT, 0.7), torsoW);
  // tie: knot + blade, ending where the waistcoat takes over
  const tieHalf = (y: number) => (y > 1.455 ? 0.015 + 0.004 * clamp01((1.505 - y) / 0.05) : 0.012 + 0.017 * Math.sin(clamp01((1.455 - y) / 0.13) * Math.PI * 0.55));
  rowsPanel(1.51, 1.33, 14, 2, (y) => -tieHalf(y), (y) => tieHalf(y), 0.012, mat(TIE, 0.3, 0.25), torsoW);
  // lapels: a band along each edge of the V (left = +x, right = -x)
  for (const s of [1, -1]) {
    const lw = (y: number) => 0.012 + 0.03 * Math.pow(Math.sin(clamp01((y - 1.04) / 0.46) * Math.PI), 0.8);
    rowsPanel(1.5, 1.045, 16, 3, (y) => (s > 0 ? ow(y) : -ow(y) - lw(y)), (y) => (s > 0 ? ow(y) + lw(y) : -ow(y)), 0.009, cloth(LAPEL), torsoW);
  }
  // pocket square on the wearer's left breast
  {
    const pos: number[] = [];
    const pts: [number, number][] = [[0.105, 1.335], [0.165, 1.335], [0.158, 1.372], [0.14, 1.352], [0.12, 1.378]];
    pts.forEach(([x, y]) => pos.push(x, y, (frontZ(x, y) ?? 0.12) + 0.01));
    skinned(pos, [0, 1, 2, 0, 2, 3, 0, 3, 4], mat(srgb(244, 244, 248), 0.7), () => [[idxSpine2, 1]]);
  }
  // buttons on the waistcoat
  for (const y of [1.26, 1.19, 1.12]) {
    const g = new THREE.CylinderGeometry(0.0085, 0.0085, 0.004, 14);
    g.rotateX(Math.PI / 2);
    const p = g.attributes.position;
    const base = new V3(0, y, (frontZ(0, y) ?? 0.12) + 0.008);
    const positions: number[] = [];
    for (let i = 0; i < p.count; i++) positions.push(p.getX(i) + base.x, p.getY(i) + base.y, p.getZ(i) + base.z);
    skinned(positions, Array.from(g.index.array), mat(srgb(14, 15, 20), 0.3, 0.4), () => [[idxSpine2, 1]]);
  }

  /* ---------- 2. shirt collar ring around the neck ---------- */
  {
    const segs = 28;
    const levels = [1.515, 1.555];
    const pos: number[] = [];
    const ind: number[] = [];
    const cz = -0.012;
    levels.forEach((y, li) => {
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const d = new V3(Math.sin(a), 0, Math.cos(a));
        const h = hit(new V3(0, y, cz).addScaledVector(d, 0.11), d.clone().negate());
        const r = h ? new V3(h.point.x, 0, h.point.z - cz).length() : 0.06;
        const rr = r + 0.006 + li * 0.003;
        pos.push(Math.sin(a) * rr, y, cz + Math.cos(a) * rr);
      }
    });
    for (let i = 0; i < segs; i++) {
      const n = (i + 1) % segs;
      ind.push(i, segs + i, n, n, segs + i, segs + n);
    }
    skinned(pos, ind, mat(SHIRT, 0.7), (p) => [[idxNeck, clamp01((p.y - 1.5) / 0.05)], [idxSpine2, 1 - clamp01((p.y - 1.5) / 0.05)]]);
  }

  /* ---------- 3. long sleeves with shirt cuffs ---------- */
  for (const s of [1, -1]) {
    const side = s > 0 ? 'Left' : 'Right';
    const P = (n: string) => bones[side + n].getWorldPosition(new V3());
    const shoulder = P('Arm');
    const elbow = P('ForeArm');
    const wrist = P('Hand');
    const centre = (x: number) => {
      const ax = Math.abs(x);
      const a = Math.abs(shoulder.x), b = Math.abs(elbow.x), c = Math.abs(wrist.x);
      const f = ax <= b ? (ax - a) / (b - a) : (ax - b) / (c - b);
      const from = ax <= b ? shoulder : elbow;
      const to = ax <= b ? elbow : wrist;
      return new V3(x, lerp(from.y, to.y, f), lerp(from.z, to.z, f));
    };
    const x0 = 0.19, x1 = Math.abs(wrist.x) - 0.04, x2 = Math.abs(wrist.x) - 0.012;
    const stations = 22;
    const segs = 20;
    const pos: number[] = [];
    const ind: number[] = [];
    const radii: number[] = [];
    const xs: number[] = [];
    for (let k = 0; k <= stations; k++) {
      const x = lerp(x0, x1, k / stations);
      const c = centre(s * x);
      const rs: number[] = [];
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const d = new V3(0, Math.cos(a), Math.sin(a));
        const h = hit(c.clone().addScaledVector(d, 0.25), d.clone().negate());
        rs.push(h ? h.point.clone().sub(c).setX(0).length() : 0.05);
      }
      radii.push(rs);
      xs.push(x);
    }
    // smooth radii along the arm so the tube is clean
    const sm = radii.map((rs, k) => rs.map((_, i) => {
      let t = 0, n = 0;
      for (let dk = -2; dk <= 2; dk++) for (let di = -1; di <= 1; di++) {
        const kk = Math.min(stations, Math.max(0, k + dk));
        t += radii[kk][(i + di + segs) % segs]; n++;
      }
      return t / n;
    }));
    for (let k = 0; k <= stations; k++) {
      const x = xs[k];
      const c = centre(s * x);
      const ax = xs[k];
      // roomy over the tee sleeve and elbow so no fabric or skin pokes through, tighter at the wrist
      const room = ax < 0.36 ? 0.012 : ax < 0.5 ? lerp(0.012, 0.007, (ax - 0.36) / 0.14) : 0.006;
      const grow = room * clamp01(k / 3); // blend onto the tee sleeve at the shoulder end
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const r = sm[k][i] + grow;
        pos.push(c.x, c.y + Math.cos(a) * r, c.z + Math.sin(a) * r);
      }
    }
    for (let k = 0; k < stations; k++)
      for (let i = 0; i < segs; i++) {
        const a = k * segs + i, b = k * segs + ((i + 1) % segs);
        ind.push(a, a + segs, b, b, a + segs, b + segs);
      }
    const iA = idx(side + 'Arm'), iF = idx(side + 'ForeArm');
    const armW = (p: THREE.Vector3): [number, number][] => {
      const t = clamp01((Math.abs(p.x) - (Math.abs(elbow.x) - 0.05)) / 0.1);
      return t <= 0 ? [[iA, 1]] : t >= 1 ? [[iF, 1]] : [[iA, 1 - t], [iF, t]];
    };
    skinned(pos, ind, cloth(NAVY), armW);

    // cuff: a thin white ring that peeks out of the sleeve end
    const cpos: number[] = [];
    const cind: number[] = [];
    const cs = [x1 - 0.012, x2];
    cs.forEach((x) => {
      const c = centre(s * x);
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const d = new V3(0, Math.cos(a), Math.sin(a));
        const h = hit(c.clone().addScaledVector(d, 0.25), d.clone().negate());
        const r = (h ? h.point.clone().sub(c).setX(0).length() : 0.035) + 0.004;
        cpos.push(c.x, c.y + Math.cos(a) * r, c.z + Math.sin(a) * r);
      }
    });
    for (let i = 0; i < segs; i++) {
      const a = i, b = (i + 1) % segs;
      cind.push(a, a + segs, b, b, a + segs, b + segs);
    }
    skinned(cpos, cind, mat(SHIRT, 0.7), () => [[iF, 1]]);
  }

  /* ---------- 4. longer jacket skirt over the hips ---------- */
  {
    // find the tee hem: lowest y where the front surface still belongs to the top (upper half of the texture)
    let hem = 0.93;
    for (let y = 1.1; y > 0.75; y -= 0.005) {
      const h = hit(new V3(0, y, 1.2), new V3(0, 0, -1));
      if (h && h.object === staticOutfit && h.uv && h.uv.y > 0.58) hem = y;
      else if (h && h.object === staticOutfit && h.uv && h.uv.y <= 0.58) break;
    }
    const top = hem + 0.03;
    const bottom = hem - 0.12;
    const levels = 9;
    const segs = 48;
    const cz = 0.0;
    // one contour per angle: the widest the body gets anywhere along the skirt's height
    const contour: number[] = [];
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const d = new V3(Math.sin(a), 0, Math.cos(a));
      let r = 0;
      for (let y = bottom; y <= top; y += 0.02) {
        const h = hit(new V3(0, y, cz).addScaledVector(d, 0.5), d.clone().negate());
        if (h) r = Math.max(r, new V3(h.point.x, 0, h.point.z - cz).length());
      }
      contour.push(r || 0.17);
    }
    // smooth around the ring so the hem is a clean curve
    const smooth = contour.map((_, i) => {
      let t = 0;
      for (let k = -3; k <= 3; k++) t += contour[(i + k + segs) % segs];
      return t / 7;
    });
    const pos: number[] = [];
    const ind: number[] = [];
    for (let l = 0; l <= levels; l++) {
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        // the hem curves up toward the centre front, like a real jacket
        const front = Math.atan2(Math.sin(a), Math.cos(a));
        const lift = 0.045 * Math.exp(-Math.pow(front / 0.5, 2));
        const y = lerp(top, bottom + lift, l / levels);
        const r = smooth[i] + 0.006 + 0.004 * clamp01(l / levels);
        pos.push(Math.sin(a) * r, y, cz + Math.cos(a) * r);
      }
    }
    for (let l = 0; l < levels; l++)
      for (let i = 0; i < segs; i++) {
        const a = l * segs + i, b = l * segs + ((i + 1) % segs);
        ind.push(a, a + segs, b, b, a + segs, b + segs);
      }
    const iL = idx('LeftUpLeg'), iR = idx('RightUpLeg');
    skinned(pos, ind, cloth(srgb(30, 38, 60)), (p) => {
      const t = clamp01((top - p.y) / (top - bottom)); // 0 at the top, 1 at the hem
      const k = 0.6 * t;
      const left = clamp01(0.5 + p.x / 0.12);
      const base = 0.7 + 0.3 * (1 - t);
      return [[idxHips, (1 - k) * base], [idxSpine, (1 - k) * (1 - base)], [iL, k * left], [iR, k * (1 - left)]];
    });
  }

  /* ---------- 5. sunglasses (as in the photo), fixed to the head ---------- */
  try {
    const idxHead = idx('Head');
    const eyeL = (bones.LeftEye || bones.LeftEyeball)?.getWorldPosition(new V3());
    const eyeR = (bones.RightEye || bones.RightEyeball)?.getWorldPosition(new V3());
    if (eyeL && eyeR) {
      const ey = (eyeL.y + eyeR.y) / 2;
      const ex = Math.abs(eyeL.x - eyeR.x) / 2;
      const faceZ = (x: number) => (hit(new V3(x, ey, 1.0), new V3(0, 0, -1))?.point.z ?? eyeL.z + 0.03);
      const lens = new THREE.MeshStandardMaterial({ color: srgb(24, 40, 86), roughness: 0.12, metalness: 0.55, side: THREE.DoubleSide });
      const frame = new THREE.MeshStandardMaterial({ color: srgb(18, 18, 22), roughness: 0.4, metalness: 0.3, side: THREE.DoubleSide });
      const addGeo = (g: THREE.BufferGeometry, material: THREE.Material) => {
        const p = g.attributes.position;
        const out: number[] = [];
        for (let i = 0; i < p.count; i++) out.push(p.getX(i), p.getY(i), p.getZ(i));
        const index = g.index ? Array.from(g.index.array) : Array.from({ length: p.count }, (_, i) => i);
        skinned(out, index, material, () => [[idxHead, 1]]);
      };
      for (const s of [1, -1]) {
        const cx = s * ex;
        const z = faceZ(cx) + 0.008;
        const l = new THREE.CircleGeometry(0.0205, 24);
        l.scale(1, 0.8, 1);
        l.translate(cx, ey + 0.002, z + 0.001);
        addGeo(l, lens);
        const f = new THREE.RingGeometry(0.0205, 0.0235, 24);
        f.scale(1, 0.78, 1);
        f.translate(cx, ey + 0.002, z);
        addGeo(f, frame);
        // temple arm running back along the side of the head
        const arm = new THREE.BoxGeometry(0.004, 0.004, 0.11);
        arm.translate(s * (ex + 0.024), ey + 0.006, z - 0.055);
        addGeo(arm, frame);
      }
      const bridge = new THREE.BoxGeometry(ex * 2 - 0.04, 0.004, 0.004);
      bridge.translate(0, ey + 0.01, faceZ(0) + 0.018);
      addGeo(bridge, frame);
    }
  } catch (e) {
    /* glasses are decoration only */
  }

  const headTop = bones['HeadTop_End'].getWorldPosition(new V3()).y;
  return { outfit, body, bones, headTop };
}

/* ───────────────────────── walking ───────────────────────── */

export function createPoser(model: THREE.Object3D, bones: Record<string, THREE.Bone>) {
  const names = ['Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Head',
    'LeftArm', 'LeftForeArm', 'RightArm', 'RightForeArm',
    'LeftUpLeg', 'LeftLeg', 'LeftFoot', 'RightUpLeg', 'RightLeg', 'RightFoot'];
  const restQ: Record<string, THREE.Quaternion> = {};
  for (const n of names) restQ[n] = bones[n].quaternion.clone();
  model.updateMatrixWorld(true);
  const wpos = (n: string) => bones[n].getWorldPosition(new V3());
  const toeRest = { Left: wpos('LeftToeBase').sub(wpos('LeftFoot')).normalize(), Right: wpos('RightToeBase').sub(wpos('RightFoot')).normalize() };
  const restFootY = Math.min(wpos('LeftFoot').y, wpos('RightFoot').y);
  const restToeY = Math.min(wpos('LeftToeBase').y, wpos('RightToeBase').y);
  const baseY = model.position.y;

  const tmpQ = new THREE.Quaternion();
  const tmpQ2 = new THREE.Quaternion();
  const worldQ = new THREE.Quaternion();
  const parentQ = new THREE.Quaternion();
  const frameQ = new THREE.Quaternion(); // the character's own frame (the wrapper may be yawed)

  function setWorldQuat(bone: THREE.Bone, q: THREE.Quaternion) {
    bone.parent.getWorldQuaternion(parentQ);
    bone.quaternion.copy(parentQ.invert().multiply(q));
    bone.updateMatrixWorld(true);
  }
  function aim(bone: THREE.Bone, child: THREE.Bone, target: THREE.Vector3) {
    const cur = child.getWorldPosition(new V3()).sub(bone.getWorldPosition(new V3())).normalize();
    tmpQ.setFromUnitVectors(cur, target.clone().normalize().applyQuaternion(frameQ));
    bone.getWorldQuaternion(worldQ);
    setWorldQuat(bone, tmpQ.multiply(worldQ));
  }
  const mix = (a: THREE.Vector3, b: THREE.Vector3, t: number) => a.clone().lerp(b, t).normalize();
  function rotateWorld(bone: THREE.Bone, axis: THREE.Vector3, angle: number) {
    tmpQ2.setFromAxisAngle(axis.clone().applyQuaternion(frameQ), angle);
    bone.getWorldQuaternion(worldQ);
    setWorldQuat(bone, tmpQ2.multiply(worldQ));
  }
  const X = new V3(1, 0, 0), Y = new V3(0, 1, 0), Z = new V3(0, 0, 1);

  let blinkAt = 2.5;
  const heads: THREE.Mesh[] = [];
  model.traverse((o) => o.isMesh && o.morphTargetDictionary && heads.push(o));

  /**
   * phase: walk phase in radians; amount: 0 (standing) .. 1 (full stride);
   * time: seconds for idle motion; look: {x,y} in -1..1 for the head.
   */
  return function pose(phase: number, amount: number, time: number, look: { x: number; y: number }, gesture = -1, gAmount = 0) {
    if (model.parent) model.parent.getWorldQuaternion(frameQ);
    else frameQ.identity();
    for (const n of names) bones[n].quaternion.copy(restQ[n]);
    model.position.y = baseY;
    model.updateMatrixWorld(true);

    const A = amount;
    const sw = Math.sin(phase);

    // torso: counter-rotation while walking, gentle breathing when still
    rotateWorld(bones.Hips, Y, 0.1 * A * sw);
    rotateWorld(bones.Spine, Y, -0.12 * A * sw);
    rotateWorld(bones.Spine2, X, 0.012 * Math.sin(time * 1.7));

    // arms hang at the sides and swing against the legs
    for (const s of [1, -1]) {
      const side = s > 0 ? 'Left' : 'Right';
      const legSwing = s > 0 ? sw : -sw; // this side's leg
      const th = -0.42 * A * legSwing + 0.03 * Math.sin(time * 1.3 + s);
      const out = 0.11;
      const armDir = new V3(s * out, -Math.cos(th), Math.sin(th));
      const bend = 0.2 + A * 0.28 * Math.max(0, Math.sin(th * 1.0 + 0.6));
      const psi = th + bend;
      let upper = armDir;
      let fore = new V3(s * 0.08, -Math.cos(psi), Math.sin(psi));
      // standing: hands rest in the trouser pockets, as in the photo
      const pk = 1 - A;
      if (pk > 0.001) {
        upper = mix(upper, new V3(s * 0.2, -0.95, -0.16), pk);
        fore = mix(fore, new V3(-s * 0.3, -0.82, 0.46), pk);
      }
      // chapter gestures use the character's right arm (-X) while standing
      const g = gesture >= 0 && s < 0 ? gAmount * (1 - A) : 0;
      if (g > 0.001) {
        const t = time;
        let gu = upper, gf = fore;
        if (gesture === 0) { // wave hello
          gu = new V3(-0.8, 0.55, 0.12);
          gf = new V3(-0.35 - 0.35 * Math.sin(t * 7), 0.9, 0.1);
        } else if (gesture === 1) { // present: open hand out front
          gu = new V3(-0.45, -0.7, 0.35);
          gf = new V3(-0.35, -0.05 + 0.04 * Math.sin(t * 2), 0.95);
        } else if (gesture === 2) { // thinking: hand to chin
          gu = new V3(-0.12, -0.9, 0.35);
          gf = new V3(0.2, 0.7, 0.55);
        } else { // point toward the next chapter
          gu = new V3(-0.55, -0.35, 0.7);
          gf = new V3(-0.5, 0.05 + 0.03 * Math.sin(t * 2.4), 0.85);
        }
        upper = mix(upper, gu, g);
        fore = mix(fore, gf, g);
      }
      aim(bones[side + 'Arm'], bones[side + 'ForeArm'], upper);
      aim(bones[side + 'ForeArm'], bones[side + 'Hand'], fore);
    }

    // legs
    for (const s of [1, -1]) {
      const side = s > 0 ? 'Left' : 'Right';
      const ph = s > 0 ? phase : phase + Math.PI;
      const swing = Math.sin(ph);
      const th = 0.5 * A * swing;
      const flex = A * 0.95 * Math.max(0, Math.cos(ph)) + 0.02;
      aim(bones[side + 'UpLeg'], bones[side + 'Leg'], new V3(s * 0.04, -Math.cos(th), Math.sin(th)));
      const ts = th - flex;
      aim(bones[side + 'Leg'], bones[side + 'Foot'], new V3(s * 0.035, -Math.cos(ts), Math.sin(ts)));
      // keep the foot flat, lifting the toe a little at heel-strike and the heel at push-off
      const pitch = A * 0.35 * Math.max(0, -Math.cos(ph)) * (swing < 0 ? 1 : 0) - A * 0.25 * Math.max(0, Math.cos(ph));
      const rest = toeRest[side].clone();
      const t = new V3(rest.x, rest.y * Math.cos(pitch) - rest.z * Math.sin(pitch), rest.y * Math.sin(pitch) + rest.z * Math.cos(pitch));
      aim(bones[side + 'Foot'], bones[side + 'ToeBase'] || bones[side + 'Foot'], t);
    }

    // head follows the cursor, with an occasional blink
    rotateWorld(bones.Head, Y, look.x * 0.5);
    rotateWorld(bones.Head, X, -look.y * 0.22);
    let blink = 0;
    if (time > blinkAt) {
      const k = (time - blinkAt) / 0.16;
      blink = k < 1 ? Math.sin(k * Math.PI) : 0;
      if (k >= 1) blinkAt = time + 2.5 + Math.random() * 3;
    }
    const smile = 0.35 + 0.25 * gAmount;
    heads.forEach((m) => {
      const d = m.morphTargetDictionary;
      const inf = m.morphTargetInfluences;
      if (!d || !inf) return;
      for (const key of Object.keys(d)) inf[d[key]] = key.startsWith('eyeBlink') ? blink : smile;
    });

    // plant the lowest foot on the ground line (this also creates the natural bob)
    model.updateMatrixWorld(true);
    const lowest = Math.min(wpos('LeftFoot').y - restFootY, wpos('RightFoot').y - restFootY, wpos('LeftToeBase').y - restToeY, wpos('RightToeBase').y - restToeY);
    model.position.y = baseY - lowest;
  };
}

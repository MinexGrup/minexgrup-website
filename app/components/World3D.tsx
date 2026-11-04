// @ts-nocheck
/* eslint-disable */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

/*
  Interactive 3D "world" (mining / quarry / construction).
  - Desktop: loads only when the section scrolls near the viewport.
  - Phones: shows a still image; the 3D loads on tap (saves data & battery).
  - Framing is computed from the round platform so it stays centred while it turns.
*/

type ZoneKey = "mining" | "quarry" | "construction";

const ZONES: Record<ZoneKey, { label: string; az: number; items: string[] }> = {
  mining: {
    label: "Mining",
    az: 100,
    items: [
      "Large excavators — Cat 395, Komatsu PC2000",
      "High-horsepower engines — Cummins QSK50",
      "Heavy-duty undercarriage",
      "Fast-moving wear parts"
    ]
  },
  quarry: {
    label: "Quarry",
    az: 330,
    items: [
      "Durable undercarriage kits",
      "Hydraulic pumps, valves & cylinders",
      "Rebuild-ready engines",
      "Ground-engaging tools"
    ]
  },
  construction: {
    label: "Construction",
    az: 190,
    items: [
      "Construction excavators",
      "OEM-grade spares across brands",
      "Undercarriage & wear components",
      "Quick-turn part matching"
    ]
  }
};

// Realistic materials, matched by the model's own material names.
const MATS = {
  Giallo: [0xe2a414, 0, 0.62],
  GROUND2: [0x625a4e, 0, 0.96],
  "Boring bianco": [0xb7ab97, 0, 0.9],
  ELEMENTI: [0x57534c, 0.05, 0.75],
  Alluminio: [0x9d9d9a, 0.55, 0.42],
  Alberi: [0x4f6c43, 0, 0.88],
  "Plastica nera": [0x151515, 0, 0.6],
  "Metallo Nero": [0x1b1b1b, 0.45, 0.5],
  Cingoli: [0x1e1e1e, 0.15, 0.78]
};

async function createWorld(stage: HTMLElement, canvas: HTMLCanvasElement) {
  const [THREE, { GLTFLoader }, { DRACOLoader }, { OrbitControls }, { RoomEnvironment }] = await Promise.all([
    import("three"),
    import("three/examples/jsm/loaders/GLTFLoader.js"),
    import("three/examples/jsm/loaders/DRACOLoader.js"),
    import("three/examples/jsm/controls/OrbitControls.js"),
    import("three/examples/jsm/environments/RoomEnvironment.js")
  ]);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(36, 1, 1, 100);
  const key = new THREE.DirectionalLight(0xfffaf0, 2.8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  scene.add(key, key.target);
  const back = new THREE.DirectionalLight(0xd6e0ea, 0.5);
  scene.add(back);
  scene.add(new THREE.HemisphereLight(0xe4ecf4, 0x3b342b, 1.0));

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.enableZoom = false; // never hijack page scroll
  controls.autoRotateSpeed = 0.5;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = 1.25;
  controls.rotateSpeed = 0.6;

  const draco = new DRACOLoader();
  draco.setDecoderPath("/3d/draco/");
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);
  const gltf = await loader.loadAsync("/3d/world.glb");

  const root = gltf.scene;
  const box = new THREE.Box3().setFromObject(root);
  const sz = box.getSize(new THREE.Vector3());
  root.position.sub(box.getCenter(new THREE.Vector3()));
  const R = sz.length() * 0.5;
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.castShadow = o.receiveShadow = true;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
      const s = MATS[m.name];
      if (s) {
        m.color.setHex(s[0]);
        m.metalness = s[1];
        m.roughness = s[2];
      }
      m.envMapIntensity = 0.4;
    });
  });
  scene.add(root);

  const ground = new THREE.Mesh(new THREE.CircleGeometry(R * 1.6, 64), new THREE.ShadowMaterial({ opacity: 0.45 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -sz.y / 2 - R * 0.002;
  ground.receiveShadow = true;
  scene.add(ground);
  key.position.set(R * 1.1, R * 2.2, R * 0.9);
  const sc = key.shadow.camera;
  sc.left = -R * 1.3; sc.right = R * 1.3; sc.top = R * 1.3; sc.bottom = -R * 1.3;
  sc.near = R * 0.1; sc.far = R * 6;
  sc.updateProjectionMatrix();
  key.shadow.bias = -0.0015;
  key.shadow.normalBias = R * 0.008;
  key.shadow.radius = 5;
  back.position.set(-R * 1.5, R * 0.8, -R * 1.2);
  camera.near = R * 0.05;
  camera.far = R * 20; // tight depth range = no z-fighting flicker

  let mixer = null;
  if (gltf.animations.length && !reduce) {
    mixer = new THREE.AnimationMixer(root);
    gltf.animations.forEach((c) => mixer.clipAction(c).play());
  }

  const HOME = { az: 46, pol: 67 };
  const deg = Math.PI / 180;
  const zero = new THREE.Vector3();
  const orbitPos = (az, pol, dist, tgt) =>
    new THREE.Vector3(Math.sin(pol * deg) * Math.cos(az * deg), Math.cos(pol * deg), Math.sin(pol * deg) * Math.sin(az * deg))
      .multiplyScalar(dist)
      .add(tgt);

  // --- frame on the round platform (its rim stays put while the world turns) ---
  root.updateMatrixWorld(true);
  let gx0 = 1e9, gx1 = -1e9, gz0 = 1e9, gz1 = -1e9, yBot = 1e9, yTop = -1e9;
  root.traverse((o) => {
    if (!o.isMesh) return;
    const ms = Array.isArray(o.material) ? o.material : [o.material];
    if (!ms.some((m) => m.name === "GROUND2")) return;
    const a = o.geometry.attributes.position, v = new THREE.Vector3();
    for (let i = 0; i < a.count; i++) {
      v.fromBufferAttribute(a, i).applyMatrix4(o.matrixWorld);
      if (v.x < gx0) gx0 = v.x; if (v.x > gx1) gx1 = v.x;
      if (v.z < gz0) gz0 = v.z; if (v.z > gz1) gz1 = v.z;
      if (v.y < yBot) yBot = v.y; if (v.y > yTop) yTop = v.y;
    }
  });
  if (gx0 > gx1) { gx0 = -sz.x / 2; gx1 = sz.x / 2; gz0 = -sz.z / 2; gz1 = sz.z / 2; yBot = -sz.y / 2; yTop = 0; }
  const rimR = Math.max(gx1 - gx0, gz1 - gz0) / 2;
  root.position.x -= (gx0 + gx1) / 2;
  root.position.z -= (gz0 + gz1) / 2;
  root.updateMatrixWorld(true);
  const pts = [];
  for (let i = 0; i < 96; i++) {
    const t = (i / 96) * Math.PI * 2;
    for (const y of [yBot, yTop]) pts.push(new THREE.Vector3(Math.cos(t) * rimR, y, Math.sin(t) * rimR));
  }
  const probe = new THREE.PerspectiveCamera(36, 1, R * 0.05, R * 20), pv = new THREE.Vector3();
  const bounds = (dist, aspect) => {
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    probe.aspect = aspect; probe.updateProjectionMatrix();
    for (let az = 0; az < 360; az += 30) {
      probe.position.copy(orbitPos(az, HOME.pol, dist, zero)); probe.lookAt(zero); probe.updateMatrixWorld();
      for (const q of pts) {
        pv.copy(q).project(probe);
        if (pv.x < x0) x0 = pv.x; if (pv.x > x1) x1 = pv.x; if (pv.y < y0) y0 = pv.y; if (pv.y > y1) y1 = pv.y;
      }
    }
    return { x0, x1, y0, y1 };
  };
  let FIT = { dist: R * 2, ox: 0, oy: 0 };
  const fit = () => {
    const w = stage.clientWidth, h = stage.clientHeight, asp = w / h, mob = window.innerWidth < 900;
    const fx = 0.92, fy = mob ? 0.66 : 0.7, cy = mob ? -0.02 : -0.035;
    let d = R * 2;
    for (let i = 0; i < 5; i++) { const b = bounds(d, asp); d *= Math.max((b.x1 - b.x0) / (2 * fx), (b.y1 - b.y0) / (2 * fy)); }
    const b = bounds(d, asp);
    FIT = { dist: d, ox: ((b.x0 + b.x1) / 2) * w / 2, oy: -((b.y0 + b.y1) / 2 - cy) * h / 2 };
  };
  const size = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    fit();
    camera.setViewOffset(w, h, FIT.ox, FIT.oy, w, h);
    camera.updateProjectionMatrix();
  };

  let fly = null, zone = null, idle;
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const flyTo = (pos, tgt, ms, e = ease) => {
    fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: pos, t1: tgt, start: performance.now(), ms, e };
    controls.autoRotate = false;
  };

  size();
  const onResize = () => { size(); if (!zone && !fly) camera.position.copy(orbitPos(HOME.az, HOME.pol, FIT.dist, zero)); };
  window.addEventListener("resize", onResize);

  // entrance: sweep in from above when the section comes into view
  controls.target.copy(zero);
  let entrance = null;
  if (reduce) camera.position.copy(orbitPos(HOME.az, HOME.pol, FIT.dist, zero));
  else {
    camera.position.copy(orbitPos(HOME.az - 70, 12, FIT.dist * 1.9, zero));
    entrance = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        entrance.disconnect();
        if (!zone) flyTo(orbitPos(HOME.az, HOME.pol, FIT.dist, zero), zero.clone(), 2800, (x) => 1 - Math.pow(1 - x, 4));
      }
    }, { threshold: 0.35 });
    entrance.observe(stage);
  }
  controls.update();

  controls.addEventListener("start", () => { clearTimeout(idle); controls.autoRotate = false; fly = null; });
  controls.addEventListener("end", () => { idle = setTimeout(() => { if (!zone) controls.autoRotate = !reduce; }, 2500); });

  const clock = new THREE.Clock();
  let visible = true;
  const vis = new IntersectionObserver((e) => { visible = e[0].isIntersecting; clock.getDelta(); }, { threshold: 0 });
  vis.observe(stage);

  let raf = 0;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!visible) return;
    const dt = clock.getDelta();
    if (mixer) mixer.update(dt);
    if (fly) {
      const k = Math.min(1, (performance.now() - fly.start) / fly.ms), e = fly.e(k);
      camera.position.lerpVectors(fly.p0, fly.p1, e);
      controls.target.lerpVectors(fly.t0, fly.t1, e);
      if (k >= 1) { fly = null; if (!zone) controls.autoRotate = !reduce; }
    }
    controls.update();
    renderer.render(scene, camera);
  };
  loop();

  return {
    focus(z: ZoneKey | null) {
      zone = z;
      clearTimeout(idle);
      if (!z) {
        flyTo(orbitPos(HOME.az, HOME.pol, FIT.dist, zero), zero.clone(), 1500);
        return;
      }
      const a = ZONES[z].az;
      const tgt = new THREE.Vector3(Math.cos(a * deg), 0, Math.sin(a * deg)).multiplyScalar(R * 0.33);
      flyTo(orbitPos(a, 55, R * (window.innerWidth >= 900 ? 1.35 : 2.2), tgt), tgt, 1500);
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      entrance && entrance.disconnect();
      vis.disconnect();
      controls.dispose();
      renderer.dispose();
      draco.dispose();
      pmrem.dispose();
    }
  };
}

export default function World3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef(null);
  const startRef = useRef<Promise<any> | null>(null);
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [zone, setZone] = useState<ZoneKey | null>(null);

  const start = () => {
    if (!startRef.current && stageRef.current && canvasRef.current) {
      startRef.current = createWorld(stageRef.current, canvasRef.current)
        .then((api) => { apiRef.current = api; setReady(true); return api; })
        .catch((e) => { console.error(e); setFailed(true); return null; });
    }
    return startRef.current;
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 900;
    setMobile(isMobile);
    let near: IntersectionObserver | null = null;
    if (!isMobile && stageRef.current) {
      near = new IntersectionObserver((e) => { if (e[0].isIntersecting) { near && near.disconnect(); start(); } }, { rootMargin: "700px 0px" });
      near.observe(stageRef.current);
    }
    return () => { near && near.disconnect(); apiRef.current && apiRef.current.dispose(); };
  }, []);

  const pick = async (z: ZoneKey | null) => {
    setZone(z);
    const api = await start();
    api && api.focus(z);
  };

  return (
    <section className="w3d">
      <div className="section">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Our world</p>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.96] tracking-tightest text-champagne md:text-5xl lg:text-[58px]">
                One world.
                <br />
                Three kinds of ground.
              </h2>
            </div>
            <p className="max-w-[380px] text-[17px] leading-relaxed text-champagne/75">
              Drag to turn it. Tap a zone to see what we supply there.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="w3d-box">
            <div ref={stageRef} className="w3d-stage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={`w3d-poster ${ready ? "is-hidden" : ""}`} src="/3d/world-still.webp" alt="" />
              <canvas
                ref={canvasRef}
                className={`w3d-canvas ${ready ? "is-ready" : ""}`}
                aria-label="Interactive 3D model of mining, quarry and construction sites"
              />
              {mobile && !ready && !failed && (
                <button className="w3d-tap" onClick={() => start()}>
                  <span className="dot" />
                  Tap to explore in 3D
                </button>
              )}
              {!mobile && (
                <div className="w3d-hint" aria-hidden>
                  <span className="ring" />
                  Drag to explore · tap a zone
                </div>
              )}
            </div>

            <div className="w3d-zones">
              {(Object.keys(ZONES) as ZoneKey[]).map((k) => (
                <button key={k} className={`w3d-zone ${zone === k ? "on" : ""}`} onClick={() => pick(k)}>
                  <i />
                  {ZONES[k].label}
                </button>
              ))}
              {zone && (
                <button className="w3d-zone" onClick={() => pick(null)}>
                  ← Overview
                </button>
              )}
            </div>

            <div className={`w3d-card ${zone ? "show" : ""}`} aria-live="polite">
              {zone && (
                <>
                  <div className="k">What we supply here</div>
                  <h3>{ZONES[zone].label}</h3>
                  <ul>
                    {ZONES[zone].items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-gold mt-5 w-full">
                    Get a quote for this site →
                  </Link>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

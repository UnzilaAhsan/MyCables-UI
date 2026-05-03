import type { RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type HeroWireBackgroundProps = {
  /** A ref to the hero section element so we can detect cursor presence without capturing clicks. */
  heroRef: RefObject<HTMLElement | null>;
};

function WireScene({ heroRef }: HeroWireBackgroundProps) {
  const group = useRef<THREE.Group>(null);
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 }); // normalized in hero rect
  const [active, setActive] = useState(false);
  const progress = useRef(0);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const el = heroRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      setActive(inside);
      if (!inside) return;
      const nx = (e.clientX - r.left) / Math.max(1, r.width);
      const ny = (e.clientY - r.top) / Math.max(1, r.height);
      setCursor({ x: nx, y: ny });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [heroRef]);

  const curve = useMemo(() => {
    // A slightly wavy centerline for the cable running across the hero.
    const pts: THREE.Vector3[] = [];
    const length = 9;
    const segments = 22;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = THREE.MathUtils.lerp(-length / 2, length / 2, t);
      const y = Math.sin(t * Math.PI * 2) * 0.25;
      const z = Math.cos(t * Math.PI * 2) * 0.18;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.4);
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 180, 0.05, 16, false), [curve]);
  const coreGeo = useMemo(() => new THREE.TubeGeometry(curve, 180, 0.028, 16, false), [curve]);

  useFrame((state, delta) => {
    // progress eases in when cursor enters hero, out when leaving
    const target = active ? 1 : 0;
    progress.current = THREE.MathUtils.damp(progress.current, target, 6.5, delta);

    const g = group.current;
    if (!g) return;

    // Cursor influences pose subtly
    const cx = (cursor.x - 0.5) * 2; // -1..1
    const cy = (cursor.y - 0.5) * 2;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, cx * 0.35, 7, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -cy * 0.18, 7, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, cy * 0.12, 7, delta);

    // Gentle float
    const t = state.clock.getElapsedTime();
    g.position.x = Math.sin(t * 0.25) * 0.05;
    g.position.z = Math.cos(t * 0.22) * 0.08;
  });

  const p = progress.current;

  // Each layer starts separated; when active it "wraps" into a complete cable.
  const layers = [
    { key: "jacket", color: "#0f172a", emissive: "#111827", offset: new THREE.Vector3(0, 0.35, 0.22), opacity: 0.55 },
    { key: "insulation", color: "#f59e0b", emissive: "#f59e0b", offset: new THREE.Vector3(0, -0.28, 0.18), opacity: 0.45 },
    { key: "shield", color: "#94a3b8", emissive: "#64748b", offset: new THREE.Vector3(0, 0.18, -0.24), opacity: 0.35 },
  ];

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Always-on copper core */}
      <mesh geometry={coreGeo}>
        <meshStandardMaterial
          color="#d97706"
          emissive="#b45309"
          emissiveIntensity={1.2}
          roughness={0.35}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Outer layers that assemble when cursor enters */}
      {layers.map((l, idx) => {
        const ease = THREE.MathUtils.smootherstep(p);
        const off = l.offset.clone().multiplyScalar(1 - ease);
        const layerOpacity = THREE.MathUtils.lerp(0.08, l.opacity, ease);
        const scale = THREE.MathUtils.lerp(0.92, 1, ease);

        return (
          <group key={l.key} position={[off.x, off.y, off.z]} scale={scale}>
            <mesh geometry={tubeGeo}>
              <meshStandardMaterial
                color={l.color}
                emissive={l.emissive}
                emissiveIntensity={idx === 0 ? 0.35 : 0.25}
                roughness={0.65}
                metalness={idx === 2 ? 0.75 : 0.2}
                transparent
                opacity={layerOpacity}
              />
            </mesh>
          </group>
        );
      })}

      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 2, 2]} intensity={1.15} color="#fff7ed" />
      <directionalLight position={[-3, -1, 2]} intensity={0.55} color="#93c5fd" />
    </group>
  );
}

export function HeroWireBackground({ heroRef }: HeroWireBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 3.6], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["transparent"]} />
        <WireScene heroRef={heroRef} />
      </Canvas>

      {/* Soft vignette + contrast to keep text readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/85" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_65%)] bg-black/10" />
    </div>
  );
}


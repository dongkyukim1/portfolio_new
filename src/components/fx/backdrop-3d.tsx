"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import { activity } from "@/data/profile"

/**
 * One fixed WebGL canvas behind every section after the hero. The camera follows the page scroll
 * (100px = 1 world unit) so each section owns a 3D object at its own world position:
 *   metrics → extruded data bars · projects → floating glass panes · stack → torus knot
 *   side → icosahedron · approach → nested rings · timeline → helix · plus a page-long particle field.
 * Pointer adds gentle parallax. Disabled on coarse pointers / reduced motion.
 */

const PX = 100 // px per world unit
const ACCENT = "#2997ff"
const INDIGO = "#5e5ce6"
const VIOLET = "#bf5af2"

type Anchors = Record<string, { y: number; h: number }>

function useAnchors(ids: string[]) {
  const [a, setA] = useState<Anchors>({})
  useEffect(() => {
    const measure = () => {
      const next: Anchors = {}
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        next[id] = { y: r.top + scrollY, h: r.height }
      }
      setA(next)
    }
    measure()
    const t = setTimeout(measure, 800)
    addEventListener("resize", measure)
    return () => {
      clearTimeout(t)
      removeEventListener("resize", measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return a
}

/** camera.y tracks scroll; slight pointer parallax on x/y */
function Rig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  useFrame(({ camera }) => {
    const targetY = -scrollY / PX - 4.5
    camera.position.y += (targetY - camera.position.y) * 0.12
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.05
    camera.rotation.x += (mouse.current.y * 0.03 - camera.rotation.x) * 0.05
  })
  return null
}

function DataBars({ y }: { y: number }) {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = -0.55 + Math.sin(clock.elapsedTime * 0.25) * 0.08
  })
  const bars = activity.bars
  return (
    <group ref={g} position={[6.2, y, -4]} rotation={[0.2, -0.55, 0]}>
      {bars.map((h, i) => {
        const bh = 0.3 + (h / 100) * 3.2
        return (
          <mesh key={i} position={[(i - bars.length / 2) * 0.42, bh / 2 - 1.6, 0]}>
            <boxGeometry args={[0.26, bh, 0.26]} />
            <meshBasicMaterial color={h >= 60 ? ACCENT : INDIGO} wireframe transparent opacity={0.28} />
          </mesh>
        )
      })}
      <gridHelper args={[9, 18, "#1f2a44", "#141a2c"]} position={[0, -1.6, 0]} />
    </group>
  )
}

function Panes({ y }: { y: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        pos: [(i % 2 ? 1 : -1) * (5.2 + (i % 3) * 0.9), y + (i - 3) * 1.6, -5 - (i % 4) * 1.5] as [number, number, number],
        rot: [0.2 * (i % 3), -0.5 + i * 0.18, 0] as [number, number, number],
        s: 1.2 + (i % 3) * 0.35,
        c: i % 3 === 0 ? ACCENT : i % 3 === 1 ? INDIGO : VIOLET,
      })),
    [y],
  )
  return (
    <>
      {items.map((it, i) => (
        <Float key={i} speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh position={it.pos} rotation={it.rot}>
            <planeGeometry args={[it.s * 1.6, it.s]} />
            <meshBasicMaterial color={it.c} transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
          <lineSegments position={it.pos} rotation={it.rot}>
            <edgesGeometry args={[new THREE.PlaneGeometry(it.s * 1.6, it.s)]} />
            <lineBasicMaterial color={it.c} transparent opacity={0.35} />
          </lineSegments>
        </Float>
      ))}
    </>
  )
}

function Knot({ y }: { y: number }) {
  const m = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!m.current) return
    m.current.rotation.x = clock.elapsedTime * 0.12
    m.current.rotation.y = clock.elapsedTime * 0.18
  })
  return (
    <mesh ref={m} position={[-6.5, y, -6]}>
      <torusKnotGeometry args={[1.9, 0.5, 180, 24]} />
      <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.16} />
    </mesh>
  )
}

function Ico({ y }: { y: number }) {
  const m = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (m.current) m.current.rotation.y = clock.elapsedTime * 0.15
  })
  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={m} position={[6.8, y, -5]}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  )
}

function Rings({ y }: { y: number }) {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!g.current) return
    g.current.rotation.x = 0.9 + Math.sin(clock.elapsedTime * 0.2) * 0.15
    g.current.rotation.z = clock.elapsedTime * 0.08
  })
  return (
    <group ref={g} position={[6.4, y, -6]}>
      {[2.6, 3.4, 4.2].map((r, i) => (
        <mesh key={r} rotation={[0, 0, i * 0.6]}>
          <torusGeometry args={[r, 0.02, 8, 120]} />
          <meshBasicMaterial color={i === 1 ? ACCENT : INDIGO} transparent opacity={0.5 - i * 0.12} />
        </mesh>
      ))}
    </group>
  )
}

function Helix({ y, h }: { y: number; h: number }) {
  const pts = useMemo(() => {
    const n = 90
    const span = Math.max(4, h / PX)
    return Array.from({ length: n }, (_, i) => {
      const t = i / n
      const a = t * Math.PI * 6
      return [Math.cos(a) * 1.6, y + span / 2 - t * span, -6 + Math.sin(a) * 1.6] as [number, number, number]
    })
  }, [y, h])
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.25
  })
  return (
    <group ref={g} position={[-6.2, 0, 0]}>
      {pts.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={i % 9 === 0 ? ACCENT : "#5b6b8a"} transparent opacity={i % 9 === 0 ? 0.9 : 0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Dust({ height }: { height: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const n = 700
    const arr = new Float32Array(n * 3)
    const span = Math.max(20, height / PX)
    let seed = 1337 // mulberry32 — deterministic, so the memo stays pure
    const rnd = () => {
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (rnd() - 0.5) * 28
      arr[i * 3 + 1] = -rnd() * span
      arr[i * 3 + 2] = -2 - rnd() * 12
    }
    return arr
  }, [height])
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.05) * 0.02
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8fb8ff" size={0.045} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
    </points>
  )
}

function Scene() {
  const anchors = useAnchors(["metrics", "projects", "stack", "side", "approach", "timeline"])
  const mouse = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / innerHeight - 0.5) * 2
    }
    addEventListener("pointermove", onMove, { passive: true })
    return () => removeEventListener("pointermove", onMove)
  }, [])
  const wy = (id: string) => (anchors[id] ? -(anchors[id].y + anchors[id].h / 2) / PX - 4.5 : -9999)
  const docH = typeof document !== "undefined" ? document.documentElement.scrollHeight : 9000
  return (
    <>
      <Rig mouse={mouse} />
      <Dust height={docH} />
      {anchors.metrics && <DataBars y={wy("metrics")} />}
      {anchors.projects && <Panes y={wy("projects")} />}
      {anchors.stack && <Knot y={wy("stack")} />}
      {anchors.side && <Ico y={wy("side")} />}
      {anchors.approach && <Rings y={wy("approach")} />}
      {anchors.timeline && <Helix y={wy("timeline")} h={anchors.timeline.h} />}
    </>
  )
}

export function Backdrop3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const wide = innerWidth >= 900
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability probe after mount
    setOk(fine && !reduced && wide)
  }, [])
  if (!ok) return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, -4.5, 10], fov: 50, near: 0.1, far: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#04050c", 8, 24]} />
        <Scene />
      </Canvas>
    </div>
  )
}

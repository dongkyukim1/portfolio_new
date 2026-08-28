"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, Lightformer, Edges, MeshDistortMaterial, MeshReflectorMaterial, Sparkles } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette, Noise, SMAA } from "@react-three/postprocessing"
import { easing } from "maath"
import * as THREE from "three"
import { activity } from "@/data/profile"

/**
 * One fixed WebGL scene behind every section after the hero.
 * The camera follows page scroll (100px = 1 world unit); each section pins a lit, physically-shaded
 * object to its own on-screen position every frame (robust to late layout shifts):
 *   metrics  → emissive 3D bar chart on a mirror floor
 *   projects → floating glass slabs (transmission) with glowing edges
 *   stack    → chrome torus knot with a vertex-distortion shader
 *   side     → faceted metallic icosahedron with a glowing core
 *   approach → nested emissive rings (gyroscope)
 *   timeline → DNA helix
 * A procedural environment (Lightformers) drives reflections; Bloom + Vignette + film grain finish it.
 * Desktop / fine-pointer only, reduced-motion aware.
 */

const PX = 100
const ACCENT = "#2997ff"
const INDIGO = "#5e5ce6"
const VIOLET = "#bf5af2"
const CYAN = "#64d2ff"

/* ───────────────────────── rig + anchoring ───────────────────────── */

const scrollState = { y: 0, v: 0, sv: 0 }

/** Camera follows scroll with critically-damped easing, breathes a little when idle, leans with the pointer. */
function Rig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  useFrame(({ camera, clock }, dt) => {
    const t = clock.elapsedTime
    scrollState.v = scrollY - scrollState.y
    scrollState.y = scrollY
    scrollState.sv += (scrollState.v - scrollState.sv) * Math.min(1, dt * 6) // smoothed velocity (px/frame)
    const targetY = -scrollY / PX - 4.5 + Math.sin(t * 0.35) * 0.08
    easing.damp(camera.position, "y", targetY, 0.22, dt)
    easing.damp(camera.position, "x", mouse.current.x * 0.9 + Math.sin(t * 0.21) * 0.15, 0.6, dt)
    easing.damp(camera.rotation, "x", mouse.current.y * 0.035, 0.6, dt)
    easing.damp(camera.rotation, "y", -mouse.current.x * 0.03, 0.6, dt)
  })
  return null
}

/**
 * Pins children to a DOM section with damped motion, and scales them by proximity to the viewport
 * centre so objects breathe in as their section approaches and recede as it leaves — no popping.
 */
function SectionAnchor({ id, x = 0, z = -5, children }: { id: string; x?: number; z?: number; children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null)
  const el = useRef<HTMLElement | null>(null)
  const target = useMemo(() => new THREE.Vector3(x, 0, z), [x, z])
  useFrame(({ camera }, dt) => {
    if (!el.current) el.current = document.getElementById(id)
    const node = el.current
    if (!node || !g.current) return
    const r = node.getBoundingClientRect()
    const centreOffsetPx = r.top + r.height / 2 - innerHeight / 2
    target.set(x, camera.position.y - centreOffsetPx / PX, z)
    easing.damp3(g.current.position, target, 0.18, dt)
    // 1.0 at the section centre → 0.55 one viewport away; eased so the change is invisible frame-to-frame
    const d = Math.min(1, Math.abs(centreOffsetPx) / (innerHeight * 1.1))
    const k = 1 - d * d * 0.45
    easing.damp3(g.current.scale, [k, k, k], 0.35, dt)
    g.current.visible = r.bottom > -innerHeight * 1.5 && r.top < innerHeight * 2.5
  })
  return <group ref={g}>{children}</group>
}

/* ───────────────────────── atmosphere ───────────────────────── */

/** Slow aurora: simplex-noise gradient on a far plane, drifting with time and scroll. Continuous across sections. */
const AURORA_VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
const AURORA_FRAG = `
precision highp float;
varying vec2 vUv; uniform float uTime; uniform float uScroll;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;} vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx); vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i); vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0); m=m*m; m=m*m;
vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5); vec3 a0=x-ox;
m*=1.79284291400159-0.85373472095314*(a0*a0+h*h); vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw; return 130.0*dot(m,g);}
void main(){
  vec2 p = vUv * vec2(3.0, 6.0) + vec2(0.0, uScroll * 0.35);
  float t = uTime * 0.05;
  float n1 = snoise(p * 0.8 + vec2(t, -t * 0.7));
  float n2 = snoise(p * 1.7 - vec2(t * 0.6, t * 0.4) + n1 * 0.6);
  float band = smoothstep(0.15, 0.95, n1 * 0.6 + n2 * 0.4 + 0.35);
  vec3 blue = vec3(0.16, 0.59, 1.0); vec3 violet = vec3(0.75, 0.35, 0.95); vec3 cyan = vec3(0.39, 0.82, 1.0);
  vec3 col = mix(blue, violet, smoothstep(-0.4, 0.6, n2));
  col = mix(col, cyan, smoothstep(0.5, 1.0, n1));
  float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
  gl_FragColor = vec4(col * band * 0.07 * edge, band * 0.5 * edge);
}`

function Aurora({ span }: { span: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uScroll: { value: 0 } }), [])
  useFrame(({ clock }) => {
    if (!mat.current) return
    mat.current.uniforms.uTime.value = clock.elapsedTime
    mat.current.uniforms.uScroll.value = scrollState.y / (PX * 40)
  })
  return (
    <mesh position={[0, -span / 2, -22]}>
      <planeGeometry args={[70, span + 40]} />
      <shaderMaterial ref={mat} vertexShader={AURORA_VERT} fragmentShader={AURORA_FRAG} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

/** Two glowing ribbons weaving down the whole page — the through-line that ties the sections together. */
function Ribbons({ span }: { span: number }) {
  const g = useRef<THREE.Group>(null)
  const geos = useMemo(() => {
    const make = (phase: number, radius: number) => {
      const pts: THREE.Vector3[] = []
      const n = 60
      for (let i = 0; i <= n; i++) {
        const t = i / n
        const a = t * Math.PI * 4 + phase
        pts.push(new THREE.Vector3(Math.cos(a) * radius + Math.sin(t * 9 + phase) * 1.2, -t * span, -8 + Math.sin(a) * 2.5))
      }
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, 0.035, 8, false)
    }
    return [make(0, 9), make(Math.PI, 11)]
  }, [span])
  useFrame(({ clock }, dt) => {
    if (!g.current) return
    easing.damp(g.current.rotation, "y", Math.sin(clock.elapsedTime * 0.08) * 0.25 + scrollState.sv * 0.0015, 0.8, dt)
  })
  return (
    <group ref={g}>
      <mesh geometry={geos[0]}>
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={2.2} metalness={0.6} roughness={0.3} transparent opacity={0.85} />
      </mesh>
      <mesh geometry={geos[1]}>
        <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={1.8} metalness={0.6} roughness={0.3} transparent opacity={0.75} />
      </mesh>
    </group>
  )
}

/* ───────────────────────── objects ───────────────────────── */

/** 3D bar chart of monthly commits on a mirror floor; bars grow in, tall ones glow. */
function DataBars() {
  const g = useRef<THREE.Group>(null)
  const bars = activity.bars
  const heights = useRef<number[]>(bars.map(() => 0.05))
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = -0.6 + Math.sin(clock.elapsedTime * 0.12) * 0.12 + scrollState.sv * 0.0025
    bars.forEach((h, i) => {
      const target = 0.25 + (h / 100) * 3.4
      heights.current[i] += (target - heights.current[i]) * 0.035
      const m = meshes.current[i]
      if (m) {
        m.scale.y = heights.current[i]
        m.position.y = heights.current[i] / 2 - 1.7
      }
    })
  })
  return (
    <group ref={g} rotation={[0.18, -0.6, 0]}>
      {bars.map((h, i) => (
        <mesh
          key={i}
          ref={(m) => {
            meshes.current[i] = m
          }}
          position={[(i - bars.length / 2) * 0.48, 0, 0]}
        >
          <boxGeometry args={[0.32, 1, 0.32]} />
          <meshStandardMaterial
            color={h >= 60 ? ACCENT : "#1a2340"}
            metalness={0.55}
            roughness={0.25}
            emissive={h >= 60 ? ACCENT : INDIGO}
            emissiveIntensity={h >= 60 ? 1.6 : 0.25}
          />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
        <planeGeometry args={[14, 8]} />
        <MeshReflectorMaterial blur={[400, 120]} resolution={512} mixBlur={1} mixStrength={18} depthScale={1.2} minDepthThreshold={0.85} color="#070912" metalness={0.6} roughness={0.9} mirror={0.55} />
      </mesh>
      <gridHelper args={[14, 28, "#1d2b4d", "#0f1526"]} position={[0, -1.69, 0]} />
    </group>
  )
}

/** Floating glass slabs with glowing edges — the "cards" of the projects section in 3D. */
function GlassSlabs() {
  const items = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        pos: [(i % 2 ? 1 : -1) * (5.4 + (i % 3) * 0.8), (i - 3.5) * 1.5, -(i % 4) * 1.4] as [number, number, number],
        rot: [0.25 * ((i % 3) - 1), -0.5 + i * 0.2, 0.1 * (i % 2)] as [number, number, number],
        s: 1.3 + (i % 3) * 0.35,
        c: [ACCENT, INDIGO, VIOLET, CYAN][i % 4],
        geo: new THREE.BoxGeometry((1.3 + (i % 3) * 0.35) * 1.6, 1.3 + (i % 3) * 0.35, 0.08),
      })),
    [],
  )
  return (
    <>
      {items.map((it, i) => (
        <Float key={i} speed={0.7} rotationIntensity={0.35} floatIntensity={0.9}>
          <mesh position={it.pos} rotation={it.rot} geometry={it.geo}>
            <meshPhysicalMaterial color={it.c} transmission={0.92} thickness={0.6} roughness={0.12} ior={1.45} metalness={0.05} transparent opacity={0.95} envMapIntensity={1.4} />
            <Edges geometry={it.geo} color={it.c} threshold={15} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

/** Chrome torus knot with a distortion shader — reflections come from the procedural environment. */
function ChromeKnot() {
  const m = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!m.current) return
    m.current.rotation.x = clock.elapsedTime * 0.08
    m.current.rotation.y = clock.elapsedTime * 0.12 + scrollState.sv * 0.004
  })
  return (
    <Float speed={0.5} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={m}>
        <torusKnotGeometry args={[2.1, 0.62, 220, 32]} />
        <MeshDistortMaterial color="#9db9ff" metalness={1} roughness={0.12} distort={0.28} speed={1.6} envMapIntensity={1.8} emissive={ACCENT} emissiveIntensity={0.08} />
      </mesh>
    </Float>
  )
}

/** Faceted metallic icosahedron with an inner glowing core. */
function MetalIco() {
  const m = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => new THREE.IcosahedronGeometry(2.4, 0), [])
  useFrame(({ clock }) => {
    if (!m.current) return
    m.current.rotation.y = clock.elapsedTime * 0.11 + scrollState.sv * 0.003
    m.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.35
  })
  return (
    <Float speed={0.6} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={m} geometry={geo}>
        <meshStandardMaterial color="#2a1a44" metalness={0.95} roughness={0.2} flatShading envMapIntensity={1.6} />
        <Edges geometry={geo} color={VIOLET} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={2.4} roughness={1} />
      </mesh>
      <pointLight color={VIOLET} intensity={30} distance={10} />
    </Float>
  )
}

/** Nested emissive rings, gyroscope-like. */
function Gyro() {
  const a = useRef<THREE.Group>(null)
  const b = useRef<THREE.Group>(null)
  const c = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const s = scrollState.sv * 0.002
    if (a.current) a.current.rotation.set(t * 0.18 + s, t * 0.11, 0)
    if (b.current) b.current.rotation.set(-t * 0.13, 0, t * 0.16 + s)
    if (c.current) c.current.rotation.set(0, t * 0.2 + s, -t * 0.08)
  })
  const ring = (r: number, color: string, glow: number) => (
    <mesh>
      <torusGeometry args={[r, 0.06, 16, 160]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={glow} metalness={0.8} roughness={0.25} />
    </mesh>
  )
  return (
    <group>
      <group ref={a}>{ring(2.6, ACCENT, 1.8)}</group>
      <group ref={b}>{ring(3.3, INDIGO, 1.2)}</group>
      <group ref={c}>{ring(4.0, CYAN, 0.9)}</group>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive={ACCENT} emissiveIntensity={3} />
      </mesh>
      <pointLight color={ACCENT} intensity={40} distance={12} />
    </group>
  )
}

/** DNA helix: two emissive strands joined by rungs. */
function Helix() {
  const g = useRef<THREE.Group>(null)
  const parts = useMemo(() => {
    const n = 44
    const span = 10
    const out: { a: [number, number, number]; b: [number, number, number]; i: number }[] = []
    for (let i = 0; i < n; i++) {
      const t = i / n
      const ang = t * Math.PI * 5
      const y = span / 2 - t * span
      out.push({ a: [Math.cos(ang) * 1.5, y, Math.sin(ang) * 1.5], b: [-Math.cos(ang) * 1.5, y, -Math.sin(ang) * 1.5], i })
    }
    return out
  }, [])
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.16 + scrollState.sv * 0.004
  })
  return (
    <group ref={g}>
      {parts.map(({ a, b, i }) => {
        const mid: [number, number, number] = [(a[0] + b[0]) / 2, a[1], (a[2] + b[2]) / 2]
        const len = Math.hypot(a[0] - b[0], a[2] - b[2])
        const rotY = Math.atan2(b[2] - a[2], b[0] - a[0])
        return (
          <group key={i}>
            <mesh position={a}>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.5} />
            </mesh>
            <mesh position={b}>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={1.5} />
            </mesh>
            {i % 2 === 0 && (
              <mesh position={mid} rotation={[0, -rotY, Math.PI / 2]}>
                <cylinderGeometry args={[0.025, 0.025, len, 8]} />
                <meshStandardMaterial color="#8fa3d9" metalness={0.8} roughness={0.3} emissive="#3b4f8a" emissiveIntensity={0.5} />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

/* ───────────────────────── scene ───────────────────────── */

function Scene({ docH }: { docH: number }) {
  const mouse = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / innerHeight - 0.5) * 2
    }
    addEventListener("pointermove", onMove, { passive: true })
    return () => removeEventListener("pointermove", onMove)
  }, [])
  const span = Math.max(30, docH / PX)
  return (
    <>
      <Rig mouse={mouse} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 6]} intensity={1.2} color="#dfe8ff" />
      <pointLight position={[-8, 2, 4]} intensity={60} color={INDIGO} distance={30} />
      <pointLight position={[8, -6, 4]} intensity={50} color={ACCENT} distance={30} />

      {/* procedural HDR-like environment: no network, drives every reflection */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={6} color={ACCENT} position={[6, 4, -8]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={4} color={VIOLET} position={[-8, -2, -6]} scale={[6, 2, 1]} rotation={[0, 0.6, 0]} />
        <Lightformer form="ring" intensity={5} color="#ffffff" position={[0, 8, -4]} scale={4} />
        <Lightformer form="rect" intensity={1.5} color="#0b1020" position={[0, -8, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[20, 20, 1]} />
      </Environment>

      <Aurora span={span} />
      <Ribbons span={span} />

      {/* page-long drifting particles */}
      <group position={[0, -span / 2, -6]}>
        <Sparkles count={900} scale={[34, span, 14]} size={2.2} speed={0.2} opacity={0.5} color="#9cc4ff" />
      </group>

      <SectionAnchor id="metrics" x={6.4} z={-4}>
        <DataBars />
      </SectionAnchor>
      <SectionAnchor id="projects" x={0} z={-5}>
        <GlassSlabs />
      </SectionAnchor>
      <SectionAnchor id="stack" x={-6.6} z={-6}>
        <ChromeKnot />
      </SectionAnchor>
      <SectionAnchor id="side" x={6.8} z={-5}>
        <MetalIco />
      </SectionAnchor>
      <SectionAnchor id="approach" x={6.6} z={-6}>
        <Gyro />
      </SectionAnchor>
      <SectionAnchor id="timeline" x={-6.4} z={-6}>
        <Helix />
      </SectionAnchor>

      <EffectComposer multisampling={0}>
        <SMAA />
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.35} intensity={1.15} mipmapBlur radius={0.8} />
        <Vignette eskil={false} offset={0.35} darkness={0.45} />
        <Noise opacity={0.04} />
      </EffectComposer>
    </>
  )
}

export function Backdrop3D() {
  const [ok, setOk] = useState(false)
  const [docH, setDocH] = useState(9000)
  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const wide = innerWidth >= 900
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability probe after mount
    setOk(fine && !reduced && wide)
    const t = setTimeout(() => setDocH(document.documentElement.scrollHeight), 1500)
    return () => clearTimeout(t)
  }, [])
  if (!ok) return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, -4.5, 10], fov: 50, near: 0.1, far: 80 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#04050c"]} />
        <fog attach="fog" args={["#04050c", 10, 30]} />
        <Scene docH={docH} />
      </Canvas>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import gsap from "gsap"

/**
 * Page-long backdrop behind every section after the hero, in the "Diet Soda" design language:
 * fixed radial gradient (teal → blue past #approach), rising bubbles, and floating glass tiles that carry
 * the tech stack — mouse parallax, pointer repulsion, gentle float. Crossing the flavor boundary runs the
 * soda choreography: gradient morph + tiles implode → icon set swaps (product ↔ platform) → explode out.
 */

const BUBBLE_PNG = "/soda/bubble.png"
const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}/ffffff`

type Flavor = "classic" | "blue"
const THEME: Record<Flavor, { inner: string; mid: string; outer: string }> = {
  classic: { inner: "#0b8a78", mid: "#044e3b", outer: "#011411" },
  blue: { inner: "#0b4f8a", mid: "#04294e", outer: "#010c14" },
}
/** Section whose approach flips the flavor (product stack above, platform stack below). */
const FLAVOR_BOUNDARY_ID = "approach"

/** Tile slots: position + size. `icons` = [classic, blue] slugs. */
type Slot = { style: CSSProperties; size: number; icons: [string, string]; label: [string, string] }
/** Behind the content column (dimmed through the glass). */
const SLOTS_BG: Slot[] = [
  { style: { top: "14%", left: "40%" }, size: 56, icons: ["vite", "grpc"], label: ["Vite", "gRPC"] },
  { style: { top: "52%", left: "56%" }, size: 48, icons: ["tailwindcss", "redis"], label: ["Tailwind", "Redis"] },
  { style: { top: "80%", left: "34%" }, size: 52, icons: ["figma", "sentry"], label: ["Figma", "Sentry"] },
]
/** Above the content — pinned to the side gutters so the resume stays readable. */
const SLOTS_FG: Slot[] = [
  { style: { top: "18%", left: "3%" }, size: 96, icons: ["nextdotjs", "kubernetes"], label: ["Next.js", "Kubernetes"] },
  { style: { top: "58%", left: "10%" }, size: 64, icons: ["typescript", "go"], label: ["TypeScript", "Go"] },
  { style: { top: "24%", right: "3%" }, size: 104, icons: ["react", "springboot"], label: ["React", "Spring Boot"] },
  { style: { top: "6%", right: "19%" }, size: 72, icons: ["flutter", "django"], label: ["Flutter", "Django"] },
  { style: { top: "80%", left: "5%" }, size: 72, icons: ["vercel", "docker"], label: ["Vercel", "Docker"] },
  { style: { top: "62%", right: "9%" }, size: 84, icons: ["expo", "postgresql"], label: ["Expo", "PostgreSQL"] },
]

const FLOAT_DUR = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10]

export function SodaBackdrop() {
  const [fx, setFx] = useState(false)
  const bgRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<HTMLDivElement>(null)
  const tilesBgRef = useRef<HTMLDivElement>(null)
  const tilesFgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability probe after mount
    setFx(fine && !reduced && innerWidth >= 900)
  }, [])

  // Bubbles — always on (cheap PNGs).
  useEffect(() => {
    const container = bubblesRef.current
    if (!container) return
    const timers = new Set<ReturnType<typeof setTimeout>>()
    function createBubble() {
      if (!container) return
      const bubble = document.createElement("img")
      bubble.src = BUBBLE_PNG
      bubble.alt = ""
      bubble.className = "soda-bubble"
      bubble.style.width = Math.random() * 20 + 10 + "px"
      bubble.style.height = "auto"
      bubble.style.left = Math.random() * 100 + "%"
      bubble.style.bottom = "-50px"
      bubble.style.opacity = String(Math.random() * 0.4 + 0.2)
      const duration = Math.random() * 6 + 4
      bubble.style.animation = `soda-float-up ${duration}s linear forwards`
      container.appendChild(bubble)
      const t = setTimeout(() => {
        bubble.remove()
        timers.delete(t)
      }, duration * 1000)
      timers.add(t)
    }
    const iv = setInterval(createBubble, 400)
    return () => {
      clearInterval(iv)
      timers.forEach(clearTimeout)
      container.replaceChildren()
    }
  }, [])

  // Tiles: parallax, repulsion, float, scroll-driven flavor switch.
  useEffect(() => {
    const bg = bgRef.current
    const tilesBG = tilesBgRef.current
    const tilesFG = tilesFgRef.current
    if (!bg) return

    let current: Flavor = "classic"
    let isSwitching = false
    let raf = 0
    const mouse = { x: 0, y: 0, px: -9999, py: -9999 }
    const currentMouse = { x: 0, y: 0 }
    const tiles = fx ? Array.from(document.querySelectorAll<HTMLElement>(".soda-tile")) : []

    tiles.forEach((t) => {
      t.dataset.rx = "0"
      t.dataset.ry = "0"
      t.dataset.angle = String((Math.random() - 0.5) * 24)
      t.dataset.baseX = "0"
      t.dataset.baseY = "0"
    })

    function desiredFlavor(): Flavor {
      const el = document.getElementById(FLAVOR_BOUNDARY_ID)
      if (!el) return "classic"
      return el.getBoundingClientRect().top < innerHeight * 0.6 ? "blue" : "classic"
    }
    function setTheme(flavor: Flavor) {
      const t = THEME[flavor]
      bg!.style.setProperty("--bg-inner", t.inner)
      bg!.style.setProperty("--bg-mid", t.mid)
      bg!.style.setProperty("--bg-outer", t.outer)
    }
    function applyIcon(tile: HTMLElement, flavor: Flavor) {
      const img = tile.querySelector("img")
      const lbl = tile.querySelector<HTMLElement>(".soda-tile__label")
      const i = flavor === "blue" ? 1 : 0
      if (img) img.src = icon(tile.dataset[`icon${i}`] ?? "")
      if (lbl) lbl.textContent = tile.dataset[`label${i}`] ?? ""
    }

    // First paint: match the scroll position without choreography (deep links).
    current = desiredFlavor()
    setTheme(current)
    tiles.forEach((t) => applyIcon(t, current))

    function switchFlavor(flavor: Flavor) {
      if (isSwitching) return
      isSwitching = true
      current = flavor
      const t = THEME[flavor]
      gsap.to(bg!, { "--bg-inner": t.inner, "--bg-mid": t.mid, "--bg-outer": t.outer, duration: 1.5, ease: "power2.inOut" })
      if (tiles.length === 0) {
        isSwitching = false
        return
      }
      let completed = 0
      tiles.forEach((tile) => {
        const bW = tile.offsetWidth / 2
        const bH = tile.offsetHeight / 2
        const centerX = window.innerWidth / 2 - tile.offsetLeft - bW
        const centerY = window.innerHeight / 2 - tile.offsetTop - bH
        const startAngle = parseFloat(tile.dataset.angle ?? "0") || 0
        const currentBaseX = parseFloat(tile.dataset.baseX ?? "0") || 0
        const currentBaseY = parseFloat(tile.dataset.baseY ?? "0") || 0
        const nextBaseX = (Math.random() - 0.5) * 200
        const nextBaseY = (Math.random() - 0.5) * 200

        gsap.set(tile, { rotation: startAngle, x: currentBaseX, y: currentBaseY })
        gsap
          .timeline()
          .to(tile, {
            x: centerX,
            y: centerY,
            rotation: startAngle + 45,
            scale: 0.1,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => applyIcon(tile, flavor),
          })
          .to(tile, { duration: 0.3 })
          .to(tile, {
            x: nextBaseX,
            y: nextBaseY,
            rotation: startAngle + 90,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.5)",
            onComplete: () => {
              tile.dataset.angle = String(startAngle + 90)
              tile.dataset.baseX = String(nextBaseX)
              tile.dataset.baseY = String(nextBaseY)
              tile.dataset.rx = "0"
              tile.dataset.ry = "0"
              completed++
              if (completed === tiles.length) isSwitching = false
            },
          })
      })
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5
      mouse.px = e.clientX
      mouse.py = e.clientY
    }
    window.addEventListener("mousemove", onMove, { passive: true })

    function animate() {
      const time = Date.now() * 0.001
      currentMouse.x += (mouse.x - currentMouse.x) * 0.05
      currentMouse.y += (mouse.y - currentMouse.y) * 0.05

      const want = desiredFlavor()
      if (want !== current && !isSwitching) switchFlavor(want)

      if (tilesFG) tilesFG.style.transform = `translate(${currentMouse.x * 60}px, ${currentMouse.y * 60}px)`
      if (tilesBG) tilesBG.style.transform = `translate(${currentMouse.x * -30}px, ${currentMouse.y * -30}px)`

      if (!isSwitching) {
        tiles.forEach((tile, i) => {
          const r = tile.getBoundingClientRect()
          const diffX = mouse.px - (r.left + r.width / 2)
          const diffY = mouse.py - (r.top + r.height / 2)
          const distance = Math.sqrt(diffX * diffX + diffY * diffY)
          let targetRx = 0
          let targetRy = 0
          let speedMult = 1
          if (distance < 400) {
            const force = (400 - distance) / 400
            targetRx = (diffX / distance) * force * -80
            targetRy = (diffY / distance) * force * -80
            speedMult = 1 + force * 5
          }
          let rx = parseFloat(tile.dataset.rx ?? "0") || 0
          let ry = parseFloat(tile.dataset.ry ?? "0") || 0
          let angle = parseFloat(tile.dataset.angle ?? "0") || 0
          const baseX = parseFloat(tile.dataset.baseX ?? "0") || 0
          const baseY = parseFloat(tile.dataset.baseY ?? "0") || 0
          rx += (targetRx - rx) * 0.1
          ry += (targetRy - ry) * 0.1
          // tiles keep an upright-ish attitude: spin only while being pushed
          angle += 0.2 * (speedMult - 1)
          tile.dataset.rx = String(rx)
          tile.dataset.ry = String(ry)
          tile.dataset.angle = String(angle)
          const dur = FLOAT_DUR[i % FLOAT_DUR.length]
          const phase = (time + i * 0.7) * ((Math.PI * 2) / dur)
          const floatY = Math.sin(phase) * 15
          const floatAngle = Math.cos(phase) * 6
          // 3D attitude follows the cursor like the soda can
          const tiltX = -currentMouse.y * 18
          const tiltY = currentMouse.x * 24
          tile.style.transform = `translate(${rx + baseX}px, ${ry + baseY + floatY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotate(${angle + floatAngle}deg)`
        })
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      gsap.killTweensOf([bg, ...tiles])
    }
  }, [fx])

  const tile = (s: Slot, key: string, dim?: boolean) => (
    <div
      key={key}
      className={dim ? "soda-tile soda-tile--dim" : "soda-tile"}
      style={{ ...s.style, width: s.size, height: s.size }}
      data-icon0={s.icons[0]}
      data-icon1={s.icons[1]}
      data-label0={s.label[0]}
      data-label1={s.label[1]}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- remote SVG mark swapped at runtime */}
      <img src={icon(s.icons[0])} alt="" width={s.size} height={s.size} draggable={false} />
      <span className="soda-tile__label">{s.label[0]}</span>
    </div>
  )

  return (
    <>
      {/* ground: gradient + bubbles + far tiles (behind the content column) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div ref={bgRef} className="soda-bg absolute inset-0" />
        <div ref={bubblesRef} className="absolute inset-0 overflow-hidden" />
        {fx && (
          <div ref={tilesBgRef} className="soda-parallax absolute inset-0">
            {SLOTS_BG.map((s, i) => tile(s, `bg-${i}`, true))}
          </div>
        )}
      </div>
      {/* near tiles: above the content, pinned to the side gutters */}
      {fx && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[15] overflow-hidden [perspective:1200px]">
          <div ref={tilesFgRef} className="soda-parallax absolute inset-0 [transform-style:preserve-3d]">
            {SLOTS_FG.map((s, i) => tile(s, `fg-${i}`))}
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Script from "next/script"
import gsap from "gsap"

/**
 * "Diet Soda" scene as the page-long backdrop behind every section after the hero.
 * Fixed radial gradient (teal → blue past #approach), rising PNG bubbles, floating 3D leaves/berries
 * (Google <model-viewer>) with mouse parallax and pointer repulsion. Crossing the flavor boundary runs
 * the soda choreography: background morph + berries implode → cherry↔blueberry swap → explode.
 */

const A = "/soda"
const CHERRY_GLB = `${A}/cherry.glb`
const BLUEBERRY_GLB = `${A}/blueberry.glb`
const LEAVES_GLB = `${A}/leaves.glb`
const BUBBLE_PNG = `${A}/bubble.png`
const MODEL_VIEWER_CDN = "https://unpkg.com/@google/model-viewer@4.0.0/dist/model-viewer.min.js"

type Flavor = "classic" | "blue"
const THEME: Record<Flavor, { inner: string; mid: string; outer: string }> = {
  classic: { inner: "#0b8a78", mid: "#044e3b", outer: "#011411" },
  blue: { inner: "#0b4f8a", mid: "#04294e", outer: "#010c14" },
}
/** Section whose approach flips the flavor (Classic above, Zero Lime below). */
const FLAVOR_BOUNDARY_ID = "approach"

type Item = { style: CSSProperties; orbit: string; exposure: string }
const LEAVES: Item[] = [
  { style: { top: "10%", left: "15%", width: 60, height: 60 }, orbit: "45deg 75deg 105%", exposure: "1.0" },
  { style: { top: "40%", left: "80%", width: 140, height: 140, opacity: 0.4 }, orbit: "-30deg 60deg 105%", exposure: "1.0" },
  { style: { top: "70%", left: "75%", width: 80, height: 80 }, orbit: "120deg 85deg 105%", exposure: "1.0" },
  { style: { top: "85%", left: "20%", width: 120, height: 120, opacity: 0.3 }, orbit: "10deg 45deg 105%", exposure: "1.0" },
]
/** Behind the content column (dimmed through the glass). */
const BERRIES_BG: Item[] = [
  { style: { top: "15%", left: "40%", width: 80, height: 80, opacity: 0.7 }, orbit: "-20deg 110deg 105%", exposure: "1.0" },
  { style: { top: "50%", left: "55%", width: 70, height: 70, opacity: 0.6 }, orbit: "160deg 45deg 105%", exposure: "1.0" },
  { style: { top: "80%", left: "35%", width: 75, height: 75, opacity: 0.7 }, orbit: "45deg 20deg 105%", exposure: "1.0" },
]
/** Above the content — kept to the side gutters so the resume stays readable. */
const BERRIES_FG: Item[] = [
  { style: { top: "20%", left: "2%", width: 220, height: 220 }, orbit: "45deg 120deg 105%", exposure: "1.2" },
  { style: { top: "60%", left: "11%", width: 100, height: 100 }, orbit: "-120deg 45deg 105%", exposure: "1.2" },
  { style: { top: "25%", right: "2%", width: 250, height: 250 }, orbit: "200deg 90deg 105%", exposure: "1.2" },
  { style: { top: "6%", right: "20%", width: 140, height: 140 }, orbit: "10deg 20deg 105%", exposure: "1.2" },
  { style: { top: "82%", left: "5%", width: 120, height: 120 }, orbit: "-45deg 160deg 105%", exposure: "1.2" },
  { style: { top: "62%", right: "9%", width: 180, height: 180 }, orbit: "80deg 75deg 105%", exposure: "1.2" },
]

const FLOAT_DUR = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10]

export function SodaBackdrop() {
  const [fx, setFx] = useState(false)
  const bgRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<HTMLDivElement>(null)
  const leavesRef = useRef<HTMLDivElement>(null)
  const berriesBgRef = useRef<HTMLDivElement>(null)
  const berriesFgRef = useRef<HTMLDivElement>(null)

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
      const size = Math.random() * 20 + 10 + "px"
      bubble.style.width = size
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

  // 3D scene: parallax, repulsion, float, scroll-driven flavor switch.
  useEffect(() => {
    const bg = bgRef.current
    const leavesBG = leavesRef.current
    const berriesBG = berriesBgRef.current
    const berriesFG = berriesFgRef.current
    if (!bg) return

    let current: Flavor = "classic"
    let isSwitching = false
    let raf = 0
    const mouse = { x: 0, y: 0, px: -9999, py: -9999 }
    const currentMouse = { x: 0, y: 0 }
    const allBerries = fx ? Array.from(document.querySelectorAll<HTMLElement>(".soda-berry")) : []
    const leaves = fx ? Array.from(document.querySelectorAll<HTMLElement>(".soda-leaf")) : []

    allBerries.forEach((b) => {
      b.dataset.rx = "0"
      b.dataset.ry = "0"
      b.dataset.angle = String(Math.random() * 360)
      b.dataset.baseX = "0"
      b.dataset.baseY = "0"
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

    // First paint: match the scroll position without choreography (deep links).
    current = desiredFlavor()
    setTheme(current)
    allBerries.forEach((b) => b.setAttribute("src", current === "blue" ? BLUEBERRY_GLB : CHERRY_GLB))

    function switchFlavor(flavor: Flavor) {
      if (isSwitching) return
      isSwitching = true
      current = flavor
      const t = THEME[flavor]

      // 1. Background morph
      gsap.to(bg!, { "--bg-inner": t.inner, "--bg-mid": t.mid, "--bg-outer": t.outer, duration: 1.5, ease: "power2.inOut" })

      if (allBerries.length === 0) {
        isSwitching = false
        return
      }

      // 2. Berries "hide & reveal" with dynamic positioning
      let completed = 0
      allBerries.forEach((berry) => {
        const bW = berry.offsetWidth / 2
        const bH = berry.offsetHeight / 2
        const centerX = window.innerWidth / 2 - berry.offsetLeft - bW
        const centerY = window.innerHeight / 2 - berry.offsetTop - bH
        const startAngle = parseFloat(berry.dataset.angle ?? "0") || 0
        const currentBaseX = parseFloat(berry.dataset.baseX ?? "0") || 0
        const currentBaseY = parseFloat(berry.dataset.baseY ?? "0") || 0
        const nextBaseX = (Math.random() - 0.5) * 200
        const nextBaseY = (Math.random() - 0.5) * 200

        gsap.set(berry, { rotation: startAngle, x: currentBaseX, y: currentBaseY })
        gsap
          .timeline()
          .to(berry, {
            x: centerX,
            y: centerY,
            rotation: startAngle + 45,
            scale: 0.1,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => berry.setAttribute("src", flavor === "blue" ? BLUEBERRY_GLB : CHERRY_GLB),
          })
          .to(berry, { duration: 0.3 })
          .to(berry, {
            x: nextBaseX,
            y: nextBaseY,
            rotation: startAngle + 90,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.5)",
            onComplete: () => {
              berry.dataset.angle = String(startAngle + 90)
              berry.dataset.baseX = String(nextBaseX)
              berry.dataset.baseY = String(nextBaseY)
              berry.dataset.rx = "0"
              berry.dataset.ry = "0"
              completed++
              if (completed === allBerries.length) isSwitching = false
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

      if (berriesFG) berriesFG.style.transform = `translate(${currentMouse.x * 60}px, ${currentMouse.y * 60}px)`
      if (berriesBG) berriesBG.style.transform = `translate(${currentMouse.x * -30}px, ${currentMouse.y * -30}px)`
      if (leavesBG) leavesBG.style.transform = `translate(${currentMouse.x * -15}px, ${currentMouse.y * -15}px)`

      if (!isSwitching) {
        allBerries.forEach((berry, i) => {
          const r = berry.getBoundingClientRect()
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
          let rx = parseFloat(berry.dataset.rx ?? "0") || 0
          let ry = parseFloat(berry.dataset.ry ?? "0") || 0
          let angle = parseFloat(berry.dataset.angle ?? "0") || 0
          const baseX = parseFloat(berry.dataset.baseX ?? "0") || 0
          const baseY = parseFloat(berry.dataset.baseY ?? "0") || 0
          rx += (targetRx - rx) * 0.1
          ry += (targetRy - ry) * 0.1
          angle += 0.2 * speedMult
          berry.dataset.rx = String(rx)
          berry.dataset.ry = String(ry)
          berry.dataset.angle = String(angle)
          const dur = FLOAT_DUR[i % FLOAT_DUR.length]
          const phase = (time + i * 0.7) * ((Math.PI * 2) / dur)
          const floatY = Math.sin(phase) * 15
          const floatAngle = Math.cos(phase) * 6
          berry.style.transform = `translate(${rx + baseX}px, ${ry + baseY + floatY}px) rotate(${angle + floatAngle}deg)`
        })
      }

      leaves.forEach((leaf, i) => {
        const dur = 10 + i * 2
        const phase = (time + i * 1.2) * ((Math.PI * 2) / dur)
        const floatY = Math.sin(phase) * 20
        const floatX = Math.cos(phase * 0.5) * 15
        const floatAngle = Math.sin(phase * 0.3) * 15
        leaf.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${floatAngle}deg)`
      })

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      gsap.killTweensOf([bg, ...allBerries])
    }
  }, [fx])

  const mv = (item: Item, cls: string, src: string, key: string) => (
    <model-viewer
      key={key}
      className={cls}
      style={item.style}
      src={src}
      environment-image="neutral"
      exposure={item.exposure}
      interaction-prompt="none"
      camera-orbit={item.orbit}
    />
  )

  return (
    <>
      {fx && <Script id="model-viewer" type="module" src={MODEL_VIEWER_CDN} strategy="afterInteractive" />}

      {/* ground: gradient + bubbles + far layers (behind the content column) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div ref={bgRef} className="soda-bg absolute inset-0" />
        <div ref={bubblesRef} className="absolute inset-0 overflow-hidden" />
        {fx && (
          <>
            <div ref={leavesRef} className="soda-parallax absolute inset-0">
              {LEAVES.map((l, i) => mv(l, "soda-leaf", LEAVES_GLB, `leaf-${i}`))}
            </div>
            <div ref={berriesBgRef} className="soda-parallax absolute inset-0">
              {BERRIES_BG.map((b, i) => mv(b, "soda-berry", CHERRY_GLB, `bg-${i}`))}
            </div>
          </>
        )}
      </div>

      {/* foreground berries: above the content, pinned to the side gutters */}
      {fx && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[15] overflow-hidden">
          <div ref={berriesFgRef} className="soda-parallax absolute inset-0">
            {BERRIES_FG.map((b, i) => mv(b, "soda-berry", CHERRY_GLB, `fg-${i}`))}
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

/**
 * Page-long backdrop behind every section after the hero: one deep-navy radial ground that continues the
 * hero, and a few extruded glass tiles carrying the core stack. Tiles float, tilt toward the cursor
 * (soda-can style), drift with mouse parallax and are gently repelled by the pointer.
 */

const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}/ffffff`

type Slot = { style: CSSProperties; size: number; slug: string; name: string }
/** Pinned to the side gutters so the resume column stays clean. */
const SLOTS: Slot[] = [
  { style: { top: "16%", left: "4%" }, size: 96, slug: "nextdotjs", name: "Next.js" },
  { style: { top: "56%", left: "9%" }, size: 68, slug: "typescript", name: "TypeScript" },
  { style: { top: "22%", right: "4%" }, size: 104, slug: "react", name: "React" },
  { style: { top: "8%", right: "17%" }, size: 72, slug: "flutter", name: "Flutter" },
  { style: { top: "80%", left: "5%" }, size: 76, slug: "kubernetes", name: "Kubernetes" },
  { style: { top: "62%", right: "9%" }, size: 84, slug: "springboot", name: "Spring Boot" },
]

const FLOAT_DUR = [5, 7, 6, 8, 5.5, 6.5]

export function SodaBackdrop() {
  const [fx, setFx] = useState(false)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability probe after mount
    setFx(fine && !reduced && innerWidth >= 900)
  }, [])

  useEffect(() => {
    const layer = layerRef.current
    if (!fx || !layer) return

    let raf = 0
    const mouse = { x: 0, y: 0, px: -9999, py: -9999 }
    const currentMouse = { x: 0, y: 0 }
    const tiles = Array.from(layer.querySelectorAll<HTMLElement>(".soda-tile"))
    const state = tiles.map(() => ({ rx: 0, ry: 0, angle: (Math.random() - 0.5) * 16 }))

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
      layer!.style.transform = `translate(${currentMouse.x * 60}px, ${currentMouse.y * 60}px)`

      tiles.forEach((tile, i) => {
        const s = state[i]
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
        s.rx += (targetRx - s.rx) * 0.1
        s.ry += (targetRy - s.ry) * 0.1
        s.angle += 0.2 * (speedMult - 1) // spin only while being pushed

        const dur = FLOAT_DUR[i % FLOAT_DUR.length]
        const phase = (time + i * 0.7) * ((Math.PI * 2) / dur)
        const floatY = Math.sin(phase) * 15
        const floatAngle = Math.cos(phase) * 4
        // attitude: cursor tilt (like the soda can) + a slow idle turn so the extrusion reads as depth
        const tiltX = -currentMouse.y * 22 + Math.sin(phase * 0.5) * 6
        const tiltY = currentMouse.x * 30 + Math.cos(phase * 0.5 + i) * 10
        tile.style.transform = `translate(${s.rx}px, ${s.ry + floatY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotate(${s.angle + floatAngle}deg)`
      })
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
    }
  }, [fx])

  return (
    <>
      <div aria-hidden className="soda-bg pointer-events-none fixed inset-0 z-0" />
      {fx && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[15] overflow-hidden [perspective:1400px]">
          <div ref={layerRef} className="soda-parallax absolute inset-0 [transform-style:preserve-3d]">
            {SLOTS.map((s) => (
              <div key={s.slug} className="soda-tile" style={{ ...s.style, width: s.size, height: s.size }} title={s.name}>
                <span className="soda-tile__side" />
                <span className="soda-tile__face">
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote SVG mark */}
                  <img src={icon(s.slug)} alt="" width={s.size} height={s.size} draggable={false} />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

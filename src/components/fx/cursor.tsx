"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

/**
 * Custom pointer: a crisp dot + a lagging ring (mix-blend-difference so it reads on any surface).
 * Ring swells over interactive elements; shows a label over cards that carry `data-cursor`.
 * Fine-pointer devices only; native cursor is hidden via the `has-cursor` class on <html>.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hot, setHot] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    const id = requestAnimationFrame(() => setEnabled(true))
    document.documentElement.classList.add("has-cursor")

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [role=button], [data-cursor]")
      setHot(!!el)
      setLabel(el?.dataset.cursor ?? null)
    }
    const onLeave = () => {
      x.set(-100)
      y.set(-100)
    }
    addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(id)
      removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      document.documentElement.classList.remove("has-cursor")
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{ width: label ? 72 : hot ? 44 : 28, height: label ? 72 : hot ? 44 : 28, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="grid place-items-center rounded-full border border-white/80 bg-white/0"
          style={{ backgroundColor: label ? "rgba(255,255,255,0.95)" : undefined }}
        >
          {label && <span className="text-[11px] font-semibold tracking-[0.06em] text-black">{label}</span>}
        </motion.div>
      </motion.div>
    </>
  )
}

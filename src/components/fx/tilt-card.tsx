"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react"
import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
  className?: string
  /** max tilt in degrees (Framer "3D Card Animation" defaults: X 20 / Y 40) */
  maxX?: number
  maxY?: number
  scale?: number
  glare?: boolean
}

const SPRING = { stiffness: 400, damping: 40, mass: 2 }

/** 3D perspective tilt that follows the pointer, with a moving glare and lift. */
export function TiltCard({ children, className, maxX = 12, maxY = 18, scale = 1.03, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const s = useMotionValue(1)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const srx = useSpring(rx, SPRING)
  const sry = useSpring(ry, SPRING)
  const ss = useSpring(s, SPRING)
  const sgx = useSpring(gx, { stiffness: 200, damping: 30 })
  const sgy = useSpring(gy, { stiffness: 200, damping: 30 })
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${sgx}% ${sgy}%, rgba(255,255,255,0.14), transparent 60%)`

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rx.set((0.5 - py) * maxX * 2)
    ry.set((px - 0.5) * maxY * 2)
    gx.set(px * 100)
    gy.set(py * 100)
    s.set(scale)
  }
  function onLeave() {
    rx.set(0)
    ry.set(0)
    s.set(1)
    gx.set(50)
    gy.set(50)
  }

  return (
    <div style={{ perspective: 1200 }} className={cn("group", className)}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, scale: ss, transformStyle: "preserve-3d" }}
        className="relative h-full will-change-transform"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  )
}

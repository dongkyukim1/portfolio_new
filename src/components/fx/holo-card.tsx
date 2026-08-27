"use client"

import { useRef, type ReactNode, type PointerEvent, type KeyboardEvent } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Pokémon-card style holographic 3D card (after simeydotme/pokemon-cards-css).
 * Pointer → rotateX/rotateY, holo foil background-position, glare highlight, all spring-smoothed.
 */
const SPRING = { stiffness: 260, damping: 28, mass: 1.2 }

export function HoloCard({
  children,
  className,
  onClick,
  href,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  ariaLabel?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const px = useMotionValue(50)
  const py = useMotionValue(50)
  const active = useMotionValue(0)
  const spx = useSpring(px, SPRING)
  const spy = useSpring(py, SPRING)
  const so = useSpring(active, { stiffness: 200, damping: 30 })

  // pokemon-cards-css math: rotate.x = -(cy/3.5), rotate.y = cx/2 (cx,cy = percent - 50)
  const rotateX = useTransform(spy, (v) => -((v - 50) / 3.5))
  const rotateY = useTransform(spx, (v) => (v - 50) / 2)
  const bgX = useTransform(spx, [0, 100], [37, 63])
  const bgY = useTransform(spy, [0, 100], [33, 67])
  const fromCenter = useTransform([spx, spy], ([x, y]: number[]) => Math.min(1, Math.hypot(x - 50, y - 50) / 50))
  const scale = useTransform(so, [0, 1], [1, 1.04])

  // CSS custom properties as individual motion values (motion writes `--*` keys straight to style)
  const pxT = useMotionTemplate`${spx}%`
  const pyT = useMotionTemplate`${spy}%`
  const bgxT = useMotionTemplate`${bgX}%`
  const bgyT = useMotionTemplate`${bgY}%`
  const vars = { "--px": pxT, "--py": pyT, "--bgx": bgxT, "--bgy": bgyT, "--o": so, "--fc": fromCenter }

  function onMove(e: PointerEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)))
    py.set(Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)))
    active.set(1)
  }
  function onLeave() {
    px.set(50)
    py.set(50)
    active.set(0)
  }

  const Tag = href ? motion.a : motion.div
  const linkProps = href ? { href, target: "_blank", rel: "noreferrer" } : { role: onClick ? "button" : undefined, tabIndex: onClick ? 0 : undefined }

  return (
    <div className={cn("holo", className)} style={{ perspective: 1100 }}>
      <Tag
        ref={ref as never}
        {...(linkProps as object)}
        aria-label={ariaLabel}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={onClick}
        onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
          if (onClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            onClick()
          }
        }}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" } as never}
        className="holo__rotator relative block h-full w-full cursor-pointer select-none rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-apple"
      >
        <motion.div style={vars as never} className="holo__inner relative h-full w-full overflow-hidden rounded-[22px]">
          {children}
          <div aria-hidden className="holo__shine" />
          <div aria-hidden className="holo__foil" />
          <div aria-hidden className="holo__glare" />
        </motion.div>
      </Tag>
    </div>
  )
}

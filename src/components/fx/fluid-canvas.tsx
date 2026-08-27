"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/** Full-bleed WebGL ink simulation. Sits behind content; pointer events pass through. */
export function FluidCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let destroy: (() => void) | undefined
    let cancelled = false
    import("./fluid-simulation").then(({ fluidSimulation }) => {
      if (cancelled) return
      try {
        destroy = fluidSimulation(canvas)
      } catch {
        /* WebGL unavailable — leave the base color */
      }
    })
    return () => {
      cancelled = true
      destroy?.()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("absolute inset-0 z-0 h-full w-full pointer-events-none", className)}
    />
  )
}

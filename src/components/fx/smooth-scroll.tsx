"use client"

import { useEffect } from "react"
import Lenis from "lenis"

/** Lenis smooth scrolling (wheel + anchors). Skipped for reduced-motion users. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ smoothWheel: true, anchors: { offset: -72 }, lerp: 0.09 })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
  return null
}

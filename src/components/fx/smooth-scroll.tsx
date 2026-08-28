"use client"

import { useEffect } from "react"
import Lenis from "lenis"

/** Lenis smooth scrolling (wheel + anchors). Skipped for reduced-motion users. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ smoothWheel: true, anchors: { offset: -72 }, lerp: 0.09, autoRaf: true })
    // Deep links: the browser's own hash jump races with Lenis' internal target, so re-issue it.
    const jump = (immediate: boolean) => {
      if (!location.hash) return
      let target: HTMLElement | null = null
      try {
        target = document.querySelector<HTMLElement>(location.hash)
      } catch {
        return
      }
      if (!target) return
      if (immediate) target.scrollIntoView({ block: "start" }) // native first, so it works even in a throttled tab
      lenis.scrollTo(target, { offset: -72, immediate })
    }
    const t1 = setTimeout(() => jump(true), 120)
    const t2 = setTimeout(() => jump(true), 700) // after fonts/images settle
    const onLoad = () => jump(true)
    const onHash = () => jump(false)
    addEventListener("load", onLoad)
    addEventListener("hashchange", onHash)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      removeEventListener("load", onLoad)
      removeEventListener("hashchange", onHash)
      lenis.destroy()
    }
  }, [])
  return null
}

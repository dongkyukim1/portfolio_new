"use client"

import { Component, useEffect, useState, type ReactNode } from "react"
import type { COBEOptions } from "cobe"
import { Globe } from "@/components/ui/globe"

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

/** Static stand-in when WebGL is unavailable (headless, reduced-capability devices). */
function Fallback() {
  return (
    <div
      aria-hidden
      className="mx-auto aspect-square w-full max-w-[520px] rounded-full border border-white/10"
      style={{
        background:
          "radial-gradient(circle at 38% 32%, rgba(41,151,255,.35), rgba(41,151,255,.08) 45%, rgba(4,5,12,.9) 72%)",
        boxShadow: "inset 0 0 80px rgba(41,151,255,.25), 0 30px 80px rgba(0,0,0,.5)",
      }}
    />
  )
}

export function SafeGlobe({ className, config }: { className?: string; config: COBEOptions }) {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off capability probe after mount
    setOk(hasWebGL())
  }, [])
  if (ok === null) return <div className="aspect-square w-full" />
  if (!ok) return <Fallback />
  return (
    <Boundary fallback={<Fallback />}>
      <Globe className={className} config={config} />
    </Boundary>
  )
}

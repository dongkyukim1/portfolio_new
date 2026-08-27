"use client"

import { cn } from "@/lib/utils"

type Props = {
  text: string
  /** ms before the first word starts */
  delay?: number
  /** ms between words */
  stagger?: number
  /** per-word duration ms */
  duration?: number
  /** px the word rises from */
  y?: number
  className?: string
  as?: "h1" | "h2" | "p" | "span"
}

/**
 * Word-by-word reveal: each word is an inline-block span with its own transition-delay.
 * easeOutCubic, translateY(y)→0 + opacity 0→1. Fires once mounted (via .in class on the root).
 */
export function WordReveal({
  text,
  delay = 0,
  stagger = 85,
  duration = 720,
  y = 26,
  className,
  as: Tag = "p",
}: Props) {
  const words = text.split(" ")
  return (
    <Tag className={cn("word-reveal", className)} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block will-change-transform"
          style={{
            opacity: 0,
            transform: `translateY(${y}px)`,
            transition: `opacity ${duration}ms cubic-bezier(0.33,1,0.68,1), transform ${duration}ms cubic-bezier(0.33,1,0.68,1)`,
            transitionDelay: `${delay + i * stagger}ms`,
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  )
}

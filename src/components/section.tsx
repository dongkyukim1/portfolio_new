import type { ReactNode } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
  wide = true,
}: {
  id: string
  eyebrow: string
  title: string
  lede?: string
  children: ReactNode
  className?: string
  wide?: boolean
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-[clamp(56px,9vw,120px)]", className)}>
      <div className={cn("mx-auto px-[22px]", wide ? "max-w-[1080px]" : "max-w-[720px]")}>
        <BlurFade inView delay={0.05}>
          <div className="lbl">{eyebrow}</div>
          <h2 className="mt-3 text-[clamp(28px,4.4vw,44px)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
            {title}
          </h2>
          {lede && <p className="mt-4 max-w-[62ch] text-[clamp(15px,2.2vw,17px)] leading-[1.7] text-ink-2">{lede}</p>}
        </BlurFade>
        <div className="mt-[clamp(28px,4vw,48px)]">{children}</div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "motion/react"
import { NumberTicker } from "@/components/ui/number-ticker"
import { BlurFade } from "@/components/ui/blur-fade"
import { Marquee } from "@/components/ui/marquee"
import { activity, metrics, stack } from "@/data/profile"
import { cn } from "@/lib/utils"

export function Metrics() {
  const chips = stack.flatMap((g) => g.items)
  return (
    <section id="metrics" className="scroll-mt-24 border-t border-hairline bg-ground-2/60 py-[clamp(48px,7vw,88px)]">
      <div className="mx-auto max-w-[1080px] px-[22px]">
        <BlurFade inView>
          <div className="panel grid grid-cols-2 overflow-hidden md:grid-cols-5">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={cn(
                  "px-5 py-6 md:px-6 md:py-7",
                  i % 2 === 0 ? "border-r border-hairline md:border-r" : "md:border-r md:border-hairline",
                  i >= 2 ? "border-t border-hairline md:border-t-0" : "",
                  i === metrics.length - 1 && "md:!border-r-0",
                )}
              >
                <div className="tabular text-[clamp(30px,4vw,40px)] font-semibold leading-none tracking-[-0.03em] text-ink">
                  <NumberTicker value={m.value} decimalPlaces={m.decimals ?? 0} delay={0.1 * i} className="text-ink" />
                  <span className="text-[0.55em] font-medium text-ink-3">{m.suffix}</span>
                </div>
                <div className="lbl mt-3">{m.label}</div>
              </div>
            ))}
          </div>
        </BlurFade>

        <BlurFade inView delay={0.15}>
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
            <span className="lbl">월별 커밋 — {activity.range} · 전 저장소 합계</span>
            <span className="lbl">
              최대 <span className="tabular text-apple">{activity.peak.value.toLocaleString()}</span> / {activity.peak.label}
            </span>
          </div>
          <div
            role="img"
            aria-label={`${activity.range} 월별 커밋 수 막대 그래프. ${activity.peak.label} ${activity.peak.value}건으로 최대.`}
            className="mt-4 grid h-[128px] grid-cols-8 items-end gap-[6px] sm:grid-cols-16"
          >
            {activity.bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.03 * i, ease: [0.32, 0.72, 0, 1] }}
                style={{ height: `${Math.max(h, 1.5)}%`, transformOrigin: "bottom" }}
                className={cn(
                  "rounded-t-[3px] bg-apple transition-opacity duration-150",
                  h >= 60 ? "opacity-100" : h >= 24 ? "opacity-60" : "opacity-30",
                  i < 8 ? "" : "hidden sm:block",
                )}
              />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-8 gap-[6px] text-center font-mono text-[9.5px] tracking-[-0.02em] text-ink-3 sm:grid-cols-16">
            {activity.axis.map((a, i) => (
              <span key={`${a}-${i}`} className={i < 8 ? "" : "hidden sm:block"}>
                {a}
              </span>
            ))}
          </div>
        </BlurFade>
      </div>

      <div className="relative mt-[clamp(40px,6vw,64px)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Marquee pauseOnHover className="[--duration:70s] [--gap:10px]">
          {chips.map((c) => (
            <span key={c.label} className={cn("chip", c.hot && "hot")}>
              {c.label}
            </span>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="mt-2.5 [--duration:80s] [--gap:10px]">
          {[...chips].reverse().map((c) => (
            <span key={c.label} className={cn("chip", c.hot && "hot")}>
              {c.label}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

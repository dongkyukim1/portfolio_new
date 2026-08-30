"use client"

import { motion } from "motion/react"
import { Section } from "@/components/section"
import { BlurFade } from "@/components/ui/blur-fade"
import { approach, commitNature } from "@/data/profile"

export function Approach() {
  const max = Math.max(...commitNature.map((c) => c.v))
  return (
    <Section id="approach" index="05" eyebrow="How I Work" title="증상이 아니라 원인에서 멈춥니다.">
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <BlurFade inView delay={0.1}>
          <div className="panel overflow-hidden">
            {approach.map((a, i) => (
              <div key={a.title} className="row group grid gap-2 px-6 py-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[44px_1fr] sm:px-7 sm:py-6">
                <span className="tabular font-mono text-[12px] text-ink-4 transition-colors group-hover:text-apple">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b className="block text-[17px] font-semibold tracking-[-0.015em] text-ink">{a.title}</b>
                  <p className="mt-1.5 text-[14.5px] leading-[1.75] text-ink-2">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </BlurFade>

        <BlurFade inView delay={0.2} className="md:sticky md:top-24">
          <div className="panel p-6">
            <div className="lbl">커밋 성격 (전체 합산)</div>
            <div className="mt-4 flex flex-col gap-3">
              {commitNature.map((c) => (
                <div key={c.k} className="grid grid-cols-[72px_1fr_auto] items-center gap-3 text-[13px]">
                  <span className="font-mono text-ink">
                    {c.k} {c.note && <em className="not-italic text-ink-3">{c.note}</em>}
                  </span>
                  <span className="h-[6px] overflow-hidden rounded-full bg-white/8">
                    <motion.i
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(c.v / max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
                      className="block h-full rounded-full bg-apple"
                    />
                  </span>
                  <span className="tabular font-mono text-[12px] text-ink-2">{c.v.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[13px] leading-[1.6] text-ink-3">
              fix가 feat의 60%를 넘는 비율은 신규 개발만이 아니라 <strong className="font-medium text-ink-2">운영 중인 제품을 계속 살려온 이력</strong>을 뜻합니다.
            </p>
          </div>
        </BlurFade>
      </div>
    </Section>
  )
}

"use client"

import { Section } from "@/components/section"
import { IconCloud } from "@/components/ui/icon-cloud"
import { BlurFade } from "@/components/ui/blur-fade"
import { cloudSlugs, stack } from "@/data/profile"
import { cn } from "@/lib/utils"

export function Stack() {
  const images = cloudSlugs.map((s) => `https://cdn.simpleicons.org/${s}/ffffff`)
  return (
    <Section
      id="stack"
      index="02"
      eyebrow="Tech Stack"
      title="6개 프로덕션 언어, 한 축의 제품."
      lede="같은 제품을 웹 · 앱 · 서버 · 인프라에서 각각의 언어로 이어 붙입니다. 강조된 항목이 최근 11개월 동안 가장 많이 커밋한 기술입니다."
    >
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <BlurFade inView delay={0.1} className="relative mx-auto w-full max-w-[420px] md:sticky md:top-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,207,232,0.18),transparent_62%)] blur-2xl"
          />
          <div className="relative [&_canvas]:!h-auto [&_canvas]:!w-full [&_button]:!border-white/12 [&_button]:!bg-white/8 [&_button]:!text-ink">
            <IconCloud images={images} showControl={false} />
          </div>
          <p className="lbl mt-2 text-center">drag to spin · {cloudSlugs.length} tools</p>
        </BlurFade>

        <BlurFade inView delay={0.2}>
          <div className="panel overflow-hidden">
            {stack.map((g) => (
              <div key={g.group} className="row grid gap-3 px-5 py-4 sm:grid-cols-[132px_1fr] sm:px-6 sm:py-5">
                <div className="lbl pt-1.5">{g.group}</div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((c) => (
                    <span key={c.label} className={cn("chip", c.hot && "hot")}>
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </Section>
  )
}

"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Section } from "@/components/section"
import { HoloCard } from "@/components/fx/holo-card"
import { BlurFade } from "@/components/ui/blur-fade"
import { sideProjects } from "@/data/profile"
import { mockups } from "@/data/mockups"

const IDS = ["consulting-automation", "gildongmu", "tmt", "littlebank"]

export function SideProjects() {
  return (
    <Section id="side" eyebrow="Side Projects" title="측정해서 쓰고, 규칙으로 편향을 지우는 실험들.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {sideProjects.map((s, i) => {
          const m = mockups[IDS[i]]
          return (
            <BlurFade key={s.name} inView delay={0.06 * i} className="h-full">
              <HoloCard href={s.href} ariaLabel={`${s.name} GitHub 열기`} className="h-full">
                <div className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/8 bg-ground-2">
                    <Image src={m.image} alt={`${s.name} 목업`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-top" unoptimized />
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="flex items-center gap-1.5 text-[17px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
                      {s.name} <ArrowUpRight className="size-3.5 text-ink-3" />
                    </h3>
                    <p className="mt-1 line-clamp-1 text-[12px] text-ink-3">{s.stack}</p>
                    <p className="mt-2 line-clamp-3 text-[13px] leading-[1.6] text-ink-2">{s.body}</p>
                  </div>
                </div>
              </HoloCard>
            </BlurFade>
          )
        })}
      </div>
    </Section>
  )
}

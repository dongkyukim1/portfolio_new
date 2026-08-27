"use client"

import { ArrowUpRight, Mail, PenLine } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { SafeGlobe } from "@/components/fx/safe-globe"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { BlurFade } from "@/components/ui/blur-fade"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { method, profile } from "@/data/profile"

const GLOBE = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.28,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 18000,
  mapBrightness: 3,
  baseColor: [0.18, 0.2, 0.28] as [number, number, number],
  markerColor: [41 / 255, 151 / 255, 1] as [number, number, number],
  glowColor: [0.06, 0.08, 0.16] as [number, number, number],
  markers: [{ location: [37.5665, 126.978] as [number, number], size: 0.09 }],
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-hairline">
      <div className="mx-auto grid max-w-[1080px] items-center gap-8 px-[22px] pb-[clamp(96px,14vw,180px)] pt-[clamp(56px,9vw,120px)] md:grid-cols-2">
        <BlurFade inView>
          <div className="lbl">Contact</div>
          <h2 className="mt-3 text-[clamp(34px,5.6vw,60px)] font-bold leading-[1.05] tracking-[-0.035em] text-ink">
            같이 만들
            <br />
            <span className="grad-apple">제품이 있나요?</span>
          </h2>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-ink-2">
            {profile.location} 기준으로 일하지만 저장소는 어디든 엽니다. 이메일이 가장 빠르고, 코드가 궁금하면 GitHub가 정직합니다.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`}>
              <ShimmerButton className="h-12 px-6 text-[15px] font-semibold" background="#2997ff" shimmerColor="#ffffff">
                <Mail className="mr-2 size-4" /> {profile.email}
              </ShimmerButton>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="pill-glass gap-2">
              <GithubIcon className="size-4" /> GitHub <ArrowUpRight className="size-3.5 text-ink-3" />
            </a>
            <a href={profile.blog} target="_blank" rel="noreferrer" className="pill-glass gap-2">
              <PenLine className="size-4" /> Blog <ArrowUpRight className="size-3.5 text-ink-3" />
            </a>
          </div>
          <AnimatedShinyText className="mt-8 inline-flex items-center gap-2 text-[13px] text-ink-3" shimmerWidth={120}>
            <span className="live-dot" /> {profile.philosophy} — 1,540+ contributions and counting.
          </AnimatedShinyText>
        </BlurFade>

        <BlurFade inView delay={0.15} className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div aria-hidden className="pointer-events-none absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.22),transparent_60%)] blur-3xl" />
          <SafeGlobe className="!max-w-none" config={GLOBE} />
        </BlurFade>
      </div>

      <footer className="border-t border-hairline">
        <div className="mx-auto max-w-[1080px] px-[22px] py-8">
          <p className="max-w-[80ch] text-[12.5px] leading-[1.65] text-ink-3">
            <strong className="font-medium text-ink-2">측정 방법 — </strong>
            {method}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-ink-3">
            <span>© 2026 {profile.nameEn} · {profile.education}</span>
            <span className="font-mono">Next.js 16 · Magic UI · WebGL fluid · Vercel</span>
          </div>
        </div>
      </footer>
    </section>
  )
}

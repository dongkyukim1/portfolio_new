"use client"

import { useEffect, useState } from "react"
import { ArrowDown, FileDown } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { motion, useScroll, useTransform } from "motion/react"
import { FluidCanvas } from "@/components/fx/fluid-canvas"
import { WordReveal } from "@/components/fx/word-reveal"
import { TopNav } from "@/components/nav"
import { WordRotate } from "@/components/ui/word-rotate"
import { Magnetic } from "@/components/fx/magnetic"
import { profile } from "@/data/profile"
import { cn } from "@/lib/utils"

export function Hero() {
  const [inClass, setIn] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setIn(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100lvh] w-full flex-col items-center justify-center overflow-hidden bg-ground px-5 text-center sm:px-10"
    >
      <FluidCanvas />
      <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0 z-[1]" />

      <TopNav inClass={inClass} />

      <motion.div style={{ y, opacity }} className="relative z-10 flex w-full max-w-[22rem] flex-col items-center sm:max-w-[40rem] lg:max-w-[54rem]">
        <p
          className={cn("reveal inline-flex items-center gap-2.5 rounded-full border border-white/16 bg-white/8 px-3.5 py-1.5 text-[11.5px] text-ink-2 backdrop-blur-[12px] sm:text-[13px]", inClass && "in")}
          style={{ transitionDelay: "320ms" }}
        >
          <span className="live-dot" />
          <span className="lbl !text-ink-2">Available · {profile.location}</span>
        </p>

        <h1 className={cn("word-reveal mt-5 sm:mt-7", inClass && "in")} aria-label={`${profile.name} — ${profile.tagline}`}>
          <WordReveal
            as="span"
            text={profile.name}
            delay={480}
            className={cn("word-reveal block text-[clamp(56px,11vw,124px)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink", inClass && "in")}
          />
          <WordReveal
            as="span"
            text="기획된 화면부터 배포된 프로덕션까지 관통합니다."
            delay={640}
            className={cn("word-reveal mt-4 block text-[clamp(22px,4.2vw,44px)] font-medium leading-[1.15] tracking-[-0.025em] text-ink", inClass && "in")}
          />
        </h1>

        <div className={cn("reveal mt-5 flex items-baseline gap-2.5", inClass && "in")} style={{ transitionDelay: "1050ms" }}>
          <span className="lbl">Now</span>
          <WordRotate words={profile.roles} className="text-[15px] font-semibold text-ink sm:text-[17px]" duration={2400} />
        </div>

        <WordReveal
          text="React·Next.js·Flutter로 클라이언트를, Django·Spring Boot·Go·gRPC로 그 뒤를, Kubernetes·Kong으로 배포까지. 최근 11개월 · 22개 저장소 · 4,300+ 커밋, 대부분 실사용자가 쓰는 운영 서비스에 배포됐습니다."
          delay={1150}
          stagger={22}
          duration={600}
          y={14}
          className={cn("word-reveal mt-4 max-w-[20rem] text-[16px] leading-[1.6] text-ink-2 sm:mt-5 sm:max-w-[36rem] sm:text-[17.5px] lg:max-w-[44rem] lg:text-[19px]", inClass && "in")}
        />

        <div className={cn("reveal mt-7 flex w-full justify-center sm:mt-10", inClass && "in")} style={{ transitionDelay: "1450ms" }}>
          <div className="flex h-14 max-w-full items-center gap-1 rounded-full border border-white/16 bg-white/8 p-1.5 shadow-[0_1px_2px_rgba(0,0,0,.05)] backdrop-blur-[12px] sm:h-16 sm:gap-1.5">
            <Magnetic strength={0.25}>
              <a href="#projects" className="pill-white whitespace-nowrap !px-5">
                프로젝트 보기
              </a>
            </Magnetic>
            <a href={profile.resume} download className="pill-glass gap-2 whitespace-nowrap !border-transparent !bg-transparent !px-4 hover:!bg-white/10">
              <FileDown className="size-4" /> 이력서
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="pill-glass gap-2 whitespace-nowrap !border-transparent !bg-transparent !px-4 hover:!bg-white/10">
              <GithubIcon className="size-4" /> GitHub
            </a>
            <a href={`mailto:${profile.email}`} className="pill-glass hidden whitespace-nowrap !border-transparent !bg-transparent hover:!bg-white/10 md:inline-flex">
              {profile.email}
            </a>
          </div>
        </div>
      </motion.div>

      <footer
        className={cn("reveal absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-5 text-[11.5px] text-ink-2 sm:px-10 sm:py-6 sm:text-[13px]", inClass && "in")}
        style={{ transitionDelay: "1650ms" }}
      >
        <span>© 2026 {profile.nameEn} — {profile.philosophy}</span>
        <a href="#metrics" className="flex items-center gap-1.5 text-ink-2 transition-colors hover:text-ink">
          scroll <ArrowDown className="size-3.5 animate-bounce" />
        </a>
      </footer>
    </section>
  )
}

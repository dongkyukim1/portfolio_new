"use client"

import { useState } from "react"
import { ArrowUpRight, Play } from "lucide-react"
import { Section } from "@/components/section"
import { BlurFade } from "@/components/ui/blur-fade"

const SODA_URL = "/soda/index.html"

/**
 * Interactive 3D landing-page showcase (Diet Soda).
 * The page itself is a single self-contained HTML file under /public/soda,
 * embedded here in an iframe so its own GSAP / <model-viewer> runtime stays isolated
 * from the portfolio's Lenis scroll + R3F backdrop.
 */
export function Soda() {
  const [loaded, setLoaded] = useState(false)

  return (
    <Section
      id="soda"
      index="04"
      eyebrow="Interactive Showcase"
      title="커서를 따라 기울고, 클릭 한 번에 맛이 바뀌는 3D 랜딩."
      lede="GSAP + Google model-viewer로 만든 단일 HTML 파일. 3D 캔이 커서를 추적하고, 베리들은 포인터에 밀려나며, 플레이버 카드를 누르면 배경·텍스처·모델이 함께 전환됩니다."
    >
      <BlurFade inView delay={0.1}>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#011411] shadow-[0_30px_80px_rgba(0,0,0,.55)]">
          {!loaded && (
            <div aria-hidden className="absolute inset-0 z-10 flex items-center justify-center bg-[radial-gradient(circle_at_center,#0b8a78_0%,#044e3b_50%,#011411_100%)]">
              <span className="flex items-center gap-2 text-[13px] text-white/70">
                <Play className="size-3.5" /> 3D 모델 불러오는 중…
              </span>
            </div>
          )}
          <iframe
            src={SODA_URL}
            title="Diet Soda interactive 3D landing page"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="block h-[clamp(520px,80vh,860px)] w-full"
            allow="fullscreen"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 text-[13px] text-ink-3">
          <span>Vanilla HTML · CSS · JS · GSAP 3.12 · model-viewer</span>
          <a
            href={SODA_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="Open"
            className="inline-flex items-center gap-1 text-ink-2 transition-colors hover:text-ink"
          >
            전체 화면으로 열기 <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </BlurFade>
    </Section>
  )
}

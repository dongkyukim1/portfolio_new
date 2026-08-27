"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, X } from "lucide-react"
import { Section } from "@/components/section"
import { HoloCard } from "@/components/fx/holo-card"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { projects, type Project } from "@/data/profile"
import { mockups } from "@/data/mockups"
import { cn } from "@/lib/utils"

const TIER_OPACITY = { lead: "opacity-100", co: "opacity-60", part: "opacity-30" } as const

/** Card face: mockup on top, name/sub/period below. Same shape for every project. */
export function ProjectFace({ p, index, compact = false }: { p: Project; index: number; compact?: boolean }) {
  const m = mockups[p.id]
  return (
    <div className="flex h-full flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/8 bg-ground-2">
        <Image src={m.image} alt={`${p.name} 목업`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-top" unoptimized />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
        <span className="lbl absolute left-3 top-3 rounded-full border border-white/12 bg-black/40 px-2.5 py-1 !text-[10px] text-ink-2 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} · {p.period.split(" ")[0]}
        </span>
        {p.featured && (
          <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[.12em] text-white" style={{ background: m.accent }}>
            FEATURED
          </span>
        )}
      </div>
      <div className={cn("flex flex-1 flex-col p-4", compact && "p-4")}>
        <h3 className="text-[17px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">{p.name}</h3>
        <p className="mt-1 text-[13px] leading-[1.5] text-ink-2">{p.sub}</p>
        {p.role && <p className="mt-1.5 line-clamp-1 text-[12px] text-ink-3">{p.role}</p>}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {p.stack.slice(0, 2).map((s) => (
            <span key={s} className="chip !h-6 !px-2.5 !text-[11px]">
              {s}
            </span>
          ))}
          {p.stack.length > 2 && <span className="chip !h-6 !px-2.5 !text-[11px] text-ink-3">+{p.stack.length - 2}</span>}
        </div>
      </div>
    </div>
  )
}

function Rail({ p }: { p: Project }) {
  const m = mockups[p.id]
  return (
    <div className="flex flex-col gap-4">
      {p.shares && (
        <div className="rounded-[16px] border border-hairline bg-white/[0.03] p-4">
          <div className="lbl mb-3">저장소 기여 지분</div>
          <div className="flex flex-col gap-2.5">
            {p.shares.map((s) => (
              <div key={s.repo} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-[12.5px]">
                <span className="font-mono text-[11.5px] tracking-[-0.02em] text-ink-2">
                  {s.repo} {s.note && <em className="not-italic text-ink-3">{s.note}</em>}
                </span>
                <span className="tabular font-mono text-[11.5px] text-ink-3">{s.label}</span>
                <span className="col-span-2 h-[5px] overflow-hidden rounded-full bg-white/8">
                  <motion.i
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
                    className={cn("block h-full rounded-full", TIER_OPACITY[s.tier])}
                    style={{ background: m.accent }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {p.stats && (
        <div className="rounded-[16px] border border-hairline bg-white/[0.03] p-4">
          <div className="lbl mb-2">규모</div>
          <table className="w-full text-[13px]">
            <tbody>
              {p.stats.map((s) => (
                <tr key={s.k} className="border-t border-hairline first:border-t-0">
                  <th className="py-1.5 pr-3 text-left font-medium text-ink-3">{s.k}</th>
                  <td className="tabular py-1.5 text-right font-mono text-[12px] font-medium tracking-[-0.01em] text-ink">{s.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {p.links && (
        <div className="flex flex-wrap gap-2">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="chip hot gap-1 !h-8 !text-[12.5px] transition-transform hover:-translate-y-0.5">
              {l.label} <ArrowUpRight className="size-3.5" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/** Detail sheet — glass scrim + one panel; the only place glass is used besides nav/dock. */
function DetailSheet({ p, onClose }: { p: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!p) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [p, onClose])

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-[10px] sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            key={p.id}
            role="dialog"
            aria-modal="true"
            aria-label={`${p.name} 상세`}
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-[1040px] overflow-y-auto rounded-t-[26px] border border-white/12 bg-surface shadow-[0_2px_8px_rgba(0,0,0,.3),0_40px_100px_rgba(0,0,0,.6)] sm:rounded-[26px]"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <Image src={mockups[p.id].image} alt="" fill sizes="1040px" className="object-cover object-top" unoptimized />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/14 bg-black/40 text-ink backdrop-blur-md transition-colors hover:bg-white/14"
              >
                <X className="size-4" />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="lbl">{p.period}</div>
                <h3 className="mt-2 text-[clamp(26px,4vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
                  {p.name} <span className="text-[0.6em] font-medium tracking-[-0.01em] text-ink-2">{p.sub}</span>
                </h3>
                {p.role && (
                  <p className="mt-2 text-[14px] font-medium" style={{ color: mockups[p.id].accent }}>
                    {p.role}
                  </p>
                )}
              </div>
            </div>

            <div className="px-6 pb-8 sm:px-8">
              <p className="max-w-[72ch] text-[15.5px] leading-[1.75] text-ink-2">{p.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-7 grid gap-8 border-t border-hairline pt-7 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                <ul className="flex flex-col gap-5">
                  {p.highlights.map((h, i) => (
                    <motion.li
                      key={h.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                      className="border-l-2 border-white/10 pl-4 transition-colors hover:border-[color:var(--acc)]"
                      style={{ "--acc": mockups[p.id].accent } as React.CSSProperties}
                    >
                      <b className="block text-[15.5px] font-semibold tracking-[-0.012em] text-ink">{h.title}</b>
                      <span className="mt-1 block text-[14px] leading-[1.75] text-ink-2">{h.body}</span>
                    </motion.li>
                  ))}
                </ul>
                <Rail p={p} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="운영 중인 제품을 끝까지 살려온 이력."
      lede="카드를 기울여 보고, 누르면 무엇을 · 왜 · 어떻게 고쳤는지와 저장소별 기여 지분이 펼쳐집니다. 모든 수치는 git log에서 직접 집계했습니다."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => (
          <BlurFade key={p.id} inView delay={0.06 * (i % 4)} className="h-full">
            <HoloCard onClick={() => setOpen(p)} ariaLabel={`${p.name} 상세 열기`} className="h-full">
              {p.featured && <BorderBeam size={200} duration={9} colorFrom={mockups[p.id].accent} colorTo="#bf5af2" className="z-[5]" />}
              <ProjectFace p={p} index={i} />
            </HoloCard>
          </BlurFade>
        ))}
      </div>
      <DetailSheet p={open} onClose={() => setOpen(null)} />
    </Section>
  )
}

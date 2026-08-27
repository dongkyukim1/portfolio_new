"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home, FolderKanban, Layers, Compass, Mail, PenLine, Clock } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { Dock, DockIcon } from "@/components/ui/dock"
import { profile } from "@/data/profile"
import { cn } from "@/lib/utils"

export const NAV = [
  { href: "#projects", label: "프로젝트" },
  { href: "#stack", label: "기술 스택" },
  { href: "#approach", label: "일하는 방식" },
  { href: "#timeline", label: "이력" },
]

export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 9c2.5 0 2.5 4.2 5 4.2S10 9 12 9s2.5 4.2 5 4.2S19.5 9 21.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2.5 15c2.5 0 2.5 4.2 5 4.2S10 15 12 15s2.5 4.2 5 4.2S19.5 15 21.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

/** Top bar inside the hero: brand · glass link pill · white CTA. Revealed as the first stagger step. */
export function TopNav({ inClass }: { inClass: boolean }) {
  return (
    <header
      className={cn("reveal from-top absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 sm:px-10 sm:py-7", inClass && "in")}
      style={{ transitionDelay: "150ms" }}
    >
      <Link href="/" className="flex items-center gap-2.5 text-[18px] font-medium tracking-[-0.01em] text-white sm:text-[21px]">
        <BrandGlyph className="h-[22px] w-[22px] sm:h-6 sm:w-6" />
        {profile.nameEn.toLowerCase().replace(" ", ".")}
      </Link>
      <nav className="absolute left-1/2 hidden h-12 -translate-x-1/2 items-center gap-9 rounded-full border border-white/16 bg-white/8 px-7 backdrop-blur-[12px] sm:flex">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="whitespace-nowrap text-[15px] text-ink-2 transition-colors duration-150 hover:text-ink">
            {n.label}
          </a>
        ))}
      </nav>
      <a href={`mailto:${profile.email}`} className="pill-white !h-10 !px-[18px] !text-[14px] sm:!h-11 sm:!px-[22px] sm:!text-[15px]">
        연락하기
      </a>
    </header>
  )
}

/** macOS-style glass Dock. Slides in once the hero scrolls away. */
export function DockNav() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    addEventListener("scroll", onScroll, { passive: true })
    return () => removeEventListener("scroll", onScroll)
  }, [])

  const items = [
    { href: "#top", label: "홈", Icon: Home },
    { href: "#projects", label: "프로젝트", Icon: FolderKanban },
    { href: "#stack", label: "기술 스택", Icon: Layers },
    { href: "#approach", label: "일하는 방식", Icon: Compass },
    { href: "#timeline", label: "이력", Icon: Clock },
    { href: "#contact", label: "연락", Icon: Mail },
  ]
  const ext = [
    { href: profile.github, label: "GitHub", Icon: GithubIcon },
    { href: profile.blog, label: "Blog", Icon: PenLine },
  ]

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-5 z-50 flex justify-center transition-all duration-500 [transition-timing-function:var(--ease-spring)]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <Dock className="glass !mt-0 !h-[62px] !gap-[5px] !rounded-[22px] !border-white/12 !px-2.5" iconSize={40} iconMagnification={64} iconDistance={120}>
        {items.map(({ href, label, Icon }) => (
          <DockIcon key={href} className="bg-white/6 hover:bg-white/14">
            <a href={href} aria-label={label} title={label} className="flex h-full w-full items-center justify-center text-ink">
              <Icon className="size-[45%]" strokeWidth={1.75} />
            </a>
          </DockIcon>
        ))}
        <span aria-hidden className="mx-1 h-8 w-px self-center bg-white/14" />
        {ext.map(({ href, label, Icon }) => (
          <DockIcon key={href} className="bg-white/6 hover:bg-white/14">
            <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="flex h-full w-full items-center justify-center text-ink">
              <Icon className="size-[45%]" strokeWidth={1.75} />
            </a>
          </DockIcon>
        ))}
      </Dock>
    </div>
  )
}

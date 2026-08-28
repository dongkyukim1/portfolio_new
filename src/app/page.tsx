import { ScrollProgress } from "@/components/ui/scroll-progress"
import { SmoothScroll } from "@/components/fx/smooth-scroll"
import { Cursor } from "@/components/fx/cursor"
import { DockNav } from "@/components/nav"
import { Hero } from "@/components/sections/hero"
import { Metrics } from "@/components/sections/metrics"
import { Projects } from "@/components/sections/projects"
import { Stack } from "@/components/sections/stack"
import { SideProjects } from "@/components/sections/side-projects"
import { Approach } from "@/components/sections/approach"
import { Timeline } from "@/components/sections/timeline"
import { Contact } from "@/components/sections/contact"

export default function Page() {
  return (
    <main className="relative">
      <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black">
        본문으로 건너뛰기
      </a>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress className="h-[2px] bg-gradient-to-r from-apple via-indigo to-[#bf5af2]" />
      <Hero />
      <Metrics />
      <Projects />
      <Stack />
      <SideProjects />
      <Approach />
      <Timeline />
      <Contact />
      <DockNav />
    </main>
  )
}

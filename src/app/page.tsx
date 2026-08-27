import { ScrollProgress } from "@/components/ui/scroll-progress"
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

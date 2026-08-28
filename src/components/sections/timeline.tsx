import { Section } from "@/components/section"
import { BlurFade } from "@/components/ui/blur-fade"
import { timeline } from "@/data/profile"

export function Timeline() {
  return (
    <Section id="timeline" index="05" eyebrow="Timeline" title="이력." wide={false}>
      <BlurFade inView delay={0.1}>
        <div className="panel overflow-hidden">
          {timeline.map((t) => (
            <div key={t.when + t.what} className="row grid gap-1 px-6 py-4 sm:grid-cols-[170px_1fr] sm:gap-4 sm:px-7 sm:py-[18px]">
              <span className="tabular font-mono text-[12.5px] text-ink-3">{t.when}</span>
              <div>
                <b className="block text-[15.5px] font-semibold tracking-[-0.012em] text-ink">{t.what}</b>
                {t.note && <span className="mt-0.5 block text-[13.5px] text-ink-2">{t.note}</span>}
              </div>
            </div>
          ))}
        </div>
      </BlurFade>
    </Section>
  )
}

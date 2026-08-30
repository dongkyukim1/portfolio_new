import { diagrams } from "@/data/diagrams"

const MONO = "var(--font-mono), ui-monospace, Menlo, monospace"

/**
 * System-architecture diagram for the project detail sheet.
 * Same material language as the rest of the site: near-black panel, hairline strokes,
 * one accent (the project's) marking the layers I actually committed to.
 */
export function ArchDiagram({ id, accent }: { id: string; accent: string }) {
  const d = diagrams[id]
  if (!d) return null
  const node = (nid: string) => d.nodes.find((n) => n.id === nid)!
  return (
    <div className="mt-7 border-t border-hairline pt-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="lbl">System Architecture</span>
        <span className="lbl !text-ink-4">
          <span aria-hidden className="mr-1.5 inline-block h-[9px] w-[9px] translate-y-px rounded-[3px] border" style={{ borderColor: accent }} />
          직접 커밋한 계층
        </span>
      </div>
      <div className="overflow-x-auto rounded-[16px] border border-hairline bg-white/[0.03] p-4 sm:p-5" data-lenis-prevent>
        <svg
          viewBox={`0 0 ${d.width} ${d.height}`}
          className="h-auto w-full min-w-[640px]"
          role="img"
          aria-label="시스템 아키텍처 다이어그램"
        >
          <defs>
            <marker id={`arr-${id}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7" fill="none" stroke="#6e6e73" strokeWidth="1.4" />
            </marker>
          </defs>
          {d.boundary && (
            <g>
              <rect
                x={d.boundary.x}
                y={d.boundary.y}
                width={d.boundary.w}
                height={d.boundary.h}
                rx={16}
                fill="none"
                stroke={accent}
                strokeOpacity={0.45}
                strokeWidth={1.2}
                strokeDasharray="5 5"
              />
              <text x={d.boundary.x + 18} y={d.boundary.y + 24} fontSize={11} fontWeight={600} letterSpacing="0.1em" fill={accent} fillOpacity={0.85} style={{ fontFamily: MONO }}>
                {d.boundary.label.toUpperCase()}
              </text>
            </g>
          )}
          {d.edges.map((e) => {
            const a = node(e.from)
            const b = node(e.to)
            const leftToRight = a.x + a.w <= b.x
            const x1 = leftToRight ? a.x + a.w : a.x + a.w / 2
            const y1 = leftToRight ? a.y + a.h / 2 : a.y
            const x2 = leftToRight ? b.x - 5 : b.x + b.w / 2
            const y2 = leftToRight ? b.y + b.h / 2 : b.y + b.h + 5
            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#48484a" strokeWidth={1.3} markerEnd={`url(#arr-${id})`} />
                {e.label && (
                  <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 7} fontSize={10} textAnchor="middle" fill="#6e6e73" style={{ fontFamily: MONO }}>
                    {e.label}
                  </text>
                )}
              </g>
            )
          })}
          {d.nodes.map((n) => (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx={12}
                fill="#0b0d16"
                stroke={n.mine ? accent : "rgba(255,255,255,0.14)"}
                strokeWidth={n.mine ? 1.4 : 1.1}
              />
              <text x={n.x + 16} y={n.y + (n.sub ? n.h / 2 - 4 : n.h / 2 + 4)} fontSize={13} fontWeight={600} fill="#eef0f6">
                {n.label}
              </text>
              {n.sub && (
                <text x={n.x + 16} y={n.y + n.h / 2 + 17} fontSize={10.5} fill="#6e6e73" style={{ fontFamily: MONO }}>
                  {n.sub}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      {d.note && <p className="mt-3 max-w-[86ch] text-[12.5px] leading-[1.65] text-ink-3">{d.note}</p>}
    </div>
  )
}

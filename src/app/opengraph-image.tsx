import { ImageResponse } from "next/og"

export const alt = "Dongkyu Kim — Full-stack developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Dynamic OG card (Latin-only copy: satori has no Hangul font here). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #04050c 0%, #0b0d16 60%, #101427 100%)",
          color: "#eef0f6",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: -160, right: -120, width: 520, height: 520, borderRadius: 999, background: "radial-gradient(circle, rgba(41,151,255,.55), rgba(94,92,230,.25) 45%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -200, left: 120, width: 460, height: 460, borderRadius: 999, background: "radial-gradient(circle, rgba(191,90,242,.35), transparent 65%)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, letterSpacing: 4, color: "#b9becf" }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#30d158" }} />
          AVAILABLE · SEOUL, KR
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Dongkyu Kim</div>
          <div style={{ fontSize: 34, color: "#b9becf", letterSpacing: -0.5 }}>Full-stack developer — web · mobile · backend · infra</div>
        </div>
        <div style={{ display: "flex", gap: 48, fontSize: 26, color: "#b9becf" }}>
          {[
            ["29", "repos"],
            ["4,300+", "commits"],
            ["6", "languages"],
            ["1.4M+", "LOC"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 44, fontWeight: 700, color: "#eef0f6", letterSpacing: -1 }}>{v}</div>
              <div style={{ fontSize: 18, letterSpacing: 3, textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}

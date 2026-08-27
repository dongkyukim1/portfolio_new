# Brand Guidelines — dongkyu.kim v1.0

> Last updated: 2026-08-27 · Status: Active
> Source of truth for the portfolio's visual identity, voice, and asset rules.

## Quick Reference

| Element | Value |
|---|---|
| Ground | `#04050c` (near-black, cool) |
| Primary accent | `#2997ff` (Apple blue, dark-mode variant) |
| Gradient | `#2997ff → #5e5ce6 → #bf5af2` (hero/CTA only) |
| Display font | Onest (Latin) → Apple SD Gothic Neo / Pretendard (Hangul) |
| Mono | Geist Mono (numbers, labels, repo names) |
| Voice | 정직 · 구체 · 절제 (honest, concrete, restrained) |

---

## 1. Positioning

**One line:** 기획된 화면부터 배포된 프로덕션까지 관통하는 풀스택 개발자.

**Proof, not adjectives.** Every claim on the site is backed by a number pulled from `git log`. The brand is the evidence — 29 repos, 4,300+ commits, contribution share per repo, fix/feat ratio. Never pad with stats that don't carry meaning.

## 2. Color Palette

### Neutrals (skeleton — 95% of the page)

| Name | Hex | Usage |
|---|---|---|
| Ground | `#04050c` | Page background; matches the WebGL fluid BACK_COLOR |
| Ground 2 | `#0b0d16` | Alternate section tint |
| Surface | `#1c1c1e` | Panels / cards (Apple dark material) |
| Surface 2 | `#2c2c2e` | Nested surfaces |
| Ink | `#eef0f6` | Headings, primary text |
| Ink 2 | `#b9becf` | Body, nav links, captions |
| Ink 3 | `#6e6e73` | Tertiary, labels |
| Ink 4 | `#48484a` | Index numbers, faint marks |
| Hairline | `rgba(255,255,255,0.08)` | The only divider |

### Accent (emphasis ONLY — one per view)

| Name | Hex | Usage |
|---|---|---|
| Apple blue | `#2997ff` | Action, links, active, bars, hot chips |
| Indigo | `#5e5ce6` | Gradient 2nd stop, secondary glow |
| Live green | `#30d158` | Pulsing "available" dot only |
| Heat | `#ff9f0a` | Reserved (not currently used) |

### Glass (only where layers overlap)

- Fill `rgba(255,255,255,0.08)` · Border `rgba(255,255,255,0.16)` · `backdrop-filter: saturate(180%) blur(20px)`
- Allowed: top nav pill, Dock, hero CTA bar, badge pill. **Never** on plain content panels.

### Accessibility
- Ink on Ground: 17.6:1 (AAA) · Ink 2 on Ground: 10.9:1 (AAA) · Apple blue on Ground: 6.4:1 (AA)
- Hero text sits on a radial scrim (`rgba(4,5,12,.68 → .12)`) so the fluid never drops contrast below AA.

## 3. Typography

```css
--font-display: var(--font-onest), -apple-system, "SF Pro Display", "Apple SD Gothic Neo",
                "Pretendard Variable", Pretendard, "Helvetica Neue", "Noto Sans KR", sans-serif;
--font-mono:    "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Hero name | `clamp(56px, 11vw, 124px)` | 600 | `-0.04em` | 1.02 |
| Hero line | `clamp(22px, 4.2vw, 44px)` | 500 | `-0.025em` | 1.15 |
| H2 | `clamp(28px, 4.4vw, 44px)` | 700 | `-0.03em` | 1.1 |
| H3 / card title | 22–30px | 600 | `-0.03em` | 1.15 |
| Body | 14.5–17px | 400 | — | 1.7–1.75 |
| Label (`.lbl`) | 10.5px mono | 600 | `+0.14em` uppercase | — |
| Numbers | mono, `tabular-nums` | 500–600 | `-0.01em` | — |

**Rules:** bigger = more negative tracking; long body ≥ 1.7 leading; every number tabular; `word-break: keep-all` for Hangul.

## 4. Materials, Radius, Shadow

| Tier | Radius | Where |
|---|---|---|
| Pill | `999px` | Buttons, chips, badges |
| Rail card | `16px` | Nested detail panels |
| Card | `18px` | Side-project cards |
| Panel / project card | `22px` | Unified lists, project cards, Dock |

Shadows are always two-layer: `0 1px 3px rgba(0,0,0,.5), 0 14px 40px rgba(0,0,0,.35)` + `inset 0 1px 0 rgba(255,255,255,.05)`.

**Unified surface > fragmented cards.** Sibling rows (stack matrix, approach, timeline) live on one panel with hairlines. Cards are reserved for genuinely independent objects (projects, side projects) and share ONE shape: 4:3 mockup on top (`/public/mockups/<id>.svg`, one accent each), title/sub/period below, holo layers over everything. Detail opens in a glass sheet, never inline.

## 5. Motion

| Layer | Treatment |
|---|---|
| Hero | WebGL fluid (load burst → perpetual orbit); word-by-word reveal (85ms stagger / 720ms / easeOutCubic); block reveals 700ms `cubic-bezier(.2,0,0,1)` at 150 / 320 / 480 / 1150 / 1450 / 1650 ms |
| Scroll | `BlurFade` in-view per section; hero parallax (y 0→120, opacity 1→0 over 500px); scroll progress bar |
| Cards | **Holo card** (pokemon-cards-css): pointer → rotateX −(cy/3.5) / rotateY cx/2, spring 260/28, scale 1.04; rainbow sheen (color-dodge) + foil stripes (soft-light) + glare (overlay) driven by `--px/--py/--bgx/--bgy/--o`; BorderBeam on featured |
| Numbers | `NumberTicker` on view; bars `scaleY`/`width` 0→value with spring ease |
| Nav | Dock magnification 40→64px, distance 120; slides in after 60vh |
| Reduced motion | Fluid disabled; all transitions collapsed via `prefers-reduced-motion` |

Easing tokens: `--ease-spring: cubic-bezier(0.32,0.72,0,1)` · `--ease-out-quart: cubic-bezier(0.25,1,0.5,1)`.

## 6. Voice & Tone

| Trait | We are | We are not |
|---|---|---|
| 정직 | 숫자로 증명, 측정 방법 공개 | 과장, "best-in-class" |
| 구체 | "22MB → 2.88MB", "id tiebreaker" | "성능 최적화 경험" |
| 절제 | 짧은 문장, 한 화면에 한 강조 | 이모지 남발, 형용사 나열 |
| 원인 지향 | "왜"가 남는 서술 | 증상 나열 |

**Prohibited:** 열정적인, 최고의, 혁신적인, seamless, leverage, "빠르게 변화하는 세상에서".

**CJK + Latin spacing:** half-width space between Hangul and Latin/digits (`Next.js 16 랜딩`), `·` as the list separator.

## 7. Assets & Naming

- Mockups: `scripts/gen-mockups.py` renders one 1200×900 SVG per card in a single visual language (near-black scene, accent blobs, glass device frame, skeleton UI). Hand-authored exceptions (e.g. `vibeshield.svg`, rebuilt from real app screenshots) are excluded from the generator. Drop a real PNG at the same path and update `src/data/mockups.ts` to swap.
- Card accents: ilro `#2997ff` · SCP `#30d158` · challengers `#bf5af2` · 런덤메이트 `#ff375f` · VibeShield `#30d158` · mission-control `#64d2ff` · megastudy `#ffd60a` · portfolio_2026 `#5e5ce6`.

- Icons: Lucide (1.75 stroke) for UI; Simple Icons (white) for the 3D tech cloud via `cdn.simpleicons.org/<slug>/ffffff`.
- Brand glyph: two interleaving flow lines (`BrandGlyph`), `currentColor`, 22–24px in nav.
- File naming: `kebab-case`, sections under `src/components/sections/`, effects under `src/components/fx/`, Magic UI under `src/components/ui/`.
- Content lives in `src/data/profile.ts` — edit numbers there, never in components. The `AI · 에이전트` stack group (Claude / Claude Code / GPT-5 · Codex / Gemini / 프롬프트 · 루프 · 하네스 엔지니어링 / MCP / 멀티에이전트 / Evals) sits second, right after 언어.

## 8. Do / Don't

- ✅ One accent per view · ✅ hairline dividers · ✅ tabular numbers · ✅ glass only on overlap
- ❌ Warm/cream ground · ❌ rainbow gradients on content · ❌ bordered-and-tinted card piles · ❌ decorative stats

## Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-08-27 | Initial guidelines (Apple dark material + Flowstate fluid hero) |

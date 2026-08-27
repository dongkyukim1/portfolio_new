# portfolio_new

김동규 — 풀스택 개발자 포트폴리오. Next.js 16 · Tailwind v4 · [Magic UI](https://magicui.design) · WebGL fluid hero.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## 구조

```
src/
├── app/                  # layout (Onest + Geist Mono), globals.css (design tokens), page
├── data/profile.ts       # 모든 콘텐츠 · 수치 (여기만 수정)
├── components/
│   ├── fx/               # fluid-simulation (WebGL), word-reveal, holo-card (3D 포켓몬 홀로), tilt-card
│   ├── sections/         # hero · metrics · projects · stack · side-projects · approach · timeline · contact
│   ├── ui/               # Magic UI (dock, globe, icon-cloud, terminal, number-ticker, …)
│   ├── nav.tsx           # 상단 글래스 내비 + macOS Dock
│   └── section.tsx
docs/brand-guidelines.md  # 브랜드 · 디자인 토큰 · 모션 규약
```

## 디자인

- Apple 다크 머티리얼(하나의 패널 + 헤어라인, 글래스는 겹치는 레이어에만) 위에 극적인 모션: 잉크 유체 히어로, 단어 단위 리빌, 3D 틸트 카드, 아이콘 클라우드, 지구본, Dock.
- 토큰과 규칙은 `docs/brand-guidelines.md` 참고.

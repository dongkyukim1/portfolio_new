/**
 * Per-project system architecture diagrams, rendered by fx/arch-diagram.tsx.
 * Coordinates are viewBox units. `mine: true` = layers I committed to (accent stroke).
 */
export type DiagramNode = { id: string; label: string; sub?: string; x: number; y: number; w: number; h: number; mine?: boolean }
export type DiagramEdge = { from: string; to: string; label?: string }
export type Diagram = {
  width: number
  height: number
  boundary?: { x: number; y: number; w: number; h: number; label: string }
  note?: string
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

export const diagrams: Record<string, Diagram> = {
  ilro: {
    width: 900,
    height: 300,
    note: "한 기능이 FE 모달 → gRPC 필드 → 노트 백엔드까지 세 저장소를 가로질러 완성됩니다. K8s · Kong 매니페스트도 직접 관리(18 커밋 · +1,981줄).",
    nodes: [
      { id: "fe", label: "FE 모노레포", sub: "React+Vite · Next.js ×5", x: 10, y: 110, w: 180, h: 80, mine: true },
      { id: "kong", label: "Kong Gateway", sub: "gRPC-Web · REST", x: 250, y: 110, w: 150, h: 80, mine: true },
      { id: "kt", label: "Kotlin gRPC 백엔드", sub: "76 커밋 · +5,560줄", x: 460, y: 16, w: 190, h: 66, mine: true },
      { id: "spring", label: "Spring 계정 서버", sub: "POST /v1/schools 추가", x: 460, y: 116, w: 190, h: 66, mine: true },
      { id: "go", label: "Go 콘텐츠 워커", sub: "502 동기 호출 제거", x: 460, y: 216, w: 190, h: 66, mine: true },
      { id: "db", label: "MySQL", sub: "id tiebreaker 수정", x: 720, y: 116, w: 160, h: 66 },
    ],
    edges: [
      { from: "fe", to: "kong" },
      { from: "kong", to: "kt" },
      { from: "kong", to: "spring" },
      { from: "kong", to: "go" },
      { from: "kt", to: "db" },
      { from: "spring", to: "db" },
      { from: "go", to: "db" },
    ],
  },
  scp: {
    width: 900,
    height: 300,
    note: "5개 저장소 전 계층 기여. RN · Flutter 앱은 단독(94% · 100%), 분석 대시보드는 Django Admin 위에 직접 구축했습니다.",
    nodes: [
      { id: "tw", label: "교사용 웹", sub: "Next.js · 팀 기여 20%", x: 10, y: 10, w: 170, h: 62, mine: true },
      { id: "sw", label: "학생용 웹", sub: "Next.js · 공동 리드 34%", x: 10, y: 82, w: 170, h: 62, mine: true },
      { id: "rn", label: "모바일 앱 (RN)", sub: "단독 94% 주도", x: 10, y: 154, w: 170, h: 62, mine: true },
      { id: "fl", label: "Flutter 앱 (신규)", sub: "단독 100% 주도", x: 10, y: 226, w: 170, h: 62, mine: true },
      { id: "cog", label: "AWS Cognito", sub: "토큰 회전 사고 대응", x: 320, y: 10, w: 190, h: 58 },
      { id: "dj", label: "Django · DRF", sub: "Celery · Redis · 팀 기여", x: 320, y: 118, w: 190, h: 80, mine: true },
      { id: "ocr", label: "OCR 파이프라인", sub: "Mistral OCR · Mathpix", x: 320, y: 236, w: 190, h: 56 },
      { id: "pg", label: "PostgreSQL", sub: "read replica", x: 630, y: 118, w: 170, h: 80 },
      { id: "dash", label: "분석 대시보드", sub: "DAU · 이탈 분포 직접 구축", x: 630, y: 10, w: 170, h: 58, mine: true },
    ],
    edges: [
      { from: "tw", to: "dj" },
      { from: "sw", to: "dj" },
      { from: "rn", to: "dj" },
      { from: "fl", to: "dj" },
      { from: "cog", to: "dj" },
      { from: "ocr", to: "dj" },
      { from: "dj", to: "pg" },
      { from: "dj", to: "dash" },
    ],
  },
  rundem: {
    width: 900,
    height: 280,
    note: "앱 · 서버 · 웹 세 저장소 모두 최다/주요 기여. GPS 배치 저장 → 암묵 일시정지 합성 → reconciliation까지 러닝 도메인을 서버에서 소화합니다.",
    nodes: [
      { id: "app", label: "Flutter 앱", sub: "427 커밋 · 76%", x: 10, y: 36, w: 180, h: 66, mine: true },
      { id: "web", label: "Next.js 웹 · 어드민", sub: "191 커밋 · 35%", x: 10, y: 156, w: 180, h: 66, mine: true },
      { id: "api", label: "Spring Boot API", sub: "267 커밋 · 55%", x: 310, y: 92, w: 200, h: 84, mine: true },
      { id: "pg", label: "PostgreSQL · PostGIS", sub: "hibernate-spatial · JTS", x: 640, y: 10, w: 190, h: 56 },
      { id: "redis", label: "Redis", sub: "ShedLock · Bucket4j", x: 640, y: 80, w: 190, h: 52 },
      { id: "es", label: "Elasticsearch", sub: "검색", x: 640, y: 146, w: 190, h: 52 },
      { id: "aws", label: "AWS S3 · ALB", sub: "미디어 · 배포", x: 640, y: 212, w: 190, h: 52 },
    ],
    edges: [
      { from: "app", to: "api", label: "REST · WebSocket" },
      { from: "web", to: "api" },
      { from: "api", to: "pg" },
      { from: "api", to: "redis" },
      { from: "api", to: "es" },
      { from: "api", to: "aws" },
    ],
  },
  vibeshield: {
    width: 900,
    height: 290,
    boundary: { x: 8, y: 8, w: 884, h: 274, label: "로컬 PC — 네트워크 호출 0" },
    note: "코드가 PC를 벗어나지 않는 룰베이스 결정론 엔진. 오탐률 측정 전용 clean-app 픽스처에서 탐지 1건 = 테스트 실패.",
    nodes: [
      { id: "src", label: "소스코드", sub: "JS · TS · Python", x: 44, y: 110, w: 150, h: 64 },
      { id: "entry", label: "GUI · CLI · git hook · CI", sub: "Electron 대시보드 포함", x: 44, y: 196, w: 190, h: 60, mine: true },
      { id: "engine", label: "스캔 엔진", sub: "YAML 룰 9종 + 환각 탐지 2종", x: 330, y: 108, w: 210, h: 74, mine: true },
      { id: "fix", label: "자동수정", sub: "diff 승인 · 원클릭 롤백", x: 640, y: 52, w: 200, h: 60, mine: true },
      { id: "report", label: "한글 리포트", sub: "ISMS-P 매핑 · 4개 포맷", x: 640, y: 156, w: 200, h: 60, mine: true },
    ],
    edges: [
      { from: "src", to: "engine" },
      { from: "entry", to: "engine" },
      { from: "engine", to: "fix" },
      { from: "engine", to: "report" },
    ],
  },
}

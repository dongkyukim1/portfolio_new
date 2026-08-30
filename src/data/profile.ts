export const profile = {
  name: "김동규",
  nameEn: "Dongkyu Kim",
  handle: "@dongkyukim1",
  roles: ["풀스택 개발자", "웹 · 모바일", "백엔드 · 인프라", "Next.js · Flutter", "Spring Boot · Django"],
  tagline: "풀스택 개발자 — 웹 · 모바일 · 백엔드 · 인프라",
  location: "Seoul, South Korea",
  thesis:
    "에듀테크 B2B SaaS와 학습자용 모바일 앱을 기획된 화면부터 배포된 프로덕션까지 관통해서 만듭니다. React·Next.js, Flutter, React Native로 클라이언트를 만들고, Django·Spring Boot·Go·gRPC로 그 뒤를 받치고, Kubernetes·Kong·Docker로 띄웁니다.",
  thesisTail:
    "최근 11개월 동안 22개 저장소에 4,300건 이상을 커밋했고, 그중 대부분은 실사용자가 쓰는 운영 서비스에 배포됐습니다.",
  philosophy: "매일한다.",
  email: "wlsntus55@gmail.com",
  github: "https://github.com/dongkyukim1",
  blog: "https://begin-developer.tistory.com/",
  resume: "/dongkyu-kim-resume.pdf",
  education: "건국대학교 영어학과 · 경영학과",
}

export const metrics = [
  { value: 29, suffix: "", label: "기여 저장소" },
  { value: 4300, suffix: "+", label: "커밋 (중복 제외)" },
  { value: 6, suffix: "", label: "프로덕션 언어" },
  { value: 1.4, suffix: "M+", label: "기여 코드베이스 LOC", decimals: 1 },
  { value: 4, suffix: "", label: "동시 운영 제품군" },
]

/** 2025.05 ~ 2026.08 월별 커밋 (상대값 %, 최대 1,064 = 2026.07) */
export const activity = {
  range: "2025.05 – 2026.08",
  peak: { value: 1064, label: "2026.07" },
  bars: [0.4, 0.4, 0.4, 0.4, 1, 16, 24, 38, 36, 33, 26, 36, 40, 22, 100, 61],
  axis: ["05", "06", "07", "08", "09", "10", "11", "12", "26·01", "02", "03", "04", "05", "06", "07", "08"],
}

export type Chip = { label: string; hot?: boolean }

export const stack: { group: string; items: Chip[] }[] = [
  {
    group: "언어",
    items: [
      { label: "TypeScript", hot: true },
      { label: "Dart", hot: true },
      { label: "Python", hot: true },
      { label: "Java 17" },
      { label: "Kotlin" },
      { label: "Go" },
      { label: "Ruby" },
      { label: "SQL" },
    ],
  },
  {
    group: "AI · 에이전트",
    items: [
      { label: "Claude (Opus · Sonnet)", hot: true },
      { label: "Claude Code", hot: true },
      { label: "GPT-5 · Codex CLI", hot: true },
      { label: "Gemini" },
      { label: "프롬프트 엔지니어링", hot: true },
      { label: "루프 엔지니어링 (evaluator-optimizer)" },
      { label: "하네스 엔지니어링 (tool · hook · 가드레일)", hot: true },
      { label: "MCP 서버 · 툴 설계" },
      { label: "멀티에이전트 오케스트레이션" },
      { label: "Agent Skills · 워크플로 자동화" },
      { label: "RAG · 임베딩 검색" },
      { label: "LLM Evals · 회귀 테스트" },
      { label: "AI 환각 탐지 (VibeShield)" },
    ],
  },
  {
    group: "프론트엔드",
    items: [
      { label: "React 18/19", hot: true },
      { label: "Next.js 14–16", hot: true },
      { label: "Vite SPA" },
      { label: "TanStack Query" },
      { label: "Zustand" },
      { label: "Tailwind" },
      { label: "Radix UI" },
      { label: "styled-components" },
      { label: "MSW" },
      { label: "KaTeX / MathJax" },
      { label: "Canvas 필기" },
      { label: "Hotwire" },
    ],
  },
  {
    group: "모바일",
    items: [
      { label: "Flutter 3.4x", hot: true },
      { label: "Riverpod" },
      { label: "go_router" },
      { label: "React Native · Expo", hot: true },
      { label: "EAS Build" },
      { label: "Apple Health / Health Connect" },
      { label: "FCM" },
      { label: "App Store · Play 심사" },
    ],
  },
  {
    group: "백엔드",
    items: [
      { label: "Spring Boot 3.4", hot: true },
      { label: "Django / DRF", hot: true },
      { label: "Rails 7.2" },
      { label: "Celery" },
      { label: "gRPC · protobuf" },
      { label: "Go 워커" },
      { label: "JPA / Hibernate" },
      { label: "WebSocket · STOMP" },
      { label: "OAuth2 · JWT" },
      { label: "PostGIS" },
    ],
  },
  {
    group: "데이터 · 인프라",
    items: [
      { label: "PostgreSQL" },
      { label: "MySQL" },
      { label: "Redis" },
      { label: "Elasticsearch" },
      { label: "Kubernetes", hot: true },
      { label: "Kong Gateway", hot: true },
      { label: "Docker Compose" },
      { label: "GCP" },
      { label: "AWS (ECS · S3 · Cognito · ALB)" },
      { label: "GitHub Actions" },
      { label: "Vercel" },
    ],
  },
  {
    group: "관측 · 품질 · 보안",
    items: [
      { label: "Sentry", hot: true },
      { label: "GA4" },
      { label: "Playwright" },
      { label: "Vitest · Jest" },
      { label: "pytest" },
      { label: "Locust" },
      { label: "Electron" },
      { label: "OWASP 룰셋" },
      { label: "Figma MCP" },
    ],
  },
]

/** simpleicons slugs for the 3D icon cloud */
export const cloudSlugs = [
  "typescript", "javascript", "python", "dart", "go", "kotlin", "ruby", "openjdk",
  "react", "nextdotjs", "vite", "tailwindcss", "radixui", "reactquery", "flutter", "expo",
  "django", "springboot", "rubyonrails", "celery", "grpc", "hibernate", "socketdotio",
  "postgresql", "mysql", "redis", "elasticsearch", "kubernetes", "kong", "docker", "googlecloud",
  "amazonwebservices", "githubactions", "vercel", "sentry", "googleanalytics", "playwright", "vitest",
  "jest", "pytest", "electron", "figma", "firebase", "git", "github", "apple", "android",
  "anthropic", "claude", "openai", "googlegemini", "modelcontextprotocol", "huggingface", "ollama",
]

export type ProjectTag = "web" | "mobile" | "backend" | "infra" | "ai"
export const TAG_LABEL: Record<ProjectTag, string> = { web: "웹", mobile: "모바일", backend: "백엔드", infra: "인프라", ai: "AI" }

export type Project = {
  id: string
  name: string
  sub: string
  period: string
  role?: string
  tagline: string
  stack: string[]
  highlights: { title: string; body: string; impact?: string }[]
  stats?: { k: string; v: string }[]
  shares?: { repo: string; note?: string; label: string; pct: number; tier: "lead" | "co" | "part" }[]
  links?: { label: string; href: string }[]
  featured?: boolean
  tags: ProjectTag[]
}

export const projects: Project[] = [
  {
    id: "ilro",
    tags: ["web", "backend", "infra"],
    name: "ilro",
    sub: "학원 LMS 플랫폼 (수학 · 과학)",
    period: "2026.04 — 재직 중",
    role: "프론트엔드 모노레포 최다 기여자",
    featured: true,
    tagline:
      "교사용 학원 관리 SaaS, 학생용 학습 앱, 문항 생산 어드민을 하나의 계정·콘텐츠 축 위에 올린 제품군. 프론트엔드 모노레포의 최다 기여자로서 5개 서비스를 담당하면서, 필요할 때마다 Kotlin gRPC 백엔드 · Go 콘텐츠 워커 · Spring 계정 서버 · Kong/K8s 매니페스트까지 직접 내려가 기능을 종단으로 붙였습니다.",
    stack: ["Yarn Workspaces 모노레포", "React + Vite", "Next.js", "gRPC-Web", "Kotlin", "Go", "Spring Boot", "MySQL", "Kubernetes · Kong"],
    highlights: [
      {
        title: "OCR 문항 검토 도구를 “쓸 만한” 수준으로 끌어올림",
        body: "인쇄물에서 추출된 문항의 번호가 틀리게 인식되던 문제를 인라인 번호 수정 + 점유된 번호와의 확인 후 맞바꾸기(swap)로 해결. 스왑이 자기 자신을 되돌리는 involution 루프에 빠지지 않도록 origin-keyed 저장 트랜잭션을 재설계하고, 중복 판정에 밀려 숨어 있던 레코드를 꺼내오는 경로를 추가했습니다.",
      },
      {
        title: "학생 필기(Canvas) 입력 시스템 재설계",
        impact: "Sentry 센티널",
        body: "손가락 스크롤과 펜 필기가 서로를 오인하던 문제를 명시적 inputMode(draw/scroll) 도입으로 정리하고, draw 모드에서 두 손가락 제스처(세로 스크롤 · 핀치 확대 · 가로 문제 이동)를 하나로 통합. 캔버스 메모리 누수 재발을 감시하는 Sentry 센티널(생존 카운터 + 임계 초과 경보)을 함께 심었습니다.",
      },
      {
        title: "제품 전면 리디자인 — Figma 노드 단위 정합",
        body: "LMS 전 페이지를 새 디자인 시스템으로 전환. 테이블 문법(고정 헤더 · 정렬 · 필터 · 구분선 정책), pill 버튼 규격, 캘린더 데이트피커를 전 페이지 공통 규약으로 통일. 768 / 1024 / 1280 브레이크포인트 태블릿 반응형을 별도 트랙으로 진행.",
      },
      {
        title: "기능을 화면에서 멈추지 않고 서버까지 내림",
        impact: "저장소 3개 관통",
        body: "“검색에 없는 학교 직접 등록”은 POST /v1/schools를 계정 서버에 추가해 완성했고, 선생님 노트 전송 기능은 FE 모달 → gRPC 리소스 필드(lesson_index) → 노트 백엔드 WEB 플랫폼 확장까지 세 저장소를 가로질러 배선했습니다.",
      },
      {
        title: "운영 중 회귀·장애 추적",
        impact: "id tiebreaker",
        body: "학생 목록 페이지네이션의 동점 정렬 중복·누락을 백엔드 id tiebreaker로 근본 수정. 콘텐츠 워커의 502를 유발하던 동기 호출을 트레이스에서 제거하고, 404 무한 루프를 만들던 stale 섹션을 걷어냈습니다.",
      },
      {
        title: "성능 · 빌드",
        impact: "22MB → 2.88MB",
        body: "메인 CSS 번들 22MB → 2.88MB 축소. 어드민의 해설 조회를 병렬 청크 fetch + 이미지 네이티브 lazy-loading으로 개선.",
      },
    ],
    shares: [
      { repo: "ilro-frontend", label: "1,422 / 2,517 · 56%", pct: 56, tier: "lead" },
      { repo: "mission-control", label: "21 / 21 · 100%", pct: 100, tier: "lead" },
      { repo: "ilro-backend", label: "76 커밋 · +5,560줄", pct: 34, tier: "co" },
      { repo: "ilro-workspace / k8s", label: "18 커밋 · +1,981줄", pct: 28, tier: "co" },
      { repo: "content-worker · account · note", label: "32 커밋", pct: 18, tier: "part" },
    ],
    stats: [
      { k: "코드 변경", v: "+170,824 / −51,804" },
      { k: "코드베이스", v: "358,683 LOC" },
      { k: "테스트 파일", v: "546" },
      { k: "fix / feat", v: "432 / 364" },
      { k: "lms-web (교사용 SaaS)", v: "2,205 파일" },
      { k: "data-farm-admin-web", v: "1,743 파일" },
    ],
  },
  {
    id: "scp",
    tags: ["web", "mobile", "backend", "ai"],
    name: "Science Circuit Program",
    sub: "적응형 학습 플랫폼",
    period: "2025.10 — 2026.08",
    role: "5개 저장소 전 계층 기여 · 모바일 단독",
    tagline:
      "과학·국어·영어 3개 과목을 다루는 적응형 문제은행 플랫폼. Django 백엔드 · 교사용 웹 · 학생용 웹 · 학생용 앱까지 5개 저장소 전 계층에 기여했고, 모바일 앱과 신규 Flutter 앱은 단독으로 맡았습니다.",
    stack: ["Django · DRF", "Celery + Redis", "PostgreSQL (read replica)", "Next.js 14/15", "React Native · Expo", "Flutter", "AWS Cognito", "Mistral OCR · Mathpix"],
    highlights: [
      {
        title: "UX 이벤트 로깅을 제품 전 계층에 종단 설계",
        impact: "별도 BI 도구 0",
        body: "웹·모바일 클라이언트에 버퍼링 기반 이벤트 수집기를 심고, Django Admin 위에 분석 대시보드를 직접 구축. DAU, 플랫폼별 완료율, 이탈 문제번호 분포, 답변 시간 분포까지 — 별도 BI 도구 없이 운영 지표를 볼 수 있게 만들었습니다.",
      },
      {
        title: "인증 사고 대응: 토큰 회전으로 인한 부당 로그아웃",
        impact: "401 연쇄 차단",
        body: "Cognito refresh token rotation 환경에서 일시적 갱신 실패가 전역 로그아웃으로 이어지던 문제를 수정. 회전된 토큰을 확실히 영속화하고 실제 만료인 경우에만 로그아웃하도록 게이트를 세워 401 연쇄와 폴링 루프를 끊었습니다.",
      },
      {
        title: "캐시 정합성과 집계 API",
        impact: "N+1 제거",
        body: "리포트·AI 인사이트 캐시를 명시적으로 무효화하도록 정리하고, 문제세트 실제 문항 수를 한 번에 가져오는 effective-counts 배치 API로 N+1 조회를 걷어냈습니다.",
      },
      {
        title: "영어·국어 과목 확장",
        body: "수능 문항 유형 매핑, 다의어(polysemy) 채점 로직, 한국어 번역이 붙는 영어 DOCX 빌더, 오답노트 그룹 조회 엔드포인트를 백엔드에 추가하고 학생 웹 UI까지 이어 붙였습니다.",
      },
      {
        title: "모바일 앱 단독 운영 (94% 지분)",
        body: "iPad · Galaxy Tab 대응 반응형 시스템, Android canvas bitmap overflow 크래시 수정(Sentry 이슈 기반), 딥링크 핸들러, QnA 기능 릴리즈까지 담당했습니다.",
      },
    ],
    shares: [
      { repo: "scp-mobile", note: "RN", label: "374 · 94% 주도", pct: 94, tier: "lead" },
      { repo: "scp-flutter", note: "신규 앱", label: "70 · 100% 주도", pct: 100, tier: "lead" },
      { repo: "student-frontend", label: "263 · 공동 리드", pct: 34, tier: "co" },
      { repo: "teacher-frontend", label: "336 · 팀 기여", pct: 20, tier: "part" },
      { repo: "backend", note: "Django", label: "399 · 팀 기여", pct: 14, tier: "part" },
    ],
    stats: [
      { k: "총 커밋", v: "1,442" },
      { k: "백엔드 feat / fix", v: "169 / 46" },
      { k: "모바일 feat / fix", v: "104 / 25" },
      { k: "백엔드 테스트 파일", v: "296" },
      { k: "Flutter 패리티 정합", v: "33 / 36건" },
    ],
  },
  {
    id: "challengers",
    tags: ["mobile"],
    name: "challengers",
    sub: "학생용 통합 학습 앱 (Flutter)",
    period: "2026.07 — 재직 중",
    role: "커밋 83% 담당 · 스토어 릴리즈 운영",
    tagline:
      "수학 · 과학 · 국어 세 과목을 한 앱에 통합한 학생용 네이티브 앱. 과목마다 인증 축과 API 축이 다른 상태에서 단일 셸로 묶고 스토어 릴리즈까지 운영하고 있습니다.",
    stack: ["Flutter 3.41 / Dart 3.11", "Riverpod", "go_router", "Dio + 캐시 인터셉터", "Firebase (FCM · Remote Config)", "Sentry + Talker", "flutter_math_fork"],
    highlights: [
      {
        title: "제출 순단을 사용자에게서 감춤",
        body: "레벨테스트 제출 중 네트워크 순단으로 답안이 유실되던 경로에 재시도를 넣고, 필기 저장을 임계 경로에서 분리해 제출 응답 시간을 사용자 체감에서 떼어냈습니다.",
      },
      {
        title: "필기 벡터 정본화",
        impact: "래스터 → 벡터",
        body: "레벨테스트 필기를 래스터가 아닌 벡터로 정본 저장하도록 전환해, 웹·앱 어디서 다시 열어도 같은 풀이가 재현되고 재필기가 가능하도록 만들었습니다.",
      },
      {
        title: "과목별 인증 축 정리",
        body: "국어 트랙의 Dio 인스턴스가 과학 축을 바라보고 있어 인증이 성립하지 않던 문제, dev 빌드가 prod API를 보던 tier 분기 누락을 찾아 교정. 트랙 노출을 게이트 하나로 묶어 미인증 통과 경로를 막았습니다.",
      },
      {
        title: "Sentry 노이즈 관리",
        body: "408 / 429, 로그인 프로필 4xx 같은 “정상적인 실패”를 억제해 이슈 목록이 실제 버그만 남도록 유지.",
      },
    ],
    stats: [
      { k: "현재 버전", v: "v1.0.46" },
      { k: "내 커밋 / 전체", v: "444 / 534 (83%)" },
      { k: "코드베이스", v: "104,282 LOC" },
      { k: "테스트 파일", v: "94" },
      { k: "fix / feat", v: "139 / 108" },
    ],
  },
  {
    id: "rundem",
    tags: ["mobile", "backend", "web"],
    name: "런덤메이트",
    sub: "러닝 크루 소셜 앱 (풀스택 3-tier)",
    period: "2025.12 — 2026.06",
    role: "앱 · 서버 · 웹 세 저장소 최다/주요 기여자",
    tagline:
      "GPS 러닝 트래킹 + 크루 커뮤니티 + 실시간 채팅을 묶은 소셜 앱. Flutter 앱 · Spring Boot API · Next.js 웹/어드민 세 저장소 모두에서 최다 또는 주요 기여자로 참여해, 도메인 모델부터 앱스토어 심사 대응까지 한 사이클을 끝냈습니다.",
    stack: ["Spring Boot 3.4 · Java 17", "PostgreSQL + PostGIS", "Redis", "Elasticsearch", "WebSocket · STOMP", "OAuth2 · JWT", "Flutter", "Next.js 16 · React 19", "AWS S3 · ALB"],
    highlights: [
      {
        title: "러닝 세션 도메인 — 현실의 GPS는 지저분하다",
        body: "GPS 포인트 배치 저장 파이프라인을 만들고, 앱이 백그라운드로 밀려 신호가 끊긴 구간을 암묵 일시정지로 합성해 통계에 반영. 뒤늦게 올라온 GPS 업데이트로 지표가 틀어지는 문제도 reconciliation 단계로 처리했습니다.",
      },
      {
        title: "Hibernate 영속성 버그를 우회가 아니라 원인으로 해결",
        impact: "AssertionFailure 0",
        body: "러닝 통계 엔티티 저장 시 반복되던 AssertionFailure를 merge 대신 persist 경로를 타도록 version·userId 처리를 바로잡아 제거했습니다.",
      },
      {
        title: "갓 메서드 해체",
        impact: "7 · 7 · 5 헬퍼",
        body: "회원가입 · GPS 포인트 저장 · 세션 종료 세 개의 거대 메서드를 각각 7 / 7 / 5개의 의도가 드러나는 헬퍼로 분해. 이후 기능 추가가 이 구조 위에서 국소적으로 끝났습니다.",
      },
      {
        title: "스토어 릴리즈 운영",
        body: "Apple Sign-In, Apple Health / Health Connect 동기화, Apple 심사 5.1.1(iv) 대응과 다크패턴 가드, ASO 메타데이터 작성까지 릴리즈 사이클을 직접 돌렸습니다.",
      },
    ],
    shares: [
      { repo: "app", note: "Flutter", label: "427 커밋 · 76%", pct: 76, tier: "lead" },
      { repo: "server", note: "Spring Boot", label: "267 커밋 · 55%", pct: 55, tier: "lead" },
      { repo: "front", note: "Next.js", label: "191 커밋 · 35%", pct: 35, tier: "co" },
    ],
    stats: [
      { k: "총 커밋", v: "885" },
      { k: "합산 코드베이스", v: "260,833 LOC" },
      { k: "테스트 파일", v: "114" },
      { k: "공간 질의", v: "hibernate-spatial · JTS" },
      { k: "분산 락 · 레이트리밋", v: "ShedLock · Bucket4j" },
    ],
  },
  {
    id: "vibeshield",
    tags: ["ai", "web", "backend"],
    name: "VibeShield",
    sub: "로컬 코드 보안 점검 데스크톱 앱",
    period: "2026",
    role: "단독 · 엔진 + GUI + 랜딩",
    tagline:
      "“보안 담당자를 뽑는 대신, 설치한다.” 개발팀은 있지만 보안 전담자가 없는 중소 팀을 위한 로컬 코드 보안 점검 엔진. 코드는 PC를 벗어나지 않고(네트워크 호출 0), 판정은 룰베이스로 결정론적이라 감사 증빙으로 쓸 수 있습니다.",
    stack: ["TypeScript", "Electron 33", "zod", "YAML 룰셋", "Vitest", "electron-builder (dmg · exe)", "Next.js 15 랜딩", "Framer Motion", "Vercel"],
    highlights: [
      {
        title: "OWASP 기반 9종 취약점 + 한국 규제 매핑",
        impact: "ISMS-P 매핑",
        body: "SQL 인젝션 · XSS · 하드코딩 비밀키 · 명령어 주입 · 경로 조작 · 취약 암호화 · 역직렬화 · SSRF · 인증 누락을 YAML 룰로 정의하고, 각 룰을 ISMS-P · 전자금융감독규정 조항에 매핑해 한글 리포트를 생성합니다.",
      },
      {
        title: "AI 환각 API 탐지 — 닫힌 세계 원칙",
        body: "존재하지 않는 함수 호출(df.to_csv_encrypted())과 슬롭스쿼팅 패키지(reqeusts)를 탐지. 등록된 네임스페이스에 한해서만 판정하므로 모르는 사내 패키지 때문에 오탐이 나지 않습니다.",
      },
      {
        title: "자동수정 → diff 승인 → 원클릭 롤백",
        body: "계획 단계는 파일을 건드리지 않고, 적용 시 원본을 백업. 오탐률 측정 전용 clean-app 픽스처에서 탐지 1건이 곧 테스트 실패입니다.",
      },
      {
        title: "GUI · CLI · git hook · CI 게이트",
        body: "비개발자용 대시보드(심각도 KPI, 규정 매핑, 룰 목록)와 vibeshield scan/fix/rollback CLI, pre-commit 훅, --fail-on critical CI 게이트를 함께 제공. Next.js 15 + Framer Motion 랜딩 페이지를 Vercel에 배포.",
      },
    ],
    stats: [
      { k: "탐지 룰", v: "9종 + 환각 2종" },
      { k: "지원 언어", v: "JS / TS / Python" },
      { k: "네트워크 호출", v: "0" },
      { k: "리포트 포맷", v: "text · md · html · json" },
    ],
    links: [
      { label: "엔진 · 앱", href: "https://github.com/dongkyukim1/vibeshield" },
      { label: "랜딩 페이지", href: "https://vibeshield-landing.vercel.app" },
      { label: "배포본", href: "https://github.com/dongkyukim1/vibeshield-releases" },
    ],
  },
  {
    id: "mission-control",
    tags: ["web", "backend"],
    name: "mission-control",
    sub: "제품 운영 지표 대시보드",
    period: "2026.08 · 단독 · 100%",
    tagline:
      "“지금 사용자가 어디서 헤매고 있는가”를 한 화면에서 보기 위해 처음부터 끝까지 혼자 만든 내부 대시보드. 2주 남짓에 19,000줄을 붙여 프로덕션에 올렸습니다.",
    stack: ["Next.js", "GA4 Data API", "Sentry API", "서버리스 배포"],
    highlights: [
      {
        title: "지표의 정직성을 코드로 강제",
        body: "수집 기간이 다른 두 구간을 나란히 비교해 “증감률”처럼 보여주던 위젯의 판정 조건을 통계적으로 재설계해, 대시보드가 없는 신호를 만들어내지 않게 했습니다.",
      },
      {
        title: "행동 분석 탭",
        body: "‘헤맴’ 지표, 화면별 활동·오류, 신규 vs 재방문을 GA4 데이터 계층 위에 올렸고, GA4 쿼터를 방어하는 캐시·배칭을 넣었습니다. Sentry 이슈를 한글 라벨로 정규화해 비개발자도 읽을 수 있게 했습니다.",
      },
      {
        title: "서버리스 환경 P0 3건",
        body: "인스턴스가 상시 유지되지 않는 환경에서 무력화되던 세션 만료 UX · rate limit · health check를 서버리스 전제에 맞게 다시 구현했습니다.",
      },
    ],
    stats: [
      { k: "커밋 (전부 본인)", v: "21 / 21" },
      { k: "코드 변경", v: "+19,233 / −1,132" },
      { k: "기간", v: "약 2주" },
      { k: "PR", v: "9건 · 전부 머지" },
    ],
  },
  {
    id: "megastudy",
    tags: ["web", "mobile"],
    name: "megastudy",
    sub: "학습 웹 + Flutter 앱 동시 구축",
    period: "2026.03 — 2026.04",
    tagline:
      "같은 학습 도메인을 웹과 앱 두 클라이언트로 동시에 세우면서, 디자인 토큰과 반응형 티어를 두 플랫폼이 공유하는 규약으로 먼저 정립한 프로젝트.",
    stack: ["Next.js", "Flutter", "Zustand", "Sentry sourcemap"],
    highlights: [
      {
        title: "토큰 시스템을 먼저 세우고 화면을 얹음",
        body: "앱의 색·타이포를 lib/core/theme 하나로 통합(AppColors / AppTypography)하고, AppCard · AppChip · AppListTile · AppButton으로 화면을 재조립. 이후 화면 추가가 훨씬 싸졌습니다.",
      },
      {
        title: "세션 잠금과 학습 계획",
        body: "회차 잠금 메커니즘, 지역별 세트 필터링, 세트 유형 배지 체계를 웹에 구현하고, 앱에는 딥링크로 오답노트에 바로 진입하는 경로를 붙였습니다.",
      },
      {
        title: "튜토리얼 앵커 시스템",
        body: "화면 전반에 튜토리얼 앵커를 등록하는 방식을 도입해, 온보딩 스텝을 화면 코드와 분리해 관리할 수 있게 했습니다.",
      },
    ],
    stats: [
      { k: "megastudy (웹)", v: "138 · 72%" },
      { k: "megastudy-mobile", v: "84 · 100%" },
      { k: "refactor 비중", v: "29 / 84" },
    ],
  },
  {
    id: "portfolio-2026",
    tags: ["web", "backend"],
    name: "portfolio_2026",
    sub: "Rails 풀스택 포트폴리오 사이트",
    period: "2026.02",
    role: "단독 · PDCA 문서 기반 개발",
    tagline:
      "방명록·연락 폼·프로젝트 태그 API·PWA·사이트맵까지 갖춘 서버 렌더링 포트폴리오. Liquid Glass 커스텀 디자인 시스템을 Tailwind 위에 세우고, Plan → Design → Analysis → Report 문서를 코드와 함께 관리했습니다.",
    stack: ["Ruby on Rails 7.2", "PostgreSQL", "Hotwire (Turbo · Stimulus)", "Tailwind CSS", "Docker", "GitHub Actions"],
    highlights: [
      {
        title: "리소스 라우팅 + JSON API 이중 제공",
        body: "guestbook · contacts · projects · tags를 HTML 뷰와 /api 네임스페이스 양쪽으로 노출해, 서버 렌더링과 외부 소비를 같은 모델로 처리했습니다.",
      },
      {
        title: "PWA · Sitemap · Health check",
        body: "service worker · manifest 라우트, XML 사이트맵, /up 헬스 체크를 기본 탑재해 배포 직후 바로 검색·설치·모니터링이 가능하게 구성.",
      },
      {
        title: "설계 문서가 곧 컨벤션",
        body: "CONVENTIONS.md에 폴더 구조·네이밍·Stimulus 컨트롤러 규약을 명시하고, docs/01-plan ~ 04-report로 PDCA 사이클을 기록했습니다.",
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/dongkyukim1/portfolio_2026" }],
  },
]

export const sideProjects = [
  {
    stack: "Python · Playwright · TourAPI",
    name: "consulting-automation",
    body: "관광데이터 컨설팅의 서면 답변 작성을 자동화. 케이스를 수집하고 → 질문을 TourAPI에 직접 던져 실측한 뒤 → 그 근거로 답변 초안·실행 가능한 MVP 소스·스크린샷을 케이스별 폴더로 산출합니다. 답을 지어내지 않고 측정해서 쓰게 만든 파이프라인.",
    href: "https://github.com/dongkyukim1/consulting-automation",
  },
  {
    stack: "Spring Boot · 참조 구현",
    name: "길동무 MVP",
    body: "“자체 DB 저장 + 배치 동기화” 대신 실시간 호출 + 단기 TTL + 장애 격리가 왜 더 나은지를 동작하는 코드로 증명한 참조 구현. 공공 API 제공기관의 권고(로컬 캐싱 금지)를 만족시키면서 응답 속도와 안정성을 확보했습니다.",
    href: "https://github.com/dongkyukim1/gildongmu-mvp",
  },
  {
    stack: "Vanilla JS · iTunes API · Supabase",
    name: "TMT Album Board",
    body: "블라인드 음악 리뷰 보드. 내 평점을 먼저 남겨야 남의 평이 열리는 규칙으로 앵커링 편향을 제거했습니다. 앨범 메타데이터는 iTunes API 실시간 조회, 공유 리뷰와 매직링크 로그인은 Supabase.",
    href: "https://github.com/dongkyukim1/tmt-album-board",
  },
  {
    stack: "Flutter · Dart · Provider",
    name: "LittleBank",
    body: "아이들을 위한 목표 설정 + 용돈 관리 앱. 기획부터 배포까지 단독 개발. 목표 진행도 시각화와 보상 시스템, Custom Widget 기반 인터랙티브 UI.",
    href: "https://github.com/dongkyukim1/topster_flutter",
  },
]

export const approach = [
  {
    title: "증상이 아니라 원인에서 멈춥니다",
    body: "Hibernate AssertionFailure를 try-catch로 덮는 대신 persist 경로를 타게 고치고, 페이지네이션 중복을 프론트에서 dedupe하는 대신 백엔드에 tiebreaker를 넣고, 필기 오인식을 감도 조정이 아니라 명시적 입력 모드로 해결했습니다.",
  },
  {
    title: "고친 것이 다시 깨지는지 감시합니다",
    body: "캔버스 메모리 누수에는 생존 카운터와 임계 경보를 붙이고, Sentry에서는 정상적인 실패(408·429)를 억제해 이슈 목록을 신호만 남깁니다.",
  },
  {
    title: "경계에서 멈추지 않습니다",
    body: "프론트 이슈의 원인이 gRPC 필드 부재나 Kong 라우팅이면 그쪽 저장소를 열어 고칩니다. 하나의 기능을 위해 최대 세 개 저장소를 가로질러 배선했습니다.",
  },
  {
    title: "배포는 개발의 일부입니다",
    body: "Kubernetes 매니페스트, Kong 게이트웨이 설정, 배포 Makefile, 로컬 dev 오케스트레이션 스크립트를 직접 관리합니다. dev와 prod의 Cognito 풀이 달랐던 설정 드리프트도 여기서 잡아냈습니다.",
  },
  {
    title: "디자인 정합을 픽셀 단위로 가져갑니다",
    body: "Figma 노드 ID 단위 QA에 대응하고, 테이블 문법·버튼 규격·캘린더 같은 반복 요소는 공통 규약으로 승격시켜 개별 화면에서 다시 결정하지 않게 만듭니다.",
  },
]

export const commitNature = [
  { k: "feat", note: "기능", v: 1363 },
  { k: "fix", note: "버그", v: 855 },
  { k: "refactor", note: "구조", v: 390 },
  { k: "test", v: 20 },
  { k: "perf", v: 5 },
]

export const timeline = [
  { when: "2026.04 — 현재", what: "ilro · challengers", note: "학원 LMS 플랫폼 + 학생용 통합 앱 — 프론트 모노레포 최다 기여" },
  { when: "2025.10 — 2026.08", what: "Science Circuit Program", note: "적응형 학습 플랫폼 5개 저장소 전 계층" },
  { when: "2024.09 — 현재", what: "AIDU · Full Stack Developer", note: "Django · Next.js · React Native · AWS" },
  { when: "2024.09", what: "정보처리기사 (필기)", note: "" },
  { when: "2024.06", what: "SQLD", note: "" },
  { when: "2024.03 — 2024.08", what: "소프트웨어인재개발원", note: "개발자 과정 수료" },
  { when: "2022.12 — 2023.06", what: "태흥엔지니어링", note: "해외출장 담당" },
  { when: "2017.03 — 2022.12", what: "스마트스토어 운영", note: "한정판 브랜드" },
  { when: "2017.04", what: "건국대학교 졸업", note: "영어학과 · 경영학과 / University of Mississippi 교환" },
]

export const method =
  "모든 수치는 각 저장소에서 git log --all --author=<me>로 직접 집계했습니다. 커밋 수는 dev → prod 승격 과정의 체리픽 중복을 제거하기 위해 커밋 제목 기준으로 중복 제거한 값(원본 4,646건 → 약 4,300건)입니다. LOC는 lock 파일·생성 코드·에셋을 제외한 소스 파일 기준이며, ‘기여 코드베이스’는 내가 커밋한 저장소들의 합계로 전부를 내가 작성했다는 뜻이 아닙니다. 기여 지분은 git shortlog -sn의 저자별 커밋 비율입니다. 기간은 2024.07 – 2026.08, 집중 개발 구간은 2025.10 이후 11개월입니다."

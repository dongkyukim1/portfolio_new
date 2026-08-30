import type { Metadata, Viewport } from "next"
import { Geist_Mono, Onest } from "next/font/google"
import "./globals.css"

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "김동규 — 풀스택 개발자",
  description:
    "웹 · 모바일 · 백엔드 · 인프라를 관통하는 풀스택 개발자 김동규의 포트폴리오. Next.js, Flutter, Spring Boot, Django, Kubernetes.",
  metadataBase: new URL("https://dongkyukim.com"),
  openGraph: {
    title: "김동규 — 풀스택 개발자",
    description: "기획된 화면부터 배포된 프로덕션까지. 29개 저장소 · 4,300+ 커밋.",
    locale: "ko_KR",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#04050c",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`dark ${onest.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ground text-ink">{children}</body>
    </html>
  )
}

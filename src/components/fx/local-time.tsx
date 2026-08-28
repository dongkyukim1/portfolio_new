"use client"

import { useEffect, useState } from "react"

/** Live Seoul clock — a small "someone is here" detail in the contact block. */
export function LocalTime() {
  const [now, setNow] = useState<string>("")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="tabular font-mono text-[12.5px] text-ink-3" suppressHydrationWarning>
      Seoul · {now || "--:--:--"} KST
    </span>
  )
}

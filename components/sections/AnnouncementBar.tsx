'use client'

import { useEffect, useState } from 'react'

function getTimeUntilMidnight() {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const diff = Math.max(0, midnight.getTime() - now.getTime())
  const h = Math.floor(diff / 3_600_000)
  const m = Math.floor((diff % 3_600_000) / 60_000)
  const s = Math.floor((diff % 60_000) / 1_000)
  return { h, m, s }
}

const pad = (n: number) => String(n).padStart(2, '0')

export function AnnouncementBar() {
  const [time, setTime] = useState(getTimeUntilMidnight())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntilMidnight()), 1_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full bg-brand text-white py-[9px] px-4 text-center select-none">
      <p className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase leading-none">
        45% OFF Sunglasses for Spring&nbsp;&nbsp;|&nbsp;&nbsp;Offer ends in&nbsp;
        <span className="font-bold tabular-nums">
          {pad(time.h)}H : {pad(time.m)}M : {pad(time.s)}S
        </span>
      </p>
    </div>
  )
}

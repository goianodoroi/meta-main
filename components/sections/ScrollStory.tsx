'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─── Frame sequence ─────────────────────────────────────── */
const TOTAL_FRAMES = 26
const frames = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) =>
    `/images/oculos02/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`,
)

/* ─── Steps copy ─────────────────────────────────────────── */
const steps = [
  {
    num: '01',
    title: 'Wear and forget you have them on',
    body: 'Meta Glasses were designed to disappear on your face. Lightweight, discreet, comfortable all day long.',
  },
  {
    num: '02',
    title: 'One tap.',
    body: 'One tap to record, one for photos, one to pause music. No menus, no password, no waiting. The moment won\'t wait - and neither will your glasses.',
  },
  {
    num: '03',
    title: 'Share whenever you want',
    body: 'Everything syncs automatically with the app. When you get home - or whenever you want - your best moments are already ready to share.',
  },
]

/* ─── Canvas sequencer ───────────────────────────────────── */
function FrameCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    imagesRef.current = frames.map((src) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loadedRef.current++
        if (loadedRef.current === TOTAL_FRAMES) setReady(true)
      }
      return img
    })
  }, [])

  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const index = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)
    const img = imagesRef.current[index]
    if (!img.complete) return
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
  }, [progress, ready])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'w-full h-full object-contain transition-opacity duration-300',
        ready ? 'opacity-100' : 'opacity-0',
      )}
      style={{ mixBlendMode: 'multiply' }}
      aria-hidden="true"
    />
  )
}

/* ─── Step item ──────────────────────────────────────────── */
function StepItem({ num, title, body, index }: (typeof steps)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5 items-start"
    >
      <span className="shrink-0 font-sans text-[12px] font-semibold tracking-[0.08em] text-brand mt-[3px] w-6">
        {num}
      </span>
      <div className="relative shrink-0">
        <div className="absolute left-0 top-2 bottom-0 w-px bg-border" />
      </div>
      <div className="flex flex-col gap-1.5 pb-10">
        <h3 className="font-sans text-[16px] font-semibold leading-snug text-text-1 tracking-[-0.01em]">
          {title}
        </h3>
        <p className="font-sans text-[14px] leading-[1.65] text-text-3 max-w-[320px]">
          {body}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Main ───────────────────────────────────────────────── */
export function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const rawProgress = useTransform(scrollYProgress, [0, 0.95], [0, 1])
  const [currentProgress, setCurrentProgress] = useState(0)
  useEffect(
    () => rawProgress.on('change', (v) => setCurrentProgress(Math.max(0, Math.min(1, v)))),
    [rawProgress],
  )

  const headingColor = useTransform(
    scrollYProgress,
    [0.4, 0.8],
    ['#050505', '#0457CB'],
  )

  return (
    <section ref={sectionRef} className="relative bg-white">

      {/* ════════════════════════════════════════
          DESKTOP — duas colunas sticky + scroll
          ════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl px-8 xl:px-16">
          <div className="grid grid-cols-2 gap-16 items-start">

            {/* Coluna esquerda — canvas sticky */}
            <div className="sticky top-[10vh] h-[80vh] flex items-center justify-center">
              <div className="relative w-full aspect-[4/3]">
                <FrameCanvas progress={currentProgress} />
              </div>
            </div>

            {/* Coluna direita — copy rola normalmente */}
            <div className="flex flex-col justify-center py-24 min-h-[140vh]">
              <motion.h2
                ref={headingRef}
                initial={{ opacity: 0, y: 22 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-medium tracking-[-0.03em] leading-[1.1] mb-14"
                style={{ fontSize: 'clamp(26px, 3vw, 44px)', color: headingColor }}
              >
                Simple enough
                <br />
                <span className="font-normal opacity-40">not to think about it.</span>
              </motion.h2>

              <div className="flex flex-col">
                {steps.map((s, i) => (
                  <StepItem key={s.num} {...s} index={i} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE — canvas sticky em cima, copy embaixo
          ════════════════════════════════════════ */}
      <div className="lg:hidden">
        {/* canvas sticky */}
        <div
          className="sticky top-0 w-full flex items-start justify-center pt-6 overflow-hidden pointer-events-none"
          aria-hidden="true"
          style={{ zIndex: 0, height: '60vh' }}
        >
          <div className="relative w-full max-w-lg mx-auto px-6 aspect-[4/3]">
            <FrameCanvas progress={currentProgress} />
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
          />
        </div>

        {/* copy */}
        <div className="relative bg-white z-10 px-5 sm:px-8 py-12 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-medium tracking-[-0.03em] leading-[1.1] mb-12"
            style={{ fontSize: 'clamp(26px, 7vw, 36px)', color: headingColor }}
          >
            Simple enough
            <br />
            <span className="font-normal opacity-40">not to think.</span>
          </motion.h2>

          <div className="flex flex-col">
            {steps.map((s, i) => (
              <StepItem key={s.num} {...s} index={i} />
            ))}
          </div>
        </div>

        <div className="h-2" />
      </div>

    </section>
  )
}

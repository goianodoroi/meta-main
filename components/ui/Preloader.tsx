'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export function Preloader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simula progresso crescente até 100%
    const startTime = Date.now()
    const duration = 2200 // ms mínimo

    const tick = () => {
      const elapsed = Date.now() - startTime
      const p = Math.min((elapsed / duration) * 100, 98)
      setProgress(p)
      if (p < 98) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    // Aguarda carregamento da página + tempo mínimo
    const finish = () => {
      setProgress(100)
      setTimeout(() => setVisible(false), 400)
    }

    const minDelay = new Promise<void>((r) => setTimeout(r, duration))

    if (document.readyState === 'complete') {
      minDelay.then(finish)
    } else {
      Promise.all([
        minDelay,
        new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true })),
      ]).then(finish)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          {/* Lottie */}
          <div className="w-36 h-36">
            <DotLottieReact
              src="https://lottie.host/9de30d96-f415-4798-b466-a6f067888b73/QSLm9Tb4GN.lottie"
              loop
              autoplay
            />
          </div>

          {/* Barra de progresso */}
          <div className="mt-6 w-48 h-[3px] rounded-full bg-border overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-brand"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

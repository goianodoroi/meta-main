'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <section className="bg-surface-2 border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-xl px-5 sm:px-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-sans font-medium text-text-1 tracking-[-0.03em] leading-[1.1] mb-8"
            style={{ fontSize: 'clamp(20px, 3vw, 30px)' }}
          >
            Get news and <span className="text-brand">updates</span>
          </h2>

          {/* Form */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div
              className={cn(
                'flex-1 relative rounded-pill border bg-white transition-all duration-200',
                focused ? 'border-brand shadow-[0_0_0_3px_rgba(4,87,203,0.12)]' : 'border-border',
              )}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={cn(
                  'w-full h-12 bg-transparent px-5 text-[14px] font-sans text-text-1',
                  'placeholder:text-text-4 focus:outline-none rounded-pill',
                )}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={cn(
                'h-12 px-6 rounded-pill font-sans font-medium text-[14px]',
                'bg-brand text-white shrink-0',
                'hover:bg-brand-hover transition-colors duration-200',
              )}
            >
              Subscribe
            </motion.button>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 font-sans text-[11px] text-text-4 leading-[1.6]">
            By subscribing, you agree to receive updates and marketing messages
            from Meta about Meta's existing and future products and services.
            You can withdraw your consent and unsubscribe at any time
            by clicking the unsubscribe link included in our messages.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

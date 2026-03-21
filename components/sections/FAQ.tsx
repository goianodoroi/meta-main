'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'Does it need internet to work?',
    a: 'Not for the main features. The camera and audio work offline via Bluetooth. Internet is only required for syncing and sharing through the app.',
  },
  {
    q: 'Is it compatible with my phone?',
    a: 'Yes - Android and iOS. The app is available on both stores and setup takes less than 2 minutes.',
  },
  {
    q: 'How long does the battery last?',
    a: 'Several hours of continuous audio use, with reduced battery life during video recordings. Enough for a full day of normal use.',
  },
  {
    q: 'What if I don\'t like it?',
    a: 'You have 30 days to try it without commitment. If for any reason you\'re not satisfied, we\'ll refund 100% of the amount paid - no questions asked.',
  },
]

function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'border-b border-border last:border-b-0',
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-sans text-[15px] font-medium text-text-1 leading-snug group-hover:text-brand transition-colors duration-200">
          {q}
        </span>
        <span
          className={cn(
            'shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-border',
            'transition-all duration-300',
            open ? 'bg-brand border-brand rotate-45' : 'bg-transparent rotate-0',
          )}
          aria-hidden="true"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={cn('transition-colors duration-300', open ? 'text-white' : 'text-text-3')}
          >
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-sans text-[14px] text-text-3 leading-[1.7] max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Frequently asked questions
          </p>
          <h2
            className="font-sans font-medium text-text-1 tracking-[-0.03em] leading-[1.1]"
            style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
          >
            Everything you want to know.
          </h2>
        </motion.div>

        {/* Acordeão */}
        <div className="divide-y divide-border">
          {faqs.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} idx={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Section {
  title: string
  icon: React.ReactNode
  content: React.ReactNode
}

// ── inline SVG icons ──────────────────────────────────────────────────────────
const IconFeatures = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.27l-4.33 2.23.83-4.82L3 7.27l4.91-.71L10 2z" />
  </svg>
)

const IconMetaAI = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <circle cx="10" cy="10" r="8" />
    <path d="M7 10h6M10 7v6" />
    <circle cx="10" cy="10" r="2.5" fill="currentColor" stroke="none" opacity=".25" />
  </svg>
)

const IconSpecs = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <rect x="3" y="3" width="14" height="14" rx="2" />
    <path d="M3 7h14M7 7v10" />
  </svg>
)

const IconPrescription = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <ellipse cx="6" cy="11" rx="3.5" ry="2.5" />
    <ellipse cx="14" cy="11" rx="3.5" ry="2.5" />
    <path d="M9.5 11h1M3 8.5L2 7M17 8.5l1-1.5" />
    <path d="M6 6c0-2.5 8-2.5 8 0" />
  </svg>
)

const IconInsurance = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <path d="M10 2L4 5v5c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V5L10 2z" />
    <path d="M7 10l2 2 4-4" />
  </svg>
)

const IconBox = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <path d="M10 2l7 4v8l-7 4-7-4V6l7-4z" />
    <path d="M10 2v14M3 6l7 4 7-4" />
  </svg>
)

// ── bullet list helper ────────────────────────────────────────────────────────
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[14px] text-text-2 leading-[1.6]">
          <span className="mt-[7px] shrink-0 w-[5px] h-[5px] rounded-full bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  )
}

// ── section data ──────────────────────────────────────────────────────────────
const sections: Section[] = [
  {
    title: 'Features',
    icon: <IconFeatures />,
    content: (
      <Bullets items={[
        '12MP Ultra-Wide camera — capture photos and videos hands-free in landscape or portrait',
        'Open-ear speakers — immersive audio only you can hear, no earbuds needed',
        '5-microphone system — crystal-clear calls and hands-free Meta AI voice activation',
        'Up to 8h battery life; 32h total with the included charging case',
        'Fast charge — reach 50% battery in just 20 minutes',
        'IPX4 water resistance — ready for light rain and sweat',
        'Bluetooth 5.3 pairing via the Meta View companion app',
        'Available in Standard and Large fit; High Bridge and Low Bridge options',
      ]} />
    ),
  },
  {
    title: 'Meta AI',
    icon: <IconMetaAI />,
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-[14px] text-text-2 leading-[1.65]">
          Just say <strong className="font-semibold text-text-1">&ldquo;Hey Meta&rdquo;</strong> to activate your hands-free AI assistant — no phone required.
        </p>
        <Bullets items={[
          'Get real-time answers, weather, news, and directions — all with your voice',
          'Live AI: point your gaze at anything and ask Meta AI what it sees',
          'Identify landmarks, read text, translate languages in real time',
          'Shazam music, make calls, send messages, set reminders — hands-free',
          'Powered by Meta Llama; requires phone connectivity and Meta AI availability in your region',
        ]} />
      </div>
    ),
  },
  {
    title: 'Product Details',
    icon: <IconSpecs />,
    content: (
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {[
          ['Model', 'RW4012'],
          ['Generation', '2nd Generation'],
          ['Frame material', 'Injected acetate'],
          ['Lens width', '50 mm'],
          ['Bridge', '22 mm'],
          ['Temple length', '148 mm'],
          ['Weight', '49 g'],
          ['Camera', '12 MP Ultra-Wide'],
          ['Water resistance', 'IPX4'],
          ['Bluetooth', '5.3'],
          ['Battery (glasses)', 'Up to 8 h'],
          ['Battery (case)', '+24 h additional'],
          ['Compatibility', 'iOS 16+ / Android 9+'],
          ['Charging', 'USB-C'],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col gap-[3px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-4">{label}</span>
            <span className="text-[13px] font-semibold text-text-1">{value}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Prescription Lenses',
    icon: <IconPrescription />,
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-[14px] text-text-2 leading-[1.65]">
          Compatible with prescription lenses, available through our partner <strong className="font-semibold text-text-1">EyeBuyDirect</strong>.
        </p>
        <Bullets items={[
          'Single vision, progressive, and bifocal lenses available',
          'Anti-reflective, blue-light blocking, and Transitions® photochromic coatings',
          'Digital high-definition lenses for sharper vision',
          'Upload your prescription after completing your purchase',
          'Processing time: 7–10 business days',
        ]} />
      </div>
    ),
  },
  {
    title: 'Insurance & Prescription Upload',
    icon: <IconInsurance />,
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-[14px] text-text-2 leading-[1.65]">
          Your vision insurance benefits may apply toward the cost of prescription lenses.
        </p>
        <Bullets items={[
          'Upload your prescription directly during checkout or after purchase',
          'Accepted formats: PDF, JPG, PNG (max 10 MB)',
          'Your prescription must be valid and issued within the last 2 years',
          'Insurance reimbursement handled directly through your provider',
          "For questions, contact our support team — we'll guide you through the process",
        ]} />
      </div>
    ),
  },
  {
    title: 'Included in Your Order',
    icon: <IconBox />,
    content: (
      <Bullets items={[
        'Ray-Ban Meta Wayfarer (Gen 2) smart glasses',
        'Charging case with built-in 2,000 mAh battery (up to 3 additional charges)',
        'USB-C to USB-A charging cable',
        'Premium microfiber cleaning cloth',
        'Quick start guide and safety information booklet',
      ]} />
    ),
  },
]

// ── accordion item ────────────────────────────────────────────────────────────
function AccordionItem({ title, icon, content }: Section) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'w-full flex items-center justify-between py-5 text-left gap-3',
          'transition-colors group',
        )}
        aria-expanded={open}
      >
        {/* icon + label */}
        <span className={cn(
          'flex items-center gap-3',
          'font-mono text-[11px] font-semibold uppercase tracking-[0.14em]',
          open ? 'text-brand' : 'text-text-1 group-hover:text-brand',
          'transition-colors',
        )}>
          <span className={cn(
            'shrink-0 p-[7px] rounded-8 transition-colors',
            open ? 'bg-brand text-white' : 'bg-surface-2 text-text-2 group-hover:bg-brand-light group-hover:text-brand',
          )}>
            {icon}
          </span>
          {title}
        </span>

        {/* plus/minus */}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-5 h-5 flex items-center justify-center text-text-3"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-[42px]">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── export ────────────────────────────────────────────────────────────────────
export function ProductDetails() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-16 py-12">
        <div className="border-t border-border">
          {sections.map((s) => (
            <AccordionItem key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

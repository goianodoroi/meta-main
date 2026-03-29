'use client'

import { cn } from '@/lib/utils'

const links = {
  Product: ['Wayfarer'],
  Support: ['Help Center', 'Return Policy', 'Warranty', 'Contact'],
  Legal: ['Privacy', 'Terms of Use', 'Cookies', 'Accessibility'],
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 py-12 lg:py-16">

        {/* ── Top: Lottie + links ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5 mb-10">

          {/* Ray-Ban logo */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2 lg:pr-12 flex flex-col gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ray-Ban_logo.svg/1280px-Ray-Ban_logo.svg.png"
              alt="Ray-Ban"
              className="w-28 h-auto"
            />
            <p className="font-sans text-[13px] text-text-3 leading-[1.7] max-w-xs">
              Ray-Ban x Meta - camera, audio and Meta AI integrated into the glasses you already wear.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-text-4">
                {group}
              </p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={cn(
                        'font-sans text-[13px] text-text-3',
                        'hover:text-brand transition-colors duration-200',
                      )}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Disclaimers legais ───────────────────────────────────────────── */}
        <div className="border-t border-border pt-8 mb-6 grid sm:grid-cols-2 gap-6 lg:gap-12">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-text-4 mb-2">
              META QUEST
            </p>
            <p className="font-sans text-[12px] text-text-4 leading-[1.65]">
              Parents or guardians: Important guidance and safety alerts for children's use{' '}
              <a href="#" className="text-brand hover:text-brand-hover underline underline-offset-2 transition-colors">
                here
              </a>
              .
            </p>
          </div>
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-text-4 mb-2">
              AI GLASSES
            </p>
            <p className="font-sans text-[12px] text-text-4 leading-[1.65]">
              Some Meta AI features are only available in certain countries and languages.
              Check local availability. Software updates are required for optimal performance.
            </p>
          </div>
        </div>

        {/* ── Copyright ────────────────────────────────────────────────────── */}
        <div className="border-t border-border pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[12px] text-text-4">
            ©2026 Ray-Ban.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Cookies', 'Terms'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans text-[12px] text-text-4 hover:text-brand transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

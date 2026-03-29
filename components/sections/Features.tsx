'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface Feature {
  title: string
  description: React.ReactNode
  image?: string
  video?: string
  alt: string
}

const features: Feature[] = [
  {
    title: 'Meta AI',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/3a06b9186203527.6571042f9ea74.gif',
    alt: 'Meta AI - integrated assistant in Ray-Ban glasses',
    description:
      'Real-time information and suggestions. Ask about landmarks, search for recipes and more - without taking your phone out of your pocket.',
  },
  {
    title: 'Capture',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/0e9a1e186203527.6571042f9f624.gif',
    alt: '3K Ultra HD camera built into Ray-Ban Meta glasses',
    description:
      'Record videos in 3K Ultra HD with higher resolution. Capture moments in sharper detail than with 1st generation glasses.',
  },
  {
    title: 'Battery',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/d47582186203527.6571042f9d450.gif',
    alt: 'Battery up to 8 hours and charging case',
    description:
      'Up to 8h battery, plus 48h with the charging case. Charge 50% in just 20 minutes.',
  },
  {
    title: 'Listen',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/d9460d186203527.6571042fa091b.gif',
    alt: 'Open speakers integrated into the stems of Ray-Ban Meta glasses',
    description: (
      <>
        <strong className="font-semibold text-text-2">
          Bluetooth-connected speakers
        </strong>{' '}
        built into the temple arms only play audio you can hear.
      </>
    ),
  },
]

const enterClass = ['card-enter-1', 'card-enter-2', 'card-enter-3', 'card-enter-4']

function FeatureCard({ title, description, image, video, alt, index }: Feature & { index: number }) {
  return (
    <article
      className={cn(
        enterClass[index],
        'group flex flex-col overflow-hidden',
        'rounded-16 border border-border bg-surface shadow-xs',
        'transition-[transform,box-shadow] duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:-translate-y-[4px] hover:shadow-md',
      )}
    >
      <div className="relative w-full overflow-hidden bg-surface-3" style={{ aspectRatio: '16/10' }}>
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            aria-label={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className={cn(
              'absolute inset-0 h-full w-full object-cover',
              'transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
              'group-hover:scale-[1.04]',
            )}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-sans text-[17px] font-semibold leading-snug text-brand">{title}</h3>
        <p className="text-sm leading-[1.65] text-text-3">{description}</p>
      </div>
    </article>
  )
}

export function Features() {
  return (
    <section className="relative z-20 w-full">

      <div className="relative -mt-[48px] mx-auto max-w-7xl">

        {/* Grid unificado: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-5 sm:px-8 lg:px-16">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>

      </div>

      {/* Fundo branco começa aqui, após os cards */}
      <div className="bg-white pb-6" />

    </section>
  )
}

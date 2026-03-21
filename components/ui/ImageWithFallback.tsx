'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  sizes?: string
  className?: string
  fallbackClassName?: string
  fallbackLabel?: string
  priority?: boolean
}

export function ImageWithFallback({
  src,
  alt,
  fill,
  className,
  fallbackClassName,
  fallbackLabel,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex items-center justify-center w-full h-full',
          'bg-gradient-to-br from-surface-3 to-brand-light',
          fallbackClassName,
        )}
      >
        <span className="text-xs font-medium text-text-4 select-none px-4 text-center">
          {fallbackLabel ?? alt}
        </span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={cn(fill ? 'absolute inset-0 w-full h-full' : '', className)}
    />
  )
}

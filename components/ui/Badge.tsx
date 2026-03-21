import { cn } from '@/lib/utils'
import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'brand' | 'success' | 'warning' | 'error'
  className?: string
}

export function Badge({ children, variant = 'brand', className }: BadgeProps) {
  const variants = {
    brand:   'bg-brand-light text-brand border border-brand-mid',
    success: 'bg-success-bg text-success border border-success/30',
    warning: 'bg-warning-bg text-warning border border-warning/30',
    error:   'bg-error-bg text-error border border-error/30',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-2.5 py-0.5',
        'text-xs font-semibold font-sans leading-none',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

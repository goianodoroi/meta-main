'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  children,
  className,
  ...props
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-pill font-sans font-medium',
    'cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-brand focus-visible:ring-offset-2 transition-colors',
    'disabled:pointer-events-none disabled:opacity-50',
  )

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  }

  const variants = {
    primary: cn(
      'bg-brand text-white',
      'hover:bg-brand-hover',
    ),
    secondary: cn(
      'bg-white/25 backdrop-blur-md text-brand',
      'border border-[#D6D6D6]',
      'hover:bg-white/40',
      '[isolation:isolate] [will-change:transform]',
    ),
  }

  return (
    <motion.button
      className={cn(base, sizes[size], variants[variant], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
    </motion.button>
  )
}

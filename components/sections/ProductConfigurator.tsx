'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { models, type GlassesModel, type GenLabel } from './configurator-data'

// ─── Tokens de geração ────────────────────────────────────────────────────────
const genStyle: Record<GenLabel, string> = {
  'Gen 2': 'bg-brand-light text-brand border border-brand-mid',
  'Gen 1': 'bg-surface-3 text-text-3 border border-border',
  'Oakley': 'bg-text-1 text-white border border-transparent',
}



// ─── Swatch de cor ────────────────────────────────────────────────────────────
function ColorSwatch({ color, active, onClick }: {
  color: { name: string; swatch: string }
  active: boolean
  onClick: () => void
}) {
  const isLight = ['#d8dce8', '#d8d8d8', '#c0d0e8', '#c4b8c0', '#e8e8e8', '#f0f0f0']
    .includes(color.swatch.toLowerCase())
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      title={color.name}
      aria-label={color.name}
      aria-pressed={active}
      className={cn(
        'w-7 h-7 rounded-full transition-all duration-200 flex-shrink-0',
        isLight ? 'border border-border-strong' : 'border-2 border-white/70 shadow-xs',
        active && 'ring-2 ring-brand ring-offset-2',
      )}
      style={{ backgroundColor: color.swatch }}
    />
  )
}



// ─── Card de modelo ───────────────────────────────────────────────────────────
function ModelCard({ model, active, onClick }: {
  model: GlassesModel; active: boolean; onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      aria-pressed={active}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-12 border text-left transition-all duration-200',
        active
          ? 'border-brand bg-brand-light shadow-sm'
          : 'border-border bg-white hover:border-border-strong hover:shadow-xs',
      )}
    >
      <div className="relative w-full overflow-hidden bg-surface-2" style={{ aspectRatio: '4/3' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={model.thumb}
          alt={`${model.name} ${model.gen}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'multiply' }}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
      </div>
      <div className="px-2 py-1.5 flex items-center justify-between gap-1">
        <span className={cn(
          'font-sans text-[11px] font-semibold leading-none truncate',
          active ? 'text-brand' : 'text-text-1',
        )}>{model.name}</span>
        <span className={cn(
          'shrink-0 rounded-pill px-1.5 py-0.5 text-[8px] font-bold leading-none uppercase tracking-wide',
          genStyle[model.gen],
        )}>{model.gen}</span>
      </div>
      {active && (
        <motion.div
          layoutId="model-active-indicator"
          className="absolute inset-0 rounded-12 border-2 border-brand pointer-events-none"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isVideo(src: string) { return src.toLowerCase().endsWith('.mp4') }

function getDiscountPercent(priceStr: string, originalPriceStr: string) {
  const p = parseFloat(priceStr.replace(/[^0-9.,]/g, '').replace(',', '.'))
  const op = parseFloat(originalPriceStr.replace(/[^0-9.,]/g, '').replace(',', '.'))
  if (!p || !op || op <= p) return 0
  return Math.round((1 - p / op) * 100)
}

// ─── Carrossel de imagens/vídeos do produto ───────────────────────────────────
function ProductCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  // Reset ao trocar o array (cor ou modelo)
  const imagesKey = images.join('|')
  const prevKey = useRef(imagesKey)
  useEffect(() => {
    if (prevKey.current !== imagesKey) {
      prevKey.current = imagesKey
      setIdx(0)
    }
  }, [imagesKey])

  function go(next: number, d = 1) {
    setDir(d)
    setIdx(Math.max(0, Math.min(images.length - 1, next)))
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Imagem principal */}
      <div
        className="relative w-full bg-surface-2 rounded-20 overflow-hidden"
        style={{ aspectRatio: '4/3' }}
      >
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={`${imagesKey}-${idx}`}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {isVideo(images[idx]) ? (
              <video
                key={images[idx]}
                src={images[idx]}
                autoPlay loop muted playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[idx]}
                alt={`${alt} - photo ${idx + 1}`}
                className="w-full h-full object-contain"
                style={{ mixBlendMode: 'multiply' }}
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Setas — só aparecem se houver mais de 1 imagem */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(idx - 1, -1)}
              disabled={idx === 0}
              aria-label="Previous image"
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 z-10',
                'w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-border',
                'flex items-center justify-center shadow-sm',
                'transition-all duration-150 hover:bg-white hover:shadow-md',
                'disabled:opacity-30 disabled:pointer-events-none',
              )}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7l4-4" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => go(idx + 1, 1)}
              disabled={idx === images.length - 1}
              aria-label="Next image"
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 z-10',
                'w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-border',
                'flex items-center justify-center shadow-sm',
                'transition-all duration-150 hover:bg-white hover:shadow-md',
                'disabled:opacity-30 disabled:pointer-events-none',
              )}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3l4 4-4 4" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => go(i, i > idx ? 1 : -1)}
              aria-label={`View photo ${i + 1}`}
              className={cn(
                'shrink-0 rounded-8 overflow-hidden border-2 transition-all duration-150',
                'w-14 h-14 bg-surface-2',
                i === idx ? 'border-brand shadow-sm' : 'border-transparent opacity-60 hover:opacity-90',
              )}
            >
              {isVideo(src) ? (
                <div className="w-full h-full flex items-center justify-center bg-text-1/8">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8.5" stroke="#65676B" strokeWidth="1" />
                    <path d="M7 6.5l5 2.5-5 2.5V6.5z" fill="#65676B" />
                  </svg>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Divider() {
  return <div className="w-full h-px bg-border" />
}

// ─── Componente principal ─────────────────────────────────────────────────────
const DEFAULT_MODEL = 'wayfarer-gen2'

export function ProductConfigurator() {
  const [selectedId, setSelectedId] = useState(DEFAULT_MODEL)
  const [colorIdx, setColorIdx] = useState(0)

  const [customLinks, setCustomLinks] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.checkoutLinks) {
          setCustomLinks(data.checkoutLinks)
        }
      })
      .catch(() => {})
  }, [])

  const model = models.find((m) => m.id === selectedId)!
  const color = model.colors[colorIdx]
  const allImages = [color.image, ...(color.images ?? [])]

  function selectModel(id: string) {
    if (id === selectedId) return
    const m = models.find((m) => m.id === id)!
    setSelectedId(id)
    setColorIdx(0)

  }

  return (
    <>
      <section id="escolha-modelo" className="bg-white pt-4 pb-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">

          {/* ── Heading ────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            <h2
              className="font-sans font-medium text-text-1 tracking-[-0.03em] leading-[1.1]"
              style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}
            >
              Choose your model
            </h2>
            <p className="mt-2 font-sans text-[15px] text-text-3 leading-relaxed">
              Customize color, size and fit - all in one place.
            </p>
          </motion.div>

          {/* ── Viewer: imagem + opções ────────────────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* ── Coluna esquerda: carrossel ──────────────────────────────── */}
            <div className="lg:sticky lg:top-24">
              <ProductCarousel
                images={allImages}
                alt={`${model.name} ${model.gen} — ${color.name}`}
              />
            </div>

            {/* ── Coluna direita: opções ──────────────────────────────────── */}
            <div className="flex flex-col gap-5">

              {/* Nome do modelo + badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <h3 className="font-sans text-xl font-semibold text-text-1 tracking-[-0.02em]">
                    {model.gen === 'Oakley' ? 'Oakley Meta' : 'Ray-Ban Meta'} {model.name}
                  </h3>
                  <span className={cn(
                    'rounded-pill px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider leading-none shrink-0',
                    genStyle[model.gen],
                  )}>{model.gen}</span>
                </motion.div>
              </AnimatePresence>

              {/* ── Seletor de modelos (dentro da coluna direita) ─────────── */}
              <div className="grid grid-cols-4 gap-2">
                {models.map((m) => (
                  <ModelCard
                    key={m.id}
                    model={m}
                    active={selectedId === m.id}
                    onClick={() => selectModel(m.id)}
                  />
                ))}
              </div>

              <Divider />

              {/* Cor */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-text-4">
                    Color
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${model.id}-${colorIdx}`}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="font-sans text-[12px] text-text-2 text-right max-w-[220px] leading-snug"
                    >
                      {color.name}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {model.colors.map((c, i) => (
                    <ColorSwatch
                      key={i}
                      color={c}
                      active={colorIdx === i}
                      onClick={() => setColorIdx(i)}
                    />
                  ))}
                </div>
              </div>



              <Divider />

              {/* Preço + Comprar */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-sans text-sm text-text-4 line-through leading-none">
                    {model.originalPrice}
                  </span>
                  <span className="font-sans text-[28px] font-bold text-text-1 tracking-tight leading-none">
                    {model.price}
                  </span>
                  {getDiscountPercent(model.price, model.originalPrice) > 0 && (
                    <span className="rounded-pill px-2.5 py-1 text-[11px] font-semibold bg-brand-light text-brand border border-brand-mid leading-none">
                      -{getDiscountPercent(model.price, model.originalPrice)}% OFF
                    </span>
                  )}
                </div>

                <p className="font-sans text-[12px] text-text-4">
                  <strong className="text-text-2 font-semibold">Last units available</strong> · Free shipping
                </p>

                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    const link = document.createElement('a');
                    link.href = customLinks[model.id] || model.checkoutUrl;
                    link.rel = 'noreferrer';
                    link.click();
                  }}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  leftIcon={
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="m1.999 12.117.408 1.633a4 4 0 0 0 4.242 3.013l.867-.079a4 4 0 0 0 3.497-2.93l.308-1.11a.604.604 0 0 1 .116-.24.75.75 0 0 1 1.126 0c.06.069.092.154.116.24l.308 1.11a4 4 0 0 0 3.497 2.93l.867.08a4 4 0 0 0 4.242-3.014l.409-1.633.445-.223A1 1 0 0 0 23 11v-1a1 1 0 0 0-.758-.97l-1.964-.491-.201-.068a9.219 9.219 0 0 0-3.957-.414c-.925.055-1.845.216-2.743.486l-.515.154a3 3 0 0 1-1.724 0l-.515-.154a11.997 11.997 0 0 0-2.744-.486 9.219 9.219 0 0 0-3.956.414l-.201.068-1.965.49A1 1 0 0 0 1 10v1a1 1 0 0 0 .553.895l.446.223zm2.218-1.633a10 10 0 0 1 3.49-.433 7.223 7.223 0 0 1 1.666.407c.24.09.371.347.304.593l-.594 2.176a2 2 0 0 1-1.748 1.466l-.867.078a2 2 0 0 1-2.121-1.506l-.506-2.024a.65.65 0 0 1 .376-.757zm12.076-.433a10 10 0 0 1 3.49.433.651.651 0 0 1 .376.757l-.506 2.024a2 2 0 0 1-2.121 1.506l-.867-.078a2 2 0 0 1-1.748-1.466l-.594-2.176a.494.494 0 0 1 .304-.593c.54-.203 1.1-.339 1.666-.407z" />
                    </svg>
                  }
                >
                  Buy now
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

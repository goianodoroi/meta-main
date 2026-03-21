'use client'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/* Vídeo landscape — desktop */
const CF_EMBED_DESKTOP =
  'https://customer-siyy2ilzb5oakkgv.cloudflarestream.com/1438dfac981eb0935ddf6ceab521c142/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-siyy2ilzb5oakkgv.cloudflarestream.com%2F1438dfac981eb0935ddf6ceab521c142%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false'

/* Video portrait — mobile (padding-top: 203.33% → aspect 1/2.0333) */
const CF_EMBED_MOBILE =
  'https://customer-siyy2ilzb5oakkgv.cloudflarestream.com/c8dc3d698f2e3c265dc1b53e04ee5ce6/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-siyy2ilzb5oakkgv.cloudflarestream.com%2Fc8dc3d698f2e3c265dc1b53e04ee5ce6%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false'

/* ── Ícone Meta Glasses ── */
function MetaGlassesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1.1em" height="1.1em" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m1.999 12.117.408 1.633a4 4 0 0 0 4.242 3.013l.867-.079a4 4 0 0 0 3.497-2.93l.308-1.11a.604.604 0 0 1 .116-.24.75.75 0 0 1 1.126 0c.06.069.092.154.116.24l.308 1.11a4 4 0 0 0 3.497 2.93l.867.08a4 4 0 0 0 4.242-3.014l.409-1.633.445-.223A1 1 0 0 0 23 11v-1a1 1 0 0 0-.758-.97l-1.964-.491-.201-.068a9.219 9.219 0 0 0-3.957-.414c-.925.055-1.845.216-2.743.486l-.515.154a3 3 0 0 1-1.724 0l-.515-.154a11.997 11.997 0 0 0-2.744-.486 9.219 9.219 0 0 0-3.956.414l-.201.068-1.965.49A1 1 0 0 0 1 10v1a1 1 0 0 0 .553.895l.446.223zm2.218-1.633a10 10 0 0 1 3.49-.433 7.223 7.223 0 0 1 1.666.407c.24.09.371.347.304.593l-.594 2.176a2 2 0 0 1-1.748 1.466l-.867.078a2 2 0 0 1-2.121-1.506l-.506-2.024a.65.65 0 0 1 .376-.757zm12.076-.433a10 10 0 0 1 3.49.433.651.651 0 0 1 .376.757l-.506 2.024a2 2 0 0 1-2.121 1.506l-.867-.078a2 2 0 0 1-1.748-1.466l-.594-2.176a.494.494 0 0 1 .304-.593c.54-.203 1.1-.339 1.666-.407z"
      />
    </svg>
  )
}

/* ── Componente ── */
export function Hero() {

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        'flex items-end md:items-center',
        'h-[800px]',
        'bg-brand-light',
      )}
    >
      {/* ── Vídeo desktop (landscape 2.427:1) — oculto no mobile ── */}
      <iframe
        src={CF_EMBED_DESKTOP}
        className="hero-video-enter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          border: 'none',
          pointerEvents: 'none',
          aspectRatio: '2.427 / 1',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        aria-hidden="true"
      />

      {/* ── Vídeo mobile (portrait 1:2.0357) — oculto no desktop ── */}
      <iframe
        src={CF_EMBED_MOBILE}
        className="hero-video-enter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block md:hidden"
        style={{
          border: 'none',
          pointerEvents: 'none',
          aspectRatio: '1 / 2.0333',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-16 pb-28 md:pb-0">
        <div className="flex flex-col gap-6 max-w-[520px]">

          {/* Heading */}
          <h1
            className={cn(
              'hero-item-1',
              'font-sans font-medium leading-[1.05] tracking-[-0.04em] text-text-1',
            )}
            style={{ fontSize: 'clamp(40px, 6.5vw, 68px)' }}
          >
            Record, listen and share{' '}
            <span className="text-brand">hands-free</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-item-2 font-sans text-base leading-[1.7] text-text-2 sm:text-[17px] max-w-[420px]">
            Built-in camera, premium open audio and instant connection.
            One tap and done. Discreet design that looks like regular glasses.
          </p>

          

          {/* CTA */}
          <div className="hero-item-4">
            <Button
              variant="primary"
              size="md"
              leftIcon={<MetaGlassesIcon />}
              aria-label="Buy Ray-Ban Meta now"
              onClick={() => {
                document.getElementById('escolha-modelo')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Buy now
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}

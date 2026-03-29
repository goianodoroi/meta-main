import type { Metadata } from 'next'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { Preloader } from '@/components/ui/Preloader'
import './globals.css'
import { getConfig } from '@/lib/config'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Ray-Ban Meta Smart Glasses — Compre agora com 34% OFF',
  description:
    'Óculos inteligentes Ray-Ban Meta com Meta AI integrada, câmera 3K Ultra HD e até 8h de bateria. Estilo Ray-Ban clássico com tecnologia de ponta.',
  keywords: ['Ray-Ban Meta', 'óculos inteligentes', 'Meta AI', 'smart glasses'],
  openGraph: {
    title: 'Ray-Ban Meta Smart Glasses — 34% OFF',
    description: 'Capture, ouça e interaja com o mundo sem usar as mãos.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const config = getConfig()

  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {config.utmifyScripts.filter(Boolean).map((scriptContent, idx) => {
          const cleanedScript = scriptContent
            .replace(/<script[^>]*>/gi, '')
            .replace(/<\/script>/gi, '')
          return (
            <script
              key={idx}
              dangerouslySetInnerHTML={{ __html: cleanedScript }}
            />
          )
        })}
      </head>
      <body className="min-h-full flex flex-col bg-surface text-text-1">
        <Preloader />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}

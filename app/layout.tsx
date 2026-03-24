import type { Metadata } from 'next'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { Preloader } from '@/components/ui/Preloader'
import './globals.css'

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

import fs from 'fs'
import path from 'path'

function getUtmScripts() {
  try {
    const p = path.join(process.cwd(), 'data', 'config.json')
    const data = JSON.parse(fs.readFileSync(p, 'utf8'))
    return (data.utmScripts || []) as string[]
  } catch (e) {
    return []
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const utmScripts = getUtmScripts()

  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        {utmScripts.map((script, i) => {
          const raw = script.replace(/<\/?script[^>]*>/gi, '')
          return <script key={i} dangerouslySetInnerHTML={{ __html: raw }} />
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

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface text-text-1">
        <Preloader />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}

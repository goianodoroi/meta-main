import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { ProductConfigurator } from '@/components/sections/ProductConfigurator'
import { ScrollStory } from '@/components/sections/ScrollStory'
import { FAQ } from '@/components/sections/FAQ'
import { Newsletter } from '@/components/sections/Newsletter'
import { Footer } from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <main className="flex flex-col bg-white">
      <Hero />
      <Features />
      <ScrollStory />
      <ProductConfigurator />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  )
}

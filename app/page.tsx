import { AnnouncementBar } from '@/components/sections/AnnouncementBar'
import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { ProductConfigurator } from '@/components/sections/ProductConfigurator'
import { ProductDetails } from '@/components/sections/ProductDetails'
import { ScrollStory } from '@/components/sections/ScrollStory'
import { FAQ } from '@/components/sections/FAQ'
import { Newsletter } from '@/components/sections/Newsletter'
import { Footer } from '@/components/sections/Footer'
import { getConfig } from '@/lib/config'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const config = getConfig()

  return (
    <main className="flex flex-col bg-white">
      <AnnouncementBar />
      <Hero price={config.price} originalPrice={config.originalPrice} />
      <Features />
      <ScrollStory />
      <ProductConfigurator price={config.price} originalPrice={config.originalPrice} checkoutUrl={config.checkoutUrl} />
      <ProductDetails />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  )
}

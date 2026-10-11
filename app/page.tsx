import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Catalog from '@/components/sections/Catalog'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Catalog />
      <Projects />
      <Experience />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}


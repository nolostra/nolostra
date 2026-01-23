'use client'

import ScrollReveal from '@/components/animations/ScrollReveal'
import HeadingReveal from '@/components/animations/HeadingReveal'
import Porsche3D from '@/components/Porsche3D'

export default function Showcase() {
  return (
    <section id="showcase" className="py-32 px-6 sm:px-8 lg:px-12 relative">
      <div className="max-w-5xl mx-auto">
        <HeadingReveal>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-8 tracking-tight text-center">
            Showcase
          </h2>
        </HeadingReveal>

        <ScrollReveal delay={0.1}>
          <Porsche3D />
        </ScrollReveal>
      </div>
    </section>
  )
}


'use client'

import ScrollReveal from '@/components/animations/ScrollReveal'
import HeadingReveal from '@/components/animations/HeadingReveal'
import Principle from '@/components/Principle'
import MarginNote from '@/components/MarginNote'

export default function About() {
  return (
    <section id="about" className="py-8 sm:py-16 lg:py-32 px-2 sm:px-4 lg:px-12 relative">
      <MarginNote position="right" delay={0.2}>
        Code reviews are conversations, not critiques.
      </MarginNote>
      <div className="max-w-3xl mx-auto">
        <HeadingReveal>
          <h2 className="text-xl sm:text-2xl lg:text-5xl font-semibold mb-3 sm:mb-4 lg:mb-8 tracking-tight text-center">
            About
          </h2>
        </HeadingReveal>

        <Principle delay={0.05}>
          I scale systems only after understanding failure modes.
        </Principle>

        <ScrollReveal delay={0.15}>
          <div className="space-y-2 sm:space-y-3 lg:space-y-6 text-xs sm:text-sm lg:text-lg text-text-secondary leading-relaxed text-center">
            <p>
              Full Stack Developer with 3+ years of experience building scalable web and mobile applications. 
              Strong background in backend systems, performance optimization, and AI-powered products.
            </p>
            <p>
              I focus on solving real problems with clean architecture and measurable impact. 
              From reducing API response times by 30% to handling 10,000+ concurrent users, 
              I build systems that scale.
            </p>
            <p>
              Based in Goa, India, and open to remote opportunities.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

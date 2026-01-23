'use client'

import { Suspense } from 'react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Interactive3DScene from '@/components/3d/Interactive3DScene'

export default function Showcase3D() {
  return (
    <section id="showcase" className="relative py-32 px-6 sm:px-8 lg:px-12 bg-dark-bg/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center">
            3D <span className="text-accent-blue">Showcase</span>
          </h2>
          <p className="text-lg text-gray-400 mt-4 text-center max-w-2xl mx-auto">
            Interactive 3D visualization - move your mouse to explore
          </p>
        </ScrollReveal>

        <div className="mt-16 h-[600px] rounded-lg overflow-hidden border border-dark-border">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-dark-surface">
                <div className="text-gray-400">Loading 3D scene...</div>
              </div>
            }
          >
            <Interactive3DScene />
          </Suspense>
        </div>
      </div>
    </section>
  )
}


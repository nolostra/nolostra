'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/components/animations/variants'
import StatusIndicator from '@/components/StatusIndicator'

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center px-6 sm:px-8 lg:px-12 pt-20 relative z-10">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="space-y-8 text-center"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-text">
            Saish Dabholkar
          </h1>
          
          <p className="text-xl sm:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Full Stack Developer crafting scalable systems with clean architecture and real-world impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={scrollToProjects}
              className="px-8 py-4 bg-accent text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
            >
              View Work
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-surface border border-border text-text font-medium rounded-lg hover:bg-bg transition-colors duration-200"
            >
              Contact
            </button>
          </div>
          
          <div className="pt-8">
            <StatusIndicator />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

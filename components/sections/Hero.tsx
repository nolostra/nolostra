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
    <section id="hero" className="min-h-screen flex items-center justify-center px-2 sm:px-4 lg:px-12 pt-20 sm:pt-16 lg:pt-24 pb-6 sm:pb-8 lg:pb-16 relative z-10 overflow-x-hidden">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="space-y-4 sm:space-y-3 md:space-y-4 lg:space-y-8 text-center w-full"
        >
          <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-text leading-[1.1]">
            Saish Dabholkar
          </h1>
          
          <p className="text-sm sm:text-xs md:text-sm lg:text-xl xl:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Full Stack Developer crafting scalable systems with clean architecture and real-world impact.
          </p>

          <div className="flex flex-row gap-1.5 sm:gap-2 lg:gap-3 justify-center items-center pt-3 sm:pt-2 lg:pt-3 w-full max-w-xs sm:max-w-none mx-auto">
            <button
              onClick={scrollToProjects}
              className="flex-1 sm:flex-none sm:w-auto px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 bg-accent text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 text-sm sm:text-xs lg:text-base"
            >
              View Work
            </button>
            <button
              onClick={scrollToContact}
              className="flex-1 sm:flex-none sm:w-auto px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 bg-surface border border-border text-text font-medium rounded-lg hover:bg-bg transition-colors duration-200 text-sm sm:text-xs lg:text-base"
            >
              Contact
            </button>
          </div>
          
          <div className="pt-4 sm:pt-3 lg:pt-4 flex justify-center">
            <StatusIndicator />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

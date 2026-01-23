'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/components/animations/variants'
import StatusIndicator from '@/components/StatusIndicator'
import Porsche3D from '@/components/Porsche3D'

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
    <section id="hero" className="min-h-screen flex items-center justify-center px-2 sm:px-4 lg:px-12 pt-12 sm:pt-16 lg:pt-24 pb-6 sm:pb-8 lg:pb-16 relative z-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-8 text-center lg:text-left w-full"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-text leading-[1.1]">
              Saish Dabholkar
            </h1>
            
            <p className="text-[11px] sm:text-xs md:text-sm lg:text-xl xl:text-2xl text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Full Stack Developer crafting scalable systems with clean architecture and real-world impact.
            </p>

            <div className="flex flex-row gap-1.5 sm:gap-2 lg:gap-3 justify-center lg:justify-start items-center pt-1.5 sm:pt-2 lg:pt-3 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto lg:mx-0">
              <button
                onClick={scrollToProjects}
                className="flex-1 sm:flex-none sm:w-auto px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 bg-accent text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 text-[10px] sm:text-xs lg:text-base"
              >
                View Work
              </button>
              <button
                onClick={scrollToContact}
                className="flex-1 sm:flex-none sm:w-auto px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 bg-surface border border-border text-text font-medium rounded-lg hover:bg-bg transition-colors duration-200 text-[10px] sm:text-xs lg:text-base"
              >
                Contact
              </button>
            </div>
            
            <div className="pt-2 sm:pt-3 lg:pt-4 flex justify-center lg:justify-start">
              <StatusIndicator />
            </div>
          </motion.div>

          {/* 3D Model (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block w-full"
          >
            <Porsche3D />
          </motion.div>
        </div>

        {/* 3D Model below content on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:hidden w-full mt-3 sm:mt-4 max-w-full overflow-hidden"
        >
          <Porsche3D />
        </motion.div>
      </div>
    </section>
  )
}

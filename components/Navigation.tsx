'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ThemeToggle from '@/components/ThemeToggle'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Work', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ['hero', 'about', 'experience', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg/80 backdrop-blur-md border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollTo('#hero')}
            className="text-xl font-semibold text-text hover:text-accent transition-colors duration-200"
          >
            SD
          </button>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollTo(item.href)}
                    className={`text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-accent'
                        : 'text-text-secondary hover:text-text'
                    }`}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-text-secondary hover:text-text transition-colors duration-200"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}


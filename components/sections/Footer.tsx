'use client'

import { Github, Linkedin } from 'lucide-react'

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/nolostra' },
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-6 sm:py-8 lg:py-16 px-2 sm:px-4 lg:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary text-center sm:text-left">
            © {currentYear} Saish Dabholkar
          </p>

          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

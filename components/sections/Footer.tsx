'use client'

import { Github, Linkedin } from 'lucide-react'

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/nolostra' },
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 px-6 sm:px-8 lg:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-text-secondary">
            © {currentYear} Saish Dabholkar
          </p>

          <div className="flex items-center gap-8">
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
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

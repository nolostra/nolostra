'use client'

import ScrollReveal from '@/components/animations/ScrollReveal'
import HeadingReveal from '@/components/animations/HeadingReveal'
import Principle from '@/components/Principle'
import MarginNote from '@/components/MarginNote'

interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  principle: string
  responsibility: string
  impact: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'Trajector',
    role: 'Full Stack Developer',
    period: 'Feb 2024 – Present',
    location: 'Gurgaon',
    principle: 'Reliability beats speed when users depend on you.',
    responsibility: 'Building scalable web applications and optimizing system performance',
    impact: [
      'Building scalable web applications with focus on performance and clean architecture',
      'Working on AI-powered products and full-stack solutions',
    ],
  },
  {
    company: 'Valari Solutions',
    role: 'Full Stack Developer',
    period: 'Feb 2023 – Feb 2024',
    location: 'Remote',
    principle: 'Ship early, then harden.',
    responsibility: 'Building scalable web applications and optimizing system performance',
    impact: [
      'Reduced API response times by 30% using optimized NestJS modules',
      'Built dynamic email systems handling 1,500+ automated emails/month',
      'Improved frontend performance by 25%',
      'Implemented CI/CD pipelines reducing deployment time by 50%',
      'Delivered 3+ large-scale projects with 98% uptime',
    ],
  },
  {
    company: 'Spintly',
    role: 'Software Developer',
    period: 'Sep 2022 – Feb 2023',
    location: 'Goa',
    principle: 'Performance is a feature, not an afterthought.',
    responsibility: 'Built cross-platform mobile apps and optimized backend services',
    impact: [
      'Built 2 cross-platform apps using React Native',
      'Improved backend performance by migrating Node.js services to Go',
      'Reduced latency from 200ms to 120ms',
      'Led and mentored 6 interns across production projects',
      'Built SDKs for Flutter and React Native',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-8 sm:py-16 lg:py-32 px-2 sm:px-4 lg:px-12 bg-surface relative">
      <MarginNote position="left" delay={0.3}>
        Impact over hours logged.
      </MarginNote>
      <div className="max-w-3xl mx-auto">
        <HeadingReveal>
          <h2 className="text-2xl sm:text-2xl lg:text-5xl font-semibold mb-3 sm:mb-4 lg:mb-8 tracking-tight text-center">
            Experience
          </h2>
        </HeadingReveal>

        <Principle delay={0.05}>
          I choose roles where I can own outcomes, not just complete tasks.
        </Principle>

        <div className="space-y-6 sm:space-y-10 lg:space-y-16 mt-4 sm:mt-6 lg:mt-12">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.company} delay={index * 0.1}>
              <div className="border-l-2 border-border pl-3 sm:pl-5 lg:pl-8 space-y-2 sm:space-y-3 lg:space-y-5">
                <div>
                  <h3 className="text-xl sm:text-xl lg:text-2xl font-semibold text-text mb-0.5 sm:mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-lg sm:text-lg lg:text-xl text-accent font-medium mb-0.5 sm:mb-1 lg:mb-2">
                    {exp.company}
                  </p>
                  <p className="text-sm sm:text-sm text-text-secondary">
                    {exp.period} • {exp.location}
                  </p>
                </div>
                
                <p className="text-sm sm:text-sm lg:text-base text-text-secondary italic leading-relaxed">
                  {exp.principle}
                </p>
                
                <p className="text-base sm:text-base lg:text-lg text-text-secondary leading-relaxed">
                  {exp.responsibility}
                </p>
                
                <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3 text-sm sm:text-sm lg:text-base text-text-secondary leading-relaxed">
                  {exp.impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

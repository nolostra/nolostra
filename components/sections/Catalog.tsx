'use client'

import { useEffect, useRef, useState } from 'react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import HeadingReveal from '@/components/animations/HeadingReveal'
import Principle from '@/components/Principle'
import MarginNote from '@/components/MarginNote'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import liveApps from '@/data/live-apps.json'

interface LiveApp {
  title: string
  description: string
  tags: string[]
  url: string
}

export default function Catalog() {
  const apps = liveApps as LiveApp[]
  const [currentIndex, setCurrentIndex] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const trackRef = useRef<HTMLDivElement | null>(null)
  const hasMounted = useRef(false)

  useEffect(() => {
    // Skip the initial render, and scroll only the carousel track (never the page).
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    const track = trackRef.current
    const slide = slideRefs.current[currentIndex]
    if (!track || !slide) {
      return
    }

    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: 'smooth',
    })
  }, [apps.length, currentIndex])

  if (apps.length === 0) {
    return null
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? apps.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === apps.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="catalog" className="py-8 sm:py-16 lg:py-32 px-2 sm:px-4 lg:px-12 bg-surface/50 relative">
      <MarginNote position="left" delay={0.25}>
        Shipping is only half the story. Staying live is the other half.
      </MarginNote>

      <div className="max-w-5xl mx-auto">
        <HeadingReveal>
          <h2 className="text-2xl sm:text-2xl lg:text-5xl font-semibold mb-3 sm:mb-4 lg:mb-8 tracking-tight text-center">
            Live Catalog
          </h2>
        </HeadingReveal>

        <Principle delay={0.05}>
          A quick snapshot of the apps that are currently live and usable.
        </Principle>

        <ScrollReveal delay={0.2}>
          <div className="mt-4 sm:mt-6 lg:mt-12">
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
                <span>Live Carousel</span>
                <span className="h-1 w-1 rounded-full bg-text-secondary/60" />
                <span>{currentIndex + 1} / {apps.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Previous app"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/80 text-text hover:bg-surface transition-colors duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next app"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/80 text-text hover:bg-surface transition-colors duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div ref={trackRef} className="relative flex items-stretch gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 sm:px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {apps.map((app, index) => (
                <div
                  key={app.title}
                  ref={(node) => {
                    slideRefs.current[index] = node
                  }}
                  className="snap-center shrink-0 w-[94%] sm:w-[90%] lg:w-[86%]"
                >
                  <div
                    className={`overflow-hidden rounded-[28px] border bg-bg shadow-[0_20px_70px_rgba(0,0,0,0.18)] transition-all duration-300 ${
                      currentIndex === index
                        ? 'border-accent/50 scale-100 opacity-100'
                        : 'border-border scale-[0.96] opacity-70'
                    }`}
                  >
                    <div className="border-b border-border bg-surface/80 px-4 py-3 sm:px-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text truncate">
                              {app.title}
                            </p>
                            <p className="text-xs text-text-secondary truncate">
                              {app.url}
                            </p>
                          </div>
                        </div>

                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-text hover:bg-bg transition-colors duration-200"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="bg-surface p-3 sm:p-4">
                      <div className="overflow-hidden rounded-2xl border border-border bg-white">
                        <iframe
                          src={app.url}
                          title={`${app.title} preview`}
                          className="h-[340px] sm:h-[420px] lg:h-[500px] w-full bg-white"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      </div>

                      <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-accent/10 text-accent mb-3">
                              <span className="h-2 w-2 rounded-full bg-accent" />
                              <span>Live now</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-text">
                              {app.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                          {app.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {app.tags.map((item) => (
                            <span
                              key={item}
                              className="px-2 sm:px-3 py-1 text-xs bg-bg border border-border rounded text-text-secondary"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {apps.map((app, index) => (
                <button
                  key={app.title}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to ${app.title}`}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    currentIndex === index
                      ? 'w-8 bg-accent'
                      : 'w-2.5 bg-border hover:bg-text-secondary/40'
                  }`}
                />
              ))}
            </div>

            <p className="mt-4 text-sm text-text-secondary text-center">
              Some websites may block iframe embedding. If that happens, use the direct open button.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

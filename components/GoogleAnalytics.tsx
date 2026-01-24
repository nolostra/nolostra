'use client'

import { useEffect } from 'react'

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
      return
    }

    // Check if scripts are already loaded
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
      return
    }

    // Load Google Analytics script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    // Initialize gtag
    const script2 = document.createElement('script')
    script2.id = 'google-analytics-init'
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `
    document.head.appendChild(script2)
  }, [GA_MEASUREMENT_ID])

  return null
}


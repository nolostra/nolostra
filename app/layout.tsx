import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { ThemeProvider } from '@/components/ThemeProvider'
import CursorEffect from '@/components/CursorEffect'
import StorageErrorHandler from '@/components/StorageErrorHandler'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { SITE, SITE_URL, FAQ } from '@/lib/site'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
}

export const metadata: Metadata = {
  // Origin only: Next prepends basePath to file-based metadata (e.g. the OG image) itself.
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: {
    default: SITE.title,
    template: '%s | Saish Dabholkar',
  },
  description: SITE.description,
  keywords: ['Saish Dabholkar', 'Full Stack Developer', 'Full Stack Developer Goa', 'React Developer', 'Next.js Developer', 'Node.js', 'NestJS', 'Go', 'React Native', 'Algoworks', 'India'],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: `${SITE_URL}/` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/nolostra/site.webmanifest',
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: `${SITE_URL}/`,
    type: 'profile',
    siteName: 'Saish Dabholkar Portfolio',
    locale: 'en_IN',
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: 'Saish Dabholkar – Full Stack Developer' }],
    firstName: 'Saish',
    lastName: 'Dabholkar',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [`${SITE_URL}/og.png`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Saish Dabholkar Portfolio',
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: SITE.title,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE.name,
      url: `${SITE_URL}/`,
      jobTitle: SITE.jobTitle,
      description: SITE.description,
      worksFor: { '@type': 'Organization', name: 'Algoworks' },
      address: { '@type': 'PostalAddress', addressRegion: 'Goa', addressCountry: 'IN' },
      knowsAbout: SITE.knowsAbout,
      sameAs: [SITE.linkedin, SITE.github],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/nolostra/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/nolostra/apple-icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <StorageErrorHandler />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CursorEffect />
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


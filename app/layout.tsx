import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Saish Dabholkar | Full Stack Developer',
    template: '%s | Saish Dabholkar',
  },
  description: 'Full Stack Developer with 3+ years of experience building scalable web and mobile applications. Specialized in backend systems, performance optimization, and AI-powered products.',
  keywords: ['Saish Dabholkar', 'Full Stack Developer', 'AI Engineer', 'React Native', 'Next.js', 'Go', 'Node.js', 'Goa', 'India'],
  authors: [{ name: 'Saish Dabholkar' }],
  icons: {
    icon: [
      { url: '/nolostra/favicon.svg', type: 'image/svg+xml' },
      { url: '/nolostra/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/nolostra/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Saish Dabholkar | Full Stack Developer',
    description: 'Full Stack Developer with 3+ years of experience building scalable web and mobile applications',
    type: 'website',
    siteName: 'Saish Dabholkar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saish Dabholkar | Full Stack Developer',
    description: 'Full Stack Developer with 3+ years of experience building scalable web and mobile applications',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/nolostra/site.webmanifest" />
        <link rel="icon" href="/nolostra/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/nolostra/apple-icon.svg" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


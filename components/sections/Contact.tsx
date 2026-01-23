'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/animations/ScrollReveal'
import HeadingReveal from '@/components/animations/HeadingReveal'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Captcha from '@/components/Captcha'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const [captchaKey, setCaptchaKey] = useState(0)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!isCaptchaVerified) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
      return
    }
    
    setStatus('sending')

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing')
      }

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, publicKey)

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setIsCaptchaVerified(false)
      setCaptchaKey(prev => prev + 1) // Reset captcha
      
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error) {
      console.error('Email sending failed:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-32 px-6 sm:px-8 lg:px-12 bg-surface relative">
      <div className="max-w-2xl mx-auto">
        <HeadingReveal>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-8 tracking-tight text-center">
            Contact
          </h2>
        </HeadingReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl text-text-secondary mb-12 leading-relaxed">
            Open to remote opportunities. Let's build something impactful together.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-border rounded-md text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors duration-200"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-border rounded-md text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors duration-200"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-bg border border-border rounded-md text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Captcha key={captchaKey} onVerify={setIsCaptchaVerified} />

            <button
              type="submit"
              disabled={status === 'sending' || !isCaptchaVerified}
              className="w-full px-6 py-3 bg-accent text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Message Sent</span>
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Error - Try Again</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}

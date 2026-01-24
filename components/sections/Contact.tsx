'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/animations/ScrollReveal'
import HeadingReveal from '@/components/animations/HeadingReveal'
import { Send, CheckCircle, AlertCircle, Phone, MessageCircle } from 'lucide-react'
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
    <section id="contact" className="py-8 sm:py-16 lg:py-32 px-2 sm:px-4 lg:px-12 bg-surface relative">
      <div className="max-w-2xl mx-auto">
        <HeadingReveal>
          <h2 className="text-2xl sm:text-2xl lg:text-5xl font-semibold mb-3 sm:mb-4 lg:mb-8 tracking-tight text-center">
            Contact
          </h2>
        </HeadingReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-sm sm:text-xs lg:text-xl text-text-secondary mb-4 sm:mb-6 lg:mb-12 leading-relaxed text-center">
            Open to remote opportunities. Let&apos;s build something impactful together.
          </p>
        </ScrollReveal>

        {/* Phone Contact Options */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 justify-center">
            <a
              href="tel:+917083172495"
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-surface border border-border text-text font-medium rounded-md hover:bg-bg transition-colors duration-200 text-sm sm:text-sm lg:text-base"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
            <a
              href="https://wa.me/917083172495"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-surface border border-border text-text font-medium rounded-md hover:bg-bg transition-colors duration-200 text-sm sm:text-sm lg:text-base"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3 lg:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm sm:text-sm font-medium text-text mb-1.5 sm:mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 bg-bg border border-border rounded-md text-base sm:text-base text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors duration-200"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm sm:text-sm font-medium text-text mb-1.5 sm:mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 bg-bg border border-border rounded-md text-base sm:text-base text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors duration-200"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm sm:text-sm font-medium text-text mb-1.5 sm:mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 bg-bg border border-border rounded-md text-base sm:text-base text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Captcha key={captchaKey} onVerify={setIsCaptchaVerified} />

            <button
              type="submit"
              disabled={status === 'sending' || !isCaptchaVerified}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-accent text-white text-sm sm:text-sm lg:text-base font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
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

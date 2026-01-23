'use client'

import { useState, useEffect, useCallback } from 'react'

interface CaptchaProps {
  onVerify: (isVerified: boolean) => void
}

export default function Captcha({ onVerify }: CaptchaProps) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [answer, setAnswer] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const generateQuestion = useCallback(() => {
    const n1 = Math.floor(Math.random() * 10) + 1
    const n2 = Math.floor(Math.random() * 10) + 1
    setNum1(n1)
    setNum2(n2)
    setAnswer('')
    setIsVerified(false)
    onVerify(false)
  }, [onVerify])

  useEffect(() => {
    generateQuestion()
  }, [generateQuestion])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAnswer(value)
    
    const correctAnswer = num1 + num2
    const verified = value === correctAnswer.toString()
    setIsVerified(verified)
    onVerify(verified)
  }

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="block text-xs sm:text-sm font-medium text-text mb-1.5 sm:mb-2">
        Verify you&apos;re human
      </label>
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-bg border border-border rounded-md">
          <span className="text-xs sm:text-sm lg:text-base text-text font-medium">
            {num1} + {num2} =
          </span>
        </div>
        <input
          type="text"
          value={answer}
          onChange={handleChange}
          placeholder="?"
          className="w-14 sm:w-16 lg:w-20 px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-bg border border-border rounded-md text-xs sm:text-sm lg:text-base text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors duration-200 text-center"
          required
        />
        <button
          type="button"
          onClick={generateQuestion}
          className="px-2 sm:px-3 py-2 text-text-secondary hover:text-text transition-colors duration-200 flex-shrink-0"
          aria-label="Refresh captcha"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      {answer && (
        <p className={`text-xs ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
          {isVerified ? '✓ Verified' : '✗ Incorrect answer'}
        </p>
      )}
    </div>
  )
}


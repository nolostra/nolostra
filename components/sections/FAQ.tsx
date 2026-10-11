import { FAQ as faq } from '@/lib/site'

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-8 sm:py-16 lg:py-32 px-2 sm:px-4 lg:px-12 relative"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="faq-heading"
          className="text-2xl sm:text-2xl lg:text-5xl font-semibold mb-3 sm:mb-4 lg:mb-8 tracking-tight text-center"
        >
          FAQ
        </h2>
        <dl className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 lg:mt-12">
          {faq.map((item) => (
            <div key={item.q} className="border-l-2 border-border pl-3 sm:pl-5 lg:pl-8">
              <dt className="text-base sm:text-lg lg:text-xl font-semibold text-text mb-1 sm:mb-2">
                {item.q}
              </dt>
              <dd className="text-sm sm:text-sm lg:text-base text-text-secondary leading-relaxed">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

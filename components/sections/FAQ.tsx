'use client';

import { faqs } from '@/data/content';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

export function FAQ() {
  const { skipAnimations } = useAccessibility();
  const [openId, setOpenId] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const show = skipAnimations || inView;

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl font-bold text-primary-600 mb-4">
            Domande frequenti
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Le risposte ai dubbi più comuni: trasparenza, accoglienza e disponibilità.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: index * 0.05 }}
              className="border border-primary-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left p-6 bg-warm-50 hover:bg-warm-100 transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-600"
                aria-expanded={openId === faq.id}
              >
                <h3 className="font-semibold text-primary-600 pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-primary-500 flex-shrink-0 transition-transform ${
                    openId === faq.id ? 'rotate-45' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              {openId === faq.id && (
                <div className="p-6 bg-white">
                  <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={skipAnimations ? { opacity: 1 } : { opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h3 className="font-serif text-2xl font-bold text-primary-600 mb-2">
            Hai altre domande?
          </h3>
          <p className="text-gray-700 mb-4">
            Siamo a piena disposizione per qualsiasi dubbio o domanda.
          </p>
          <a
            href="/#contatti"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 shadow-lg hover:shadow-xl"
          >
            Contattaci
          </a>
        </motion.div>
      </div>
    </section>
  );
}

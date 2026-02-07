'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const introText =
  'A C.A.S.A. offriamo un ambiente familiare, assistenza discreta 24h e la libertà di vivere la propria autonomia in sicurezza.';

export function IntroBanner() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section className="py-10 md:py-14 bg-primary-50" aria-labelledby="intro-heading">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl md:rounded-3xl bg-white/90 backdrop-blur-sm shadow-lg border border-primary-200/80 overflow-hidden px-6 py-8 md:px-10 md:py-10 text-center">
            {/* Accento laterale */}
            <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-primary-500 to-primary-700 rounded-r-full" aria-hidden />
            <p
              id="intro-heading"
              className="font-serif text-lg md:text-xl lg:text-2xl text-primary-800 leading-relaxed md:leading-loose"
            >
              {introText}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function InvitoVisita() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className="py-12 sm:py-16 lg:py-20 bg-primary-50"
      aria-labelledby="invito-visita-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
          {/* Testo */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <h2
              id="invito-visita-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-primary-700 mb-4"
            >
              Vieni a conoscerci
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              Una visita in struttura è il modo migliore per capire se C.A.S.A è la scelta giusta per te o per un tuo caro. Ti mostriamo gli spazi, rispondiamo a ogni domanda e ti facciamo sentire a casa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="#contatti"
                data-track="cta_click:contattaci_visita"
                className="min-h-[48px] flex items-center justify-center bg-primary-600 text-white px-6 py-4 rounded-xl font-semibold text-base hover:bg-primary-700 active:bg-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Vai alla sezione Contatti per fissare una visita"
              >
                Contattaci per una visita
              </Link>
              <Link
                href="/galleria"
                data-track="cta_click:galleria_invito"
                className="min-h-[48px] flex items-center justify-center bg-white text-primary-600 border-2 border-primary-500 px-6 py-4 rounded-xl font-semibold text-base hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Esplora la galleria fotografica"
              >
                Guarda la galleria
              </Link>
            </div>
          </motion.div>

          {/* Immagine */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative aspect-[4/3] sm:aspect-[3/2] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg order-1 lg:order-2"
          >
            <Image
              src="/images/foto_orizzontali/IMG_2392.webp"
              alt="Spazi comuni di C.A.S.A, ambiente accogliente e familiare"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

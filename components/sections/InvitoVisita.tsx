'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

export function InvitoVisita() {
  const { skipAnimations } = useAccessibility();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const show = skipAnimations || inView;

  return (
    <section
      className="section-shell"
      aria-labelledby="invito-visita-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
          {/* Testo */}
          <motion.div
            ref={ref}
            initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.5 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <h2
              id="invito-visita-heading"
              className="section-title text-3xl sm:text-4xl mb-4"
            >
              Hai qualcuno a cui C.A.S.A. potrebbe fare bene?
            </h2>
            <p className="section-subtitle text-base sm:text-lg mb-6 max-w-xl mx-auto lg:mx-0">
              Prenota una visita gratuita. Vieni a vedere gli spazi, incontra lo staff, fai tutte
              le domande che hai in testa. Nessun impegno, solo una conversazione onesta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="#contatti"
                data-track="cta_click:contattaci_visita"
                className="min-h-[48px] wl-btn-primary text-base"
                aria-label="Vai alla sezione Contatti per fissare una visita"
              >
                Prenota una visita
              </Link>
              <Link
                href="https://wa.me/393490631492"
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_click:whatsapp_invito"
                className="min-h-[48px] wl-btn-secondary text-base"
                aria-label="Apri WhatsApp per contattarci"
              >
                Scrivici su WhatsApp
              </Link>
            </div>
          </motion.div>

          {/* Immagine */}
          <motion.div
            initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.5, delay: 0.15 }}
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

'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';
import { HomeIcon, ShieldIcon, SunIcon } from '@/components/ui/Icons';
import { Carousel } from '@/components/ui/Carousel';
import Link from 'next/link';

const introCards = [
  { icon: HomeIcon, title: 'Max 5 ospiti', subtitle: 'Attenzione su misura, ogni giorno.' },
  { icon: ShieldIcon, title: 'Assistenza 24h', subtitle: 'Presenza discreta, sempre disponibile.' },
  { icon: SunIcon, title: 'Progetto individuale', subtitle: 'Percorso costruito su ogni persona.' },
];

const featureBullets = [
  'Max 5 ospiti, attenzione su misura',
  'Ambiente domestico, non ospedaliero',
  'Assistenza 24h discreta e presente',
];

/* Nuove foto per varietà e caricamento veloce all'inizio */
const aboutCarouselImages = [
  { src: '/images/foto_orizzontali/IMG_2392.webp', alt: 'C.A.S.A - Cura e attenzione in ambiente familiare' },
  { src: '/images/IMG_4203.webp', alt: 'Momenti condivisi e supporto a C.A.S.A' },
  { src: '/images/foto_orizzontali/IMG_2391.webp', alt: 'Attività e compagnia - comunità viva' },
  { src: '/images/IMG_4208.webp', alt: 'Progetto individualizzato e assistenza a C.A.S.A' },
  { src: '/images/foto_orizzontali/IMG_2388.webp', alt: 'Giornate condivise in un ambiente accogliente' },
  { src: '/images/foto_orizzontali/IMG_2390.webp', alt: 'Sorrisi e supporto reciproco a C.A.S.A' },
  { src: '/images/foto_orizzontali/IMG_2389.webp', alt: 'Cura e relazione in un luogo che è casa' },
  { src: '/images/converted/camera1.jpg', alt: 'Sala comune C.A.S.A - ambiente familiare' },
  { src: '/images/converted/camera2.jpg', alt: 'Interno della struttura C.A.S.A' },
  { src: '/images/converted/bath.jpg', alt: 'Dettaglio ambienti C.A.S.A' },
  { src: '/images/gallery/camera1.jpg', alt: 'Spazi luminosi e accoglienti C.A.S.A' },
  { src: '/images/gallery/camera2.jpg', alt: 'Ambiente familiare della struttura' },
];

export function About() {
  const { skipAnimations } = useAccessibility();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const show = skipAnimations || inView;

  return (
    <section id="chi-siamo" className="relative section-shell-alt overflow-hidden" aria-labelledby="about-title">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary-50" />
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/IMG_4203.webp"
              alt=""
              fill
              className="object-cover opacity-[0.06]"
              sizes="100vw"
              loading="lazy"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-4 max-w-6xl">
        <motion.h2
          id="about-title"
          ref={ref}
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.45 }}
          className="section-title mb-2 md:mb-3 text-center"
        >
          Non siamo una RSA. Siamo una casa.
        </motion.h2>
        <p className="section-subtitle max-w-3xl mx-auto text-center mb-6 md:mb-8">
          C.A.S.A. nasce da una domanda semplice: cosa vorremmo per i nostri genitori?
          Un posto piccolo, dove le persone si conoscono per nome. Dove il caffe del mattino
          ha il profumo di casa, non di mensa. Dove c e sempre qualcuno, non per turno,
          ma per cura autentica.
        </p>
        <div className="w-24 h-1 bg-primary-600 rounded-full mx-auto mb-10 md:mb-12" aria-hidden />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">
          <div className="space-y-8 lg:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {introCards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col items-center text-center p-4 sm:p-5 wl-card"
                >
                  <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary-100 text-primary-700 mb-3 sm:mb-4" aria-hidden>
                    <card.icon className="w-6 h-6 sm:w-7 sm:h-7" size={28} />
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-primary-800 mb-1 sm:mb-2">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-premium-inkSoft leading-relaxed">{card.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="wl-card p-5 sm:p-6">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-premium-ink mb-3 sm:mb-4 leading-tight">
                Da dove veniamo. Perche lo facciamo.
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-premium-inkSoft leading-relaxed">
                C.A.S.A. non e nata da un business plan. E nata da una domanda:
                cosa vorremmo per i nostri genitori, quando non riescono piu a vivere soli,
                ma non hanno bisogno di un ospedale? Siamo ad Abbiategrasso, in una casa vera,
                immersa nel verde, con massimo cinque ospiti: questa scelta non e un limite,
                e la nostra promessa di attenzione.
              </p>
            </div>
            <div className="wl-card-soft p-5 sm:p-6">
              <p className="font-serif italic text-lg sm:text-xl text-premium-ink text-center leading-relaxed">
                &ldquo;Offrire una vita dignitosa, stimolante e serena agli anziani che possono ancora viverla.&rdquo;
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/#contatti" className="wl-btn-primary flex-1">
                Prenota una visita gratuita
              </Link>
              <Link href="/galleria" className="wl-btn-secondary flex-1">
                Guarda gli ambienti
              </Link>
            </div>
          </div>

          <div className="space-y-8 lg:space-y-10">
            <div className="w-full max-w-md mx-auto lg:max-w-none">
              <motion.div
                initial={skipAnimations ? { opacity: 1 } : { opacity: 0 }}
                animate={show ? { opacity: 1 } : {}}
                transition={skipAnimations ? { duration: 0 } : { duration: 0.4 }}
              >
                <Carousel
                  items={aboutCarouselImages.map((img) => (
                    <div key={img.src} className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                      />
                    </div>
                  ))}
                  autoPlay
                  interval={4500}
                  showDots
                  showArrows
                />
              </motion.div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {featureBullets.map((item, i) => (
                <li key={i} className="flex items-center gap-2 sm:gap-3 text-premium-ink">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary-200 flex items-center justify-center text-primary-700" aria-hidden>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-base font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

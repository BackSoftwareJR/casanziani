'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';
import { HomeIcon, ShieldIcon, SunIcon } from '@/components/ui/Icons';
import { Carousel } from '@/components/ui/Carousel';

const introCards = [
  { icon: HomeIcon, title: 'Vera Famiglia', subtitle: "Massimo 6 ospiti per un'attenzione totale." },
  { icon: ShieldIcon, title: 'Sicurezza 24h', subtitle: 'Assistenza discreta ma sempre presente.' },
  { icon: SunIcon, title: 'Autonomia', subtitle: 'Libertà di vivere i propri spazi.' },
];

const featureBullets = ['Max 6 Ospiti', 'Design Elegante e Sicuro', 'Camere Singole o Doppie'];

/* Nuove foto per varietà e caricamento veloce all'inizio */
const aboutCarouselImages = [
  { src: '/images/IMG_4201.webp', alt: 'C.A.S.A - Cura e attenzione in ambiente familiare' },
  { src: '/images/IMG_4203.webp', alt: 'Momenti condivisi e supporto a C.A.S.A' },
  { src: '/images/IMG_4206.webp', alt: 'Attività e compagnia - comunità viva' },
  { src: '/images/IMG_4208.webp', alt: 'Progetto individualizzato e assistenza a C.A.S.A' },
  { src: '/images/IMG_4215.webp', alt: 'Giornate condivise in un ambiente accogliente' },
  { src: '/images/IMG_4217.webp', alt: 'Sorrisi e supporto reciproco a C.A.S.A' },
  { src: '/images/IMG_4218.webp', alt: 'Cura e relazione in un luogo che è casa' },
  { src: '/images/converted/camera1.jpg', alt: 'Sala comune C.A.S.A - ambiente familiare' },
  { src: '/images/converted/camera2.jpg', alt: 'Interno della struttura C.A.S.A' },
  { src: '/images/converted/bath.jpg', alt: 'Dettaglio ambienti C.A.S.A' },
  { src: '/images/gallery/camera1.jpg', alt: 'Spazi luminosi e accoglienti C.A.S.A' },
  { src: '/images/gallery/camera2.jpg', alt: 'Ambiente familiare della struttura' },
];

export function About() {
  const { skipAnimations } = useAccessibility();
  const [refImg, inViewImg] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [refQuote, inViewQuote] = useInView({ triggerOnce: true, threshold: 0.2 });
  const showImg = skipAnimations || inViewImg;
  const showQuote = skipAnimations || inViewQuote;

  return (
    <section id="chi-siamo" className="relative pt-6 pb-12 md:pt-8 md:pb-20 overflow-hidden">
      {/* Sfondo con immagine — coerenza visiva */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-warm-50" />
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/IMG_4203.webp"
              alt=""
              fill
              className="object-cover opacity-[0.08]"
              sizes="100vw"
              loading="lazy"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-4 max-w-6xl">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 mb-2 md:mb-3 text-center tracking-tight">
          Chi Siamo
        </h2>
        <div className="w-24 h-1 bg-primary-600 rounded-full mx-auto mb-10 md:mb-12" aria-hidden />

        {/* Desktop: due colonne. Mobile: una colonna */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Colonna sinistra: card + storytelling */}
          <div className="space-y-8 lg:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {introCards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col items-center text-center p-4 sm:p-5 rounded-xl bg-white/95 shadow-md border border-primary-200 backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary-100 text-primary-700 mb-3 sm:mb-4" aria-hidden>
                    <card.icon className="w-6 h-6 sm:w-7 sm:h-7" size={28} />
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-primary-800 mb-1 sm:mb-2">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{card.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-white/90 backdrop-blur-sm p-5 sm:p-6 border border-primary-100 shadow-sm">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-primary-800 mb-3 sm:mb-4 leading-tight">
                Non il solito ricovero, ma una nuova casa.
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                Spesso si teme l&apos;atmosfera ospedaliera. Da noi è diverso. C.A.S.A. è una{' '}
                <strong className="font-semibold text-primary-700">comunità</strong> viva, fatta di{' '}
                <strong className="font-semibold text-primary-700">sorrisi</strong>, giornate condivise e{' '}
                <strong className="font-semibold text-primary-700">supporto</strong> reciproco.
              </p>
            </div>
            {/* Citazione subito sotto il box storytelling — desktop e mobile */}
            <blockquote
              ref={refQuote}
              className="text-center py-6 sm:py-8 md:py-10 px-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary-100 shadow-sm"
            >
              <motion.p
                initial={skipAnimations ? { opacity: 1 } : { opacity: 0 }}
                animate={showQuote ? { opacity: 1 } : {}}
                transition={skipAnimations ? { duration: 0 } : { duration: 0.4 }}
                className="font-serif italic text-lg sm:text-xl md:text-2xl text-primary-800 leading-relaxed max-w-2xl mx-auto"
              >
                &ldquo;Un luogo dove stress e ansia non sono di casa&rdquo;
              </motion.p>
            </blockquote>
          </div>

          {/* Colonna destra: carosello + bullet + citazione */}
          <div className="space-y-8 lg:space-y-10">
            <div className="w-full max-w-md mx-auto lg:max-w-none" ref={refImg}>
              <motion.div
                initial={skipAnimations ? { opacity: 1 } : { opacity: 0 }}
                animate={showImg ? { opacity: 1 } : {}}
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
                <li key={i} className="flex items-center gap-2 sm:gap-3 text-gray-800">
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

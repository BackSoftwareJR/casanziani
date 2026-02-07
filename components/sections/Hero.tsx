'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const FOTO_ORIZZONTALI = [
  { src: '/images/foto_orizzontali/IMG_2382.webp', alt: 'C.A.S.A - Ambiente familiare' },
  { src: '/images/foto_orizzontali/IMG_2384.webp', alt: 'C.A.S.A - Residenza per anziani' },
  { src: '/images/foto_orizzontali/IMG_2385.webp', alt: 'C.A.S.A - Spazi accoglienti' },
  { src: '/images/foto_orizzontali/IMG_2386.webp', alt: 'C.A.S.A - Cura e attenzione' },
  { src: '/images/foto_orizzontali/IMG_2387.webp', alt: 'C.A.S.A - Una vera famiglia' },
  { src: '/images/foto_orizzontali/IMG_2388.webp', alt: 'C.A.S.A - Qualità di vita' },
  { src: '/images/foto_orizzontali/IMG_2389.webp', alt: 'C.A.S.A - Struttura C.A.S.A' },
  { src: '/images/foto_orizzontali/IMG_2390.webp', alt: 'C.A.S.A - Casa per anziani' },
  { src: '/images/foto_orizzontali/IMG_2391.webp', alt: 'C.A.S.A - Residenza' },
  { src: '/images/foto_orizzontali/IMG_2392.webp', alt: 'C.A.S.A - Famiglia' },
  { src: '/images/foto_orizzontali/IMG_2393.webp', alt: 'C.A.S.A - Accoglienza' },
];

const CASA_IMAGES = [
  { src: '/images/IMG_4215.webp', alt: 'C.A.S.A - Cura e attenzione' },
  { src: '/images/IMG_4218.webp', alt: 'C.A.S.A - Ambiente familiare e cura' },
  { src: '/images/IMG_4217.webp', alt: 'Residenza per anziani - Spazi accoglienti' },
  { src: '/images/IMG_4208.webp', alt: 'Struttura C.A.S.A - Famiglia' },
  { src: '/images/IMG_4206.webp', alt: 'Residenza C.A.S.A' },
  { src: '/images/IMG_4203.webp', alt: 'C.A.S.A - Qualità di vita' },
  { src: '/images/IMG_4201.webp', alt: 'C.A.S.A - Casa per anziani' },
];

// Desktop: alterna foto orizzontali e immagini della casa
const HERO_IMAGES_DESKTOP = (() => {
  const out: typeof FOTO_ORIZZONTALI = [];
  const max = Math.max(FOTO_ORIZZONTALI.length, CASA_IMAGES.length);
  for (let i = 0; i < max; i++) {
    if (i < FOTO_ORIZZONTALI.length) out.push(FOTO_ORIZZONTALI[i]);
    if (i < CASA_IMAGES.length) out.push(CASA_IMAGES[i]);
  }
  return out;
})();

const HERO_IMAGES_MOBILE = [
  { src: '/images/IMG_4215.webp', alt: 'C.A.S.A - Cura e attenzione' },
  { src: '/images/IMG_4218.webp', alt: 'C.A.S.A - Ambiente familiare e cura' },
  { src: '/images/IMG_4217.webp', alt: 'Residenza per anziani - Spazi accoglienti' },
  { src: '/images/IMG_4208.webp', alt: 'Struttura C.A.S.A - Famiglia' },
  { src: '/images/IMG_4206.webp', alt: 'Residenza C.A.S.A' },
  { src: '/images/IMG_4203.webp', alt: 'C.A.S.A - Qualità di vita' },
  { src: '/images/IMG_4201.webp', alt: 'C.A.S.A - Casa per anziani' },
];

const CAROUSEL_INTERVAL_MS = 3500;
const DESKTOP_BREAKPOINT_PX = 768;

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const heroImages = isDesktop ? HERO_IMAGES_DESKTOP : HERO_IMAGES_MOBILE;

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`);
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setCurrentIndex(0);
    };
    setIsDesktop(mq.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background: carosello automatico di immagini */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Image
              src={heroImages[currentIndex].src}
              alt={heroImages[currentIndex].alt}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              unoptimized
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay scuro per leggibilità del testo (menu in alto, testi in basso) */}
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/30 to-black/60"
          aria-hidden
        />
        {/* Indicatori slide (pallini discreti in basso) */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[2] flex gap-2" aria-hidden>
          {heroImages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content — max ~80% altezza; mobile: px-6, padding-bottom sicuro per icone fisse (Settings/WhatsApp) */}
      <div className="relative z-10 text-center text-white px-6 sm:px-4 max-w-4xl mx-auto w-full flex flex-col items-center justify-center min-h-0 pt-[8vh] sm:pt-[10vh] pb-28 sm:pb-[18vh] gap-5 sm:gap-0">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-md animate-fade-in">
          Più che una Struttura, una Vera Famiglia
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-gray-100 mb-8 animate-slide-up">
          Residenza per Anziani Autosufficienti e Parzialmente Autosufficienti
        </p>
        {/* CTAs: respiro tra i bottoni, secondario semitrasparente per leggibilità */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto animate-slide-up mt-1 sm:mt-0">
          <a
            href="tel:+393490631492"
            className="inline-flex justify-center items-center bg-primary-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 shadow-md hover:shadow-lg hover:scale-[1.02] text-sm sm:text-base"
          >
            Chiama ora
          </a>
          <Link
            href="/#contatti"
            className="inline-flex justify-center items-center bg-black/20 backdrop-blur-sm text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-medium border-2 border-white hover:bg-black/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 text-sm sm:text-base"
          >
            Vieni a trovarci
          </Link>
        </div>
      </div>

      {/* Scroll Indicator — z-50 per restare sopra altri elementi */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

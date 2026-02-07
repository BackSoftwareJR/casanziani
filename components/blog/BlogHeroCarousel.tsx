'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface BlogHeroSlide {
  src: string;
  alt: string;
}

interface BlogHeroCarouselProps {
  slides: BlogHeroSlide[];
  intervalMs?: number;
  height?: string;
  className?: string;
}

export function BlogHeroCarousel({
  slides,
  intervalMs = 4500,
  height = 'h-[320px] sm:h-[380px] md:h-[420px]',
  className = '',
}: BlogHeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const t = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs, paused]);

  if (slides.length === 0) return null;

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-2xl ${height} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={current === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setCurrent((i) => (i - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-primary-700 shadow-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Slide precedente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setCurrent((i) => (i + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-primary-700 shadow-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Slide successivo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                  i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Vai allo slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative bg-[#f7f4ed] pt-28 pb-12 md:pt-32 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="wl-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
            <div className="p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center bg-[#f6f1e8]">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-primary-700 mb-4">
                C.A.S.A DI SALUTE A DOMICILIO
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.35rem] leading-[1.05] text-premium-ink mb-5">
                La serenita di casa, con l&apos;assistenza che merita.
              </h1>
              <p className="text-base sm:text-lg text-premium-inkSoft max-w-xl mb-7 leading-relaxed">
                Accogliamo anziani autosufficienti e parzialmente autosufficienti in un ambiente
                familiare e curato. Non siamo un&apos;RSA per cure intensive.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/#chi-possiamo-aiutare"
                  data-track="cta_click:scelta_giusta_hero"
                  className="wl-btn-primary"
                >
                  Scopri se siamo la scelta giusta
                </Link>
                <Link
                  href="/#contatti"
                  data-track="cta_click:contattaci_hero"
                  className="wl-btn-secondary"
                >
                  Contattaci
                </Link>
              </div>
            </div>
            <div className="relative min-h-[300px] lg:min-h-full">
              <Image
                src="/images/IMG_4208.webp"
                alt="Ambiente sereno e accogliente di C.A.S.A"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-transparent" />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/#chi-possiamo-aiutare" className="wl-chip">
            Vai a: Chi possiamo aiutare
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { services } from '@/data/content';
import { iconMap as IconComponents } from '@/components/ui/Icons';

const getIconComponent = (iconName: string) => {
  const IconComponent = IconComponents[iconName as keyof typeof IconComponents];
  return IconComponent || null;
};

export function Services() {
  return (
    <section id="servizi" className="relative section-shell overflow-hidden">
      {/* Sfondo immagine full-width — desktop: camera1, mobile: immagine attuale */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <div className="relative w-full h-full md:hidden">
            <Image
              src="/images/foto_orizzontali/IMG_2388.webp"
              alt="Ambiente C.A.S.A. - spazi accoglienti"
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
              aria-hidden
            />
          </div>
          <div className="relative w-full h-full hidden md:block">
            <Image
              src="/images/gallery/camera1.jpg"
              alt="Interni della struttura C.A.S.A."
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
              aria-hidden
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" aria-hidden />
      </div>

      <div className="relative z-10">
        {/* Header — visibile subito, senza animazione */}
        <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight drop-shadow-sm">
            Cosa offriamo, concretamente.
          </h2>
          <div className="w-20 h-1 bg-white/80 rounded-full mx-auto mb-6" aria-hidden />
          <p className="text-base md:text-lg text-white/95 leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
            Ogni ospite entra con un progetto individualizzato, costruito insieme alla famiglia.
            Non un modulo standard: un accordo reale su abitudini, preferenze ed esigenze,
            rivisto nel tempo, man mano che cambia la vita.
          </p>
        </div>

        {/* Scroll orizzontale card — mobile e desktop, liquid glass */}
        <div className="overflow-x-auto overflow-y-hidden pb-6 md:pb-8 scroll-smooth snap-x snap-mandatory services-horizontal-scroll">
          <div className="flex gap-4 md:gap-6 px-6 md:px-8 min-w-min">
            {services.map((service) => {
              const Icon = getIconComponent(service.icon);
              return (
                <article
                  key={service.id}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[340px] lg:w-[380px] snap-center rounded-3xl p-6 md:p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-5 md:mb-6">
                    {Icon ? <Icon size={28} className="md:w-8 md:h-8 text-white" /> : null}
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-2 md:mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-4">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* CTA — stile classico, sfondo pieno e testo */}
        <div className="container mx-auto px-6 md:px-8 max-w-2xl mt-12 md:mt-16">
          <div className="text-center py-8 md:py-10 px-6 wl-card">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-premium-ink mb-3">Pronto a iniziare?</h3>
            <p className="text-premium-inkSoft mb-6 leading-relaxed">
              Prenota una visita gratuita e capiamo insieme se C.A.S.A. e la scelta giusta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/galleria"
                className="wl-btn-primary text-sm md:text-base"
              >
                Vedi Galleria
              </a>
              <a
                href="/#contatti"
                className="wl-btn-secondary text-sm md:text-base"
              >
                Maggiori informazioni
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

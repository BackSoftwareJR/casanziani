'use client';

const PHONE_HREF = 'tel:+393490631492';
const VISITA_HREF = '/#contatti';

export function CasaInfoBox() {
  return (
    <div className="my-16 sm:my-20 py-12 sm:py-16 px-6 sm:px-10 rounded-3xl bg-gray-50/80 border border-gray-100/80 shadow-[0_2px_40px_-12px_rgba(0,0,0,0.06)]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[1.05rem] sm:text-[1.125rem] text-gray-600 leading-[1.7] tracking-[-0.01em] font-normal">
          Da noi queste attività fanno parte di ogni giornata.
          <br className="hidden sm:block" />
          <span className="text-gray-800 font-medium">Venite a vedere i sorrisi dei nostri ospiti.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-full bg-gray-900 text-white text-[0.9375rem] font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            Chiama ora
          </a>
          <a
            href={VISITA_HREF}
            className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-full border border-gray-300 text-gray-700 text-[0.9375rem] font-medium bg-white hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Prenota una visita
          </a>
        </div>
      </div>
    </div>
  );
}

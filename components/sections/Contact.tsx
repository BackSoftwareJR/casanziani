'use client';

import { siteConfig } from '@/data/content';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

const phoneClean = siteConfig.contact.phone.replace(/\s/g, '');
const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');

export function Contact() {
  const { skipAnimations } = useAccessibility();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });
  const show = skipAnimations || inView;

  return (
    <section
      id="contatti"
      className="section-shell-alt"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.header
          ref={ref}
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2
            id="contact-heading"
            className="section-title text-3xl sm:text-4xl mb-3 sm:mb-4"
          >
            Contattaci
          </h2>
          <p className="section-subtitle text-base sm:text-lg max-w-2xl mx-auto">
            Passa a trovarci per una visita guidata o contattaci. Siamo qui per rispondere a tutte le tue domande.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
          {/* Foto: prima su desktop, in alto su mobile per impatto */}
          <motion.div
            initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.5, delay: 0.1 }}
            className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1"
          >
            <Image
              src="/images/gallery/camera1.jpg"
              alt="Interno della struttura C.A.S.A, ambiente accogliente"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              aria-hidden
            />
            <p className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white font-serif text-lg sm:text-xl">
              Sentirsi a casa, fuori casa.
            </p>
          </motion.div>

          {/* Info e azioni: ottimizzato per touch e accessibilità */}
          <motion.div
            initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <ul className="space-y-4 sm:space-y-5 mb-6 sm:mb-8" role="list">
              <li className="flex items-start gap-3 sm:gap-4">
                <span
                  className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center"
                  aria-hidden
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <strong className="block text-primary-700 font-semibold mb-0.5">Indirizzo</strong>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {siteConfig.address.full}
                  </p>
                  <Link
                    href="/dove-siamo"
                    data-track="cta_click:vedi_mappa"
                    className="inline-flex items-center gap-1.5 mt-2 text-primary-600 hover:text-primary-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    aria-label="Vedi l’indirizzo sulla mappa"
                  >
                    <span>Vedi sulla mappa</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </li>

              <li className="flex items-start gap-3 sm:gap-4">
                <span
                  className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center"
                  aria-hidden
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <strong className="block text-primary-700 font-semibold mb-0.5">Telefono</strong>
                  <a
                    href={`tel:${phoneClean}`}
                    className="text-gray-800 hover:text-primary-600 transition-colors text-base sm:text-lg font-medium underline decoration-2 underline-offset-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    aria-label={`Chiamaci al numero ${siteConfig.contact.phone}`}
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3 sm:gap-4">
                <span
                  className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-[#25D366]/15 rounded-xl flex items-center justify-center"
                  aria-hidden
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
                <div>
                  <strong className="block text-primary-700 font-semibold mb-0.5">WhatsApp</strong>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-primary-600 transition-colors text-base sm:text-lg font-medium underline decoration-2 underline-offset-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    aria-label="Scrivici su WhatsApp (si apre in nuova finestra)"
                  >
                    Scrivici su WhatsApp
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3 sm:gap-4">
                <span
                  className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center"
                  aria-hidden
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <strong className="block text-primary-700 font-semibold mb-0.5">Email</strong>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-gray-800 hover:text-primary-600 transition-colors text-base sm:text-lg font-medium underline decoration-2 underline-offset-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded break-all"
                    aria-label={`Inviaci una email a ${siteConfig.contact.email}`}
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
            </ul>

            {/* CTA: area tasti grande e chiara su mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={`tel:${phoneClean}`}
                data-track="cta_click:chiama_ora_contact"
                className="min-h-[48px] sm:min-h-[52px] wl-btn-primary text-base sm:text-lg rounded-xl"
                aria-label="Chiama ora il numero di C.A.S.A"
              >
                Chiama ora
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                data-track="cta_click:whatsapp_contact"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] sm:min-h-[52px] flex items-center justify-center bg-[#25D366] text-white px-6 py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#1ebf5a] active:bg-[#1aac52] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 shadow-md hover:shadow-lg border border-white/30"
                aria-label="Scrivici su WhatsApp (si apre in nuova finestra)"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

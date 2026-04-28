import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/content';

const footerNav = {
  info: [
    { name: 'Chi siamo', href: '/#chi-siamo' },
    { name: 'Servizi', href: '/#servizi' },
    { name: 'Galleria', href: '/galleria' },
    { name: 'Contatti', href: '/#contatti' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/uploads/Informativa%20utenti%20sito%20web%20CASA%20ANZIANI.pdf', pdf: true },
    { name: 'Cookie Policy', href: '/uploads/Cookie%20policy%20CASA%20ANZIANI.pdf', pdf: true },
  ],
};

const PIVA = '129397710963';
const phoneClean = siteConfig.contact.phone.replace(/\s/g, '');
const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');

export function Footer() {
  return (
    <footer
      className="bg-premium-surface text-gray-800 mt-24 border-t border-primary-200"
      role="contentinfo"
      aria-label="Piè di pagina"
    >
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" data-track="nav_click:footer_logo" className="inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
              <Image
                src="/images/logo.jpg"
                alt=""
                width={64}
                height={64}
                className="rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <span className="font-display text-xl font-bold text-premium-ink block">C.A.S.A</span>
                <span className="text-[11px] text-primary-700 uppercase tracking-[0.16em] block mt-0.5">
                  C.A.S.A di Salute a domicilio
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-premium-inkSoft leading-relaxed max-w-xs">
              Un luogo dove il piacere si vive, l&apos;assistenza si sente, l&apos;accoglienza sorprende.
            </p>
          </div>

          {/* Navigazione */}
          <nav
            className="sm:col-span-2 lg:col-span-2"
            aria-labelledby="footer-nav-info"
          >
            <h3
              id="footer-nav-info"
              className="text-xs font-semibold text-primary-700 uppercase tracking-[0.16em] mb-4"
            >
              Navigazione
            </h3>
            <ul className="space-y-3" role="list">
              {footerNav.info.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    data-track={`nav_click:footer_${item.name.toLowerCase().replace(/\s/g, '_')}`}
                    className="text-sm text-premium-inkSoft hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legale */}
          <nav
            className="sm:col-span-2 lg:col-span-2"
            aria-labelledby="footer-nav-legal"
          >
            <h3
              id="footer-nav-legal"
              className="text-xs font-semibold text-primary-700 uppercase tracking-[0.16em] mb-4"
            >
              Legale
            </h3>
            <ul className="space-y-3" role="list">
              {footerNav.legal.map((item) => (
                <li key={item.name}>
                  {'pdf' in item && item.pdf ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track={`nav_click:footer_${item.name.toLowerCase().replace(/\s/g, '_').replace(/-/g, '_')}`}
                      className="text-sm text-premium-inkSoft hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                      aria-label={`${item.name} (si apre in nuova finestra, PDF)`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      data-track={`nav_click:footer_${item.name.toLowerCase().replace(/\s/g, '_').replace(/-/g, '_')}`}
                      className="text-sm text-premium-inkSoft hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contatti */}
          <div
            className="sm:col-span-2 lg:col-span-4"
            aria-labelledby="footer-contact"
          >
            <h3
              id="footer-contact"
              className="text-xs font-semibold text-primary-700 uppercase tracking-[0.16em] mb-4"
            >
              Contatti
            </h3>
            <address className="not-italic text-sm text-premium-inkSoft space-y-3">
              <p className="leading-relaxed">
                {siteConfig.address.street}<br />
                {siteConfig.address.postalCode} {siteConfig.address.city} ({siteConfig.address.province})
              </p>
              <p>
                <a
                  href={`tel:${phoneClean}`}
                  className="text-premium-inkSoft hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                  aria-label={`Telefono: ${siteConfig.contact.phone}`}
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-premium-inkSoft hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded break-all"
                  aria-label={`Email: ${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="pt-2">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ebf5a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 rounded font-medium"
                  aria-label="Scrivici su WhatsApp"
                >
                  <span className="sr-only">WhatsApp: </span>
                  WhatsApp
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright, P.IVA e credito */}
        <div className="mt-12 pt-8 border-t border-primary-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-premium-inkSoft">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>
              © {new Date().getFullYear()} C.A.S.A — Tutti i diritti riservati
            </p>
            <p className="font-medium text-premium-ink">
              P.IVA {PIVA}
            </p>
          </div>
          <p>
            Sito realizzato da{' '}
            <a
              href="https://backsoftware.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-premium-inkSoft hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded font-medium"
              aria-label="Backsoftware (si apre in nuova finestra)"
            >
              Backsoftware
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

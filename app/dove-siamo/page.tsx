import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/content';

const phoneClean = siteConfig.contact.phone.replace(/\s/g, '');
const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');

// Abbiategrasso, Via Alessandro Volta 19/E
const MAP_CENTER = '45.3996,8.918';
const OSM_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=8.905%2C45.396%2C8.931%2C45.404&layer=mapnik&marker=${MAP_CENTER}`;

export const metadata: Metadata = {
  title: 'Dove siamo | C.A.S.A - Contatti e mappa',
  description: `Trova la nostra struttura: ${siteConfig.address.full}. Mappa, indirizzo, telefono, email e WhatsApp.`,
};

export default function DoveSiamoPage() {
  return (
    <main id="main-content" className="min-h-screen bg-primary-50">
      {/* Hero */}
      <section className="bg-premium-ink text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-white">
            Dove siamo
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Vieni a trovarci per una visita. Siamo a Abbiategrasso, in Via Alessandro Volta.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Mappa: 2 colonne su desktop */}
          <div className="lg:col-span-2">
            <h2 className="sr-only">Mappa</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 aspect-[4/3] min-h-[280px] sm:min-h-[320px]">
              <iframe
                title="Mappa: C.A.S.A - Via Alessandro Volta 19/E, Abbiategrasso"
                src={OSM_EMBED_URL}
                className="w-full h-full min-h-[280px] sm:min-h-[320px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              La mappa mostra la posizione della struttura. Passa a trovarci quando vuoi.
            </p>
          </div>

          {/* Contatti in evidenza */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-primary-200 shadow-sm sticky top-24">
              <h2 className="font-display text-xl font-bold text-premium-ink mb-6">
                I nostri contatti
              </h2>
              <ul className="space-y-5" role="list">
                <li>
                  <span className="block text-sm font-semibold text-primary-700 mb-1">Indirizzo</span>
                  <p className="text-gray-800">
                    {siteConfig.address.street}<br />
                    {siteConfig.address.postalCode} {siteConfig.address.city} ({siteConfig.address.province})
                  </p>
                </li>
                <li>
                  <span className="block text-sm font-semibold text-primary-700 mb-1">Telefono</span>
                  <a
                    href={`tel:${phoneClean}`}
                    className="text-gray-800 hover:text-primary-600 font-medium underline decoration-2 underline-offset-2"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-sm font-semibold text-primary-700 mb-1">WhatsApp</span>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-primary-600 font-medium underline decoration-2 underline-offset-2"
                  >
                    Scrivici su WhatsApp
                  </a>
                </li>
                <li>
                  <span className="block text-sm font-semibold text-primary-700 mb-1">Email</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-gray-800 hover:text-primary-600 font-medium underline decoration-2 underline-offset-2 break-all"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-3">
                <Link
                  href="/#contatti"
                    className="wl-btn-primary rounded-xl"
                >
                  Torna alla home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

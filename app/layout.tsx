import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Open_Sans, Merriweather, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { TrackingProvider } from '@/components/tracking/TrackingProvider';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'C.A.S.A. Abbiategrasso: Più che una Struttura, una Vera Famiglia',
    template: '%s | C.A.S.A. Abbiategrasso',
  },
  description: 'Più che una struttura, una vera famiglia. A C.A.S.A. (Abbiategrasso) offriamo amore, gioia di vivere e assistenza 24h. I tuoi cari al sicuro. Alternativa calda alle case di riposo: niente atmosfera ospedaliera, ma una vera comunità dove si condividono giornate, sorrisi e supporto reciproco.',
  keywords: [
    'casa famiglia anziani Abbiategrasso',
    'comunità alloggio anziani Abbiategrasso',
    'alternativa casa di riposo Abbiategrasso',
    'assistenza anziani 24h Abbiategrasso',
    'alloggio anziani Abbiategrasso',
    'casa anziani Abbiategrasso',
    'struttura anziani Abbiategrasso',
    'assistenza domiciliare anziani Abbiategrasso',
    'Motta Visconti',
    'Morimondo',
    'Vigevano',
    'Gaggiano',
    'Vermezzo con Zelo',
    'Albairate',
    'Ozzero',
    'Robecco sul Naviglio',
    'Magenta',
  ],
  authors: [{ name: 'C.A.S.A' }],
  creator: 'C.A.S.A',
  publisher: 'C.A.S.A',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://casanziani.com',
    siteName: 'C.A.S.A - Comunità Alloggio Sociale',
    title: 'C.A.S.A. Abbiategrasso: Più che una Struttura, una Vera Famiglia',
    description: 'Spesso si cerca una casa di riposo pensando sia l\'unica soluzione. C.A.S.A. vi offre un\'alternativa più calda: niente atmosfera ospedaliera, ma una vera comunità dove si condividono giornate, sorrisi e supporto reciproco.',
    images: [
      {
        url: 'https://casanziani.com/images/hero-fallback.jpg',
        width: 1200,
        height: 630,
        alt: 'C.A.S.A - Comunità Alloggio Sociale per Anziani',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C.A.S.A. Abbiategrasso: Più che una Struttura, una Vera Famiglia',
    description: 'Alternativa calda alle case di riposo: una vera comunità dove si condividono giornate, sorrisi e supporto reciproco. Assistenza 24h ad Abbiategrasso.',
    images: ['https://casanziani.com/images/hero-fallback.jpg'],
    creator: '@casanziani',
  },
  alternates: {
    canonical: 'https://casanziani.com',
    languages: {
      'it': 'https://casanziani.com',
      'x-default': 'https://casanziani.com',
    },
  },
  verification: {
    google: 'google082cd4123356f4f9',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#D4C4A8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${openSans.variable} ${merriweather.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="icon" href="/icons/favicon.png" type="image/png" />
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://casanziani.com/#localbusiness',
              name: 'C.A.S.A - Comunità Alloggio Sociale per Anziani',
              alternateName: 'C.A.S.A. Abbiategrasso',
              url: 'https://casanziani.com/',
              image: 'https://casanziani.com/images/hero-fallback.jpg',
              telephone: '+39 349 063 1492',
              priceRange: '€€',
              description: 'Più che una struttura, una vera famiglia. C.A.S.A. offre un\'alternativa calda alle case di riposo: niente atmosfera ospedaliera, ma una vera comunità dove si condividono giornate, sorrisi e supporto reciproco. Assistenza 24h ad Abbiategrasso.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Via Alessandro Volta 19/E',
                addressLocality: 'Abbiategrasso',
                addressRegion: 'MI',
                postalCode: '20081',
                addressCountry: 'IT',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '09:00',
                  closes: '20:00',
                },
              ],
              areaServed: [
                { '@type': 'Place', name: 'Abbiategrasso' },
                { '@type': 'Place', name: 'Motta Visconti' },
                { '@type': 'Place', name: 'Morimondo' },
                { '@type': 'Place', name: 'Vigevano' },
                { '@type': 'Place', name: 'Gaggiano' },
                { '@type': 'Place', name: 'Vermezzo con Zelo' },
                { '@type': 'Place', name: 'Albairate' },
                { '@type': 'Place', name: 'Ozzero' },
                { '@type': 'Place', name: 'Robecco sul Naviglio' },
                { '@type': 'Place', name: 'Magenta' },
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+39 349 063 1492',
                contactType: 'customer service',
                areaServed: 'IT',
                availableLanguage: ['it'],
              },
              knowsAbout: [
                'casa famiglia per anziani',
                'comunità alloggio anziani',
                'alternativa casa di riposo',
                'assistenza anziani 24h',
                'Abbiategrasso (MI)',
                'alloggio anziani familiare',
                'comunità anziani Abbiategrasso',
              ],
              slogan: 'Più che una struttura, una vera famiglia',
            }),
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17576720313"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17576720313');
          `}
        </Script>
        <AccessibilityProvider>
          <Header />
          <main id="main-content" className="min-h-screen w-full min-w-0 overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </AccessibilityProvider>
      </body>
    </html>
  );
}

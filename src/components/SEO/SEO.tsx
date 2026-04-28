import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, article }) => {
  const seo = {
    title: title || 'Residenza per Anziani Abbiategrasso | Casanziani Premium Care',
    description: description || 'Casanziani ad Abbiategrasso: residenza per anziani esclusiva con soli 4 posti. Assistenza dedicata h24, cucina espressa e ambiente familiare vicino a Milano.',
    image: image || '/og-image.jpg', // Placeholder
    url: 'https://casanziani.com', // Placeholder
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Casanziani",
    "image": seo.image,
    "@id": "https://casanziani.com",
    "url": "https://casanziani.com",
    "telephone": "+390000000000", // Da aggiornare
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Da Definire",
      "addressLocality": "Abbiategrasso",
      "postalCode": "20081",
      "addressRegion": "MI",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.4000,
      "longitude": 8.9167
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "description": seo.description
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qual è la differenza concreta rispetto a una normale casa di riposo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A differenza delle case di riposo tradizionali con decine di ospiti, Casanziani accoglie solo 4 persone autosufficienti. Questo garantisce un'atmosfera autenticamente domestica e un'assistenza personalizzata 1:1 difficile da trovare in strutture più grandi."
        }
      },
      {
        "@type": "Question",
        "name": "Com'è la cucina e l'alimentazione a Casanziani?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La cucina è interna e domestica. Non usiamo catering. Ogni pasto è preparato sul momento con ingredienti freschi, rispettando le preferenze e le diete degli ospiti, proprio come si farebbe in famiglia."
        }
      },
      {
        "@type": "Question",
        "name": "Si possono fare visite libere a Casanziani?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì, non abbiamo orari di visita rigidi. Essendo una residenza privata familiare, incoraggiamo il contatto costante con i cari, rendendo la porta sempre aperta per i familiari degli ospiti."
        }
      }
    ]
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;

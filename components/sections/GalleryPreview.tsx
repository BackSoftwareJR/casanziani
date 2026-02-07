'use client';

import { galleryImages } from '@/data/content';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from '@/components/ui/Carousel';

export function GalleryPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuredImages = galleryImages.slice(0, 6);
  const carouselItems = featuredImages.map((image) => (
    <Link key={image.id} href="/galleria" className="block relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </Link>
  ));

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 mb-4 md:mb-6">
            La Nostra Missione
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 px-4">
            C.A.S.A nasce con l&apos;obiettivo di dare un&apos;offerta residenziale di tipo sociale stimolando la socializzazione, il mantenimento delle risorse per prevenire isolamento e depressione. Uguaglianza e rispetto sono alla base dei nostri principi: l&apos;erogazione del servizio è ispirata ad un&apos;eguale considerazione per ogni singola persona, che troverà uno spazio a propria dimensione. Non siamo una casa di riposo tradizionale: siamo una comunità dove ogni giorno si costruiscono relazioni autentiche, si condividono momenti di gioia e si offre supporto reciproco.
          </p>
          <Link
            href="/galleria"
            className="inline-block bg-primary-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            Esplora la Galleria Completa
          </Link>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <Carousel
            items={carouselItems}
            autoPlay={true}
            interval={5000}
            showDots={true}
            showArrows={true}
          />
        </motion.div>

        {/* Grid Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6"
        >
          {featuredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              className="relative h-[150px] md:h-[200px] lg:h-[250px] rounded-lg md:rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Link href="/galleria">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white">
                    <h3 className="font-serif text-xs md:text-sm lg:text-base font-bold mb-1 line-clamp-1">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { galleryImages } from '@/data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from '@/components/ui/Carousel';

const FALLBACK_IMAGE = '/images/gallery/camera1.jpg';

const categories = [
  { id: 'all', name: 'Tutte', count: galleryImages.length },
  { id: 'camere', name: 'Camere', count: galleryImages.filter((img) => img.category === 'camere').length },
  { id: 'spazi-comuni', name: 'Spazi Comuni', count: galleryImages.filter((img) => img.category === 'spazi-comuni').length },
  { id: 'servizi', name: 'Servizi', count: galleryImages.filter((img) => img.category === 'servizi').length },
  { id: 'esterni', name: 'Esterni', count: galleryImages.filter((img) => img.category === 'esterni').length },
  { id: 'dettagli', name: 'Dettagli', count: galleryImages.filter((img) => img.category === 'dettagli').length },
];

export default function GalleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [failedIds, setFailedIds] = useState<Set<number>>(new Set());

  const handleImageError = useCallback((id: number) => {
    setFailedIds((prev) => new Set(prev).add(id));
  }, []);

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const carouselItems = filteredImages.map((image) => {
    const displaySrc = failedIds.has(image.id) ? FALLBACK_IMAGE : image.src;
    return (
      <div key={image.id} className="relative w-full h-[70vh] min-h-[500px]">
        <Image
          src={displaySrc}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={image.id === filteredImages[0].id}
          onError={() => handleImageError(image.id)}
          unoptimized={failedIds.has(image.id)}
        />
      </div>
    );
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-warm-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-700 mb-4">
            Galleria Fotografica
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Scopri gli spazi accoglienti di C.A.S.A: un ambiente familiare dove ogni dettaglio è curato per il benessere dei nostri ospiti
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-primary-600 hover:bg-primary-50 border border-primary-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Main Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Carousel
            items={carouselItems}
            autoPlay={true}
            interval={6000}
            showDots={true}
            showArrows={true}
            className="mb-8"
          />
        </motion.div>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="font-serif text-3xl font-bold text-primary-600 mb-8 text-center">
            Esplora Tutte le Immagini
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative h-[250px] md:h-[300px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-gray-100"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <Image
                    src={failedIds.has(image.id) ? FALLBACK_IMAGE : image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={() => handleImageError(image.id)}
                    unoptimized={failedIds.has(image.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const image = galleryImages.find((img) => img.id === selectedImage);
                if (!image) return null;
                const displaySrc = failedIds.has(image.id) ? FALLBACK_IMAGE : image.src;
                return (
                  <>
                    <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
                      <Image
                        src={displaySrc}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        unoptimized={failedIds.has(image.id)}
                      />
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Chiudi"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    {/* Navigation */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
                        setSelectedImage(filteredImages[prevIndex].id);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Immagine precedente"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
                        const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
                        setSelectedImage(filteredImages[nextIndex].id);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Immagine successiva"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

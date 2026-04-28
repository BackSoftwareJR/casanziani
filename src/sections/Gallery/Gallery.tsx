import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';
import { MagneticButton, TextReveal } from '../../components/Motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { viewportOnce, appleEase } from '../../styles/motion-variants';
import styles from './Gallery.module.css';

import img1 from '../../assets/images/soggiorno-1.webp';
import img2 from '../../assets/images/camera-singola-1.jpg';
import img3 from '../../assets/images/bagno-principale.jpg';
import img4 from '../../assets/images/soggiorno-2.webp';
import img5 from '../../assets/images/camera-singola-2.jpg';

const images = [img1, img2, img3, img4, img5];

export const Gallery: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={`container`}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TextReveal as="h2">
            Gli spazi della nostra casa
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
          >
            Ambienti ampi, riscaldati dalla luce naturale e arredati con gusto. Ogni camera garantisce il massimo della privacy per riposare in pace, mentre l'ampio salotto favorisce l'incontro e la conversazione.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.carouselWrapper}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {images.map((src, index) => (
                <div className={styles.embla__slide} key={index}>
                  <div className={styles.imageCard} style={{ backgroundImage: `url('${src}')` }} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.dots}>
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ''}`} 
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>

          <motion.button
            className={styles.navButton}
            onClick={scrollPrev}
            style={{ left: '-20px' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <ChevronLeft />
          </motion.button>
          <motion.button
            className={styles.navButton}
            onClick={scrollNext}
            style={{ right: '-20px' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <ChevronRight />
          </motion.button>
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4, duration: 0.6, ease: appleEase }}
        >
          <MagneticButton>
            <a href="#contact">
              <Button variant="primary">Fissa una visita conoscitiva in struttura</Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

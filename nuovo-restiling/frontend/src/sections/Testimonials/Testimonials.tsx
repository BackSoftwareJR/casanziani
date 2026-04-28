import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';
import { TextReveal, MagneticButton } from '../../components/Motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { viewportOnce, appleEase } from '../../styles/motion-variants';
import styles from './Testimonials.module.css';

const reviews = [
  { text: "Il senso di colpa iniziale è sparito dopo tre giorni. Sapere mia madre seguita giorno e notte in un ambiente così raffinato, senza mai essere trattata come un semplice numero, ha restituito il sonno a tutta la famiglia. Ora mangia volentieri ed è tornata a fare lunghe passeggiate.", author: "Roberto", role: "Figlio" },
  { text: "L'idea della classica casa di riposo ci spaventava molto. Qui mio padre ha trovato conversazioni stimolanti e menu preparati ascoltando le sue richieste. L'atmosfera è identica a quella del suo vecchio salotto signorile.", author: "Giulia", role: "Figlia" },
  { text: "Il numero ridotto di persone fa l'intera differenza. C'è silenzio totale quando serve riposare, e compagnia discreta quando lo si desidera. Hanno un'attenzione meticolosa che protegge costantemente la privacy di mio suocero.", author: "Anna", role: "Nuora" }
];

export const Testimonials: React.FC = () => {
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
    <section id="testimonials" className={styles.testimonials}>
      <div className={`container`}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TextReveal as="h2">
            Le parole di chi ha ritrovato la serenità
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
          >
            Le parole delle famiglie che ci hanno affidato la serenità dei loro cari.
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
              {reviews.map((review, index) => (
                <div className={styles.embla__slide} key={index}>
                  <div className={styles.card}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill="var(--color-secondary)" color="var(--color-secondary)" size={20} />
                      ))}
                    </div>
                    <p className={styles.quote}>"{review.text}"</p>
                    <div className={styles.author}>
                      <strong>{review.author}</strong>
                      <span>{review.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.dots}>
            {reviews.map((_, i) => (
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
            style={{ left: '-16px' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <ChevronLeft />
          </motion.button>
          <motion.button
            className={styles.navButton}
            onClick={scrollNext}
            style={{ right: '-16px' }}
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
              <Button variant="primary">Assicuragli la stessa pace mentale</Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

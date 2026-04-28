import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';
import { TextReveal, MagneticButton } from '../../components/Motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { viewportOnce, appleEase } from '../../styles/motion-variants';
import styles from './Testimonials.module.css';

const reviews = [
  {
    text: "All'inizio ero molto in ansia: temevo che mamma si sentisse abbandonata. La prima settimana non e stata perfetta, ma il personale ci ha aggiornati ogni giorno e ha ascoltato davvero le sue abitudini. Dopo poco l'ho vista piu tranquilla, mangia con regolarita e partecipa volentieri alle attivita.",
    author: 'Paola',
    role: 'Figlia di ospite',
  },
  {
    text: "Mio padre e una persona riservata e il cambiamento e stato delicato. Qui non forzano nulla: lo aiutano quando serve e gli lasciano i suoi tempi. In due mesi e diventato piu sereno, dorme meglio e noi familiari sentiamo di avere un riferimento affidabile.",
    author: 'Marco',
    role: 'Figlio di ospite',
  },
  {
    text: "Quando andiamo a trovarla la troviamo curata e coinvolta nella vita della casa, ma senza caos. Ci piace che ci sia dialogo anche sulle piccole cose: terapie, pasti, giornate no. Non ci vendono una favola, ci danno una mano concreta ogni giorno.",
    author: 'Elena',
    role: 'Nipote di ospite',
  },
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

import React from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { TextReveal, TiltCard } from '../../components/Motion';
import { viewportOnce, appleEase, cardReveal, staggerContainer } from '../../styles/motion-variants';
import styles from './VerticalGallery.module.css';

import imgVertical1 from '../../assets/images/camera-verticale.jpg';
import imgVertical2 from '../../assets/images/bagno-verticale.jpg';
import imgVertical3 from '../../assets/images/salotto-verticale.jpg';

const verticalImages = [
  { src: imgVertical1, title: 'Camera Privata', desc: 'Dettagli curati per il massimo riposo.' },
  { src: imgVertical2, title: 'Bagno Assistito', desc: 'Sicurezza e design senza compromessi.' },
  { src: imgVertical3, title: 'Angolo Relax', desc: 'Uno spazio intimo per le tue letture.' },
];

export const VerticalGallery: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })]);

  return (
    <section id="vertical-gallery" className={styles.verticalGallery}>
      <div className="container">
        <div className={styles.header}>
          <TextReveal as="h2">Uno sguardo più vicino</TextReveal>
          <p>Abbiamo catturato l'essenza della nostra casa attraverso scatti verticali che esaltano la cura di ogni singolo dettaglio.</p>
        </div>

        {/* Desktop Grid / Mobile Carousel */}
        <div className={styles.carousel} ref={emblaRef}>
          <motion.div 
            className={styles.container}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {verticalImages.map((img, i) => (
              <motion.div 
                key={i} 
                className={styles.slide}
                variants={cardReveal}
              >
                <TiltCard className={styles.card} maxTilt={5}>
                  <div 
                    className={styles.image} 
                    style={{ backgroundImage: `url(${img.src})` }}
                  />
                  <div className={styles.overlay}>
                    <h3>{img.title}</h3>
                    <p>{img.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

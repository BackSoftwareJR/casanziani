import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '../../components/Motion';
import { staggerContainer, cardReveal, viewportOnce, appleEase } from '../../styles/motion-variants';
import styles from './Features.module.css';

import imgSolitudine from '../../assets/images/soggiorno-1.webp';
import imgPresenza from '../../assets/images/corridoio-luminoso.webp';
import imgClima from '../../assets/images/giardino-privato.webp';

import { FlipCard } from '../../components/Motion/FlipCard';

const features = [
  { 
    title: 'Vita Sociale e Famigliare', 
    desc: 'Condividere gli spazi con altre tre persone elimina il senso di isolamento. Si creano amicizie sincere e le giornate trascorrono più leggere.',
    image: imgSolitudine 
  },
  { 
    title: 'Assistenza Invisibile', 
    desc: 'Il personale qualificato vive la casa. Interveniamo tempestivamente in caso di necessità, senza far pesare l\'assistenza o limitare la libertà.',
    image: imgPresenza
  },
  { 
    title: 'Ambiente Vitale', 
    desc: 'L\'accettazione esclusiva di ospiti autosufficienti assicura conversazioni stimolanti, ritmi naturali e un\'atmosfera serena.',
    image: imgClima
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className={styles.features}>
      <div className={`container`}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TextReveal as="h2">
            I tre fondamenti di una vita tranquilla
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
          >
            Abbiamo costruito questo ambiente ascoltando le paure dei figli e i desideri dei genitori. Il risultato è l'esatto equilibrio tra autonomia e sicurezza protetta.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardReveal}
              className={styles.cardWrapper}
            >
              <FlipCard 
                title={f.title}
                description={f.desc}
                image={f.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

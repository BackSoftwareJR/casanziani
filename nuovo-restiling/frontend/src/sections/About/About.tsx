import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal, SoftParallax } from '../../components/Motion';
import { slideInRight, viewportOnce, appleEase } from '../../styles/motion-variants';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={`container ${styles.container}`}>
        <SoftParallax className={styles.imageWrapper} offset={30}>
          <div className={styles.imagePlaceholder}>
            <img 
              src="/src/assets/images/soggiorno-1.webp" 
              alt="Il nostro ambiente" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className={styles.badge}>
            <div className={styles.badgeIcon}>C.A.S.A</div>
            <div>
              <span className={styles.badgeTitle}>Amore Familiare</span>
              <span className={styles.badgeText}>Dignità e Rispetto</span>
            </div>
          </div>
        </SoftParallax>

        <motion.div
          className={styles.content}
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TextReveal as="h2">
            Da dove nasce il nostro impegno quotidiano
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
          >
            Abbiamo aperto queste porte partendo da un'esigenza personale profonda. Non trovavamo, per i nostri stessi familiari, una struttura che rispecchiasse la dignità, il rispetto e il comfort totale di un vero ambiente domestico. Abbiamo quindi deciso di costruirla noi.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.45, duration: 0.6, ease: appleEase }}
          >
            Selezioniamo il personale con criteri rigidissimi. Esigiamo non solo le migliori qualifiche tecniche, ma una spiccata intelligenza emotiva. Perché prima di essere professionisti qualificati, siamo persone che dedicano la propria vita alla cura di altre persone.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

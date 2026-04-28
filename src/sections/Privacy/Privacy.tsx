import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal, SoftParallax } from '../../components/Motion';
import { slideInLeft, viewportOnce, appleEase } from '../../styles/motion-variants';
import styles from '../About/About.module.css';

import privacyImg from '../../assets/images/camera-dettaglio-1.webp';

export const Privacy: React.FC = () => {
  return (
    <section id="privacy" className={styles.about}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TextReveal as="h2">
            L'indipendenza tutelata in ogni momento
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
          >
            Trasferirsi da noi non comporta la rinuncia alle proprie abitudini consolidate. Non esistono orari imposti per andare a dormire o per svegliarsi. Rispettiamo l'autonomia individuale garantendo camere spaziose, concepite come veri e propri rifugi privati.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.45, duration: 0.6, ease: appleEase }}
          >
            L'ampio soggiorno e le aree comuni restano sempre a disposizione per leggere un libro in serenità o per condividere un tè caldo nel pomeriggio. L'incontro e la socialità sono sempre frutto di una scelta volontaria, mai di un obbligo.
          </motion.p>
        </motion.div>

        <SoftParallax className={styles.imageWrapper} offset={25}>
          <div
            className={styles.imagePlaceholder}
            style={{
              backgroundImage: `url(${privacyImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <span style={{ background: 'rgba(250,248,245,0.8)', padding: '8px 16px', borderRadius: '16px', fontSize: 'var(--text-sm)', color: 'var(--color-text-heading)' }}>
              Privacy e Comfort
            </span>
          </div>
        </SoftParallax>
      </div>
    </section>
  );
};

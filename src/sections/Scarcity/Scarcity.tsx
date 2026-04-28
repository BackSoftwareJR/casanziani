import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';
import { MagneticButton } from '../../components/Motion';
import { organicPulse, breathingPulse, viewportOnce, appleEase, easeInOutSmooth } from '../../styles/motion-variants';

import styles from './Scarcity.module.css';

export const Scarcity: React.FC = () => {
  return (
    <section id="scarcity" className={styles.scarcity}>
      {/* Subtle animated radial glow behind the number */}
      <motion.div
        className={styles.glow}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: easeInOutSmooth,
        }}
      />

      <div className={`container`}>
        <motion.div
          className={styles.content}
          variants={organicPulse}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* The number "4" — pulsating counter */}
          <motion.div
            animate={breathingPulse}
            className={styles.number}
          >
            4
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.7, ease: appleEase }}
            className={styles.title}
          >
            Una scelta per soli 4 ospiti
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.45, duration: 0.7, ease: appleEase }}
            className={styles.description}
          >
            Abbiamo deciso intenzionalmente di mantenere il numero dei posti estremamente ridotto. Solo così possiamo fornire un'attenzione umana impeccabile e preservare l'integrità del clima familiare.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.6, duration: 0.6, ease: appleEase }}
          >
            <MagneticButton>
              <a href="#contact">
                <Button
                  variant="secondary"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'transparent',
                    color: 'var(--color-primary)',
                  }}
                >
                  Verifica la disponibilità attuale
                </Button>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

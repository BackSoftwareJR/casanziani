import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';
import { MagneticButton, TextReveal } from '../../components/Motion';
import { viewportOnce, appleEase, staggerContainer, staggerChild } from '../../styles/motion-variants';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.wrapper}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div className={styles.info} variants={staggerChild}>
            <TextReveal as="h2">Iniziamo a parlarne senza alcun impegno</TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
            >
              Lasciaci il tuo recapito telefonico. Ti ricontatteremo in tempi estremamente brevi per ascoltare attentamente la tua storia, capire le necessità specifiche e confermarti se uno dei nostri 4 posti esclusivi è attualmente libero.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className={styles.actions}
            variants={staggerChild}
          >
            <p className={styles.ctaText}>Scegli come preferisci contattarci:</p>
            <div className={styles.buttonGroup}>
              <MagneticButton strength={0.2}>
                <a href="tel:+393490631492" className={styles.directBtn}>
                  <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Chiama Ora
                  </Button>
                </a>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <a href="https://wa.me/393490631492" target="_blank" rel="noopener noreferrer" className={styles.directBtn}>
                  <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    WhatsApp
                  </Button>
                </a>
              </MagneticButton>
            </div>
            <p className={styles.availability}>
              Siamo pronti ad ascoltarti e fornirti tutte le informazioni di cui hai bisogno.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

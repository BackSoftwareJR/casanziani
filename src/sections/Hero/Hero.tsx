import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';
import { TextReveal, SoftParallax, MagneticButton } from '../../components/Motion';
import { staggerContainer, staggerChild, appleEase } from '../../styles/motion-variants';
import styles from './Hero.module.css';

import heroImage from '../../assets/images/hero-struttura.jpg';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <TextReveal as="h1">
            La serenità di sentirsi a casa, protetti come in famiglia.
          </TextReveal>
          <motion.p
            variants={staggerChild}
          >
            Nessun corridoio freddo o ritmo da clinica. Abbiamo preparato un ambiente intimo, riservato a sole 4 persone autosufficienti. Qui si mangia insieme, si conversa in soggiorno e si riceve un'attentione costante e discreta.
          </motion.p>
          <motion.div className={styles.actions} variants={staggerChild}>
            <MagneticButton>
              <a href="tel:+393490631492">
                <Button variant="primary">Chiama Ora</Button>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://wa.me/393490631492" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">Scrivici su WhatsApp</Button>
              </a>
            </MagneticButton>
          </motion.div>
          <motion.div
            variants={staggerChild}
            style={{ marginTop: 'var(--spacing-6)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-sage)', fontWeight: 500 }}
          >
            <motion.span
              style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: appleEase,
              }}
            />
            Assistenza costante e dedicata — Un vero clima domestico
          </motion.div>
        </motion.div>

        <SoftParallax className={styles.imageWrapper} offset={30}>
          <div
            className={styles.imagePlaceholder}
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <img src={heroImage} alt="Struttura Casanziani - Esterno e Giardino" style={{ display: 'none' }} fetchPriority="high" />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6, ease: appleEase }}
              style={{ background: 'rgba(250,248,245,0.8)', padding: '8px 16px', borderRadius: '16px', fontSize: 'var(--text-sm)', color: 'var(--color-text-heading)' }}
            >
              La nostra struttura
            </motion.span>
          </div>
        </SoftParallax>
      </div>
    </section>
  );
};

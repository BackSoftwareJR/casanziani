import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import { TextReveal, SoftParallax } from '../../components/Motion';
import { slideInLeft, viewportOnce, appleEase } from '../../styles/motion-variants';
import styles from './Lifestyle.module.css';

import lifestyleImg from '../../assets/images/tavola-apparecchiata.webp';

export const Lifestyle: React.FC = () => {
  return (
    <section id="lifestyle" className={styles.lifestyle}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TextReveal as="h2">
            Il profumo del caffè appena fatto
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
          >
            La vita qui non segue rigide tabelle di marcia. I risvegli sono lenti, accompagnati dalla colazione preparata sul momento. Le mattinate si alternano tra letture, piccole passeggiate nel verde e riposo in poltrona.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.45, duration: 0.6, ease: appleEase }}
          >
            Sedersi a tavola in 4 significa poter decidere cosa mangiare. Ascoltiamo i gusti individuali per variare i piatti, portando in tavola il calore del pranzo della domenica, tutti i giorni.
          </motion.p>
        </motion.div>

        <div className={styles.imageWrapper}>
          <SoftParallax offset={30}>
            <div
              className={styles.imagePlaceholder}
              style={{
                backgroundImage: `url(${lifestyleImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <span className={styles.label}>
                La nostra cucina
              </span>
            </div>
          </SoftParallax>

          {/* Floating badge — delayed entrance */}
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.6, duration: 0.7, ease: appleEase }}
            className={styles.badge}
          >
            <div className={styles.badgeIcon}>
              <ChefHat size={24} />
            </div>
            <div>
              <strong className={styles.badgeTitle}>Menu Personalizzati</strong>
              <span className={styles.badgeText}>Cucina espressa ogni giorno</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

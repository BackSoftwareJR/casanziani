import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';
import { TextReveal, MagneticButton } from '../../components/Motion';
import { viewportOnce, appleEase } from '../../styles/motion-variants';

export const Investment: React.FC = () => {
  return (
    <section id="investment" style={{ padding: 'var(--spacing-15) 0', backgroundColor: 'var(--color-surface)' }}>
      <div className={`container`} style={{ maxWidth: '800px', textAlign: 'center' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TextReveal as="h2" style={{ color: 'var(--color-text-heading)', marginBottom: 'var(--spacing-4)' }}>
            Il valore intangibile della tranquillità
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.7, ease: appleEase }}
            style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-main)', marginBottom: 'var(--spacing-6)' }}
          >
            Assicurare una vecchiaia vissuta in ottima compagnia, mantenendo intatta l'autonomia personale all'interno di un ambiente totalmente sicuro, ha un peso specifico inestimabile. La retta mensile che proponiamo è strutturata per essere onnicomprensiva. Copre l'assistenza dedicata garantita dal numero chiuso a 4 posti, i pasti cucinati espressi ogni giorno e la totale scomparsa del senso di isolamento.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.45, duration: 0.7, ease: appleEase }}
            style={{ fontWeight: 500, marginBottom: 'var(--spacing-8)' }}
          >
            Ti invitiamo a contattarci telefonicamente per un colloquio conoscitivo preliminare. Valuteremo con profonda attenzione le specifiche esigenze della tua famiglia e ti forniremo tutti i dettagli economici con assoluta trasparenza.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.6, duration: 0.5, ease: appleEase }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--spacing-8)' }}
          >
            <MagneticButton>
              <a href="tel:+393490631492">
                <Button variant="primary">Chiama per informazioni</Button>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '../../components/Motion';
import { staggerContainer, cardReveal, viewportOnce } from '../../styles/motion-variants';
import styles from './Faq.module.css';

const faqs = [
  { q: 'Che tipo di assistenza è garantita?', a: 'Garantiamo una presenza h24. Essendo solo 4 ospiti, l\'assistenza è ultra-personalizzata e immediata, simile a quella che si riceve in famiglia.' },
  { q: 'Posso portare i miei mobili?', a: 'No, la struttura è già completamente arredata con tutto il necessario per garantire il massimo comfort e sicurezza. Per piccoli oggetti personali o ricordi cari, vi consigliamo di chiamare direttamente per valutare insieme la soluzione migliore.' },
  { q: 'Come vengono gestiti i pasti?', a: 'Cuciniamo piatti freschi ogni giorno, rispettando le preferenze e le necessità alimentari di ciascun ospite. Si mangia tutti insieme in sala da pranzo.' },
  { q: 'Sono previste attività ricreative?', a: 'Sì, organizziamo giornate stimolanti con letture, musica, piccoli laboratori manuali e passeggiate in giardino, sempre rispettando i tempi di ognuno.' }
];

export const Faq: React.FC = () => {
  return (
    <section id="faq" className={styles.faq}>
      <div className={`container`}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TextReveal as="h2">
            Le risposte trasparenti ai tuoi dubbi legittimi
          </TextReveal>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={cardReveal}
            >
              <div className={styles.card}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

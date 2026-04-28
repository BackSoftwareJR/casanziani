'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

const rightFitItems = [
  'Tuo familiare si muove in autonomia, anche con qualche supporto.',
  'Ha bisogno di compagnia, routine e cura quotidiana, non di cure mediche intensive.',
  'Vuoi un ambiente piccolo, caldo, non anonimo.',
  'E importante per te che venga chiamato per nome, non per numero di stanza.',
  'Cerchi una soluzione stabile o anche solo temporanea per un periodo di transizione.',
];

const maybeNotFitItems = [
  'Il tuo familiare e allettato o non deambula in modo autonomo.',
  'Ha bisogno di assistenza infermieristica continua o somministrazione di terapie complesse.',
  'Ha una diagnosi di demenza in fase avanzata con comportamenti che richiedono contenzione o sorveglianza specialistica.',
  'Ha bisogno di ossigenoterapia, nutrizione artificiale o presidi medici intensivi.',
];

export function WhoWeHelp() {
  const { skipAnimations } = useAccessibility();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const show = skipAnimations || inView;

  return (
    <section id="chi-possiamo-aiutare" className="section-shell">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.45 }}
          className="text-center mb-10"
        >
          <h2 className="section-title mb-3">
            C.A.S.A. fa al caso tuo?
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Ti aiutiamo a capire subito, con chiarezza e rispetto, se C.A.S.A. e la scelta adatta
            per la tua famiglia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.article
            initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.45, delay: 0.08 }}
            className="wl-card-soft p-6 md:p-8"
          >
            <h3 className="font-serif text-2xl text-premium-ink mb-5">
              Sei nel posto giusto se...
            </h3>
            <ul className="space-y-4">
              {rightFitItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg text-premium-ink">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-premium-sage text-white">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.45, delay: 0.16 }}
            className="wl-card p-6 md:p-8"
          >
            <h3 className="font-serif text-2xl text-premium-ink mb-5">
              Potremmo non essere la scelta giusta se...
            </h3>
            <ul className="space-y-4">
              {maybeNotFitItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg text-premium-inkSoft">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    i
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
        <motion.div
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.45, delay: 0.2 }}
          className="mt-8 md:mt-10 wl-card p-6 md:p-8 text-center"
        >
          <p className="text-lg text-premium-inkSoft leading-relaxed max-w-4xl mx-auto">
            Se non sei sicuro, chiamaci lo stesso. Ci vogliono 5 minuti per capire insieme se
            siamo la struttura giusta, e se non lo siamo, ti aiutiamo a trovare quella adatta.
          </p>
          <a href="/#contatti" className="wl-btn-primary mt-5 inline-flex">
            Chiamaci per un confronto senza impegno
          </a>
        </motion.div>
      </div>
    </section>
  );
}

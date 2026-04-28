'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

const realQuestions = [
  {
    id: 1,
    question: 'Stara bene? Sara trattato con rispetto?',
    answer:
      'Questa e sempre la prima domanda. E la risposta piu onesta che possiamo darti e: vieni a vederci. Incontra chi lavora qui. Guarda come parliamo con gli ospiti. Non ti chiediamo di fidarti sulla parola, ti chiediamo di venire a verificare di persona.',
  },
  {
    id: 2,
    question: 'Posso venire a trovarlo quando voglio?',
    answer:
      'Si. Non abbiamo orari di visita rigidi. La famiglia e parte della vita di C.A.S.A., non un ospite esterno. Sei sempre benvenuto, per un pranzo, per una passeggiata, per un pomeriggio insieme.',
  },
  {
    id: 3,
    question: 'Cosa succede se le condizioni di salute peggiorano?',
    answer:
      'Siamo una struttura per anziani autosufficienti o parzialmente autosufficienti. Se nel tempo il bisogno di assistenza medica dovesse crescere significativamente, cure infermieristiche continue o terapie complesse, ti accompagniamo a trovare la soluzione piu adatta.',
  },
  {
    id: 4,
    question: 'Quanto costa?',
    answer:
      'La retta dipende dal tipo di camera (singola o doppia) e dal livello di assistenza. Ti forniamo un preventivo chiaro e dettagliato dopo una prima conversazione. Nessun costo nascosto, nessuna sorpresa in fattura.',
  },
  {
    id: 5,
    question: 'E possibile un soggiorno di prova?',
    answer:
      'Si. Proponiamo un periodo di inserimento graduale, per permettere all ospite e alla famiglia di capire se C.A.S.A. e il posto giusto. Un ingresso morbido, senza pressioni.',
  },
];

const formalFaqs = [
  {
    id: 1,
    question: 'C.A.S.A. e adatta per mio padre o mia madre?',
    answer:
      'C.A.S.A. accoglie anziani autosufficienti o parzialmente autosufficienti: persone che si muovono, anche con qualche aiuto, e che non necessitano di assistenza infermieristica continua o cure mediche specialistiche. Se hai dubbi, chiamaci.',
  },
  {
    id: 2,
    question: 'Qual e la differenza tra C.A.S.A. e una RSA tradizionale?',
    answer:
      'Una RSA e una struttura sanitaria pensata per anziani con bisogni clinici importanti. C.A.S.A. e una casa famiglia: ambiente domestico, massimo 5 persone, per chi ha bisogno di compagnia e assistenza quotidiana.',
  },
  {
    id: 3,
    question: 'Accogliete persone con Alzheimer o demenza?',
    answer:
      'Accogliamo forme lievi di decadimento cognitivo, compatibili con la vita comunitaria. Non siamo attrezzati per demenze avanzate o stati confusionali gravi che richiedono sorveglianza specialistica.',
  },
  {
    id: 4,
    question: 'Ci sono orari di visita?',
    answer:
      'Non abbiamo orari rigidi. Le famiglie possono venire con grande liberta. Chiediamo solo di avvisare per cambiamenti importanti, come un pranzo insieme.',
  },
  {
    id: 5,
    question: 'Come avviene l inserimento di un nuovo ospite?',
    answer:
      'Si parte da una visita senza impegno, poi colloquio con la famiglia e inserimento graduale: qualche ora, poi una giornata, poi trasferimento definitivo, sempre al ritmo dell ospite.',
  },
  {
    id: 6,
    question: 'Cosa succede se le condizioni peggiorano nel tempo?',
    answer:
      'Se il bisogno di assistenza supera le nostre capacita, ne parliamo apertamente e supportiamo la famiglia nella ricerca di una soluzione piu adatta.',
  },
  {
    id: 7,
    question: 'E possibile un soggiorno temporaneo?',
    answer:
      'Si, gestiamo anche soggiorni di sollievo o temporanei: convalescenza, vacanze dei caregiver, periodi di transizione. Contattaci per disponibilita.',
  },
  {
    id: 8,
    question: 'Quanto costa la retta mensile?',
    answer:
      'La retta varia in base al tipo di camera e al livello di assistenza concordato. Forniamo sempre un preventivo dettagliato prima dell ingresso.',
  },
  {
    id: 9,
    question: 'Ci sono agevolazioni fiscali?',
    answer:
      'Le rette delle case famiglia possono essere in parte detraibili. Consigliamo di verificare con il proprio commercialista in base alla situazione specifica.',
  },
  {
    id: 10,
    question: 'Posso visitare la struttura prima di decidere?',
    answer:
      'Assolutamente si. Una visita di persona e il modo migliore per capire se C.A.S.A. e il posto giusto. Potete venire anche con il vostro familiare.',
  },
];

export function FAQ() {
  const { skipAnimations } = useAccessibility();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const show = skipAnimations || inView;

  return (
    <section className="section-shell">
      <div className="container mx-auto px-4">
        <motion.div
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="wl-card p-6 md:p-8">
            <h2 className="section-title text-3xl md:text-4xl mb-4">
              Le domande che ogni famiglia si fa. Le nostre risposte.
            </h2>
            <p className="section-subtitle text-lg mb-5">
              Rispondiamo prima alle paure reali, poi alle domande pratiche.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-lg text-premium-inkSoft">
              <li className="wl-card-soft px-4 py-3">Visite libere e rapporto diretto con le famiglie</li>
              <li className="wl-card-soft px-4 py-3">Valutazione onesta: se non siamo adatti, te lo diciamo</li>
              <li className="wl-card-soft px-4 py-3">Preventivo chiaro, senza costi nascosti</li>
              <li className="wl-card-soft px-4 py-3">Inserimento graduale, senza pressioni</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-4xl mb-4">
            Le domande che hai in testa
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Le risposte che servono quando devi decidere per qualcuno a cui vuoi bene.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {realQuestions.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: index * 0.05 }}
              className="wl-card p-6"
            >
              <h3 className="font-serif text-xl text-premium-ink mb-3">{faq.question}</h3>
              <p className="text-lg text-premium-inkSoft leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={skipAnimations ? { opacity: 1 } : { opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.25 }}
          className="text-center mt-12 mb-8"
        >
          <h3 className="section-title text-3xl md:text-4xl mb-3">
            Domande frequenti, risposte dirette.
          </h3>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {formalFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: index * 0.04 }}
              className="wl-card p-6"
            >
              <h3 className="font-serif text-xl text-premium-ink mb-3">{faq.question}</h3>
              <p className="text-lg text-premium-inkSoft leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={skipAnimations ? { opacity: 1 } : { opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h3 className="font-serif text-2xl font-bold text-premium-ink mb-2">
            Hai altre domande?
          </h3>
          <p className="text-premium-inkSoft mb-4 text-lg">
            Se non sei sicuro, parliamone: in pochi minuti capiamo insieme se siamo la scelta giusta.
          </p>
          <a
            href="/#contatti"
            className="wl-btn-primary px-8 py-3 shadow-lg hover:shadow-xl"
          >
            Chiamaci per un confronto senza impegno
          </a>
        </motion.div>
      </div>
    </section>
  );
}

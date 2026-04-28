'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';
import { ActivityIcon } from '@/components/ui/Icons';

const benefits = [
  {
    title: 'Socializzazione quotidiana',
    description: 'Momenti in comune a tavola, in salotto e nelle attività di gruppo',
  },
  {
    title: 'Routine rassicurante',
    description: 'Giornate scandite da pasti, riposo e piccoli rituali condivisi',
  },
  {
    title: 'Attività e passatempi',
    description: 'Giochi, lettura, televisione e conversazioni in compagnia',
  },
  {
    title: 'Vita familiare',
    description: 'Un ambiente domestico dove ci si sente a casa, mai soli',
  },
];

export function Garden() {
  const { skipAnimations } = useAccessibility();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const show = skipAnimations || inView;

  return (
    <section className="section-shell-alt">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            Vita Quotidiana: Attività e Socializzazione
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            A C.A.S.A la giornata si svolge in famiglia: pasti insieme, momenti di relax, giochi e chiacchiere. L’attenzione è sulla vita di tutti i giorni e sulla compagnia, in un ambiente domestico dove gli ospiti si sentono a casa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Immagine */}
          <motion.div
            initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="/images/gallery/camera1.jpg"
              alt="Vita quotidiana e momenti in comune a C.A.S.A"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Benefici */}
          <motion.div
            initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl font-bold text-premium-ink mb-6">
              Come si vive ogni giorno
            </h3>
            <p className="text-premium-inkSoft mb-6 leading-relaxed">
              La convivenza e le attività di tutti i giorni—dalla colazione alla cena, dai giochi alle chiacchiere—creano legami e danno ritmo alla giornata, con beneficio per l’umore e il senso di appartenenza.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 wl-card-soft p-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <ActivityIcon className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-premium-ink mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-premium-inkSoft text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Caratteristiche */}
        <motion.div
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: 'Pasti in compagnia',
              description: 'Colazione, pranzo e cena insieme: il tavolo è il cuore della giornata e del ritrovo tra ospiti e operatori.',
            },
            {
              title: 'Momenti di relax',
              description: 'Salotto, televisione, lettura e riposo in ambienti comuni dove ci si incontra e si chiacchiera.',
            },
            {
              title: 'Attività e giochi',
              description: 'Giochi di società, attività manuali e piccoli laboratori per tenere mente e mani attive in compagnia.',
            },
            {
              title: 'Uscite e occasioni',
              description: 'Quando possibile, passeggiate, gite o uscite sul territorio per variare la routine e stare insieme.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="wl-card-soft p-6 hover:shadow-lg transition-all duration-300"
            >
              <h4 className="font-serif text-lg font-bold text-premium-ink mb-2">
                {feature.title}
              </h4>
              <p className="text-premium-inkSoft text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

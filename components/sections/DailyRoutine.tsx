'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';
import Image from 'next/image';
import { SunIcon, CoffeeIcon, ActivityIcon, UtensilsIcon, GameIcon, DinnerIcon, MoonIcon } from '@/components/ui/Icons';

const dayMoments = [
  {
    id: 'mattina',
    title: 'Mattina',
    icon: SunIcon,
    summary: 'Risveglio e cura della persona con i propri ritmi. Nessuna fretta, nessun orario rigido.',
    items: [
      { icon: CoffeeIcon, text: 'Risveglio e igiene personale, con assistenza discreta' },
      { icon: ActivityIcon, text: 'Colazione in compagnia, con prodotti freschi' },
      { icon: ActivityIcon, text: 'Ginnastica dolce, giornale, laboratori o passeggiata in giardino' },
    ],
  },
  {
    id: 'pomeriggio',
    title: 'Pomeriggio',
    icon: UtensilsIcon,
    summary: 'A tavola insieme e poi liberta di scegliere tra attivita, conversazioni o un momento di quiete.',
    items: [
      { icon: UtensilsIcon, text: 'Pranzo preparato al momento con ingredienti di stagione' },
      { icon: GameIcon, text: 'Giochi, musica, conversazioni o relax sul divano' },
      { icon: CoffeeIcon, text: 'Merenda con te, caffe e qualcosa di dolce' },
    ],
  },
  {
    id: 'sera',
    title: 'Sera',
    icon: MoonIcon,
    summary: 'La sera e serena: cena leggera, compagnia e supporto presente ma mai invadente.',
    items: [
      { icon: DinnerIcon, text: 'Cena leggera e nutriente, in compagnia' },
      { icon: MoonIcon, text: 'Assistenza per la preparazione alla notte' },
      { icon: ActivityIcon, text: 'Presenza continua dello staff durante tutta la notte' },
    ],
  },
];

export function DailyRoutine() {
  const { skipAnimations } = useAccessibility();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const show = skipAnimations || inView;

  return (
    <section className="section-shell" aria-labelledby="daily-routine-heading">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={skipAnimations ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            id="daily-routine-heading"
            className="section-title mb-3 md:mb-4"
          >
            Una Giornata da Noi
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto px-4">
            Com e una giornata a C.A.S.A.? Nessun orario rigido.
            La giornata si adatta alla persona, non il contrario.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          <motion.div
            initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="wl-card p-3">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/images/foto_orizzontali/IMG_2392.webp"
                alt="Momenti quotidiani in ambiente familiare C.A.S.A"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <p className="absolute left-4 right-4 bottom-4 text-white font-medium text-base sm:text-lg">
                  Ritmi sereni, cura quotidiana, presenza costante.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3 grid grid-cols-1 gap-4"
          >
            {dayMoments.map((moment, index) => {
              const SectionIcon = moment.icon;
              return (
                <motion.article
                  key={moment.id}
                  initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  animate={show ? { opacity: 1, y: 0 } : {}}
                  transition={skipAnimations ? { duration: 0 } : { duration: 0.45, delay: 0.22 + index * 0.08 }}
                  className="wl-card p-5 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                      <SectionIcon size={22} />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-premium-ink mb-1">{moment.title}</h3>
                      <p className="text-premium-inkSoft mb-4 leading-relaxed">{moment.summary}</p>
                      <ul className="space-y-2">
                        {moment.items.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <li key={item.text} className="flex items-center gap-2.5 text-premium-inkSoft">
                              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 border border-primary-200 text-primary-700">
                                <ItemIcon size={14} />
                              </span>
                              <span className="text-sm sm:text-base">{item.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              );
            })}
            <div className="pt-2">
              <a href="/#contatti" className="wl-btn-primary">
                Prenota una visita gratuita
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

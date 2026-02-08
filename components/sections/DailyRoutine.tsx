'use client';

import { dailyRoutine } from '@/data/content';
import type { DayPeriod } from '@/data/content';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';
import { iconMap, SunIcon, MoonIcon } from '@/components/ui/Icons';
import Image from 'next/image';

const PERIOD_CONFIG: Record<
  DayPeriod,
  { label: string; accent: string; dotBg: string; dotBorder: string; timeColor: string; SectionIcon: React.ComponentType<{ className?: string; size?: number }> }
> = {
  mattina: {
    label: 'Mattina',
    accent: 'amber',
    dotBg: 'bg-amber-100',
    dotBorder: 'border-amber-300',
    timeColor: 'text-amber-600',
    SectionIcon: SunIcon,
  },
  pomeriggio: {
    label: 'Pomeriggio',
    accent: 'orange',
    dotBg: 'bg-orange-100',
    dotBorder: 'border-orange-300',
    timeColor: 'text-orange-600',
    SectionIcon: SunIcon,
  },
  sera: {
    label: 'Sera',
    accent: 'indigo',
    dotBg: 'bg-indigo-100',
    dotBorder: 'border-indigo-300',
    timeColor: 'text-indigo-600',
    SectionIcon: MoonIcon,
  },
};

function groupByPeriod(
  items: typeof dailyRoutine
): Array<{ period: DayPeriod; events: typeof dailyRoutine }> {
  const order: DayPeriod[] = ['mattina', 'pomeriggio', 'sera'];
  const groups = new Map<DayPeriod, typeof dailyRoutine>();
  for (const p of order) groups.set(p, []);
  for (const item of items) {
    const period = item.period ?? 'mattina';
    groups.get(period)!.push(item);
  }
  return order.map((period) => ({ period, events: groups.get(period)! })).filter((g) => g.events.length > 0);
}

const TIMELINE_IMAGE = '/images/gallery/camera1.jpg';

export function DailyRoutine() {
  const { skipAnimations } = useAccessibility();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const show = skipAnimations || inView;

  const grouped = groupByPeriod(dailyRoutine);

  return (
    <section className="py-12 md:py-20 bg-orange-50/30" aria-labelledby="daily-routine-heading">
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 mb-3 md:mb-4"
          >
            Una Giornata da Noi
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Ogni momento si adatta alla tua routine: niente orari rigidi o fissi, ma il ritmo giusto per te.
          </p>
        </motion.div>

        {/* Desktop: Sticky Split View */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Colonna sinistra: immagine sticky */}
          <div className="sticky top-24">
            <div className="relative aspect-[3/4] max-h-[600px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={TIMELINE_IMAGE}
                alt="Ambiente accogliente C.A.S.A - una giornata con noi"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={false}
              />
            </div>
          </div>

          {/* Colonna destra: Timeline */}
          <div className="relative pl-8 border-l-2 border-orange-200 space-y-12">
            {grouped.map(({ period, events }, groupIndex) => {
              const config = PERIOD_CONFIG[period];
              const SectionIcon = config.SectionIcon;
              return (
                <div key={period} className="space-y-8">
                  {/* Separatore di sezione: icona + titolo */}
                  <div className="flex items-center gap-3 -ml-8">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full ${config.dotBg} border-2 ${config.dotBorder} flex items-center justify-center`}
                    >
                      <SectionIcon
                        className={config.timeColor}
                        size={24}
                      />
                    </div>
                    <span
                      className={`font-display text-xl font-semibold ${config.timeColor} tracking-wide`}
                    >
                      {config.label}
                    </span>
                  </div>

                  {events.map((item, index) => {
                    const IconComponent = iconMap[item.icon];
                    return (
                      <motion.div
                        key={`${period}-${index}`}
                        initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                        animate={show ? { opacity: 1, x: 0 } : {}}
                        transition={skipAnimations ? { duration: 0 } : { duration: 0.4, delay: groupIndex * 0.1 + index * 0.08 }}
                        className="relative"
                      >
                        {/* Pallino sulla linea */}
                        <div
                          className={`absolute left-0 -translate-x-1/2 w-10 h-10 rounded-full ${config.dotBg} border-2 ${config.dotBorder} flex items-center justify-center`}
                        >
                          {IconComponent ? (
                            <IconComponent className={config.timeColor} size={20} />
                          ) : null}
                        </div>

                        <div className="pl-12 md:pl-14">
                          <h3 className="font-display text-xl md:text-2xl text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mt-2 leading-relaxed text-base">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: The Elegant Timeline */}
        <div className="lg:hidden relative pl-8 border-l-2 border-orange-200 space-y-10">
          {grouped.map(({ period, events }, groupIndex) => {
            const config = PERIOD_CONFIG[period];
            const SectionIcon = config.SectionIcon;
            return (
              <div key={period} className="space-y-8">
                {/* Separatore: icona grande + titolo sezione */}
                <div className="flex items-center gap-3 -ml-8">
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-full ${config.dotBg} border-2 ${config.dotBorder} flex items-center justify-center`}
                  >
                    <SectionIcon className={config.timeColor} size={22} />
                  </div>
                  <span className={`font-display text-lg font-semibold ${config.timeColor} tracking-wide`}>
                    {config.label}
                  </span>
                </div>

                {events.map((item, index) => {
                  const IconComponent = iconMap[item.icon];
                  return (
                    <motion.div
                      key={`${period}-${index}`}
                      initial={skipAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                      animate={show ? { opacity: 1, x: 0 } : {}}
                      transition={skipAnimations ? { duration: 0 } : { duration: 0.4, delay: groupIndex * 0.1 + index * 0.08 }}
                      className="relative"
                    >
                      {/* Pallino sulla linea */}
                      <div
                        className={`absolute left-0 -translate-x-1/2 w-9 h-9 rounded-full ${config.dotBg} border-2 ${config.dotBorder} flex items-center justify-center`}
                      >
                        {IconComponent ? (
                          <IconComponent className={config.timeColor} size={18} />
                        ) : null}
                      </div>

                      <div className="pl-11">
                        <h3 className="font-display text-xl text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mt-2 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

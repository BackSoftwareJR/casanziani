'use client';

import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
}

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  as: Component = 'section',
  id,
}: AnimatedSectionProps) {
  const MotionRoot = Component === 'section' ? motion.section : motion.div;
  return (
    <MotionRoot
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={defaultVariants}
      className={className}
      id={id}
    >
      {children}
    </MotionRoot>
  );
}

interface AnimatedStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: keyof JSX.IntrinsicElements;
}

export function AnimatedStagger({
  children,
  className = '',
  staggerDelay = 0.1,
  as: Component = 'div',
}: AnimatedStaggerProps) {
  return (
    <motion.div
      as={Component}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function AnimatedStaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

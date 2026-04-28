/**
 * SoftParallax — Scroll-based soft parallax for images
 * 
 * Creates a subtle depth effect by translating the image at a different rate
 * than the scroll. Uses useScroll + useTransform for buttery smoothness.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '../../styles/motion-variants';

interface SoftParallaxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  offset?: number;
}

export const SoftParallax: React.FC<SoftParallaxProps> = ({
  children,
  className,
  style,
  offset = 40,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div style={{ y, width: '100%', height: '100%' }}>
        {children}
      </motion.div>
    </motion.div>
  );
};

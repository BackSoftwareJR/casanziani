/**
 * MagneticButton — Apple-style magnetic hover interaction
 * 
 * The button content subtly shifts toward the cursor within its bounds,
 * creating a "magnetic pull" feel. On mobile/touch, it scales softly on tap.
 */

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  style,
  strength = 0.3,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        cursor: 'pointer',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

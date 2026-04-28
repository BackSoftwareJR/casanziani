/**
 * TiltCard — Cursor-following tilt micro-interaction
 * 
 * On hover, the card tilts subtly (max 6 deg) toward the cursor position,
 * creating a tactile, 3D-like feel. Uses spring physics for organic movement.
 * Falls back to static on touch devices.
 */

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  style,
  maxTilt = 6,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    rotateY.set(deltaX * maxTilt);
    rotateX.set(-deltaY * maxTilt);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: isHovered ? 1.04 : 1,
          boxShadow: isHovered ? '0 20px 40px rgba(62, 44, 32, 0.12)' : '0 0px 0px rgba(62, 44, 32, 0)',
          transition: 'scale 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

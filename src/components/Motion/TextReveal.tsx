/**
 * TextReveal — Masked text line reveal
 * 
 * Wraps each visual "line" of a heading in an overflow-hidden mask.
 * The inner content slides upward with a staggered delay, 
 * creating a cinematic reading-order reveal.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { textRevealContainer, textRevealLine, viewportOnce } from '../../styles/motion-variants';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  style?: React.CSSProperties;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  as: Tag = 'h2',
  className,
  style,
}) => {
  // Split text into words, group into visual lines
  // For headings: every ~5 words = 1 "line" for the reveal
  const words = children.split(' ');
  const wordsPerLine = Tag === 'h1' ? 4 : 5;
  const lines: string[] = [];

  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '));
  }

  return (
    <motion.div
      variants={textRevealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <Tag className={className} style={style}>
        {lines.map((line, i) => (
          <span
            key={i}
            style={{
              display: 'block',
              overflow: 'hidden',
              lineHeight: 1.15,
            }}
          >
            <motion.span
              variants={textRevealLine}
              style={{ display: 'block' }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
};

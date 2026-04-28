import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FlipCard.module.css';

interface FlipCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ title, description, image, className }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`${styles.flipCard} ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className={styles.flipCardInner}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 600, 
          damping: 35,
          mass: 0.8
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div className={styles.flipCardFront}>
          <div 
            className={styles.bgImage} 
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className={styles.frontOverlay} />
          <div className={styles.frontContent}>
            <h3>{title}</h3>
            <motion.div 
              className={styles.hint}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scopri di più
            </motion.div>
          </div>
        </div>

        {/* Back Side */}
        <div className={styles.flipCardBack}>
          <div className={styles.backContent}>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={styles.backFooter}>
              <span>Tocca per chiudere</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { MagneticButton } from '../Motion';
import { springBouncy } from '../../styles/motion-variants';
import styles from './Fab.module.css';

export const Fab: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <MagneticButton strength={0.4}>
        <motion.a 
          href="tel:+393490631492"
          className={styles.fab}
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ ...springBouncy, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chiama Ora"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Phone size={24} fill="currentColor" />
        </motion.a>
      </MagneticButton>
    </div>
  );
};

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './LegalPage.module.css';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.legalPage}>
      <header className={styles.header}>
        <div className="container">
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={20} />
            <span>Torna alla Home</span>
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
        </div>
      </header>
      
      <main className={styles.content}>
        <div className={`container ${styles.contentContainer}`}>
          <motion.div 
            className={styles.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

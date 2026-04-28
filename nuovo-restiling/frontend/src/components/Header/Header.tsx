import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { MagneticButton } from '../Motion';
import { appleEase } from '../../styles/motion-variants';
import styles from './Header.module.css';

import logo from '../../assets/images/logo-finale-salute-a-domicilio.avif';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { label: 'La Casa', href: '/#about' },
    { label: 'Stile di Vita', href: '/#lifestyle' },
    { label: 'Recensioni', href: '/#testimonials' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className={styles.logoLink}>
          <motion.div 
            className={styles.logo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: appleEase }}
          >
            <img src={logo} alt="Casanziani Logo" className={styles.logoImg} />
          </motion.div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className={styles.navLinks}>
          {navItems.map((item) => (
            <MagneticButton key={item.label} strength={0.15}>
              <a href={item.href} className={styles.link}>
                {item.label}
              </a>
            </MagneticButton>
          ))}
        </nav>
        
        <div className={styles.actions}>
          <div className={styles.desktopActions}>
            <MagneticButton strength={0.2}>
              <a href="https://wa.me/393490631492" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">WhatsApp</Button>
              </a>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a href="tel:+393490631492">
                <Button variant="primary">Chiama Ora</Button>
              </a>
            </MagneticButton>
          </div>
          
          <motion.button 
            className={styles.menuToggle} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={28} color="var(--color-text-main)" /> : <Menu size={28} color="var(--color-text-main)" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={styles.drawerOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          >
            <motion.div 
              className={styles.drawerContent}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className={styles.drawerNav}>
                {navItems.map((item, i) => (
                  <motion.a 
                    key={item.label}
                    href={item.href} 
                    className={styles.drawerLink} 
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, ease: appleEase }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a 
                  href="/#contact" 
                  className={styles.drawerLink} 
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navItems.length * 0.05, ease: appleEase }}
                >
                  Contatti
                </motion.a>
              </nav>
              <motion.div 
                className={styles.drawerActions}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease: appleEase }}
              >
                <a href="tel:+393490631492">
                  <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>Chiama Ora</Button>
                </a>
                <a href="https://wa.me/393490631492" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>WhatsApp</Button>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

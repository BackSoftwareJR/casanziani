import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

import logo from '../../assets/images/logo-finale-salute-a-domicilio.avif';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Brand Area */}
          <div className={styles.brandCol}>
            <div className={styles.logoWrapper}>
              <img src={logo} alt="Casanziani Logo" className={styles.logoImg} />
            </div>
            <p className={styles.description}>
              Salute a Domicilio srl<br />
              La serenità di sentirsi a casa, con l'assistenza che meriti.
            </p>
            <div className={styles.socials}>
              <a href="https://wa.me/393490631492" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Area */}
          <div className={styles.linksCol}>
            <h3>Navigazione</h3>
            <nav className={styles.nav}>
              <a href="/#about">La Casa</a>
              <a href="/#features">Servizi</a>
              <a href="/#gallery">Galleria</a>
              <a href="/#testimonials">Recensioni</a>
              <a href="/#contact">Contatti</a>
            </nav>
          </div>

          {/* Legal Area */}
          <div className={styles.linksCol}>
            <h3>Legale</h3>
            <nav className={styles.nav}>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/cookie-policy">Cookie Policy</Link>
              <Link to="/termini-condizioni">Termini e Condizioni</Link>
            </nav>
          </div>

          {/* Contact Area */}
          <div className={styles.contactCol}>
            <h3>Contatti</h3>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={18} />
                <span>Via Alessandro Volta 19/E, 20081 Abbiategrasso (MI)</span>
              </li>
              <li>
                <Phone size={18} />
                <a href="tel:+393490631492">+39 349 063 1492</a>
              </li>
              <li>
                <Mail size={18} />
                <a href="mailto:info@casanziani.com">info@casanziani.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.legalInfo}>
            <p>Salute a Domicilio srl | P.IVA 129397710963</p>
          </div>
          <div className={styles.backSoftwareCredits}>
            <p>Digital Craftsmanship by <a href="https://backsoftware.it" target="_blank" rel="noopener noreferrer">BackSoftware</a></p>
          </div>
          <div className={styles.copyright}>
            <p>© {currentYear} C.A.S.A — Tutti i diritti riservati</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

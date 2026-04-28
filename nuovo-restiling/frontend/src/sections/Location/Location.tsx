import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { slideInLeft, slideInRight, viewportOnce, appleEase } from '../../styles/motion-variants';
import styles from './Location.module.css';

// Fix for default Leaflet icon in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export const Location: React.FC = () => {
  const position: [number, number] = [45.4025, 8.9213];

  return (
    <section id="location" className={styles.location}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', marginBottom: 'var(--spacing-4)' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: appleEase }}
          >
            <MapPin size={24} />
            <span style={{ fontWeight: 600 }}>Dove Siamo</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
          >
            Ci troviamo nel cuore residenziale di Abbiategrasso, lontani dallo stress urbano ma comodamente raggiungibili.
            La nostra specifica posizione garantisce l'assoluto silenzio notturno per un riposo ininterrotto e la possibilità di passeggiare nel giardino privato in totale e costante sicurezza.
          </motion.p>
          <motion.div
            className={styles.microcopy}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.45, duration: 0.6, ease: appleEase }}
          >
            La porta di casa nostra è costantemente aperta. Passa a trovarci senza impegno per un caffè conoscitivo e respira di persona questa tranquillità.
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.mapWrapper}
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className={styles.mapContainer}>
            <MapContainer 
              center={position} 
              zoom={15} 
              scrollWheelZoom={false}
              className={styles.leafletMap}
              attributionControl={false} // Disable attribution to follow "no links" requirement
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} />
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

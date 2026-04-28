import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import styles from './LegalPage.module.css';

export const CookiePolicy: React.FC = () => {
  return (
    <LegalPageLayout title="Cookie Policy">
      <div className={styles.placeholder}>
        <p>Il testo completo della Cookie Policy deve essere fornito dal consulente legale del cliente o tramite un servizio esterno certificato (es. Iubenda).</p>
      </div>

      <h2>Cosa sono i Cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali, dove vengono memorizzati per essere ritrasmessi agli stessi siti in occasione di visite successive.
      </p>

      <h2>Tipologie di Cookie utilizzati</h2>
      <p>
        Questo sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento del sito e cookie analitici anonimizzati per fini statistici. Non vengono utilizzati cookie di profilazione di terze parti senza il consenso esplicito dell'utente.
      </p>

      <h2>Gestione dei Cookie</h2>
      <p>
        L'utente può gestire le preferenze relative ai cookie direttamente all'interno del proprio browser ed impedire — ad esempio — che terze parti possano installarne.
      </p>
    </LegalPageLayout>
  );
};

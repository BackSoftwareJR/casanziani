import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import styles from './LegalPage.module.css';

export const PrivacyPolicy: React.FC = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
      <div className={styles.placeholder}>
        <p>Il testo completo della Privacy Policy deve essere fornito dal consulente legale del cliente o tramite un servizio esterno certificato (es. Iubenda).</p>
      </div>

      <h2>1. Titolare del Trattamento</h2>
      <p>
        Il titolare del trattamento dei dati è <strong>Salute a Domicilio srl</strong>, con sede legale in Via Alessandro Volta 19/E, 20081 Abbiategrasso (MI). 
        P.IVA: 129397710963. Email di contatto: info@casanziani.com.
      </p>

      <h2>2. Tipologia di Dati raccolti</h2>
      <p>
        I dati raccolti tramite questo sito includono: Nome, Numero di Telefono e altri dati forniti volontariamente tramite i moduli di contatto. 
        Vengono inoltre raccolti dati tecnici di navigazione (cookie tecnici).
      </p>

      <h2>3. Finalità del Trattamento</h2>
      <p>
        I dati vengono trattati esclusivamente per rispondere alle richieste degli utenti, fornire informazioni sui servizi di Casanziani e adempiere agli obblighi di legge.
      </p>

      <h2>4. Diritti dell'interessato</h2>
      <p>
        Ai sensi del GDPR, l'utente ha il diritto di accedere ai propri dati, richiederne la rettifica, la cancellazione o la limitazione del trattamento scrivendo all'indirizzo email sopra indicato.
      </p>
    </LegalPageLayout>
  );
};

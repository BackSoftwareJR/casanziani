import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import styles from './LegalPage.module.css';

export const TermsAndConditions: React.FC = () => {
  return (
    <LegalPageLayout title="Termini e Condizioni">
      <div className={styles.placeholder}>
        <p>I Termini e le Condizioni d'Uso devono essere definiti in base alla natura del servizio offerto da Salute a Domicilio srl.</p>
      </div>

      <h2>1. Oggetto</h2>
      <p>
        I presenti Termini e Condizioni disciplinano l'utilizzo del sito web di Casanziani e i servizi di informazione forniti da Salute a Domicilio srl.
      </p>

      <h2>2. Utilizzo del sito</h2>
      <p>
        L'utente si impegna a utilizzare il sito in modo lecito e nel rispetto dei diritti di Salute a Domicilio srl e di terzi. È vietata la riproduzione non autorizzata dei contenuti.
      </p>

      <h2>3. Limitazione di responsabilità</h2>
      <p>
        Salute a Domicilio srl si impegna a mantenere le informazioni sul sito aggiornate, ma non garantisce l'assenza di errori o omissioni. Il sito ha scopo informativo e non sostituisce consulenze mediche o legali specifiche.
      </p>

      <h2>4. Legge applicabile</h2>
      <p>
        I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà competente il Foro di Milano.
      </p>
    </LegalPageLayout>
  );
};

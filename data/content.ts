// Contenuti del sito C.A.S.A

export const siteConfig = {
  name: 'C.A.S.A',
  fullName: 'C.A.S.A di Salute a domicilio',
  tagline: 'La serenita di casa, con l assistenza che merita',
  targetAudience: 'Residenza per anziani autosufficienti e parzialmente autosufficienti',
  address: {
    street: 'Via Alessandro Volta 19/E',
    city: 'Abbiategrasso',
    province: 'MI',
    postalCode: '20081',
    full: 'Via Alessandro Volta 19/E, Abbiategrasso (MI) 20081',
  },
  contact: {
    phone: '+39 349 063 1492',
    whatsapp: '+39 349 063 1492',
    email: 'info@casanziani.com',
  },
  areaServed: [
    'Abbiategrasso',
    'Motta Visconti',
    'Morimondo',
    'Vigevano',
    'Gaggiano',
    'Vermezzo con Zelo',
    'Albairate',
    'Ozzero',
    'Robecco sul Naviglio',
    'Magenta',
  ],
};

export const services = [
  {
    id: 1,
    title: 'Assistenza quotidiana',
    description: 'Il nostro staff e presente giorno e notte. Supportiamo gli ospiti nelle attivita di tutti i giorni: igiene personale, vestizione, mobilita. Tutto con discrezione, rispettando i tempi di ognuno.',
    icon: 'shield',
  },
  {
    id: 2,
    title: 'Vitto completo e cucina curata',
    description: 'Cinque pasti al giorno, colazione, spuntino, pranzo, merenda e cena, preparati in casa con ingredienti freschi. Il menu e disponibile per ospiti e famiglie.',
    icon: 'concierge',
  },
  {
    id: 3,
    title: 'Pulizia e cura degli spazi',
    description: 'Gli ambienti vengono puliti ogni giorno. Ci occupiamo del cambio biancheria, del servizio lavanderia e stireria. La casa e ordinata perche e la loro casa.',
    icon: 'broom',
  },
  {
    id: 4,
    title: 'Attivita e animazione',
    description: 'Yoga dolce, laboratori di cucina, lettura, musicoterapia e giochi di societa. Un animatrice e presente con regolarita. Le attivita non sono obbligatorie: chi vuole partecipa, chi vuole riposare, riposa.',
    icon: 'clock',
  },
  {
    id: 5,
    title: 'Spazi verdi e vita all aperto',
    description: 'La struttura e circondata dal verde. Passeggiate, momenti all aperto, aria fresca ogni giorno. Non un cortile di servizio: un giardino vero.',
    icon: 'palette',
  },
];

export type DayPeriod = 'mattina' | 'pomeriggio' | 'sera';

export const dailyRoutine = [
  {
    time: '07:30 - 08:30',
    title: 'Risveglio e Igiene Personale',
    description: 'Assistenza nella cura della persona, igiene e vestizione con attenzione alle esigenze di ciascuno',
    icon: 'sun',
    period: 'mattina' as DayPeriod,
  },
  {
    time: '08:30 - 09:30',
    title: 'Colazione',
    description: 'Una ricca colazione in compagnia con prodotti freschi e menù personalizzati',
    icon: 'coffee',
    period: 'mattina' as DayPeriod,
  },
  {
    time: '10:00 - 11:30',
    title: 'Attività Mattutine',
    description: 'Ginnastica dolce, laboratori creativi, lettura del giornale o passeggiate nel giardino',
    icon: 'activity',
    period: 'mattina' as DayPeriod,
  },
  {
    time: '12:30 - 13:30',
    title: 'Pranzo',
    description: 'Pasti bilanciati preparati al momento con ingredienti freschi e di stagione',
    icon: 'utensils',
    period: 'pomeriggio' as DayPeriod,
  },
  {
    time: '15:00 - 16:30',
    title: 'Attività Pomeridiane',
    description: 'Giochi di società, attività ricreative, musica, o un momento di tranquillità in compagnia. Un\'animatrice è presente.',
    icon: 'game',
    period: 'pomeriggio' as DayPeriod,
  },
  {
    time: '16:30 - 17:00',
    title: 'Merenda',
    description: 'Un momento di pausa con tè, caffè e dolci fatti in casa',
    icon: 'cookie',
    period: 'pomeriggio' as DayPeriod,
  },
  {
    time: '19:30 - 20:30',
    title: 'Cena',
    description: 'Una cena leggera e nutriente, seguita da un momento di relax in compagnia',
    icon: 'dinner',
    period: 'sera' as DayPeriod,
  },
  {
    time: '21:30',
    title: 'Buonanotte',
    description: 'Assistenza per la preparazione alla notte e percorrenza serale',
    icon: 'moon',
    period: 'sera' as DayPeriod,
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Maria R.',
    role: 'Figlia di ospite',
    text: 'Ambiente familiare e personale attento. La mamma è serena.',
    avatar: '/images/avatars/avatar-placeholder.png',
  },
  {
    id: 2,
    name: 'Giuseppe T.',
    role: 'Familiare',
    text: 'Non è una struttura, ma una vera casa. Il papà si trova benissimo.',
    avatar: '/images/avatars/avatar-placeholder.png',
  },
  {
    id: 3,
    name: 'Anna M.',
    role: 'Figlia di ospite',
    text: 'Personale eccezionale e ambiente meraviglioso. Consigliatissima!',
    avatar: '/images/avatars/avatar-placeholder.png',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Come prenotare un soggiorno per un familiare anziano?',
    answer: `Prenotare un soggiorno a C.A.S.A è semplice e veloce. Ecco il processo step-by-step:
1. Primo contatto: Chiamaci al +39 349 063 1492 o inviaci un messaggio WhatsApp per fissare un appuntamento
2. Visita conoscitiva: Venite a trovarci per una visita guidata della struttura e un colloquio conoscitivo
3. Valutazione personalizzata: Il nostro team valuta le esigenze specifiche del vostro caro
4. Giornata di prova: Proponiamo una giornata di prova per far conoscere l'ambiente
5. Documentazione: Forniamo tutti i documenti necessari per l'iscrizione
6. Accoglienza: Pianifichiamo insieme la data di ingresso

Durante tutto il processo saremo al vostro fianco per rispondere a ogni domanda e rassicurarvi.`,
  },
  {
    id: 2,
    question: 'Come avviene l\'accoglienza?',
    answer: `L'accoglienza a C.A.S.A è un momento speciale e delicato, gestito con grande attenzione e professionalità:
- Benvenuto personalizzato: Ogni nuovo ospite viene accolto dal nostro team con calore e rispetto
- Presentazione dell'ambiente: Mostriamo tutti gli spazi e spieghiamo le routine quotidiane
- Conoscenza degli altri ospiti: Facilitiamo l'integrazione con gli altri residenti
- Colloquio con la famiglia: Dediciamo tempo per rassicurare i familiari e rispondere a tutte le domande
- Piano assistenziale: Definiamo insieme le esigenze specifiche e le preferenze personali
- Monitoraggio iniziale: I primi giorni sono dedicati all'osservazione e all'adattamento

Il nostro obiettivo è far sentire ogni ospite come a casa propria, in un ambiente familiare e accogliente.`,
  },
  {
    id: 3,
    question: 'Quali servizi sono inclusi nelle Case Famiglia?',
    answer: `I nostri servizi sono pensati per garantire il massimo benessere e comfort dei nostri ospiti:

Servizi Inclusi nella Retta:
- Assistenza 24 ore su 24 con personale qualificato e specializzato
- Vitto completo con 5 pasti al giorno preparati con ingredienti freschi
- Pulizia e igiene personale quotidiana e assistenza nella vestizione
- Gestione terapie farmacologiche e collaborazione con medici curanti
- Attività ricreative e socializzazione (laboratori, ginnastica, musicoterapia)
- Lavanderia e stireria della biancheria personale
- Servizio guardaroba e organizzazione degli indumenti
- Monitoraggio sanitario continuo e gestione emergenze
- Supporto psicologico e accompagnamento emotivo

Servizi Non Inclusi:
- Farmaci e prodotti per l'igiene personale
- Visite mediche specialistiche
- Abbigliamento e oggetti personali
- Trasporti esterni`,
  },
  {
    id: 4,
    question: 'Gli ospiti possono ricevere visite?',
    answer: `Assolutamente sì! Le visite dei familiari sono non solo permesse, ma fortemente incoraggiate. Crediamo che il contatto con i propri cari sia fondamentale per il benessere emotivo dei nostri ospiti.

Orari e Modalità delle Visite:
- Orari flessibili: Le visite sono possibili tutti i giorni dalle 9:00 alle 20:00
- Spazi dedicati: Disponiamo di aree comuni confortevoli per le visite
- Privacy garantita: Gli ospiti possono ricevere visite nella loro stanza se lo desiderano
- Partecipazione alle attività: I familiari possono partecipare alle attività ricreative
- Pranzi e cene: Possibilità di condividere i pasti con i propri cari

Norme di Sicurezza:
- Registrazione degli ingressi per sicurezza
- Rispetto delle norme igieniche vigenti
- Comunicazione preventiva per visite prolungate

Il nostro obiettivo è creare un ambiente familiare dove i legami affettivi possano continuare a crescere e rafforzarsi.`,
  },
  {
    id: 5,
    question: 'Cosa succede se le condizioni di salute dell\'ospite cambiano?',
    answer: `La salute dei nostri ospiti è la nostra priorità assoluta. Abbiamo un protocollo preciso per gestire qualsiasi cambiamento nelle condizioni di salute:

Monitoraggio Continuo:
- Osservazione quotidiana: Il personale monitora costantemente lo stato di salute di ogni ospite
- Valutazioni periodiche: Revisioni regolari del piano assistenziale
- Comunicazione immediata: I familiari vengono informati tempestivamente di qualsiasi cambiamento

Gestione delle Situazioni:
- Collaborazione medica: Manteniamo contatti costanti con i medici curanti
- Adattamento del piano: Modifichiamo l'assistenza in base alle nuove esigenze
- Supporto specialistico: Coinvolgiamo specialisti quando necessario
- Trasferimento ospedaliero: Se richiesto, accompagniamo l'ospite in ospedale

Comunicazione con la Famiglia:
- Aggiornamenti regolari sullo stato di salute
- Consulenza sui passi da seguire
- Supporto emotivo e pratico
- Coordinamento con i servizi sanitari

La nostra esperienza ci permette di gestire con professionalità e sensibilità qualsiasi situazione, sempre mantenendo al centro il benessere dell'ospite e la tranquillità della famiglia.`,
  },
  {
    id: 6,
    question: 'Come posso visitare la struttura?',
    answer: 'Puoi visitare la struttura chiamandoci al +39 349 063 1492 o scrivendoci su WhatsApp. Organizzeremo insieme un appuntamento per una visita guidata, senza alcun impegno. Le visite sono possibili tutti i giorni dalle 9:00 alle 20:00.',
  },
  {
    id: 7,
    question: 'La struttura è adatta per ospiti con specifiche patologie?',
    answer: 'Sì, il nostro team qualificato è in grado di gestire diverse patologie. Durante il colloquio conoscitivo valuteremo insieme le esigenze specifiche e definiremo un piano assistenziale personalizzato.',
  },
  {
    id: 8,
    question: 'È possibile un soggiorno temporaneo o di prova?',
    answer: 'Sì, proponiamo giornate di prova per far conoscere l\'ambiente. Questo permette all\'ospite e alla famiglia di valutare se la struttura è adatta alle proprie esigenze prima di un impegno a lungo termine.',
  },
  {
    id: 9,
    question: 'Come si svolge il processo di inserimento di un nuovo ospite?',
    answer: 'Il processo di inserimento prevede: visita conoscitiva, valutazione delle esigenze, eventuale giornata di prova, definizione del piano assistenziale personalizzato, preparazione della documentazione necessaria e accoglienza con monitoraggio iniziale per garantire un inserimento graduale e sereno.',
  },
  {
    id: 10,
    question: 'Ci sono detrazioni fiscali per la retta della casa di riposo?',
    answer: 'Sì, le spese per la retta di una casa famiglia possono essere detratte fiscalmente. Ti consigliamo di consultare un commercialista per le detrazioni specifiche e la documentazione necessaria. Siamo disponibili a fornire tutta la documentazione richiesta.',
  },
  {
    id: 11,
    question: 'La struttura è adatta per anziani autosufficienti e parzialmente autosufficienti?',
    answer: `Assolutamente sì! C.A.S.A. è specificamente pensata per anziani autosufficienti e parzialmente autosufficienti che desiderano mantenere la propria autonomia, ma con il supporto discreto e professionale di un team sempre presente.

Per Anziani Autosufficienti:
- Mantenimento della propria indipendenza nelle attività quotidiane
- Supporto discreto e non invasivo
- Ambiente familiare che rispetta le proprie abitudini
- Assistenza disponibile 24h per sicurezza e tranquillità

Per Anziani Parzialmente Autosufficienti:
- Supporto personalizzato nelle attività che richiedono assistenza
- Mantenimento dell'autonomia dove possibile
- Piano assistenziale individualizzato
- Collaborazione con familiari e medici curanti

Il nostro approccio rispetta sempre l'autonomia e la dignità di ogni ospite, offrendo assistenza solo quando necessaria e incoraggiando l'indipendenza in tutte le attività possibili.`,
  },
];

// Didascalie generiche per categoria (evitano mismatch con le singole immagini)
const galleryCaptionsByCategory: Record<string, { title: string; description: string }> = {
  camere: { title: 'Camere', description: 'Spazi dedicati al riposo e al comfort degli ospiti.' },
  'spazi-comuni': { title: 'Spazi comuni', description: 'Aree condivise per la vita quotidiana e la socializzazione.' },
  servizi: { title: 'Servizi', description: 'Ambienti funzionali a servizio della struttura.' },
  esterni: { title: 'Esterni', description: 'Spazi verdi e aree all\'aperto di C.A.S.A.' },
  dettagli: { title: 'Dettagli', description: 'Particolari degli ambienti di C.A.S.A.' },
};

export const galleryImages = [
  // Gallery: camere e servizi
  { id: 1, src: '/images/gallery/camera1.jpg', alt: 'Camera accogliente C.A.S.A. Abbiategrasso', category: 'camere' },
  { id: 2, src: '/images/gallery/camera2.jpg', alt: 'Camera con comfort C.A.S.A.', category: 'camere' },
  { id: 3, src: '/images/gallery/bath.jpg', alt: 'Bagno attrezzato e sicuro C.A.S.A.', category: 'servizi' },
  { id: 4, src: '/images/gallery/camera1mob.jpg', alt: 'Spazio comune C.A.S.A.', category: 'spazi-comuni' },
  { id: 5, src: '/images/gallery/bathmob.jpg', alt: 'Area servizi C.A.S.A.', category: 'servizi' },
  // Foto orizzontali: esterni e struttura
  { id: 6, src: '/images/foto_orizzontali/IMG_2382.webp', alt: 'C.A.S.A. Abbiategrasso - Ambiente familiare', category: 'esterni' },
  { id: 7, src: '/images/foto_orizzontali/IMG_2384.webp', alt: 'Residenza C.A.S.A. - Spazi accoglienti', category: 'esterni' },
  { id: 8, src: '/images/foto_orizzontali/IMG_2385.webp', alt: 'C.A.S.A. - Struttura e cura', category: 'esterni' },
  { id: 9, src: '/images/foto_orizzontali/IMG_2386.webp', alt: 'Casa famiglia anziani - Abbiategrasso', category: 'spazi-comuni' },
  { id: 10, src: '/images/foto_orizzontali/IMG_2387.webp', alt: 'C.A.S.A. - Una vera famiglia', category: 'spazi-comuni' },
  { id: 11, src: '/images/foto_orizzontali/IMG_2388.webp', alt: 'Qualità di vita a C.A.S.A.', category: 'spazi-comuni' },
  { id: 12, src: '/images/foto_orizzontali/IMG_2389.webp', alt: 'Struttura C.A.S.A. Abbiategrasso', category: 'esterni' },
  { id: 13, src: '/images/foto_orizzontali/IMG_2390.webp', alt: 'Casa per anziani - Ambiente caldo', category: 'esterni' },
  { id: 14, src: '/images/foto_orizzontali/IMG_2391.webp', alt: 'Residenza C.A.S.A. - Accoglienza', category: 'spazi-comuni' },
  { id: 15, src: '/images/foto_orizzontali/IMG_2392.webp', alt: 'C.A.S.A. - Famiglia e comunità', category: 'esterni' },
  { id: 16, src: '/images/foto_orizzontali/IMG_2393.webp', alt: 'C.A.S.A. - Spazi condivisi', category: 'spazi-comuni' },
  // Immagini aggiuntive
  { id: 17, src: '/images/IMG_4208.webp', alt: 'Struttura C.A.S.A. - Famiglia', category: 'spazi-comuni' },
  { id: 18, src: '/images/foto_orizzontali/IMG_2390.webp', alt: 'Residenza anziani - Spazi accoglienti', category: 'spazi-comuni' },
  { id: 19, src: '/images/foto_orizzontali/IMG_2389.webp', alt: 'C.A.S.A. - Ambiente familiare e cura', category: 'spazi-comuni' },
  { id: 20, src: '/images/foto_orizzontali/IMG_2388.webp', alt: 'C.A.S.A. - Cura e attenzione', category: 'dettagli' },
  { id: 21, src: '/images/foto_orizzontali/IMG_2391.webp', alt: 'Residenza C.A.S.A. Abbiategrasso', category: 'esterni' },
  { id: 22, src: '/images/IMG_4203.webp', alt: 'C.A.S.A. - Qualità di vita', category: 'spazi-comuni' },
  { id: 23, src: '/images/foto_orizzontali/IMG_2392.webp', alt: 'Casa per anziani C.A.S.A.', category: 'esterni' },
].map((img) => {
  const captions = galleryCaptionsByCategory[img.category];
  return {
    ...img,
    title: captions?.title ?? 'C.A.S.A',
    description: captions?.description ?? 'Uno degli spazi della nostra struttura.',
  };
});

// Attività C.A.S.A. per il carosello nella sezione "Le Nostre Attività"

export interface ActivityCard {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const casaActivities: ActivityCard[] = [
  {
    id: '1',
    title: 'Laboratori Creativi',
    description: 'Pittura, disegno, lavori manuali e giardinaggio per stimolare creatività e manualità.',
    image: '/foto_blog/AdobeStock_278581541.webp',
    imageAlt: 'Laboratorio creativo con anziani',
  },
  {
    id: '2',
    title: 'Attività Fisiche',
    description: 'Yoga, ginnastica dolce, passeggiate nel giardino ed esercizi di equilibrio.',
    image: '/foto_blog/AdobeStock_355946114.webp',
    imageAlt: 'Anziani che praticano attività fisica',
  },
  {
    id: '3',
    title: 'Attività Cognitive',
    description: 'Lettura, giochi di società e musicoterapia per la mente e la memoria.',
    image: '/foto_blog/AdobeStock_504936781.webp',
    imageAlt: 'Attività cognitive di gruppo',
  },
  {
    id: '4',
    title: 'Laboratori di Cucina',
    description: 'Cucinare insieme: manualità, sensi e momenti di condivisione a tavola.',
    image: '/foto_blog/AdobeStock_455463094.webp',
    imageAlt: 'Laboratorio di cucina',
  },
];

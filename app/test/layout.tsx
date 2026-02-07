import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test tracking',
  description: 'Pagina di test per il tracking (visite, utenti online, eventi).',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

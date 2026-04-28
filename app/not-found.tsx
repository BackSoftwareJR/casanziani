import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl wl-card p-10">
        <h1 className="font-display text-6xl font-bold text-premium-ink mb-4">
          404
        </h1>
        <h2 className="font-display text-3xl font-bold text-premium-ink mb-4">
          Pagina non trovata
        </h2>
        <p className="text-lg text-premium-inkSoft mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="wl-btn-primary"
          >
            Torna alla Home
          </Link>
          <Link
            href="/blog"
            className="wl-btn-secondary"
          >
            Vai al Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="font-serif text-6xl font-bold text-primary-500 mb-4">
          404
        </h1>
        <h2 className="font-serif text-3xl font-bold text-gray-700 mb-4">
          Pagina non trovata
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Torna alla Home
          </Link>
          <Link
            href="/blog"
            className="border-2 border-primary-500 text-primary-500 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Vai al Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.
            Continuando a navigare, accetti l&apos;utilizzo dei cookie.{' '}
            <a
              href="/uploads/Cookie%20policy%20CASA%20ANZIANI.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            >
              Maggiori informazioni
            </a>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Rifiuta
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}

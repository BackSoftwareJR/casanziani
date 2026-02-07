'use client';

import { useEffect } from 'react';

const RELOAD_KEY = 'chunk-load-reload';

function isChunkLoadError(message: string): boolean {
  const m = (message ?? '').toLowerCase();
  return (
    m.includes('chunkloaderror') ||
    m.includes('loading chunk') ||
    m.includes('failed to load chunk') ||
    m.includes('loading css chunk')
  );
}

function tryReloadOnce(): void {
  try {
    const alreadyReloaded = sessionStorage.getItem(RELOAD_KEY);
    if (alreadyReloaded === '1') {
      sessionStorage.removeItem(RELOAD_KEY);
      return;
    }
    sessionStorage.setItem(RELOAD_KEY, '1');
    window.location.reload();
  } catch {
    window.location.reload();
  }
}

/**
 * Intercetta ChunkLoadError (chunk Next.js non trovato, spesso dopo un nuovo deploy
 * o con Turbopack in dev). Ricarica la pagina una sola volta per ottenere HTML e chunk aggiornati.
 */
export function ChunkLoadErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (isChunkLoadError(event.message ?? '')) {
        tryReloadOnce();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const msg =
        (event.reason && typeof event.reason === 'object' && event.reason?.message) ||
        (typeof event.reason === 'string' && event.reason) ||
        '';
      if (isChunkLoadError(String(msg))) {
        event.preventDefault();
        tryReloadOnce();
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}

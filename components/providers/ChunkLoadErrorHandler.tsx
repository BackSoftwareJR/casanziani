'use client';

import { useEffect } from 'react';

const RELOAD_KEY = 'chunk-load-reload-ts';

function getMessageFromReason(reason: unknown): string {
  if (reason == null) return '';
  if (typeof reason === 'string') return reason;
  if (typeof reason === 'object' && reason !== null && 'message' in reason) {
    return String((reason as { message?: unknown }).message);
  }
  return String(reason);
}

function isChunkLoadError(message: string, reason?: unknown): boolean {
  const m = (message ?? '').toLowerCase();
  const name = reason && typeof reason === 'object' && 'name' in reason ? String((reason as { name?: string }).name) : '';
  return (
    name === 'ChunkLoadError' ||
    m.includes('chunkloaderror') ||
    m.includes('loading chunk') ||
    m.includes('failed to load chunk') ||
    m.includes('loading css chunk') ||
    m.includes('failed to fetch dynamically imported module') ||
    m.includes('importing a module script failed')
  );
}

function tryReloadOnce(): void {
  try {
    const raw = sessionStorage.getItem(RELOAD_KEY);
    const lastReload = raw ? parseInt(raw, 10) : 0;
    const now = Date.now();
    // Evita loop: non ricaricare di nuovo se abbiamo già ricaricato negli ultimi 8 secondi
    if (lastReload && now - lastReload < 8000) {
      return;
    }
    sessionStorage.setItem(RELOAD_KEY, String(now));
    window.location.reload();
  } catch {
    window.location.reload();
  }
}

/**
 * Intercetta ChunkLoadError (chunk Next.js non trovato). Succede a volte in dev con Turbopack
 * (chunk rigenerati con HMR) o in produzione dopo un deploy (vecchi riferimenti ai chunk).
 * Ricarica la pagina una volta per ottenere HTML e chunk aggiornati.
 */
export function ChunkLoadErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const msg = event.message ?? '';
      const err = event.error;
      if (isChunkLoadError(msg, err)) {
        tryReloadOnce();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const msg = getMessageFromReason(event.reason);
      if (isChunkLoadError(msg, event.reason)) {
        event.preventDefault?.();
        event.stopPropagation?.();
        tryReloadOnce();
      }
    };

    // capture: true = intercetta in fase di capture (prima di altri listener)
    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleRejection, true);
    return () => {
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleRejection, true);
    };
  }, []);

  return null;
}

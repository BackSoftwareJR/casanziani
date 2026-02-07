'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  sendStatistics,
  sendHeartbeat,
  buildStatisticsPayload,
  trackEvent,
} from '@/lib/tracking';

type StatusResult = {
  ok?: boolean;
  api?: boolean;
  hasProjectId?: boolean;
  hasDbConfig?: boolean;
  dbReachable?: boolean;
  dbError?: string;
  hint?: string;
} | null;

export default function TestPage() {
  const [status, setStatus] = useState<StatusResult>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');

  const debugUrl =
    typeof window !== 'undefined'
      ? window.location.search.includes('debug=1')
        ? window.location.pathname + window.location.search
        : `${window.location.pathname}${window.location.search ? window.location.search + '&' : '?'}debug=1`
      : '/test?debug=1';

  useEffect(() => {
    setStatus(null);
    setStatusLoading(true);
    fetch('/api/track/status')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() => setStatus({ ok: false, hint: 'Impossibile raggiungere /api/track/status (404 = API non disponibili)' }))
      .finally(() => setStatusLoading(false));
  }, []);

  const handleSendStatistics = async () => {
    setLastAction('Invio statistiche visita...');
    const payload = buildStatisticsPayload();
    await sendStatistics(payload);
    setLastAction('Statistiche inviate. Controlla la Console (F12) se hai ?debug=1.');
  };

  const handleSendHeartbeat = async () => {
    setLastAction('Invio heartbeat...');
    const payload = buildStatisticsPayload();
    await sendHeartbeat(payload);
    setLastAction('Heartbeat inviato. Controlla la Console (F12) se hai ?debug=1.');
  };

  const handleTestEvent = (type: 'phone_click' | 'whatsapp_click' | 'email_click', value: string) => {
    setLastAction(`Evento: ${type} = ${value}`);
    trackEvent(type, value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl font-bold text-primary-800 mb-2">
          Pagina di test – Tracking
        </h1>
        <p className="text-gray-600 mb-8">
          Usa questa pagina per verificare visite, heartbeat (utenti online) e eventi (click telefono/WhatsApp/email).
          Apri la <strong>Console</strong> (F12 → Console) e, per vedere i log, visita la pagina con{' '}
          <strong>
            <Link href={debugUrl} className="text-primary-600 underline">
              ?debug=1
            </Link>
          </strong>
          .
        </p>

        {/* Stato API e DB */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="font-semibold text-lg text-gray-800 mb-3">Stato API e database</h2>
          {statusLoading && <p className="text-gray-500">Caricamento...</p>}
          {!statusLoading && status && (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">API:</span>{' '}
                {status.api ? '✓ disponibili' : '✗ non disponibili'}
              </p>
              <p>
                <span className="font-medium">PROJECT_ID:</span>{' '}
                {status.hasProjectId ? '✓ impostato' : '✗ mancante'}
              </p>
              <p>
                <span className="font-medium">Config DB:</span>{' '}
                {status.hasDbConfig ? '✓ presente' : '✗ mancante'}
              </p>
              <p>
                <span className="font-medium">Connessione DB:</span>{' '}
                {status.dbReachable ? '✓ ok' : status.dbError ? `✗ ${status.dbError}` : '✗ non raggiungibile'}
              </p>
              {status.hint && (
                <p className="mt-3 text-amber-700 bg-amber-50 p-3 rounded">
                  {status.hint}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Azioni manuali */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="font-semibold text-lg text-gray-800 mb-3">Invii manuali</h2>
          <p className="text-gray-600 text-sm mb-4">
            Clicca per inviare una richiesta. Con <code className="bg-gray-100 px-1 rounded">?debug=1</code> vedi i log in console.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSendStatistics}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Invia statistica visita
            </button>
            <button
              type="button"
              onClick={handleSendHeartbeat}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Invia heartbeat (utenti online)
            </button>
          </div>
          {lastAction && (
            <p className="mt-3 text-sm text-gray-600">{lastAction}</p>
          )}
        </section>

        {/* Link per test eventi (come nel sito reale) */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="font-semibold text-lg text-gray-800 mb-3">Test eventi (click)</h2>
          <p className="text-gray-600 text-sm mb-4">
            Clicca sui link sotto: devono essere tracciati come nel sito (telefono, WhatsApp, email).
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href="tel:+393490631492"
                className="text-primary-600 underline font-medium"
              >
                Telefono: +39 349 063 1492
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/393490631492"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 underline font-medium"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:info@casanziani.com"
                className="text-primary-600 underline font-medium"
              >
                Email: info@casanziani.com
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            Oppure invia evento senza aprire il link:
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              type="button"
              onClick={() => handleTestEvent('phone_click', '+393490631492')}
              className="px-3 py-1.5 bg-gray-200 rounded text-sm hover:bg-gray-300"
            >
              Evento: phone_click
            </button>
            <button
              type="button"
              onClick={() => handleTestEvent('whatsapp_click', 'https://wa.me/393490631492')}
              className="px-3 py-1.5 bg-gray-200 rounded text-sm hover:bg-gray-300"
            >
              Evento: whatsapp_click
            </button>
            <button
              type="button"
              onClick={() => handleTestEvent('email_click', 'info@casanziani.com')}
              className="px-3 py-1.5 bg-gray-200 rounded text-sm hover:bg-gray-300"
            >
              Evento: email_click
            </button>
          </div>
        </section>

        <p className="text-sm text-gray-500">
          <Link href="/" className="text-primary-600 underline">
            ← Torna alla home
          </Link>
        </p>
      </div>
    </div>
  );
}

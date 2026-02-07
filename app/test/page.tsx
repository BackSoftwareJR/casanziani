'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  sendStatistics,
  sendHeartbeat,
  buildStatisticsPayload,
  trackEvent,
  getTrackingBaseUrl,
  getTrackingUrl,
} from '@/lib/tracking';

type LogEntry = {
  id: string;
  time: string;
  type: 'info' | 'success' | 'error' | 'request' | 'response';
  title: string;
  detail?: string | object;
};

function useDebugLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const add = useCallback((type: LogEntry['type'], title: string, detail?: string | object) => {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      time: new Date().toLocaleTimeString('it-IT', { hour12: false }),
      type,
      title,
      detail,
    };
    setLogs((prev) => [...prev.slice(-99), entry]);
  }, []);
  const clear = useCallback(() => setLogs([]), []);
  return { logs, add, clear };
}

/** Fetch con cache disabilitata e URL assoluto */
async function fetchNoCache(
  path: string,
  options: RequestInit = {}
): Promise<{ url: string; status: number; statusText: string; body: string; ok: boolean }> {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const url = `${origin}${path}${path.includes('?') ? '&' : '?'}_t=${Date.now()}`;
  const res = await fetch(url, {
    ...options,
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      ...options.headers,
    },
  });
  const body = await res.text();
  return { url, status: res.status, statusText: res.statusText, body, ok: res.ok };
}

export default function TestPage() {
  const { logs, add, clear } = useDebugLog();
  const [statusResult, setStatusResult] = useState<{
    url: string;
    status: number;
    body: string;
    parsed?: object;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState<Record<string, string>>({});

  const runStatusCheck = useCallback(async () => {
    setLoading(true);
    setStatusResult(null);
    add('info', 'Richiesta GET /api/track/status (senza cache)...');
    try {
      const { url, status, statusText, body } = await fetchNoCache('/api/track/status');
      setStatusResult({ url, status, body });
      let parsed: object | undefined;
      try {
        parsed = body ? JSON.parse(body) : undefined;
      } catch {
        parsed = undefined;
      }
      if (status === 404) {
        add('error', `404 – API non disponibili`, {
          url,
          status,
          statusText,
          body: body.slice(0, 500),
          interpretazione: 'Le route /api/* non esistono. Su Hostinger l\'app deve girare come Node.js (npm run start), non come sito statico.',
        });
      } else if (!status.toString().startsWith('2')) {
        add('error', `${status} ${statusText}`, { url, status, body: body.slice(0, 500), parsed });
      } else {
        add('success', `Status OK ${status}`, { url, parsed });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      add('error', 'Fetch fallita', { message, interpretazione: 'Rete bloccata, CORS, o dominio diverso. Verifica che l\'URL della pagina sia lo stesso dominio dove sono deployate le API.' });
      setStatusResult({ url: '', status: 0, body: message });
    } finally {
      setLoading(false);
    }
  }, [add]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setClientInfo({
        'URL attuale': window.location.href,
        'Origin': window.location.origin,
        'Pathname': window.location.pathname,
        'User-Agent': navigator.userAgent.slice(0, 60) + '…',
      });
    }
  }, []);

  useEffect(() => {
    runStatusCheck();
  }, [runStatusCheck]);

  const handleSendStatistics = async () => {
    const payload = buildStatisticsPayload();
    const path = getTrackingUrl('statistics');
    const url = path.startsWith('http') ? path : `${typeof window !== 'undefined' ? window.location.origin : ''}${path}`;
    add('request', 'POST statistiche', { payload, url });
    try {
      const res = await fetch(url + (url.includes('?') ? '&' : '?') + `_t=${Date.now()}`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let parsed: unknown = null;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        parsed = text;
      }
      if (res.ok) {
        add('success', `Statistiche inviate ${res.status}`, { status: res.status, body: parsed });
      } else {
        add('error', `Statistiche ${res.status} ${res.statusText}`, { status: res.status, body: parsed });
      }
    } catch (err) {
      add('error', 'Statistiche – fetch fallita', err instanceof Error ? err.message : String(err));
    }
  };

  const handleSendHeartbeat = async () => {
    const payload = buildStatisticsPayload();
    const path = getTrackingUrl('visitor');
    const url = path.startsWith('http') ? path : `${typeof window !== 'undefined' ? window.location.origin : ''}${path}`;
    add('request', 'POST visitor/heartbeat', { payload, url });
    try {
      const res = await fetch(url + (url.includes('?') ? '&' : '?') + `_t=${Date.now()}`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let parsed: unknown = null;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        parsed = text;
      }
      if (res.ok) {
        add('success', `Heartbeat inviato ${res.status}`, { status: res.status, body: parsed });
      } else {
        add('error', `Heartbeat ${res.status} ${res.statusText}`, { status: res.status, body: parsed });
      }
    } catch (err) {
      add('error', 'Heartbeat – fetch fallita', err instanceof Error ? err.message : String(err));
    }
  };

  const handleTestEvent = (type: 'phone_click' | 'whatsapp_click' | 'email_click', value: string) => {
    add('request', `Evento ${type}`, { event_value: value });
    trackEvent(type, value);
    add('info', `Evento "${type}" inviato (sendBeacon o fetch)`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
            Debug tracking
          </h1>
          <Link
            href="/"
            className="text-sm text-primary-600 hover:underline font-medium"
          >
            ← Home
          </Link>
        </div>

        {/* Contesto client */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-2">Contesto (browser)</h2>
          <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
            {Object.entries(clientInfo).map(([k, v]) => `${k}: ${v}`).join('\n') || '…'}
          </pre>
        </section>

        {/* Base URL tracking (dal bundle) */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-2">Invii tracking (dal bundle)</h2>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Base URL:</strong>{' '}
            {getTrackingBaseUrl() ? (
              <code className="bg-green-100 text-green-800 px-1 rounded">{getTrackingBaseUrl()}</code>
            ) : (
              <code className="bg-amber-100 text-amber-800 px-1 rounded">(stesso dominio – /api/track/…)</code>
            )}
          </p>
          {!getTrackingBaseUrl() && (
            <p className="text-xs text-amber-700 mt-1">
              Se non vedi richieste su api.casanziani.com, imposta <code>NEXT_PUBLIC_TRACKING_API_URL=https://api.casanziani.com</code> <strong>prima del build</strong> (Hostinger: variabili d’ambiente per il comando di build), poi rifai build e deploy.
            </p>
          )}
          <p className="text-xs text-gray-600 mt-2">
            statistics: <code className="bg-gray-100 px-1">{getTrackingUrl('statistics')}</code> · visitor: <code className="bg-gray-100 px-1">{getTrackingUrl('visitor')}</code> · event: <code className="bg-gray-100 px-1">{getTrackingUrl('event')}</code>
          </p>
        </section>

        {/* Stato API /api/track/status */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h2 className="font-semibold text-gray-800">GET /api/track/status</h2>
            <button
              type="button"
              onClick={runStatusCheck}
              disabled={loading}
              className="text-sm px-3 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? 'Caricamento…' : 'Riprova'}
            </button>
          </div>
          {statusResult && (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">URL richiesta:</span>{' '}
                <code className="bg-gray-100 px-1 rounded break-all">{statusResult.url || '(fetch fallita)'}</code>
              </p>
              <p>
                <span className="font-medium">Status HTTP:</span>{' '}
                <span className={statusResult.status === 404 ? 'text-red-600 font-semibold' : statusResult.status >= 200 && statusResult.status < 300 ? 'text-green-600' : 'text-amber-600'}>
                  {statusResult.status} {statusResult.status && statusResult.status === 404 && '→ API non disponibili (sito statico o Node non in esecuzione)'}
                </span>
              </p>
              <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto max-h-48 overflow-y-auto whitespace-pre-wrap">
                {statusResult.body || '(vuoto)'}
              </pre>
            </div>
          )}
        </section>

        {/* Azioni e log */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-2">Invii manuali (risposta sotto in Log)</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSendStatistics}
              className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
            >
              POST /api/track/statistics
            </button>
            <button
              type="button"
              onClick={handleSendHeartbeat}
              className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
            >
              POST /api/track/visitor
            </button>
            <button
              type="button"
              onClick={() => handleTestEvent('phone_click', '+393490631492')}
              className="px-3 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
            >
              Evento: phone_click
            </button>
            <button
              type="button"
              onClick={() => handleTestEvent('whatsapp_click', 'https://wa.me/393490631492')}
              className="px-3 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
            >
              Evento: whatsapp_click
            </button>
            <button
              type="button"
              onClick={() => handleTestEvent('email_click', 'info@casanziani.com')}
              className="px-3 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
            >
              Evento: email_click
            </button>
          </div>
        </section>

        {/* Log approfondito */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h2 className="font-semibold text-gray-800">Log (tutto ciò che succede)</h2>
            <button
              type="button"
              onClick={clear}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Pulisci
            </button>
          </div>
          <div className="bg-gray-900 text-gray-100 rounded p-3 font-mono text-xs max-h-96 overflow-y-auto space-y-2">
            {logs.length === 0 && <p className="text-gray-500">Nessun log ancora.</p>}
            {logs.map((entry) => (
              <div key={entry.id} className="border-b border-gray-700 pb-2 last:border-0">
                <span className="text-gray-500">[{entry.time}]</span>{' '}
                <span
                  className={
                    entry.type === 'error'
                      ? 'text-red-400'
                      : entry.type === 'success'
                        ? 'text-green-400'
                        : entry.type === 'request'
                          ? 'text-blue-300'
                          : 'text-gray-300'
                  }
                >
                  {entry.title}
                </span>
                {entry.detail !== undefined && (
                  <pre className="mt-1 ml-4 text-gray-400 whitespace-pre-wrap break-words">
                    {typeof entry.detail === 'object' ? JSON.stringify(entry.detail, null, 2) : String(entry.detail)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Interpretazione 404 */}
        <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h2 className="font-semibold text-amber-900 mb-2">Se vedi 404 su /api/track/status</h2>
          <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
            <li>Le route <code className="bg-amber-100 px-1">/api/*</code> esistono solo se l’app Next.js gira come <strong>Node.js</strong> (<code>npm run build</code> + <code>npm run start</code>).</li>
            <li>Se su Hostinger hai pubblicato solo i file statici (HTML/JS/CSS), le API non ci sono e otterrai sempre 404.</li>
            <li>Configura su Hostinger un’<strong>applicazione Node.js</strong> per il dominio e imposta il comando di avvio (es. <code>npm start</code> o <code>node server.js</code>).</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

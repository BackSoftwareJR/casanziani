/**
 * Tracking client - invia a API Next.js (stesso repo, stesso deploy).
 * Le credenziali DB e PROJECT_ID restano solo sul server (process.env); il frontend non le vede.
 * Endpoint: /api/track/statistics, /api/track/visitor, /api/track/event.
 *
 * Debug: aggiungi ?debug=1 all'URL (es. https://casanziani.com/?debug=1) e apri la Console (F12)
 * per vedere tutti i log: cosa viene inviato, risposta del server, errori.
 */

const TRACKING_ENABLED = true;
const HEARTBEAT_INTERVAL_MS = 30000;
const INACTIVE_TIMEOUT_MS = 300000;

function api(path: string): string {
  return `/api/track${path}`;
}

/** Attiva con ?debug=1 nell'URL per vedere i log in console */
function isTrackingDebug(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.search.includes('debug=1');
}

function logTracking(label: string, data?: unknown) {
  if (isTrackingDebug()) {
    if (data !== undefined) {
      console.log('[Tracking]', label, data);
    } else {
      console.log('[Tracking]', label);
    }
  }
}

export function detectDeviceType(): 'desktop' | 'tablet' | 'mobile' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown';
  const w = window.innerWidth;
  if (w <= 768) return 'mobile';
  if (w <= 1024) return 'tablet';
  return 'desktop';
}

export type StatisticsPayload = {
  page: string;
  referrer: string | null;
  screen_width: number | null;
  screen_height: number | null;
  page_title: string | null;
};

export function buildStatisticsPayload(): StatisticsPayload {
  if (typeof window === 'undefined') {
    return { page: '/', referrer: null, screen_width: null, screen_height: null, page_title: null };
  }
  return {
    page: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
    screen_width: window.screen?.width ?? null,
    screen_height: window.screen?.height ?? null,
    page_title: document.title || null,
  };
}

export async function sendStatistics(payload?: StatisticsPayload): Promise<void> {
  if (!TRACKING_ENABLED) return;
  const data = payload ?? buildStatisticsPayload();
  const url = api('/statistics');
  logTracking('Statistiche visita → POST ' + url, data);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });
    const text = await res.text();
    let parsed: unknown = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = text;
    }
    if (isTrackingDebug()) {
      if (res.ok) {
        console.log('[Tracking] Statistiche visita ✓', res.status, parsed);
      } else {
        console.warn('[Tracking] Statistiche visita ERRORE', res.status, res.statusText, parsed);
      }
    }
    if (!res.ok) return;
  } catch (err) {
    if (isTrackingDebug()) {
      console.error('[Tracking] Statistiche visita fetch fallita', err);
    }
  }
}

export async function sendHeartbeat(payload?: StatisticsPayload): Promise<void> {
  if (!TRACKING_ENABLED) return;
  const data = payload ?? buildStatisticsPayload();
  const url = api('/visitor');
  logTracking('Heartbeat (utenti online) → POST ' + url, data);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });
    const text = await res.text();
    let parsed: unknown = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = text;
    }
    if (isTrackingDebug()) {
      if (res.ok) {
        console.log('[Tracking] Heartbeat ✓', res.status, parsed);
      } else {
        console.warn('[Tracking] Heartbeat ERRORE', res.status, res.statusText, parsed);
      }
    }
    if (!res.ok) return;
  } catch (err) {
    if (isTrackingDebug()) {
      console.error('[Tracking] Heartbeat fetch fallita', err);
    }
  }
}

export type TrackEventPayload = {
  event_type: 'phone_click' | 'whatsapp_click' | 'email_click' | 'form_submit' | 'callback_request' | 'contact_form' | 'other';
  event_value: string | null;
  page_path: string;
  referrer: string | null;
  device_type: string;
};

export function trackEvent(
  eventType: TrackEventPayload['event_type'],
  eventValue: string | null,
  _element?: unknown
): void {
  if (!TRACKING_ENABLED) return;
  const data: Omit<TrackEventPayload, 'event_type' | 'event_value'> & { event_type: string; event_value: string | null } = {
    event_type: eventType,
    event_value: eventValue,
    page_path: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/',
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    device_type: detectDeviceType(),
  };
  const body = JSON.stringify(data);
  const endpoint = api('/event');
  logTracking('Evento → POST ' + endpoint, { event_type: eventType, event_value: eventValue });

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
    if (isTrackingDebug()) {
      console.log('[Tracking] Evento inviato (sendBeacon)', eventType, eventValue);
    }
    return;
  }
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
    credentials: 'same-origin',
    body,
  })
    .then((res) => {
      if (isTrackingDebug()) {
        if (res.ok) {
          res.json().then((j) => console.log('[Tracking] Evento ✓', res.status, j));
        } else {
          res.text().then((t) => console.warn('[Tracking] Evento ERRORE', res.status, t));
        }
      }
    })
    .catch((err) => {
      if (isTrackingDebug()) console.error('[Tracking] Evento fetch fallita', err);
    });
}

export const trackingConfig = {
  enabled: TRACKING_ENABLED,
  heartbeatIntervalMs: HEARTBEAT_INTERVAL_MS,
  inactiveTimeoutMs: INACTIVE_TIMEOUT_MS,
};

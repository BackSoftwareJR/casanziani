/**
 * Tracking client - invia a API Next.js (stesso repo, stesso deploy).
 * Le credenziali DB e PROJECT_ID restano solo sul server (process.env); il frontend non le vede.
 * Endpoint: /api/track/statistics, /api/track/visitor, /api/track/event.
 */

const TRACKING_ENABLED = true;
const HEARTBEAT_INTERVAL_MS = 30000;
const INACTIVE_TIMEOUT_MS = 300000;

function api(path: string): string {
  return `/api/track${path}`;
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
  try {
    const res = await fetch(api('/statistics'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });
    if (!res.ok) return;
    await res.json();
  } catch {
    // fail silently
  }
}

export async function sendHeartbeat(payload?: StatisticsPayload): Promise<void> {
  if (!TRACKING_ENABLED) return;
  const data = payload ?? buildStatisticsPayload();
  try {
    const res = await fetch(api('/visitor'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });
    if (!res.ok) return;
    await res.json();
  } catch {
    // fail silently
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

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
    return;
  }
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
    credentials: 'same-origin',
    body,
  }).catch(() => {});
}

export const trackingConfig = {
  enabled: TRACKING_ENABLED,
  heartbeatIntervalMs: HEARTBEAT_INTERVAL_MS,
  inactiveTimeoutMs: INACTIVE_TIMEOUT_MS,
};

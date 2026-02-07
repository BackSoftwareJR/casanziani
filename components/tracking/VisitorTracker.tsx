'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  buildStatisticsPayload,
  sendStatistics,
  sendHeartbeat,
  trackingConfig,
} from '@/lib/tracking';

const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'] as const;

function isDebug(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.search.includes('debug=1');
}

export function VisitorTracker() {
  const pathname = usePathname();
  const lastActivityRef = useRef<number>(Date.now());
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Log inizializzazione (solo con ?debug=1)
  useEffect(() => {
    if (isDebug()) {
      console.log('[Tracking] VisitorTracker attivo. Pagina:', pathname, '| Heartbeat ogni', trackingConfig.heartbeatIntervalMs / 1000, 's');
    }
  }, []);

  // Invia statistiche visita (ogni cambio pagina)
  useEffect(() => {
    if (!trackingConfig.enabled) return;
    if (isDebug()) console.log('[Tracking] Nuova pagina → invio statistiche:', pathname);
    const payload = buildStatisticsPayload();
    const t = setTimeout(() => sendStatistics(payload), 500);
    return () => clearTimeout(t);
  }, [pathname]);

  // Attività utente per non inviare heartbeat se inattivo
  useEffect(() => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };
    ACTIVITY_EVENTS.forEach((ev) => {
      document.addEventListener(ev, updateActivity, { passive: true });
    });
    return () => {
      ACTIVITY_EVENTS.forEach((ev) => document.removeEventListener(ev, updateActivity));
    };
  }, []);

  // Heartbeat ogni 30 secondi (solo se attivo negli ultimi 5 min)
  useEffect(() => {
    if (!trackingConfig.enabled) return;

    const runHeartbeat = () => {
      const now = Date.now();
      if (now - lastActivityRef.current > trackingConfig.inactiveTimeoutMs) return;
      sendHeartbeat(buildStatisticsPayload());
    };

    const id = setInterval(runHeartbeat, trackingConfig.heartbeatIntervalMs);
    heartbeatRef.current = id;
    const first = setTimeout(runHeartbeat, 1000);

    return () => {
      clearInterval(id);
      clearTimeout(first);
      heartbeatRef.current = null;
    };
  }, []);

  // Tab di nuovo visibile: invia statistiche + heartbeat
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) return;
      lastActivityRef.current = Date.now();
      sendStatistics(buildStatisticsPayload());
      sendHeartbeat(buildStatisticsPayload());
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // beforeunload: sendBeacon verso le API Next.js (stesso origin)
  useEffect(() => {
    const onBeforeUnload = () => {
      if (!trackingConfig.enabled) return;
      const page = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
      const referrer = typeof document !== 'undefined' ? document.referrer || null : null;
      const title = typeof document !== 'undefined' ? document.title || null : null;
      const sw = typeof window !== 'undefined' && window.screen ? window.screen.width : null;
      const sh = typeof window !== 'undefined' && window.screen ? window.screen.height : null;

      const visitorPayload = JSON.stringify({ page, action: 'unload' });
      const statsPayload = JSON.stringify({
        page,
        referrer,
        screen_width: sw,
        screen_height: sh,
        page_title: title,
      });

      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/track/visitor', new Blob([visitorPayload], { type: 'application/json' }));
        navigator.sendBeacon('/api/track/statistics', new Blob([statsPayload], { type: 'application/json' }));
      }
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  return null;
}

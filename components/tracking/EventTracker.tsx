'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

type EventType = Parameters<typeof trackEvent>[0];

function handlePhoneClick(e: Event) {
  const el = e.currentTarget as HTMLAnchorElement;
  const href = el.getAttribute('href');
  if (!href || !href.startsWith('tel:')) return;
  const value = href.replace(/^tel:/, '').trim();
  trackEvent('phone_click', value);
}

function handleWhatsAppClick(e: Event) {
  const el = e.currentTarget as HTMLAnchorElement;
  const href = el.getAttribute('href') ?? el.href ?? '';
  if (!href.includes('wa.me/') && !href.includes('whatsapp.com/')) return;
  trackEvent('whatsapp_click', href);
}

function handleEmailClick(e: Event) {
  const el = e.currentTarget as HTMLAnchorElement;
  const href = el.getAttribute('href');
  if (!href || !href.startsWith('mailto:')) return;
  const value = href.replace(/^mailto:/, '').trim();
  trackEvent('email_click', value);
}

function attachToLink(link: HTMLAnchorElement) {
  const href = (link.getAttribute('href') ?? '').trim();
  if (href.startsWith('tel:')) {
    link.addEventListener('click', handlePhoneClick, { passive: true });
    return;
  }
  if (href.includes('wa.me/') || href.includes('whatsapp.com/')) {
    link.addEventListener('click', handleWhatsAppClick, { passive: true });
    return;
  }
  if (href.startsWith('mailto:')) {
    link.addEventListener('click', handleEmailClick, { passive: true });
  }
}

function attachAll() {
  const selectors = [
    'a[href^="tel:"]',
    'a[href*="wa.me/"]',
    'a[href*="whatsapp.com/"]',
    'a[href^="mailto:"]',
  ];
  const seen = new WeakSet<HTMLAnchorElement>();
  selectors.forEach((sel) => {
    document.querySelectorAll<HTMLAnchorElement>(sel).forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      attachToLink(el);
    });
  });
}

/** Gestisce click su elementi con data-track="event_type:event_value" (es. data-track="cta_click:chiama_ora_hero") */
function handleDataTrackClick(e: Event) {
  const target = (e.target as Element)?.closest?.('[data-track]');
  if (!target) return;
  const value = target.getAttribute('data-track')?.trim();
  if (!value) return;
  const colon = value.indexOf(':');
  const eventType = (colon > 0 ? value.slice(0, colon) : value) as EventType;
  const eventValue = colon > 0 ? value.slice(colon + 1) : null;
  const allowed: EventType[] = ['cta_click', 'nav_click', 'other'];
  if (allowed.includes(eventType)) {
    trackEvent(eventType, eventValue);
  }
}

export function EventTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const debug = window.location.search.includes('debug=1');

    // Esponi trackEvent globalmente per form
    (window as unknown as { trackEvent: typeof trackEvent }).trackEvent = (
      eventType: EventType,
      eventValue: string | null,
      _element?: unknown
    ) => {
      if (debug) console.log('[Tracking] trackEvent chiamato:', eventType, eventValue);
      trackEvent(eventType, eventValue);
    };

    attachAll();
    document.body.addEventListener('click', handleDataTrackClick, true);

    if (debug) {
      const tel = document.querySelectorAll('a[href^="tel:"]').length;
      const wa = document.querySelectorAll('a[href*="wa.me/"], a[href*="whatsapp.com/"]').length;
      const mail = document.querySelectorAll('a[href^="mailto:"]').length;
      const cta = document.querySelectorAll('[data-track]').length;
      console.log('[Tracking] EventTracker attivo. tel=', tel, 'whatsapp=', wa, 'email=', mail, 'data-track=', cta);
    }

    const observer = new MutationObserver(() => {
      attachAll();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.body.removeEventListener('click', handleDataTrackClick, true);
      delete (window as unknown as { trackEvent?: typeof trackEvent }).trackEvent;
    };
  }, []);

  return null;
}

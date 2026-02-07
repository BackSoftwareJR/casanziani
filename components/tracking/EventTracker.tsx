'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

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

export function EventTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const debug = window.location.search.includes('debug=1');

    // Esponi trackEvent globalmente per form (come sul vecchio script.js)
    (window as unknown as { trackEvent: typeof trackEvent }).trackEvent = (
      eventType: 'phone_click' | 'whatsapp_click' | 'email_click' | 'form_submit' | 'callback_request' | 'contact_form' | 'other',
      eventValue: string | null,
      _element?: unknown
    ) => {
      if (debug) console.log('[Tracking] trackEvent chiamato (form/altro):', eventType, eventValue);
      trackEvent(eventType, eventValue);
    };

    attachAll();
    if (debug) {
      const tel = document.querySelectorAll('a[href^="tel:"]').length;
      const wa = document.querySelectorAll('a[href*="wa.me/"], a[href*="whatsapp.com/"]').length;
      const mail = document.querySelectorAll('a[href^="mailto:"]').length;
      console.log('[Tracking] EventTracker attivo. Link tracciati: tel=', tel, 'whatsapp=', wa, 'email=', mail);
    }

    const observer = new MutationObserver(() => {
      attachAll();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      delete (window as unknown as { trackEvent?: typeof trackEvent }).trackEvent;
    };
  }, []);

  return null;
}

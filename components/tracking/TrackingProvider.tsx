'use client';

import { VisitorTracker } from './VisitorTracker';
import { EventTracker } from './EventTracker';

/**
 * Tracking: tutto backend in Next.js (nessun PHP).
 * - Visite → /api/track/statistics → statistics_visits
 * - Heartbeat utenti online → /api/track/visitor → online_users
 * - Click telefono/WhatsApp/email (e form_submit) → /api/track/event → statistics_events
 * PROJECT_ID e DB sono solo lato server (process.env); non esposti al client.
 */
export function TrackingProvider() {
  return (
    <>
      <VisitorTracker />
      <EventTracker />
    </>
  );
}

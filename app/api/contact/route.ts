/**
 * API invio form contatti (sostituisce save_contact.php).
 * Solo server: DB_* e PROJECT_ID da process.env. Validazione e sanitizzazione lato server.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDB, getProjectId } from '@/lib/db';

const MAX_LENGTH = { name: 100, email: 255, phone: 50, subject: 200, message: 2000 };

function sanitize(value: unknown): string {
  if (value == null || typeof value !== 'string') return '';
  return value.trim().slice(0, 2000).replace(/[<>]/g, '');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

export async function POST(request: NextRequest) {
  if (request.headers.get('content-type')?.includes('application/json')) {
    try {
      const body = await request.json();
      const name = sanitize(body.name).slice(0, MAX_LENGTH.name);
      const email = sanitize(body.email).slice(0, MAX_LENGTH.email);
      const phone = sanitize(body.phone).slice(0, MAX_LENGTH.phone);
      const subject = sanitize(body.subject).slice(0, MAX_LENGTH.subject) || 'Richiesta informazioni';
      const message = sanitize(body.message).slice(0, MAX_LENGTH.message);

      const errors: string[] = [];
      if (!name) errors.push('Il nome è obbligatorio');
      if (!email) errors.push('L\'email è obbligatoria');
      else if (!isValidEmail(email)) errors.push('Email non valida');
      if (!message) errors.push('Il messaggio è obbligatorio');
      if (errors.length) {
        return NextResponse.json({ success: false, errors }, { status: 400 });
      }

      const projectId = getProjectId();
      if (!projectId || projectId <= 0) {
        return NextResponse.json({ success: false, error: 'Progetto non configurato' }, { status: 500 });
      }

      const pool = await getDB();
      const [result] = await pool.execute(
        `INSERT INTO contacts (project_id, name, email, phone, subject, message, status, source)
         VALUES (?, ?, ?, ?, ?, ?, 'new', 'website')`,
        [projectId, name, email, phone || null, subject, message]
      );
      const insertResult = result as { insertId?: number };
      const contactId = insertResult.insertId ?? 0;

      return NextResponse.json({
        success: true,
        message: 'Messaggio inviato con successo! Ti risponderemo presto.',
        contact_id: contactId,
      });
    } catch (e) {
      console.error('Contact API error:', e);
      return NextResponse.json(
        { success: false, error: 'Errore nel salvataggio del contatto. Riprova più tardi.' },
        { status: 500 }
      );
    }
  }

  const formData = await request.formData();
  const name = sanitize(formData.get('name')).slice(0, MAX_LENGTH.name);
  const email = sanitize(formData.get('email')).slice(0, MAX_LENGTH.email);
  const phone = sanitize(formData.get('phone')).slice(0, MAX_LENGTH.phone);
  const subject = sanitize(formData.get('subject')).slice(0, MAX_LENGTH.subject) || 'Richiesta informazioni';
  const message = sanitize(formData.get('message')).slice(0, MAX_LENGTH.message);

  const errors: string[] = [];
  if (!name) errors.push('Il nome è obbligatorio');
  if (!email) errors.push('L\'email è obbligatoria');
  else if (!isValidEmail(email)) errors.push('Email non valida');
  if (!message) errors.push('Il messaggio è obbligatorio');
  if (errors.length) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  try {
    const projectId = getProjectId();
    if (!projectId || projectId <= 0) {
      return NextResponse.json({ success: false, error: 'Progetto non configurato' }, { status: 500 });
    }
    const pool = await getDB();
    const [result] = await pool.execute(
      `INSERT INTO contacts (project_id, name, email, phone, subject, message, status, source)
       VALUES (?, ?, ?, ?, ?, ?, 'new', 'website')`,
      [projectId, name, email, phone || null, subject, message]
    );
    const insertResult = result as { insertId?: number };
    const contactId = insertResult.insertId ?? 0;
    return NextResponse.json({
      success: true,
      message: 'Messaggio inviato con successo! Ti risponderemo presto.',
      contact_id: contactId,
    });
  } catch (e) {
    console.error('Contact API error:', e);
    return NextResponse.json(
      { success: false, error: 'Errore nel salvataggio del contatto. Riprova più tardi.' },
      { status: 500 }
    );
  }
}

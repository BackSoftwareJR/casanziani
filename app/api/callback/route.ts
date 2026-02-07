/**
 * API richieste callback - telefono o email (sostituisce save_callback.php).
 * Solo server: DB_* e PROJECT_ID da process.env. Validazione e sanitizzazione lato server.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDB, getProjectId } from '@/lib/db';

const MAX_LENGTH = { phone: 30, email: 255, name: 100, subject: 200, preferred_time: 100, notes: 500 };

function sanitize(value: unknown): string {
  if (value == null || typeof value !== 'string') return '';
  return value.trim().slice(0, 500).replace(/[<>]/g, '');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {};
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Body non valido' }, { status: 400 });
    }
  } else {
    const form = await request.formData();
    body = {
      type: form.get('type'),
      phone: form.get('phone'),
      email: form.get('email'),
      name: form.get('name'),
      subject: form.get('subject'),
      preferred_time: form.get('preferred_time'),
      notes: form.get('notes'),
    };
  }

  const type = String(body.type ?? '').toLowerCase();
  if (type !== 'phone' && type !== 'email') {
    return NextResponse.json({ success: false, error: 'Tipo non valido (phone o email)' }, { status: 400 });
  }

  const projectId = getProjectId();
  if (!projectId || projectId <= 0) {
    return NextResponse.json({ success: false, error: 'Progetto non configurato' }, { status: 500 });
  }

  try {
    const pool = await getDB();

    if (type === 'phone') {
      const phone = sanitize(body.phone).slice(0, MAX_LENGTH.phone);
      if (!phone) {
        return NextResponse.json({ success: false, error: 'Il numero di telefono è obbligatorio' }, { status: 400 });
      }
      const name = sanitize(body.name).slice(0, MAX_LENGTH.name) || null;
      const preferredTime = sanitize(body.preferred_time).slice(0, MAX_LENGTH.preferred_time) || null;
      const notes = sanitize(body.notes).slice(0, MAX_LENGTH.notes) || null;

      const [cols] = await pool.query("SHOW COLUMNS FROM callback_requests LIKE 'project_id'");
      const hasProjectId = Array.isArray(cols) && cols.length > 0;
      if (hasProjectId) {
        await pool.execute(
          `INSERT INTO callback_requests (project_id, phone, name, preferred_time, notes, status)
           VALUES (?, ?, ?, ?, ?, 'new')`,
          [projectId, phone, name, preferredTime, notes]
        );
      } else {
        await pool.execute(
          `INSERT INTO callback_requests (phone, name, preferred_time, notes, status)
           VALUES (?, ?, ?, ?, 'new')`,
          [phone, name, preferredTime, notes]
        );
      }
      const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id');
      const id = Array.isArray(rows) && rows[0] ? Number((rows[0] as { id: number }).id) : 0;
      return NextResponse.json({
        success: true,
        id,
        message: 'Richiesta inviata con successo! Ti contatteremo presto.',
      });
    }

    const email = sanitize(body.email).slice(0, MAX_LENGTH.email);
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Email non valida' }, { status: 400 });
    }
    const name = sanitize(body.name).slice(0, MAX_LENGTH.name) || null;
    const subject = sanitize(body.subject).slice(0, MAX_LENGTH.subject) || null;
    const notes = sanitize(body.notes).slice(0, MAX_LENGTH.notes) || null;

    const [emailCols] = await pool.query("SHOW COLUMNS FROM email_requests LIKE 'project_id'");
    const emailHasProjectId = Array.isArray(emailCols) && emailCols.length > 0;
    if (emailHasProjectId) {
      await pool.execute(
        `INSERT INTO email_requests (project_id, email, name, subject, notes, status)
         VALUES (?, ?, ?, ?, ?, 'new')`,
        [projectId, email, name, subject, notes]
      );
    } else {
      await pool.execute(
        `INSERT INTO email_requests (email, name, subject, notes, status)
         VALUES (?, ?, ?, ?, 'new')`,
        [email, name, subject, notes]
      );
    }
    const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id');
    const id = Array.isArray(rows) && rows[0] ? Number((rows[0] as { id: number }).id) : 0;
    return NextResponse.json({
      success: true,
      id,
      message: 'Richiesta inviata con successo! Ti contatteremo presto.',
    });
  } catch (e) {
    console.error('Callback API error:', e);
    return NextResponse.json(
      { success: false, error: 'Errore nel salvataggio. Riprova più tardi.' },
      { status: 500 }
    );
  }
}

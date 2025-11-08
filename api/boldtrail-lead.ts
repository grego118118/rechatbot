/*
  Vercel Serverless Function: Create BoldTrail (kvCORE Public API V2) Contact
  - Reads BOLDTRAIL_API_TOKEN from env
  - Validates/sanitizes input
  - Creates a contact via POST https://api.kvcore.com/v2/public/contact
  - Never exposes token to the client
*/

// Note: This file is compiled/deployed by Vercel independently of Vite's build.
// Keep dependencies to built-ins for portability.

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const token = process.env.BOLDTRAIL_API_TOKEN;
  if (!token) {
    return res.status(500).json({ ok: false, error: 'Missing BOLDTRAIL_API_TOKEN' });
  }

  const body = req.body || {};
  try {
    // Basic input extraction
    const consent = !!body.consent;
    const source = typeof body.source === 'string' && body.source.trim() ? String(body.source).trim() : 'Website Chatbot';

    // Accept either fullName or firstName/lastName
    let firstName = (body.firstName || '').toString();
    let lastName = (body.lastName || '').toString();
    const fullName = (body.fullName || '').toString();

    if ((!firstName || !lastName) && fullName) {
      const parts = fullName.trim().split(/\s+/);
      firstName = firstName || parts[0] || '';
      lastName = lastName || (parts.length > 1 ? parts.slice(1).join(' ') : '');
    }

    const email = (body.email || '').toString();
    const phoneRaw = (body.phone || '').toString();
    const notes = (body.notes || '').toString();
    const conversation = (body.conversation || '').toString();

    // Validation rules
    if (!consent) return res.status(400).json({ ok: false, error: 'Consent is required.' });
    if (!firstName || !lastName) return res.status(400).json({ ok: false, error: 'Name is required.' });
    if (!email && !phoneRaw) return res.status(400).json({ ok: false, error: 'Provide at least an email or a phone.' });

    // Sanitizers
    const sanitizeName = (s: string) => s.replace(/[^A-Za-z0-9 .,'\-]/g, '').trim().slice(0, 100);
    const sanitizeEmail = (s: string) => s.trim().toLowerCase();
    const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    const sanitizePhone = (s: string) => s.replace(/[^0-9+]/g, '').slice(0, 20);

    const fn = sanitizeName(firstName);
    const ln = sanitizeName(lastName);
    const em = email ? sanitizeEmail(email) : '';
    const ph = phoneRaw ? sanitizePhone(phoneRaw) : '';

    if (em && !isValidEmail(em)) return res.status(400).json({ ok: false, error: 'Invalid email format.' });

    const safeNotes = notes.trim().slice(0, 1000);
    const safeConv = conversation.trim().slice(0, 4000);

    // Build payload for kvCORE Public API V2 - Create New Contact
    // Reference: https://developer.insiderealestate.com/publicv2 (Contact Management → Create New Contact)
    const payload: any = {
      first_name: fn,
      last_name: ln,
      source: source,
    };

    if (em) payload.emails = [{ email: em, is_primary: true }];
    if (ph) payload.phones = [{ number: ph, type: 'mobile', is_primary: true }];
    if (safeNotes) payload.note = safeNotes;

    // Include context as an additional field if supported or append to note
    if (safeConv) {
      // Some APIs support an explicit context; if not, append to note
      payload.note = (payload.note ? payload.note + '\n\n' : '') + `Conversation snippet:\n${safeConv}`;
    }

    const apiUrl = process.env.BOLDTRAIL_API_URL || 'https://api.kvcore.com/v2/public/contact';

    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const contentType = resp.headers.get('content-type') || '';
    const respBody = contentType.includes('application/json') ? await resp.json() : await resp.text();

    if (!resp.ok) {
      return res.status(502).json({ ok: false, error: 'BoldTrail API error', details: respBody });
    }

    // Best-effort: persist lead to Supabase for admin dashboard
    try {
      const SUPABASE_URL = process.env.SUPABASE_URL;
      const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        const headers = {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        } as Record<string, string>;

        const boldtrailId = (respBody && typeof respBody === 'object')
          ? ((respBody as any).id || (respBody as any).contact_id || (respBody as any).contact?.id || null)
          : null;

        const leadInsert = {
          session_id: body.sessionId || null,
          first_name: fn,
          last_name: ln,
          email: em || null,
          phone: ph || null,
          notes: safeNotes || null,
          conversation_snippet: safeConv || null,
          source: source,
          boldtrail_sync_status: 'synced',
          boldtrail_contact_id: boldtrailId,
          submitted_at: new Date().toISOString(),
        } as any;

        await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
          method: 'POST',
          headers,
          body: JSON.stringify(leadInsert),
        });
      }
    } catch (e) {
      console.warn('Supabase lead insert failed (non-fatal):', e);
    }

    return res.status(200).json({ ok: true, result: respBody });
  } catch (err: any) {
    console.error('BoldTrail lead error:', err);
    return res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
}


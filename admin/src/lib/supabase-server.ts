export async function sbfetch(path: string, searchParams?: Record<string, string>) {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  const qs = searchParams
    ? '?' + new URLSearchParams(searchParams).toString()
    : '';
  const url = `${base}/rest/v1/${path}${qs}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Supabase fetch failed ${res.status}`);
  return res.json();
}


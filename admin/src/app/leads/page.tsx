import { sbfetch } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

function formatPhone(p?: string | null) {
  if (!p) return "";
  const d = (p || "").replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  return p;
}

export default async function LeadsPage() {
  let leads: any[] = [];
  try {
    leads = await sbfetch("leads", {
      select: "id,first_name,last_name,email,phone,source,status,boldtrail_sync_status,submitted_at,created_at,conversation_snippet",
      order: "submitted_at.desc.nullslast",
      limit: "100",
    });
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Leads</h1>
        <p className="text-red-600">Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel to enable lead view.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Leads</h1>
      <div className="rounded-lg border overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Submitted</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">BoldTrail</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="px-3 py-2 font-medium">{l.first_name} {l.last_name}</td>
                <td className="px-3 py-2">
                  {l.email ? <a className="text-blue-600" href={`mailto:${l.email}`}>{l.email}</a> : ""}
                </td>
                <td className="px-3 py-2">
                  {l.phone ? <a className="text-blue-600" href={`tel:${l.phone}`}>{formatPhone(l.phone)}</a> : ""}
                </td>
                <td className="px-3 py-2">{l.submitted_at ? new Date(l.submitted_at).toLocaleString() : ''}</td>
                <td className="px-3 py-2">{l.source}</td>
                <td className="px-3 py-2">{l.status}</td>
                <td className="px-3 py-2">{l.boldtrail_sync_status || '—'}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-gray-500" colSpan={7}>No leads yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}


import { sbfetch } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

function groupByDay(items: { created_at: string }[]) {
  const map = new Map<string, number>();
  for (const it of items) {
    const d = new Date(it.created_at);
    const key = d.toISOString().slice(0, 10);
    map.set(key, (map.get(key) || 0) + 1);
  }
  return Array.from(map.entries()).sort(([a], [b]) => (a < b ? -1 : 1));
}

export default async function DashboardPage() {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  let eventsOpen: any[] = [];
  let messages: any[] = [];
  let assists: any[] = [];
  try {
    eventsOpen = await sbfetch("events", {
      select: "session_id,created_at",
      type: "eq.open",
      created_at: `gte.${since}`,
      limit: "5000",
    });
    messages = await sbfetch("conversation_messages", {
      select: "session_id,created_at,role",
      created_at: `gte.${since}`,
      limit: "10000",
    });
    assists = await sbfetch("conversation_messages", {
      select: "latency_ms,created_at,role",
      role: "eq.assistant",
      created_at: `gte.${since}`,
      limit: "10000",
    });
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Analytics Dashboard</h1>
        <p className="text-red-600">Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel to enable analytics.</p>
      </main>
    );
  }

  // Metrics
  const totalConversations = eventsOpen.length;
  const sessionsSet = new Set(eventsOpen.map((e) => e.session_id));

  // Average conversation length (# messages per session, last 30 days)
  const countsBySession = new Map<string, number>();
  for (const m of messages) {
    countsBySession.set(m.session_id, (countsBySession.get(m.session_id) || 0) + 1);
  }
  const avgConversationLen = sessionsSet.size
    ? Math.round(
        Array.from(sessionsSet)
          .map((s) => countsBySession.get(s) || 0)
          .reduce((a, b) => a + b, 0) / sessionsSet.size
      )
    : 0;

  // Peak usage times (by day)
  const perDay = groupByDay(eventsOpen);

  // Avg response latency (assistant-only)
  const latVals = assists.map((x) => Number(x.latency_ms)).filter((n) => Number.isFinite(n) && n > 0);
  const avgLatency = latVals.length ? Math.round(latVals.reduce((a, b) => a + b, 0) / latVals.length) : 0;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-500">Conversations (30d)</div>
          <div className="text-2xl font-bold">{totalConversations}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-500">Avg Messages/Conversation</div>
          <div className="text-2xl font-bold">{avgConversationLen}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-500">Avg AI Latency (ms)</div>
          <div className="text-2xl font-bold">{avgLatency}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-500">Unique Sessions (30d)</div>
          <div className="text-2xl font-bold">{sessionsSet.size}</div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="text-sm text-gray-500 mb-2">Peak Usage (by day, last 30d)</div>
        <div className="flex flex-wrap gap-2">
          {perDay.map(([d, count]) => (
            <div key={d} className="text-xs bg-gray-100 px-2 py-1 rounded">{d}: {count}</div>
          ))}
          {perDay.length === 0 && <div className="text-sm text-gray-500">No data yet</div>}
        </div>
      </div>
    </main>
  );
}


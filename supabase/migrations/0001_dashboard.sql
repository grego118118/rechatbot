-- Supabase schema for chatbot analytics + leads
-- Safe to re-run: use IF NOT EXISTS guards where possible

create table if not exists public.sessions (
  id bigserial primary key,
  session_id text not null unique,
  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  user_agent text,
  referrer text
);

create table if not exists public.conversation_messages (
  id bigserial primary key,
  session_id text not null references public.sessions(session_id) on update cascade on delete cascade,
  created_at timestamptz not null default now(),
  role text not null check (role in ('user','assistant')),
  text text,
  latency_ms integer,
  error text
);

create index if not exists idx_conversation_messages_session on public.conversation_messages(session_id);
create index if not exists idx_conversation_messages_created on public.conversation_messages(created_at);

create table if not exists public.events (
  id bigserial primary key,
  session_id text references public.sessions(session_id) on update cascade on delete cascade,
  created_at timestamptz not null default now(),
  type text not null check (type in ('open','close','lead_submitted','error')),
  meta jsonb
);

create index if not exists idx_events_session on public.events(session_id);
create index if not exists idx_events_created on public.events(created_at);

create table if not exists public.leads (
  id bigserial primary key,
  session_id text references public.sessions(session_id) on update cascade on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  notes text,
  conversation_snippet text,
  source text not null default 'Website Chatbot',
  status text not null default 'new' check (status in ('new','contacted','qualified','closed')),
  boldtrail_sync_status text check (boldtrail_sync_status in ('synced','pending','failed')),
  boldtrail_contact_id text
);

create index if not exists idx_leads_submitted on public.leads(submitted_at desc nulls last);
create index if not exists idx_leads_status on public.leads(status);

-- RLS: default deny for anon/user; service role bypasses automatically
alter table public.sessions enable row level security;
alter table public.conversation_messages enable row level security;
alter table public.events enable row level security;
alter table public.leads enable row level security;

-- Deny-all fallback policies (UI will use auth-specific policies later)
drop policy if exists p_sessions_deny_all on public.sessions;
create policy p_sessions_deny_all on public.sessions for all to authenticated using (false);

drop policy if exists p_messages_deny_all on public.conversation_messages;
create policy p_messages_deny_all on public.conversation_messages for all to authenticated using (false);

drop policy if exists p_events_deny_all on public.events;
create policy p_events_deny_all on public.events for all to authenticated using (false);

drop policy if exists p_leads_deny_all on public.leads;
create policy p_leads_deny_all on public.leads for all to authenticated using (false);

-- Data retention: auto-delete after 1 year
create extension if not exists pg_cron with schema extensions;

-- Run daily at 3:15am UTC
select
  cron.schedule(
    'rechatbot_retention_daily',
    '15 3 * * *',
    $$
    delete from public.conversation_messages where created_at < now() - interval '365 days';
    delete from public.events where created_at < now() - interval '365 days';
    delete from public.leads where coalesce(submitted_at, created_at) < now() - interval '365 days';
    -- Remove old empty sessions (no messages and no leads)
    delete from public.sessions s
    where opened_at < now() - interval '400 days'
      and not exists (select 1 from public.conversation_messages m where m.session_id = s.session_id)
      and not exists (select 1 from public.leads l where l.session_id = s.session_id);
    $$
  )
where not exists (
  select 1 from cron.job where jobname = 'rechatbot_retention_daily'
);


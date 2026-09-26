-- MedBridge case store. Run in the Supabase SQL editor (or `supabase db push`).
-- Access is server-side only via the service-role key; RLS is enabled with no
-- public policies, so the anon key can read or write nothing.

create table if not exists public.cases (
  id uuid primary key,
  case_id text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  status text not null default 'new'
    check (status in ('new','assessing','quoted','confirmed','in_transit','completed','closed')),
  kind text not null check (kind in ('transfer','callback','doctor_call','partner')),
  role text not null,
  urgency text,
  transport text,
  origin_scope text,
  quote_value numeric,
  revenue numeric,
  internal_notes text,
  data jsonb not null
);

create index if not exists cases_created_at_idx on public.cases (created_at desc);
create index if not exists cases_status_idx on public.cases (status);

-- Atomic per-day sequence for MB-YYMMDD-NNN case IDs.
create table if not exists public.case_counters (
  date_key text primary key,
  value integer not null default 0
);

create or replace function public.next_case_sequence(p_date_key text)
returns integer
language sql
security definer
set search_path = public
as $$
  insert into public.case_counters as c (date_key, value)
  values (p_date_key, 1)
  on conflict (date_key) do update set value = c.value + 1
  returning value;
$$;

-- Audit trail for status changes and communications (Phase 2 Command Centre).
create table if not exists public.case_events (
  id bigserial primary key,
  case_id text not null references public.cases(case_id) on delete cascade,
  created_at timestamptz not null default now(),
  actor text,
  type text not null,
  payload jsonb
);

alter table public.cases enable row level security;
alter table public.case_counters enable row level security;
alter table public.case_events enable row level security;
revoke execute on function public.next_case_sequence(text) from anon, authenticated;

create table if not exists public.request_history (
  id uuid primary key default gen_random_uuid(),
  reference text not null,
  status text not null,
  next_step text,
  client_note text,
  event_type text not null default 'Status update',
  client_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists request_history_reference_idx
  on public.request_history(reference, created_at desc);

alter table public.request_history enable row level security;

-- Access is performed only by server-side API routes with the Supabase service-role key.

create table if not exists public.operation_timeline (
  id uuid primary key default gen_random_uuid(),
  reference text not null
    references public.client_requests(reference)
    on delete cascade,
  event_type text not null,
  author text not null default 'Operations Team',
  details text,
  event_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists operation_timeline_reference_idx
on public.operation_timeline(reference, event_at desc);

alter table public.operation_timeline enable row level security;

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique references public.client_requests(reference) on delete cascade,
  operation_name text,
  team_leader text,
  team_members text,
  vehicles text,
  start_at timestamptz,
  end_at timestamptz,
  meeting_point text,
  emergency_contact text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists assignments_reference_idx
on public.assignments(reference);

alter table public.assignments enable row level security;

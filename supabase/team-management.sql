create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text not null,
  phone text,
  email text,
  countries text,
  availability text not null default 'Available'
    check (availability in ('Available','Assigned','Unavailable','On Leave')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_members_name_idx
on public.team_members(full_name);

create index if not exists team_members_availability_idx
on public.team_members(availability);

alter table public.team_members enable row level security;

create table if not exists public.assignment_team (
  id uuid primary key default gen_random_uuid(),
  reference text not null
    references public.client_requests(reference)
    on delete cascade,
  team_member_id uuid not null
    references public.team_members(id)
    on delete cascade,
  assignment_role text,
  created_at timestamptz not null default now(),
  unique(reference, team_member_id)
);

create index if not exists assignment_team_reference_idx
on public.assignment_team(reference);

create index if not exists assignment_team_member_idx
on public.assignment_team(team_member_id);

alter table public.assignment_team enable row level security;

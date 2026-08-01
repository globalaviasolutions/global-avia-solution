create table if not exists public.client_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  email text not null,
  name text not null,
  company text,
  phone text,
  request_type text not null,
  urgency text not null,
  service text not null,
  country text not null,
  location text not null,
  required_date text,
  people text,
  details text not null,
  status text not null default 'Received' check (status in ('Received','Under Review','Proposal Sent','Confirmed','Completed')),
  next_step text not null default 'Our operations team will review the request and contact you with the next steps.',
  client_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists client_requests_lookup_idx on public.client_requests(reference,email);
alter table public.client_requests enable row level security;
-- The website accesses this table only through server-side API routes using the service-role key.

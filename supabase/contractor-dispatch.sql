create table if not exists public.contractors (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  email text not null,
  phone text,
  countries text,
  services text,
  rating numeric check (rating is null or (rating >= 1 and rating <= 5)),
  notes text,
  status text not null default 'Active' check (status in ('Active','Inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists contractors_company_idx on public.contractors(company_name);
create index if not exists contractors_email_idx on public.contractors(email);
alter table public.contractors enable row level security;

create table if not exists public.contractor_dispatches (
  id uuid primary key default gen_random_uuid(),
  reference text not null references public.client_requests(reference) on delete cascade,
  contractor_id uuid not null references public.contractors(id) on delete cascade,
  token_hash text not null unique,
  status text not null default 'Sent' check (status in ('Sent','Viewed','Accepted','Declined','Clarification','Expired')),
  brief text not null,
  response_deadline timestamptz,
  expires_at timestamptz not null,
  viewed_at timestamptz,
  responded_at timestamptz,
  availability text,
  quote_amount numeric,
  currency text,
  personnel text,
  transport text,
  response_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists contractor_dispatches_reference_idx on public.contractor_dispatches(reference,created_at desc);
create index if not exists contractor_dispatches_contractor_idx on public.contractor_dispatches(contractor_id);
create index if not exists contractor_dispatches_status_idx on public.contractor_dispatches(status);
alter table public.contractor_dispatches enable row level security;

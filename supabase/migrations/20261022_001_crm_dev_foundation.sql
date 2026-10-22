-- SSA CRM DEV ONLY. REVIEW BEFORE EXECUTION.
-- Additive migration. No existing production tables are altered.
begin;

create table if not exists public.client_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null check (length(trim(legal_name)) > 0),
  country text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','member')),
  status text not null default 'pending' check (status in ('pending','active','revoked')),
  created_at timestamptz not null default now(),
  primary key (organization_id,user_id)
);
-- Deliberately no FK to production client_requests: DEV schema is independent.
-- Ownership can only be granted by trusted server-side workflow after identity verification.
create table if not exists public.client_request_ownership (
  id uuid primary key default gen_random_uuid(),
  request_reference text not null,
  user_id uuid references auth.users(id),
  organization_id uuid references public.organizations(id),
  verified_at timestamptz not null,
  created_at timestamptz not null default now(),
  constraint one_owner check ((user_id is not null) <> (organization_id is not null)),
  constraint unique_request_owner unique (request_reference)
);
create index if not exists crm_ownership_user_idx on public.client_request_ownership(user_id) where user_id is not null;
create index if not exists crm_ownership_org_idx on public.client_request_ownership(organization_id) where organization_id is not null;
create index if not exists crm_members_user_idx on public.organization_members(user_id,status);
create table if not exists public.crm_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id),
  action text not null,
  resource_type text not null,
  resource_id text not null,
  created_at timestamptz not null default now()
);

alter table public.client_profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.client_request_ownership enable row level security;
alter table public.crm_audit_logs enable row level security;

-- Prevent default public Data API access, even if project-level defaults change.
revoke all on public.client_profiles, public.organizations, public.organization_members,
  public.client_request_ownership, public.crm_audit_logs from anon, authenticated;
grant select, insert, update on public.client_profiles to authenticated;
grant select on public.organizations, public.organization_members,
  public.client_request_ownership to authenticated;

create policy "profile_read_self" on public.client_profiles
  for select to authenticated using (user_id = (select auth.uid()));
create policy "profile_insert_self" on public.client_profiles
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "profile_update_self" on public.client_profiles
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "organization_read_active_member" on public.organizations
  for select to authenticated using (
    exists (select 1 from public.organization_members m
      where m.organization_id = id and m.user_id = (select auth.uid()) and m.status = 'active')
  );
-- No client-facing organization/membership writes until an audited invitation API is implemented.
-- Membership rows are read only by the signed-in member (avoids recursive RLS).
create policy "membership_read_self" on public.organization_members
  for select to authenticated using (user_id = (select auth.uid()));

create policy "ownership_read_personal" on public.client_request_ownership
  for select to authenticated using (user_id = (select auth.uid()));
create policy "ownership_read_org" on public.client_request_ownership
  for select to authenticated using (
    organization_id is not null and exists (
      select 1 from public.organization_members m
      where m.organization_id = client_request_ownership.organization_id
        and m.user_id = (select auth.uid()) and m.status = 'active'
    )
  );
-- No client-facing writes to ownership or audit logs.
commit;

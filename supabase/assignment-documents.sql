create table if not exists public.assignment_documents (
  id uuid primary key default gen_random_uuid(),
  reference text not null
    references public.client_requests(reference)
    on delete cascade,
  file_name text not null,
  storage_path text not null unique,
  file_type text not null,
  file_size bigint not null check (file_size > 0 and file_size <= 10485760),
  category text not null default 'Other',
  client_visible boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists assignment_documents_reference_idx
on public.assignment_documents(reference, created_at desc);

alter table public.assignment_documents enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'assignment-documents',
  'assignment-documents',
  false,
  10485760,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Prophet Jeremiah Band website: starter database schema.
-- Run this in the Supabase SQL Editor after creating a project.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'content_admin' check (role in ('super_admin', 'content_admin')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('super_admin', 'content_admin')
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  location text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'cancelled', 'completed')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  event_date date,
  event_year integer,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.gallery_albums(id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  caption text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.leadership_positions (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  sort_order integer not null default 0
);

create table if not exists public.leadership_terms (
  id uuid primary key default gen_random_uuid(),
  person_name text not null,
  position_id uuid not null references public.leadership_positions(id),
  biography text not null default '',
  quote text not null default '',
  photo_url text,
  start_year integer,
  end_year integer,
  is_current boolean not null default false,
  created_at timestamptz not null default now(),
  check (end_year is null or start_year is null or end_year >= start_year)
);

create table if not exists public.archive_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'General',
  description text not null default '',
  document_url text not null,
  record_year integer,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.library_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  resource_type text not null check (resource_type in ('sermon', 'audio', 'video', 'external_link')),
  description text not null default '',
  resource_url text not null,
  speaker text not null default '',
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_issues (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issue_date date,
  summary text not null default '',
  document_url text,
  body text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null,
  sender_email text not null,
  subject text not null default '',
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'resolved')),
  created_at timestamptz not null default now()
);

-- Row Level Security: public visitors can read published content; only admins can manage it.
alter table public.profiles enable row level security;
alter table public.announcements enable row level security;
alter table public.events enable row level security;
alter table public.gallery_albums enable row level security;
alter table public.gallery_items enable row level security;
alter table public.leadership_positions enable row level security;
alter table public.leadership_terms enable row level security;
alter table public.archive_items enable row level security;
alter table public.library_resources enable row level security;
alter table public.newsletter_issues enable row level security;
alter table public.contact_messages enable row level security;

create policy "Users can read their own profile" on public.profiles
for select to authenticated using (id = auth.uid() or public.is_admin());
create policy "Admins can manage profiles" on public.profiles
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads published announcements" on public.announcements
for select to anon, authenticated using (status = 'published' or public.is_admin());
create policy "Admins manage announcements" on public.announcements
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads published events" on public.events
for select to anon, authenticated using (status = 'published' or public.is_admin());
create policy "Admins manage events" on public.events
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads published albums" on public.gallery_albums
for select to anon, authenticated using (status = 'published' or public.is_admin());
create policy "Admins manage albums" on public.gallery_albums
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public reads items in published albums" on public.gallery_items
for select to anon, authenticated using (
  public.is_admin() or exists (
    select 1 from public.gallery_albums a where a.id = album_id and a.status = 'published'
  )
);
create policy "Admins manage gallery items" on public.gallery_items
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads leadership positions" on public.leadership_positions
for select to anon, authenticated using (true);
create policy "Admins manage leadership positions" on public.leadership_positions
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public reads leadership terms" on public.leadership_terms
for select to anon, authenticated using (true);
create policy "Admins manage leadership terms" on public.leadership_terms
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads published archive items" on public.archive_items
for select to anon, authenticated using (status = 'published' or public.is_admin());
create policy "Admins manage archive items" on public.archive_items
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public reads published library resources" on public.library_resources
for select to anon, authenticated using (status = 'published' or public.is_admin());
create policy "Admins manage library resources" on public.library_resources
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public reads published newsletters" on public.newsletter_issues
for select to anon, authenticated using (status = 'published' or public.is_admin());
create policy "Admins manage newsletters" on public.newsletter_issues
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Anyone can submit contact messages" on public.contact_messages
for insert to anon, authenticated with check (true);
create policy "Admins read and manage contact messages" on public.contact_messages
for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Storage buckets. Keep archival documents private unless the Band decides they are public.
insert into storage.buckets (id, name, public)
values ('pjb-gallery', 'pjb-gallery', true), ('pjb-private-archive', 'pjb-private-archive', false)
on conflict (id) do nothing;

create policy "Public can view published gallery files" on storage.objects
for select to anon, authenticated using (bucket_id = 'pjb-gallery');
create policy "Admins upload gallery files" on storage.objects
for insert to authenticated with check (bucket_id = 'pjb-gallery' and public.is_admin());
create policy "Admins update gallery files" on storage.objects
for update to authenticated using (bucket_id = 'pjb-gallery' and public.is_admin()) with check (bucket_id = 'pjb-gallery' and public.is_admin());
create policy "Admins delete gallery files" on storage.objects
for delete to authenticated using (bucket_id = 'pjb-gallery' and public.is_admin());

create policy "Admins access private archive files" on storage.objects
for all to authenticated using (bucket_id = 'pjb-private-archive' and public.is_admin())
with check (bucket_id = 'pjb-private-archive' and public.is_admin());

-- Seed leadership positions. Edit/reorder these to match the Band's agreed titles.
insert into public.leadership_positions (title, sort_order)
values ('Captain', 1), ('Vice-Captain', 2), ('Secretary', 3), ('Patron', 4), ('Matron', 5)
on conflict (title) do nothing;

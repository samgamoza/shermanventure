create type public.app_role as enum ('admin', 'client');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  company text,
  marketing_consent boolean not null default false,
  privacy_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "own roles readable" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "own profile read" on public.profiles for select to authenticated
  using (id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "own profile update" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
create policy "own profile insert" on public.profiles for insert to authenticated
  with check (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, privacy_accepted_at)
  values (new.id, new.raw_user_meta_data->>'full_name',
          case when (new.raw_user_meta_data->>'privacy_accepted') = 'true' then now() else null end);
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (new.id, 'client');
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 255),
  phone text check (phone is null or char_length(phone) <= 30),
  subject text not null check (char_length(subject) between 1 and 150),
  message text not null check (char_length(message) between 1 and 2000),
  privacy_consent boolean not null check (privacy_consent = true),
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "anyone can submit" on public.contact_messages for insert to anon, authenticated
  with check (privacy_consent = true and status = 'new');
create policy "admin read" on public.contact_messages for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "admin update" on public.contact_messages for update to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "admin delete" on public.contact_messages for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create table public.client_documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null,
  title text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);
grant select, insert, delete on public.client_documents to authenticated;
grant all on public.client_documents to service_role;
alter table public.client_documents enable row level security;
create policy "client reads own docs" on public.client_documents for select to authenticated
  using (client_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "admin adds docs" on public.client_documents for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));
create policy "admin deletes docs" on public.client_documents for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "client reads own files" on storage.objects for select to authenticated
  using (bucket_id = 'client-documents' and ((storage.foldername(name))[1] = auth.uid()::text or public.has_role(auth.uid(), 'admin')));
create policy "admin uploads files" on storage.objects for insert to authenticated
  with check (bucket_id = 'client-documents' and public.has_role(auth.uid(), 'admin'));
create policy "admin deletes files" on storage.objects for delete to authenticated
  using (bucket_id = 'client-documents' and public.has_role(auth.uid(), 'admin'));
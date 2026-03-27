create extension if not exists "pgcrypto";

create table if not exists public.allowances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  amount numeric(12, 2) not null check (amount > 0),
  frequency text not null check (frequency in ('weekly', 'monthly')),
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  amount numeric(12, 2) not null check (amount > 0),
  category text not null,
  description text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.allowances enable row level security;
alter table public.expenses enable row level security;

create policy "Users can view their allowances"
on public.allowances
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their allowances"
on public.allowances
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can view their expenses"
on public.expenses
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their expenses"
on public.expenses
for insert
to authenticated
with check (auth.uid() = user_id);

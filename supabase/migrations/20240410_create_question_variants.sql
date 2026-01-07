create table if not exists public.question_variants (
  id uuid default gen_random_uuid() primary key,
  original_question_id text not null,
  title text not null,
  description text not null,
  input_format text not null,
  output_format text not null,
  visible_test_cases jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists question_variants_original_id_idx on public.question_variants(original_question_id);

alter table public.question_variants enable row level security;

create policy "Allow public read access"
  on public.question_variants
  for select
  using (true);

create policy "Allow authenticated insert"
  on public.question_variants
  for insert
  with check (auth.role() = 'authenticated');

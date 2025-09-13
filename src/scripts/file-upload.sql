create table file_links (
  id uuid default gen_random_uuid() primary key,
  short_code text not null unique,
  file_url text not null,
  created_at timestamp default now()
);

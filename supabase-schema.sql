create extension if not exists "pgcrypto";

create table if not exists company_knowledge (
  id uuid primary key default gen_random_uuid(),
  company_name text,
  website_urls text[],
  profile jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists saved_marketing_content (
  id uuid primary key default gen_random_uuid(),
  title text,
  content_type text,
  business_category text,
  user_request text,
  generated_output text,
  status text default 'draft',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists website_reviews (
  id uuid primary key default gen_random_uuid(),
  website_url text,
  business_focus text,
  review_output text,
  created_at timestamp with time zone default now()
);

create table if not exists competitor_reviews (
  id uuid primary key default gen_random_uuid(),
  company_url text,
  competitor_urls text[],
  business_focus text,
  review_output text,
  created_at timestamp with time zone default now()
);

create table if not exists market_trends (
  id uuid primary key default gen_random_uuid(),
  industry text,
  region text,
  research_focus text,
  notes text,
  output text,
  created_at timestamp with time zone default now()
);

create table if not exists campaign_plans (
  id uuid primary key default gen_random_uuid(),
  service_product text,
  target_audience text,
  region text,
  campaign_goal text,
  campaign_duration text,
  notes text,
  output text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table company_knowledge enable row level security;
alter table saved_marketing_content enable row level security;
alter table website_reviews enable row level security;
alter table competitor_reviews enable row level security;
alter table market_trends enable row level security;
alter table campaign_plans enable row level security;

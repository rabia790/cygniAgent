create extension if not exists "pgcrypto";

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  company_name text,
  website_urls text[],
  industry text,
  services text[],
  products text[],
  target_audience text[],
  brand_tone text,
  competitors jsonb,
  notes text,
  profile jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists company_knowledge (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  company_name text,
  website_urls text[],
  profile jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists saved_marketing_content (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  title text,
  content_type text,
  business_category text,
  target_audience text,
  region text,
  campaign_goal text,
  tone text,
  recommendation jsonb,
  quality_score jsonb,
  selected_company_profile jsonb,
  user_request text,
  generated_output text,
  status text default 'draft',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists website_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  website_url text,
  business_focus text,
  review_output text,
  created_at timestamp with time zone default now()
);

create table if not exists competitor_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  company_url text,
  competitor_urls text[],
  business_focus text,
  review_output text,
  created_at timestamp with time zone default now()
);

create table if not exists market_trends (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  industry text,
  region text,
  research_focus text,
  notes text,
  output text,
  created_at timestamp with time zone default now()
);

create table if not exists campaign_plans (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  service_product text,
  target_audience text,
  region text,
  campaign_goal text,
  campaign_duration text,
  notes text,
  output text,
  created_at timestamp with time zone default now()
);

create table if not exists seo_page_plans (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  page_type text,
  target_keyword text,
  page_output text,
  created_at timestamp with time zone default now()
);

create table if not exists lead_magnets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  title text,
  target_audience text,
  offer_type text,
  output text,
  created_at timestamp with time zone default now()
);

create table if not exists website_scorecards (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  website_url text,
  scorecard_output text,
  created_at timestamp with time zone default now()
);

alter table company_knowledge add column if not exists company_id uuid references companies(id) on delete cascade;
alter table saved_marketing_content add column if not exists company_id uuid references companies(id) on delete cascade;
alter table saved_marketing_content add column if not exists target_audience text;
alter table saved_marketing_content add column if not exists region text;
alter table saved_marketing_content add column if not exists campaign_goal text;
alter table saved_marketing_content add column if not exists tone text;
alter table saved_marketing_content add column if not exists recommendation jsonb;
alter table saved_marketing_content add column if not exists quality_score jsonb;
alter table saved_marketing_content add column if not exists selected_company_profile jsonb;
alter table website_reviews add column if not exists company_id uuid references companies(id) on delete cascade;
alter table competitor_reviews add column if not exists company_id uuid references companies(id) on delete cascade;
alter table market_trends add column if not exists company_id uuid references companies(id) on delete cascade;
alter table campaign_plans add column if not exists company_id uuid references companies(id) on delete cascade;
alter table seo_page_plans add column if not exists company_id uuid references companies(id) on delete cascade;
alter table lead_magnets add column if not exists company_id uuid references companies(id) on delete cascade;
alter table website_scorecards add column if not exists company_id uuid references companies(id) on delete cascade;

-- Enable RLS
alter table companies enable row level security;
alter table company_knowledge enable row level security;
alter table saved_marketing_content enable row level security;
alter table website_reviews enable row level security;
alter table competitor_reviews enable row level security;
alter table market_trends enable row level security;
alter table campaign_plans enable row level security;
alter table seo_page_plans enable row level security;
alter table lead_magnets enable row level security;
alter table website_scorecards enable row level security;

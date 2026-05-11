create extension if not exists "pgcrypto";

create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
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
  visibility text default 'private' check (visibility in ('private', 'shared', 'public_demo')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text default 'viewer' check (role in ('owner', 'editor', 'viewer')),
  created_at timestamp with time zone default now(),
  unique (company_id, user_id)
);

create table if not exists company_knowledge (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  company_name text,
  website_urls text[],
  profile jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists saved_marketing_content (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  title text,
  content_type text,
  business_category text,
  target_audience text,
  region text,
  campaign_goal text,
  tone text,
  recommendation jsonb,
  quality_score integer,
  quality_metrics jsonb,
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
  created_by uuid references auth.users(id) on delete set null,
  website_url text,
  business_focus text,
  review_output text,
  created_at timestamp with time zone default now()
);

create table if not exists competitor_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  company_url text,
  competitor_urls text[],
  business_focus text,
  review_output text,
  created_at timestamp with time zone default now()
);

create table if not exists market_trends (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
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
  created_by uuid references auth.users(id) on delete set null,
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
  created_by uuid references auth.users(id) on delete set null,
  page_type text,
  target_keyword text,
  page_output text,
  created_at timestamp with time zone default now()
);

create table if not exists lead_magnets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  title text,
  target_audience text,
  offer_type text,
  output text,
  created_at timestamp with time zone default now()
);

create table if not exists website_scorecards (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  website_url text,
  scorecard_output text,
  created_at timestamp with time zone default now()
);

create table if not exists linkedin_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  linkedin_member_id text not null,
  linkedin_name text,
  linkedin_email text,
  linkedin_picture_url text,
  access_token_encrypted text not null,
  token_expires_at timestamp with time zone,
  scope text,
  status text default 'connected' check (status in ('connected', 'expired', 'revoked', 'disconnected')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id)
);

create table if not exists linkedin_oauth_states (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  state text not null unique,
  created_at timestamp with time zone default now(),
  expires_at timestamp with time zone not null
);

create table if not exists linkedin_published_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  company_id uuid references companies(id) on delete set null,
  saved_content_id uuid references saved_marketing_content(id) on delete set null,
  linkedin_post_urn text,
  post_text text not null,
  status text default 'published' check (status in ('published', 'failed')),
  error_message text,
  created_at timestamp with time zone default now()
);

alter table company_knowledge add column if not exists company_id uuid references companies(id) on delete cascade;
alter table companies add column if not exists owner_id uuid references auth.users(id) on delete cascade;
alter table companies add column if not exists visibility text default 'private' check (visibility in ('private', 'shared', 'public_demo'));
alter table company_knowledge add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table saved_marketing_content add column if not exists company_id uuid references companies(id) on delete cascade;
alter table saved_marketing_content add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table saved_marketing_content add column if not exists target_audience text;
alter table saved_marketing_content add column if not exists region text;
alter table saved_marketing_content add column if not exists campaign_goal text;
alter table saved_marketing_content add column if not exists tone text;
alter table saved_marketing_content add column if not exists recommendation jsonb;
alter table saved_marketing_content add column if not exists quality_metrics jsonb;
alter table saved_marketing_content add column if not exists selected_company_profile jsonb;
alter table website_reviews add column if not exists company_id uuid references companies(id) on delete cascade;
alter table website_reviews add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table competitor_reviews add column if not exists company_id uuid references companies(id) on delete cascade;
alter table competitor_reviews add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table market_trends add column if not exists company_id uuid references companies(id) on delete cascade;
alter table market_trends add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table campaign_plans add column if not exists company_id uuid references companies(id) on delete cascade;
alter table campaign_plans add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table seo_page_plans add column if not exists company_id uuid references companies(id) on delete cascade;
alter table seo_page_plans add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table lead_magnets add column if not exists company_id uuid references companies(id) on delete cascade;
alter table lead_magnets add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table website_scorecards add column if not exists company_id uuid references companies(id) on delete cascade;
alter table website_scorecards add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table linkedin_connections add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table linkedin_connections add column if not exists linkedin_member_id text;
alter table linkedin_connections add column if not exists linkedin_name text;
alter table linkedin_connections add column if not exists linkedin_email text;
alter table linkedin_connections add column if not exists linkedin_picture_url text;
alter table linkedin_connections add column if not exists access_token_encrypted text;
alter table linkedin_connections add column if not exists token_expires_at timestamp with time zone;
alter table linkedin_connections add column if not exists scope text;
alter table linkedin_connections add column if not exists status text default 'connected';
alter table linkedin_connections add column if not exists updated_at timestamp with time zone default now();
alter table linkedin_oauth_states add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table linkedin_oauth_states add column if not exists state text;
alter table linkedin_oauth_states add column if not exists expires_at timestamp with time zone;
alter table linkedin_published_posts add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table linkedin_published_posts add column if not exists company_id uuid references companies(id) on delete set null;
alter table linkedin_published_posts add column if not exists saved_content_id uuid references saved_marketing_content(id) on delete set null;
alter table linkedin_published_posts add column if not exists linkedin_post_urn text;
alter table linkedin_published_posts add column if not exists post_text text;
alter table linkedin_published_posts add column if not exists status text default 'published';
alter table linkedin_published_posts add column if not exists error_message text;

-- Backfill ownership for rows saved before per-user ownership was added.
-- Rows without a company_id cannot be safely assigned to a user and will be hidden by RLS.
update company_knowledge ck
set created_by = c.owner_id
from companies c
where ck.company_id = c.id and ck.created_by is null;

update saved_marketing_content smc
set created_by = c.owner_id
from companies c
where smc.company_id = c.id and smc.created_by is null;

update website_reviews wr
set created_by = c.owner_id
from companies c
where wr.company_id = c.id and wr.created_by is null;

update competitor_reviews cr
set created_by = c.owner_id
from companies c
where cr.company_id = c.id and cr.created_by is null;

update market_trends mt
set created_by = c.owner_id
from companies c
where mt.company_id = c.id and mt.created_by is null;

update campaign_plans cp
set created_by = c.owner_id
from companies c
where cp.company_id = c.id and cp.created_by is null;

update seo_page_plans spp
set created_by = c.owner_id
from companies c
where spp.company_id = c.id and spp.created_by is null;

update lead_magnets lm
set created_by = c.owner_id
from companies c
where lm.company_id = c.id and lm.created_by is null;

update website_scorecards ws
set created_by = c.owner_id
from companies c
where ws.company_id = c.id and ws.created_by is null;

-- Enable RLS
alter table user_profiles enable row level security;
alter table companies enable row level security;
alter table company_members enable row level security;
alter table company_knowledge enable row level security;
alter table saved_marketing_content enable row level security;
alter table website_reviews enable row level security;
alter table competitor_reviews enable row level security;
alter table market_trends enable row level security;
alter table campaign_plans enable row level security;
alter table seo_page_plans enable row level security;
alter table lead_magnets enable row level security;
alter table website_scorecards enable row level security;
alter table linkedin_connections enable row level security;
alter table linkedin_oauth_states enable row level security;
alter table linkedin_published_posts enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.can_access_company(target_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.companies c
    where c.id = target_company_id
      and (
        c.owner_id = auth.uid()
        or public.is_admin()
        or exists (
          select 1 from public.company_members cm
          where cm.company_id = c.id and cm.user_id = auth.uid()
        )
      )
  );
$$;

create or replace function public.can_edit_company(target_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.companies c
    where c.id = target_company_id
      and (
        c.owner_id = auth.uid()
        or public.is_admin()
        or exists (
          select 1 from public.company_members cm
          where cm.company_id = c.id
            and cm.user_id = auth.uid()
            and cm.role in ('owner', 'editor')
        )
      )
  );
$$;

drop policy if exists "profiles_select_own_or_admin" on user_profiles;
create policy "profiles_select_own_or_admin" on user_profiles for select
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_insert_self" on user_profiles;
create policy "profiles_insert_self" on user_profiles for insert
with check (id = auth.uid());

drop policy if exists "profiles_update_own_or_admin" on user_profiles;
create policy "profiles_update_own_or_admin" on user_profiles for update
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

drop policy if exists "companies_select_access" on companies;
create policy "companies_select_access" on companies for select
using (owner_id = auth.uid() or public.is_admin() or exists (
  select 1 from company_members cm where cm.company_id = companies.id and cm.user_id = auth.uid()
));

drop policy if exists "companies_insert_owner" on companies;
create policy "companies_insert_owner" on companies for insert
with check (owner_id = auth.uid());

drop policy if exists "companies_update_editors" on companies;
create policy "companies_update_editors" on companies for update
using (public.can_edit_company(id))
with check (public.can_edit_company(id));

drop policy if exists "companies_delete_editors" on companies;
create policy "companies_delete_editors" on companies for delete
using (public.can_edit_company(id));

drop policy if exists "members_select_company_access" on company_members;
create policy "members_select_company_access" on company_members for select
using (public.can_access_company(company_id));

drop policy if exists "members_manage_company_editors" on company_members;
create policy "members_manage_company_editors" on company_members for all
using (public.can_edit_company(company_id))
with check (public.can_edit_company(company_id));

drop policy if exists "company_knowledge_access" on company_knowledge;
create policy "company_knowledge_access" on company_knowledge for all
using (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()))
with check (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()));

drop policy if exists "saved_marketing_content_access" on saved_marketing_content;
create policy "saved_marketing_content_access" on saved_marketing_content for all
using (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()))
with check (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()));

drop policy if exists "website_reviews_access" on website_reviews;
create policy "website_reviews_access" on website_reviews for all
using (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()))
with check (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()));

drop policy if exists "competitor_reviews_access" on competitor_reviews;
create policy "competitor_reviews_access" on competitor_reviews for all
using (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()))
with check (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()));

drop policy if exists "market_trends_access" on market_trends;
create policy "market_trends_access" on market_trends for all
using (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()))
with check (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()));

drop policy if exists "campaign_plans_access" on campaign_plans;
create policy "campaign_plans_access" on campaign_plans for all
using (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()))
with check (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()));

drop policy if exists "seo_page_plans_access" on seo_page_plans;
create policy "seo_page_plans_access" on seo_page_plans for all
using (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()))
with check (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()));

drop policy if exists "lead_magnets_access" on lead_magnets;
create policy "lead_magnets_access" on lead_magnets for all
using (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()))
with check (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()));

drop policy if exists "website_scorecards_access" on website_scorecards;
create policy "website_scorecards_access" on website_scorecards for all
using (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()))
with check (public.can_access_company(company_id) and (created_by = auth.uid() or public.is_admin()));

drop policy if exists "linkedin_connections_own_access" on linkedin_connections;
create policy "linkedin_connections_own_access" on linkedin_connections for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "linkedin_oauth_states_own_access" on linkedin_oauth_states;
create policy "linkedin_oauth_states_own_access" on linkedin_oauth_states for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "linkedin_published_posts_own_access" on linkedin_published_posts;
create policy "linkedin_published_posts_own_access" on linkedin_published_posts for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

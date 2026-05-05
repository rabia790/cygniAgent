# CygniSoft AI Marketing Agent V2

A clean web app that generates ready-to-use marketing content for CygniSoft staffing services, software solutions, and business products. Version 2 adds website knowledge building, website page review, and competitor review.

## Features

- Content type and business category selectors
- User request textarea with basic validation
- Generate button with loading state
- Editable generated output
- Copy and reset actions
- Graceful error messages
- Optional OpenAI-powered generation through environment variables
- Local fallback generator so the app works without an API key
- Website Knowledge Builder for public CygniSoft URLs
- Website Review mode for page clarity, CTA, SEO, and content suggestions
- Competitor Review mode for positioning, service, CTA, trust signal, and gap comparison
- Persistent CygniSoft company knowledge saved in Supabase, with browser `localStorage` fallback
- Content Library backed by Supabase
- Manual profile editing, saving, and clearing controls
- Generate Content badge showing when saved CygniSoft knowledge is active
- Version 4 Market & Hiring Trends mode
- Version 5 Lead & Campaign Planner mode

## Version 2 Tabs

- Generate Content: keeps the original marketing generator.
- Build Company Knowledge: fetches user-provided CygniSoft URLs and saves a structured profile in Supabase.
- Website Review: reviews one CygniSoft page URL.
- Competitor Review: compares CygniSoft pages or the saved profile against competitor URLs.
- Market & Hiring Trends: creates practical market research for selected industries, regions, and research focus areas.
- Lead & Campaign Planner: creates safe lead targeting strategy, outreach messaging, follow-up plans, and campaign next steps.

The browser automatically sends the latest saved company knowledge profile with Generate Content, Website Review, Competitor Review, Market & Hiring Trends, and Lead & Campaign Planner requests. The saved profile can be edited manually in the Build Company Knowledge tab, and it can also be cleared when you want to reset the app back to the default CygniSoft context.

Supabase is the primary persistent storage. Browser localStorage remains a fallback for internal use when Supabase is not configured or a database save fails. TODO: for larger multi-user production, add authentication and user-scoped database rows.

## Testing Version 4

1. Open the `Market & Hiring Trends` tab.
2. Select an industry such as `Healthcare`.
3. Enter a region such as `Ontario` or `GTA`.
4. Choose a research focus such as `Full market summary`.
5. Add optional notes and click `Generate Trend Research`.
6. Confirm the output includes executive summary, hiring trends, roles, opportunities, marketing angles, outreach targets, risks, and sources/notes.

When live web search is not connected, the output is clearly labeled as AI-generated research based on provided context and general market knowledge.

## Testing Version 5

1. Open the `Lead & Campaign Planner` tab.
2. Select a service/product, target audience, campaign goal, and campaign duration.
3. Enter a region such as `Toronto`, `Mississauga`, or `Canada`.
4. Add optional campaign notes and click `Generate Campaign Plan`.
5. Confirm the output includes ICP, targeting strategy, lead source categories, positioning, pain points, outreach message, cold email sequence, LinkedIn sequence, post ideas, follow-up plan, CTA, metrics, and next steps.

The planner does not scrape personal data or create private contact lists. It provides safe company/category-level lead generation strategies only.

## Setup

1. Install Node.js 18 or newer.
2. Copy `.env.example` to `.env.local` and add your OpenAI and Supabase settings.
3. Start the app:

```bash
npm start
```

4. Open:

```text
http://localhost:3000
```

## Environment Variables

The app does not hardcode secrets. Use environment variables when enabling AI generation:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini
PORT=3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If `OPENAI_API_KEY` is not set, the app uses its built-in CygniSoft marketing generator.

If Supabase variables are missing, generation still works, but database save/load features show a clear configuration message.

## Supabase Setup

1. Create a Supabase project.
2. Copy your project URL and anon key.
3. Add these locally in `.env.local` and in Vercel Project Settings > Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

4. Run this SQL in the Supabase SQL editor:

```sql
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
```

For internal use, configure Row Level Security policies to allow the intended reads and writes with your anon key. For public production, add authentication and stricter policies before launch.

## Prompt Structure

The backend builds prompts using CygniSoft's positioning, service details, selected content type, selected business category, and the user's request. Each content type has its own output structure:

- LinkedIn Post: polished final post copy with a strong hook, short paragraphs, 3 practical benefits, and CTA
- Cold Email: subject line, email body, and CTA
- Website Copy: hero headline, subheading, service section, benefits, and CTA
- Service Page Content: page headline, intro copy, audience, challenges, solution, benefits, and CTA
- Product Description: overview, problem solved, features, benefits, ideal users, and CTA
- Proposal Draft: objective, scope, recommended solution, benefits, timeline placeholder, and next steps
- Campaign Idea: theme, audience, message, angles, channels, and CTA
- Social Media Calendar: 7-day calendar with topic, caption idea, and CTA

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
- Persistent CygniSoft company knowledge saved in browser `localStorage` with the key `cygnisoft_company_knowledge`
- Manual profile editing, saving, and clearing controls
- Generate Content badge showing when saved CygniSoft knowledge is active
- Version 4 Market & Hiring Trends mode
- Version 5 Lead & Campaign Planner mode

## Version 2 Tabs

- Generate Content: keeps the original marketing generator.
- Build Company Knowledge: fetches user-provided CygniSoft URLs and saves a structured profile in browser `localStorage`.
- Website Review: reviews one CygniSoft page URL.
- Competitor Review: compares CygniSoft pages or the saved profile against competitor URLs.
- Market & Hiring Trends: creates practical market research for selected industries, regions, and research focus areas.
- Lead & Campaign Planner: creates safe lead targeting strategy, outreach messaging, follow-up plans, and campaign next steps.

The browser automatically sends the latest saved company knowledge profile with Generate Content, Website Review, Competitor Review, Market & Hiring Trends, and Lead & Campaign Planner requests. The saved profile can be edited manually in the Build Company Knowledge tab, and it can also be cleared when you want to reset the app back to the default CygniSoft context.

This localStorage approach is intended for internal Version 2 use and works on Vercel without a writable server folder. TODO: for multi-user production, move company knowledge storage to a database such as Supabase, Neon, Firebase, or Vercel KV.

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
2. Optional: copy `.env.example` to `.env` and add your OpenAI API key.
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
```

If `OPENAI_API_KEY` is not set, the app uses its built-in CygniSoft marketing generator.

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

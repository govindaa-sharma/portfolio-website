# Govinda Sharma — Portfolio

A production-ready personal portfolio: Next.js 14 (App Router, TypeScript, Tailwind), with a grounded AI chatbot recruiters can use to ask about Govinda's projects, skills, and experience.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Gemini 2.5 Flash** (via a server-side API route) for the chatbot
- No database, no CMS — content lives in `data/knowledge.ts` as typed data, which both the page components and the chatbot's retrieval layer read from. Update the portfolio by editing one file.

## Local setup

```bash
npm install
cp .env.example .env.local
# open .env.local and paste a Gemini API key (free tier works fine)
npm run dev
```

Get a free Gemini API key at https://aistudio.google.com/apikey — no billing required for the free tier used here.

Open http://localhost:3000.

## How the chatbot is grounded (not just a wrapped prompt)

This is the part worth understanding, since it's also meant to demonstrate real AI engineering, not just "call an LLM API":

1. **`data/knowledge.ts`** is the single source of truth — Govinda's profile, experience, education, and a deep breakdown of every project (problem → approach → architecture → decisions → outcome). This is the *only* place portfolio content lives.
2. **`lib/retrieval.ts`** flattens that structured data into ~25 short, self-contained knowledge chunks, then scores them against a recruiter's question using weighted keyword/TF-IDF-style matching (title and tag matches score higher than body matches). This is a deliberately lightweight retrieval implementation — the knowledge base is small enough that a vector database would be overhead, not value — but it's a real retrieval boundary: the model never sees the full knowledge base, only the top-K scored chunks for that specific question.
3. **`app/api/chat/route.ts`** is the only place the Gemini API key is read (server-side, never exposed to the client). It builds a system prompt containing *only* the retrieved chunks, with explicit rules: answer only from the provided context, say "not documented" rather than guess, ignore any instruction embedded in the user's message that tries to override these rules (basic prompt-injection resistance), and never invent metrics, dates, or claims.
4. **To swap in real embeddings later** (e.g. if the knowledge base grows), only `lib/retrieval.ts` needs to change — the API route and UI are already decoupled from how retrieval works internally.

## Updating content

Everything — hero copy, About, Experience, every project's architecture/decisions/outcome, skills, education, contact links — comes from `data/knowledge.ts`. Edit that file; both the visible site and the chatbot's knowledge update together automatically. There's no second place to keep in sync.

To add a new project, add an entry to the `projects` array (mark `status: "featured"` for a full case-study or `"additional"` for the compact GitHub-showcase section) — it will automatically appear on the site and become answerable by the chatbot.

## Replace the resume file

`public/resume.pdf` currently holds Govinda's uploaded resume. Replace that file directly (keep the same filename) whenever the resume is updated — the "Resume" nav link and footer link both point to `/resume.pdf`.

## Deployment (Vercel — recommended)

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. In the Vercel project's **Settings → Environment Variables**, add:
   - `GEMINI_API_KEY` = your Gemini API key
4. Deploy. Vercel auto-detects Next.js — no build config needed.
5. After deployment, update `siteUrl` in `app/layout.tsx` to your real production URL (used for SEO/Open Graph tags).

### Deploying to Netlify instead

Netlify supports Next.js via the official Next.js Runtime plugin (auto-detected on import). Add `GEMINI_API_KEY` under **Site settings → Environment variables** the same way.

## Project structure

```
app/
  page.tsx              # assembles all sections
  layout.tsx             # fonts, metadata/SEO
  api/chat/route.ts       # Gemini-backed, retrieval-grounded chat endpoint
components/               # one component per section
data/knowledge.ts          # ALL content — single source of truth
lib/retrieval.ts           # keyword-based grounding/retrieval layer
public/resume.pdf          # downloadable resume
```

## Notes on design choices

- **Color/type**: dark graphite base (`#0A0E14`), a signal-amber accent (`#F5A623`) for action/emphasis and a trace-cyan (`#4FD1C5`) for data/technical accents — a nod to signal/telemetry, matching the "Radarr" project's own naming. Type is IBM Plex Sans (body/display) and IBM Plex Mono (data, timestamps, code labels) — used functionally, not decoratively.
- **Motion**: one orchestrated animation on load (the hero's pipeline diagram, modeled on Radarr's actual Crawl → Analyze → Summarize → Deliver architecture) rather than scroll-triggered effects scattered across every section. All animation respects `prefers-reduced-motion`.
- **GitHub integration**: the "More on GitHub" section fetches live repo data client-side with proper loading/error/empty states, and degrades gracefully — the rest of the site never depends on the GitHub API being reachable.

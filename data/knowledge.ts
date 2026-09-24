// data/knowledge.ts
//
// This file is the single source of truth for Govinda's portfolio content.
// It is imported directly by page components (so the site never says
// anything the chatbot can't also ground itself in) AND flattened into
// chunks for the chatbot's retrieval step (see lib/retrieval.ts).
//
// To update the site or the chatbot's knowledge later, edit this file only.

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  timeframe: string;
  status: "featured" | "additional";
  problem: string;
  approach: string;
  architecture: string[];
  decisions: { title: string; detail: string }[];
  stack: string[];
  outcome: string[];
  links: { label: string; url: string }[];
};

export type ExperienceItem = {
  role: string;
  org: string;
  location: string;
  timeframe: string;
  bullets: string[];
};

export type EducationItem = {
  institution: string;
  credential: string;
  detail: string;
  timeframe: string;
};

export const profile = {
  name: "Govinda Sharma",
  title: "AI Engineer",
  focus:
    "Multi-agent systems, LLM pipelines, and RAG, with backend engineering fundamentals underneath.",
  location: "Kolkata, India",
  email: "gs2083409@gmail.com",
  phone: "+91 74396 39010",
  github: "https://github.com/govindaa-sharma",
  linkedin: "https://www.linkedin.com/in/govinda-sharma-931973281",
  summary:
    "Govinda is a final-year Computer Science (Data Science) student and AI engineer who builds multi-agent systems that hold up under real conditions — adversarial input, cost limits, and human-in-the-loop safety requirements — not just demos. His projects consistently pair an LLM pipeline with an engineering discipline layer: structured-output contracts, guardrails against prompt injection, evaluation harnesses, and observability, documented honestly including what doesn't fully work yet.",
  currentlyBuilding: [
    "Radarr — autonomous competitive intelligence system",
    "Epoché — ML experiment tracking platform with a LangGraph ReAct copilot agent",
    "Rowans — self-correcting, human-gated natural-language-to-SQL agent",
  ],
};

export const skills = {
  Languages: ["Python", "SQL", "R"],
  "AI / ML": [
    "Scikit-learn",
    "TensorFlow",
    "Pandas",
    "NumPy",
    "Hugging Face Transformers",
  ],
  "LLM & Agents": [
    "LangChain",
    "LangGraph",
    "RAG Pipelines",
    "Prompt Engineering",
  ],
  "Backend & Systems": [
    "FastAPI",
    "REST APIs",
    "SQLAlchemy",
    "Celery",
    "Docker",
    "Docker Compose",
  ],
  "Databases & Vector Stores": ["PostgreSQL", "Qdrant", "ChromaDB", "FAISS"],
  "Tools & Platforms": [
    "GitHub Actions (CI/CD)",
    "Streamlit",
    "Ollama",
    "Gemini API",
    "Pydantic",
    "Pydantic Logfire",
  ],
};

export const experience: ExperienceItem[] = [
  {
    role: "AI Intern",
    org: "Blu Parrot Ventures Pvt. Ltd.",
    location: "Gurugram, India",
    timeframe: "June 2026 – July 2026",
    bullets: [
      "Delivered a production-ready investment analytics platform in 8 weeks — 10 live FastAPI endpoints integrated against a 20-table, 500K+ record schema — by architecting the full PostgreSQL data model and backend from scratch.",
      "Improved forecasting reliability for client-facing risk analytics by benchmarking and tuning Monte Carlo simulation (10,000 simulations/prediction) against XGBoost.",
      "Cut stakeholder time-to-demo by building a fully integrated frontend proof-of-concept in Google Stitch and connecting it end-to-end with the backend and predictive models.",
    ],
  },
  {
    role: "Document Automation Intern",
    org: "SLAOS SBA",
    location: "Kolkata, India",
    timeframe: "May 2024 – Present",
    bullets: [
      "Cut manual contract turnaround time by engineering reusable HotDocs templates with conditional logic.",
      "Administered NetDocuments repositories for metadata standards, version control, and access permissions.",
    ],
  },
  {
    role: "Open Source Contributor",
    org: "Social Winter of Code (SWOC)",
    location: "Remote",
    timeframe: "Dec 2024 – Feb 2025",
    bullets: [
      "Ranked top 50 of 5,000+ contributors, measured by contribution quality and volume scoring.",
      "Resolved 30+ bugs across 10+ repositories spanning React frontends and FastAPI/backend logic.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Heritage Institute of Technology",
    credential: "BTech, Computer Science (Data Science)",
    detail: "GPA: 7.9/10.0",
    timeframe: "Aug 2023 – June 2027",
  },
  {
    institution: "St. Lawrence High School",
    credential: "Higher Secondary, Science",
    detail: "Percentage: 81.4/100",
    timeframe: "April 2021 – May 2023",
  },
];

export const projects: Project[] = [
  {
    slug: "radarr",
    name: "Radarr",
    tagline: "Autonomous competitive intelligence system",
    timeframe: "Final-year project, ongoing",
    status: "featured",
    problem:
      "Competitive intelligence is high-leverage but almost entirely manual — founders and product teams spend hours checking competitor sites, socials, and job boards, and by the time they see something, it's already stale.",
    approach:
      "A 3-agent LangGraph pipeline (Crawler → Analyst → Summarizer) monitors competitor sources, detects genuine changes with a diff-based memory system before spending any LLM budget, extracts structured intelligence, and delivers a daily brief with zero human intervention — plus a RAG chat interface for ad-hoc questions.",
    architecture: [
      "Crawler Agent — httpx first, Playwright fallback for JS-rendered pages; local Llama 3.1:8b for cleanup",
      "Diff Engine (PostgreSQL-backed) — only genuine content changes pass downstream, skipping 70–80% of URLs with zero API calls",
      "Analyst Agent — Gemini 2.5 Flash extracts structured intelligence (event_type, importance, headline, recommended action) as Pydantic-validated JSON",
      "Summarizer Agent — local Llama 3.1:8b writes the free daily brief",
      "Dual memory — PostgreSQL for structured/queryable history, Qdrant for semantic RAG search",
      "Delivery — Slack webhook + Streamlit dashboard with charts and a RAG chat interface",
    ],
    decisions: [
      {
        title: "Diff-based memory as the primary cost control",
        detail:
          "Every scraped page is compared against its last snapshot before the Analyst agent is ever called, cutting Gemini API calls by 70–80% on a stable competitor set — a design choice, not a side effect.",
      },
      {
        title: "A different model per agent, on purpose",
        detail:
          "Crawler and Summarizer run on local Llama 3.1:8b (free, fast, doesn't need a frontier model); only the Analyst's structured-extraction task — which genuinely needs strong reasoning over noisy text — calls Gemini 2.5 Flash.",
      },
      {
        title: "Guardrails against prompt injection",
        detail:
          "Scraped web text is untrusted input that flows straight into an LLM prompt. Radarr constrains Analyst output with a closed Pydantic schema (rejecting malformed output before it reaches storage) and wraps all untrusted text in explicit data/instruction boundary tags, verified against adversarial test cases in its own eval harness.",
      },
      {
        title: "Evaluation, not vibes",
        detail:
          "A 12-case hand-labeled eval suite scores extraction accuracy and injection resistance; a separate RAGAS-based suite scores RAG faithfulness, answer relevancy, and context precision against a 5-question golden set.",
      },
    ],
    stack: [
      "Python",
      "LangGraph",
      "Gemini API",
      "Ollama / Llama 3.1:8b",
      "PostgreSQL",
      "Qdrant",
      "Redis",
      "Celery",
      "Docker",
      "Docker Compose",
      "Pydantic Logfire",
      "GitHub Actions",
      "Streamlit",
    ],
    outcome: [
      "One-command deployment of a 7-service stack via Docker Compose",
      "70–80% reduction in Gemini API cost via diff-based change detection",
      "Full observability — every agent call and pipeline node instrumented with Pydantic Logfire tracing",
      "Deployment guide covering Railway/Fly.io for infra and Streamlit Community Cloud for the dashboard",
    ],
    links: [{ label: "GitHub", url: "https://github.com/govindaa-sharma/Radarr" }],
  },
  {
    slug: "sentinel-rowan",
    name: "Rowan (Sentinel)",
    tagline: "Self-correcting, human-gated natural-language-to-SQL agent",
    timeframe: "Independent project",
    status: "featured",
    problem:
      "Most \"AI agent\" portfolio projects stop at \"it calls an LLM and does a thing.\" The harder and more relevant problem for production use is what happens around that call: what happens when the model is wrong, what happens when a request is risky, and what happens when someone tries to trick it.",
    approach:
      "A LangGraph Reflexion-style self-correction loop (Planner → Codegen → Risk Classifier → Verifier → Critic) plans, writes, and self-corrects SQL against a real database. Anything classified as risky (writes, deletes) is stopped by a structural, human-in-the-loop approval gate — not by trusting the model's judgment.",
    architecture: [
      "Planner → Codegen → Risk Classifier, evaluated on the real generated SQL text, never on the model's self-reported labels",
      "Low-risk paths go to a Sandbox Executor → Verifier, with a Critic retry loop capped at 3 attempts",
      "High-risk paths hit an Approval Gate: an audit record is written and execution stops until a separate, authorized human approves",
      "Two isolated PostgreSQL roles (sentinel_reader / sentinel_writer) enforce the read/write boundary at the database level, not in application code",
      "The write credential is reachable from exactly one code path in the whole system: a role-gated, separation-of-duties-checked approval endpoint",
    ],
    decisions: [
      {
        title: "Found and fixed a real prompt-injection vulnerability",
        detail:
          "An earlier version trusted Codegen's self-labeled \"operation\" field. The project's own adversarial benchmark found this could be fooled — a write smuggled inside SQL self-labeled \"SELECT.\" Fixed by classifying risk from the real SQL text directly and rejecting multi-statement queries outright; verified fixed by re-running the adversarial suite.",
      },
      {
        title: "Separation of duties enforced server-side",
        detail:
          "An approver can never approve their own request — enforced in the backend, not assumed from UI behavior.",
      },
      {
        title: "Every stop-rule documented explicitly",
        detail:
          "Retry caps, dual timeouts, behavior on model refusal, and why the approval gate is a true stop rather than a delay are all written down in the repo's LOOP.md, not left implicit.",
      },
      {
        title: "Known limitations stated honestly",
        detail:
          "The Docker sandbox provides process isolation, not full network isolation (it must reach the database) — the real safety boundary is the database role separation, proven independently. The deployed version runs without Docker-in-Docker; the security boundary is identical, only the container isolation layer differs. If the Planner refuses in plain language, that refusal can currently be misread by Codegen as an instruction — a known, documented correctness gap, not yet fixed.",
      },
    ],
    stack: [
      "Python",
      "LangGraph",
      "FastAPI",
      "PostgreSQL (Neon)",
      "Docker",
      "Gemini API",
      "Ollama",
      "Pydantic",
      "JWT",
      "Streamlit",
    ],
    outcome: [
      "40-case benchmark: 90% first-pass read success (95% including retries), 100% of write requests correctly gated, 100% of adversarial cases held after the fix, 93% judge-vs-human agreement",
      "One real, documented prompt-injection vulnerability found and fixed via the project's own adversarial benchmark",
      "Deployed full-stack (FastAPI + LangGraph backend, Streamlit approval dashboard)",
    ],
    links: [{ label: "GitHub", url: "https://github.com/govindaa-sharma/Sentinel-" }],
  },
  {
    slug: "smart-meeting-agent",
    name: "Smart Meeting Agent",
    tagline: "AI-powered meeting intelligence system",
    timeframe: "Independent project",
    status: "featured",
    problem:
      "Meeting transcripts contain decisions and action items that get lost the moment the call ends, with no persistent, searchable memory across sessions.",
    approach:
      "A LangGraph multi-agent pipeline transforms raw meeting transcripts into structured summaries and action items with owners and deadlines, backed by a FAISS RAG index for cross-session semantic search with source-grounded retrieval.",
    architecture: [
      "LangGraph multi-agent pipeline for transcript → structured summary + action items",
      "FAISS-backed RAG for cross-session semantic search with context-aware retrieval",
      "FastAPI backend exposing REST APIs for transcript ingestion, analysis, and conversational querying",
      "React + Vite frontend consuming the API via Axios",
    ],
    decisions: [
      {
        title: "Persistent, cross-session memory",
        detail:
          "Rather than treating each meeting as an isolated transcript, the RAG layer is built for context-aware retrieval across sessions, so past decisions stay queryable.",
      },
      {
        title: "Source grounding on retrieval",
        detail:
          "Answers to conversational queries are grounded in retrieved transcript source, not generated from the model's general knowledge.",
      },
    ],
    stack: [
      "Python",
      "LangGraph",
      "LangChain",
      "Gemini API",
      "FAISS",
      "FastAPI",
      "React",
      "Vite",
      "Axios",
    ],
    outcome: [
      "Delivered as a production-ready full-stack application, not a notebook demo",
      "Structured action items carry owners and deadlines, not just free-text summaries",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/govindaa-sharma/Smart-Meeting-Agent" },
    ],
  },
  {
    slug: "epoche",
    name: "Epoché",
    tagline: "ML experiment tracking platform with a LangGraph ReAct copilot",
    timeframe: "Currently building",
    status: "additional",
    problem:
      "ML experiment tracking tools log metrics but don't help an engineer reason about *why* one run beat another.",
    approach:
      "An experiment tracking platform paired with a LangGraph ReAct copilot agent that can reason over logged runs conversationally, listed by Govinda as one of two projects he is actively building.",
    architecture: [
      "Currently in active development — full architecture not yet published",
    ],
    decisions: [],
    stack: ["Python", "LangGraph"],
    outcome: ["In progress — see GitHub for current state"],
    links: [{ label: "GitHub", url: "https://github.com/govindaa-sharma" }],
  },
];

export const openSource = {
  program: "Social Winter of Code (SWOC)",
  timeframe: "Dec 2024 – Feb 2025",
  result: "Ranked top 50 of 5,000+ contributors",
  detail:
    "Resolved 30+ bugs across 10+ repositories spanning React frontends and FastAPI/backend logic, ranked by contribution quality and volume scoring.",
};

// ---------------------------------------------------------------------------
// Chatbot grounding chunks
//
// Each chunk is a self-contained, retrievable unit of *verified* fact.
// The retrieval step (lib/retrieval.ts) scores these against a recruiter's
// question and only the top matches are ever sent to the model as context —
// so the model physically cannot answer from anything outside this file.
// ---------------------------------------------------------------------------

export type KnowledgeChunk = {
  id: string;
  title: string;
  text: string;
  tags: string[];
};

function projectToChunks(p: Project): KnowledgeChunk[] {
  return [
    {
      id: `${p.slug}-overview`,
      title: `${p.name} — overview`,
      text: `${p.name} (${p.tagline}). Problem: ${p.problem} Approach: ${p.approach} Tech stack: ${p.stack.join(", ")}. Links: ${p.links.map((l) => `${l.label}: ${l.url}`).join(", ")}.`,
      tags: ["project", p.slug, p.name.toLowerCase()],
    },
    {
      id: `${p.slug}-architecture`,
      title: `${p.name} — architecture`,
      text: `${p.name} architecture: ${p.architecture.join(" | ")}.`,
      tags: ["project", p.slug, "architecture"],
    },
    {
      id: `${p.slug}-decisions`,
      title: `${p.name} — engineering decisions`,
      text: p.decisions
        .map((d) => `${d.title}: ${d.detail}`)
        .join(" | ") || "No documented engineering decisions beyond the architecture.",
      tags: ["project", p.slug, "engineering-decisions"],
    },
    {
      id: `${p.slug}-outcome`,
      title: `${p.name} — outcome`,
      text: `${p.name} outcome/results: ${p.outcome.join(" | ")}.`,
      tags: ["project", p.slug, "outcome", "metrics", "results"],
    },
  ];
}

export function buildKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  chunks.push({
    id: "profile-summary",
    title: "Profile summary",
    text: `${profile.name} is an ${profile.title} based in ${profile.location}. Focus: ${profile.focus} ${profile.summary} Currently building: ${profile.currentlyBuilding.join(", ")}.`,
    tags: ["profile", "summary", "about", "who is govinda"],
  });

  chunks.push({
    id: "contact",
    title: "Contact and links",
    text: `Email: ${profile.email}. GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}.`,
    tags: ["contact", "email", "github", "linkedin"],
  });

  chunks.push({
    id: "skills",
    title: "Technical skills",
    text: Object.entries(skills)
      .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
      .join(" | "),
    tags: ["skills", "technologies", "tech stack"],
  });

  for (const e of experience) {
    chunks.push({
      id: `exp-${e.org.toLowerCase().replace(/\s+/g, "-")}`,
      title: `Experience — ${e.role}, ${e.org}`,
      text: `${e.role} at ${e.org} (${e.location}), ${e.timeframe}. ${e.bullets.join(" ")}`,
      tags: ["experience", "internship", "work history", e.org.toLowerCase()],
    });
  }

  for (const ed of education) {
    chunks.push({
      id: `edu-${ed.institution.toLowerCase().replace(/\s+/g, "-")}`,
      title: `Education — ${ed.institution}`,
      text: `${ed.credential} at ${ed.institution}, ${ed.timeframe}. ${ed.detail}.`,
      tags: ["education", "degree", "school"],
    });
  }

  chunks.push({
    id: "open-source",
    title: "Open source contributions",
    text: `${openSource.program} (${openSource.timeframe}): ${openSource.result}. ${openSource.detail}`,
    tags: ["open source", "swoc", "hackathon", "contributions"],
  });

  for (const p of projects) {
    chunks.push(...projectToChunks(p));
  }

  chunks.push({
    id: "projects-list",
    title: "All projects, quick list",
    text: `Govinda's projects: ${projects.map((p) => `${p.name} (${p.tagline})`).join("; ")}.`,
    tags: ["projects", "list", "overview", "what has he built"],
  });

  return chunks;
}

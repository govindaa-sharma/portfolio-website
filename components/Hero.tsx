"use client";

import { profile } from "@/data/knowledge";

/**
 * The one deliberate motion moment on the page: an animated pipeline
 * diagram — Crawl -> Analyze -> Summarize -> Deliver — modeled directly
 * on Radarr's actual architecture, not a generic particle field. It plays
 * once on load and then settles into a quiet, looping "signal" pulse.
 */
export default function Hero() {
  const stages = [
    { id: "crawl", label: "crawl" },
    { id: "analyze", label: "analyze" },
    { id: "summarize", label: "summarize" },
    { id: "deliver", label: "deliver" },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-line signal-grid"
    >
      <div className="max-w-col mx-auto px-6 md:px-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <p className="font-mono text-sm text-trace mb-6 mono-tick">
          {"//"} status: open to AI/ML internships
        </p>

        <h1 className="text-4xl md:text-6xl leading-[1.08] font-semibold tracking-tight text-ink max-w-[16ch]">
          {profile.name} builds systems that hold up under real conditions.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted max-w-prose leading-relaxed">
          {profile.title} focused on {profile.focus.toLowerCase()} Not demos —
          pipelines that survive adversarial input, cost limits, and the
          question "what happens when it's wrong."
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="focus-ring inline-flex items-center gap-2 bg-signal text-base font-medium px-5 py-3 hover:bg-[#ffb54a] transition-colors"
          >
            See the projects
          </a>
          <a
            href="#chat"
            className="focus-ring inline-flex items-center gap-2 border border-line text-ink font-medium px-5 py-3 hover:border-trace hover:text-trace transition-colors"
          >
            Ask the AI about Govinda
          </a>
        </div>

        {/* Pipeline diagram */}
        <div
          className="mt-20 md:mt-24 hero-pipeline"
          role="img"
          aria-label="Diagram of Govinda's Radarr pipeline: crawl, analyze, summarize, deliver"
        >
          <div className="flex items-center justify-between gap-2 md:gap-6">
            {stages.map((stage, i) => (
              <div key={stage.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div
                    className="pipeline-node w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-trace"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  />
                  <span className="font-mono text-xs md:text-sm text-faint">
                    {stage.label}
                  </span>
                </div>
                {i < stages.length - 1 && (
                  <div className="pipeline-line flex-1 h-px bg-line relative mx-2 md:mx-4 overflow-hidden">
                    <div
                      className="pipeline-pulse absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-trace to-transparent"
                      style={{ animationDelay: `${i * 0.35 + 0.15}s` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-faint">
            {"//"} Radarr's actual pipeline — see it in Featured Projects below
          </p>
        </div>
      </div>

      <style>{`
        .pipeline-node {
          opacity: 0;
          animation: node-in 0.5s ease-out forwards, node-pulse 2.4s ease-in-out infinite 2.5s;
        }
        @keyframes node-in {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes node-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,209,197,0.35); }
          50% { box-shadow: 0 0 0 6px rgba(79,209,197,0); }
        }
        .pipeline-pulse {
          transform: translateX(-100%);
          animation: pulse-travel 1.1s ease-in-out forwards;
        }
        @keyframes pulse-travel {
          to { transform: translateX(220%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pipeline-node, .pipeline-pulse { animation: none !important; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { profile, projects } from "@/data/knowledge";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  fork: boolean;
};

type FetchState = "loading" | "success" | "error" | "empty";

const CURATED_NAMES = new Set(projects.map((p) => p.name.toLowerCase()));

export default function GithubShowcase() {
  const additional = projects.filter((p) => p.status === "additional");
  const [state, setState] = useState<FetchState>("loading");
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    let cancelled = false;
    const username = profile.github.split("/").pop();

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data: Repo[]) => {
        if (cancelled) return;
        const filtered = data
          .filter((r) => !r.fork)
          .filter((r) => !CURATED_NAMES.has(r.name.toLowerCase()))
          .slice(0, 5);
        if (filtered.length === 0) {
          setState("empty");
        } else {
          setRepos(filtered);
          setState("success");
        }
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="border-b border-line">
      <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <h2 className="text-sm font-mono text-faint pt-1">05 — More on GitHub</h2>

          <div>
            {additional.length > 0 && (
              <div className="space-y-8 mb-14">
                {additional.map((p) => (
                  <div key={p.slug} className="border border-line p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg text-ink font-medium">{p.name}</h3>
                      <span className="font-mono text-xs text-faint">{p.timeframe}</span>
                    </div>
                    <p className="text-trace font-mono text-sm mt-1 mb-3">{p.tagline}</p>
                    <p className="text-muted text-sm leading-relaxed">{p.approach}</p>
                    <a
                      href={p.links[0]?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-block mt-4 text-sm text-ink border-b border-trace hover:text-trace transition-colors"
                    >
                      {p.links[0]?.label}
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div>
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-sm text-ink font-medium">Recent repository activity</p>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring font-mono text-xs text-faint hover:text-trace transition-colors"
                >
                  full profile ↗
                </a>
              </div>

              {state === "loading" && (
                <ul className="space-y-3" aria-live="polite" aria-busy="true">
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="h-11 bg-surface animate-pulse" />
                  ))}
                </ul>
              )}

              {state === "error" && (
                <p className="text-sm text-muted border border-line p-4">
                  Couldn&apos;t load live GitHub activity right now — the rest
                  of this portfolio doesn&apos;t depend on it. Browse the{" "}
                  <a href={profile.github} target="_blank" rel="noreferrer" className="text-trace">
                    full profile directly
                  </a>
                  .
                </p>
              )}

              {state === "empty" && (
                <p className="text-sm text-muted border border-line p-4">
                  No additional public repositories to show beyond the
                  projects above.
                </p>
              )}

              {state === "success" && (
                <ul className="divide-y divide-line border-t border-b border-line">
                  {repos.map((r) => (
                    <li key={r.name}>
                      <a
                        href={r.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring group flex items-center justify-between gap-4 py-3.5 hover:bg-surface transition-colors px-2 -mx-2"
                      >
                        <span className="min-w-0">
                          <span className="text-ink text-sm font-mono group-hover:text-trace transition-colors">
                            {r.name}
                          </span>
                          {r.description && (
                            <span className="block text-muted text-sm mt-0.5 truncate">
                              {r.description}
                            </span>
                          )}
                        </span>
                        {r.language && (
                          <span className="font-mono text-xs text-faint shrink-0">
                            {r.language}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

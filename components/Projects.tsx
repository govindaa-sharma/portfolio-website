import { projects } from "@/data/knowledge";

export default function Projects() {
  const featured = projects.filter((p) => p.status === "featured");

  return (
    <section id="projects" className="border-b border-line">
      <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <h2 className="text-sm font-mono text-faint pt-1">04 — Featured projects</h2>
          <div className="space-y-24">
            {featured.map((p) => (
              <article key={p.slug} id={p.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 className="text-2xl text-ink font-semibold">{p.name}</h3>
                  <span className="font-mono text-xs text-faint">{p.timeframe}</span>
                </div>
                <p className="text-trace font-mono text-sm mb-6">{p.tagline}</p>

                <div className="space-y-5 max-w-prose">
                  <div>
                    <p className="text-xs font-mono text-faint mb-1.5">problem</p>
                    <p className="text-muted leading-relaxed">{p.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-faint mb-1.5">approach</p>
                    <p className="text-muted leading-relaxed">{p.approach}</p>
                  </div>
                </div>

                <details className="group mt-8 border-t border-line pt-6">
                  <summary className="focus-ring cursor-pointer list-none flex items-center justify-between text-sm text-ink font-medium">
                    Architecture &amp; engineering decisions
                    <span className="font-mono text-faint group-open:hidden">show</span>
                    <span className="font-mono text-faint hidden group-open:inline">hide</span>
                  </summary>
                  <div className="mt-6 space-y-8">
                    <div>
                      <p className="text-xs font-mono text-faint mb-3">architecture</p>
                      <ul className="space-y-2">
                        {p.architecture.map((a, i) => (
                          <li key={i} className="font-mono text-sm text-muted leading-relaxed flex gap-3">
                            <span className="text-trace shrink-0">{`0${i + 1}`}</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {p.decisions.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-faint mb-3">key decisions</p>
                        <div className="space-y-4">
                          {p.decisions.map((d) => (
                            <div key={d.title}>
                              <p className="text-ink text-sm font-medium">{d.title}</p>
                              <p className="text-muted text-sm leading-relaxed mt-1">{d.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-mono text-faint mb-3">outcome</p>
                      <ul className="space-y-2">
                        {p.outcome.map((o, i) => (
                          <li key={i} className="text-muted text-sm leading-relaxed flex gap-3">
                            <span className="text-signal mt-1.5 shrink-0">·</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <p className="font-mono text-xs text-faint w-full sm:w-auto">
                    {p.stack.join(" · ")}
                  </p>
                </div>
                <div className="mt-4 flex gap-4">
                  {p.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring text-sm text-ink border-b border-trace hover:text-trace transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

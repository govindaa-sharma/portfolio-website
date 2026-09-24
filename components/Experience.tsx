import { experience } from "@/data/knowledge";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-line">
      <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <h2 className="text-sm font-mono text-faint pt-1">03 — Experience</h2>
          <div className="space-y-12">
            {experience.map((e) => (
              <div key={`${e.org}-${e.role}`} className="border-l-2 border-line pl-6 relative">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-signal" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg text-ink font-medium">{e.role}</h3>
                  <span className="font-mono text-xs text-faint">{e.timeframe}</span>
                </div>
                <p className="text-sm text-muted mt-0.5">
                  {e.org} · {e.location}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="text-muted leading-relaxed flex gap-3">
                      <span className="text-trace mt-1.5 shrink-0">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

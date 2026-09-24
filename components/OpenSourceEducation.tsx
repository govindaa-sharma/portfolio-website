import { openSource, education } from "@/data/knowledge";

export default function OpenSourceEducation() {
  return (
    <section id="background" className="border-b border-line">
      <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <h2 className="text-sm font-mono text-faint pt-1">06 — Background</h2>
          <div className="space-y-16">
            <div>
              <p className="text-sm font-mono text-faint mb-3">Open source</p>
              <p className="text-ink font-medium">
                {openSource.program} — {openSource.result}
              </p>
              <p className="text-muted text-sm mt-2 leading-relaxed max-w-prose">
                {openSource.detail}
              </p>
            </div>
            <div>
              <p className="text-sm font-mono text-faint mb-4">Education</p>
              <div className="space-y-5">
                {education.map((ed) => (
                  <div key={ed.institution} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div>
                      <p className="text-ink font-medium">{ed.institution}</p>
                      <p className="text-muted text-sm">
                        {ed.credential} · {ed.detail}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-faint">{ed.timeframe}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

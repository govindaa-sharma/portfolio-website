import { profile } from "@/data/knowledge";

export default function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <h2 className="text-sm font-mono text-faint pt-1">01 — About</h2>
          <div className="max-w-prose">
            <p className="text-xl md:text-2xl leading-relaxed text-ink">
              {profile.summary}
            </p>
            <div className="mt-10">
              <p className="text-sm font-mono text-faint mb-3">Currently building</p>
              <ul className="space-y-2">
                {profile.currentlyBuilding.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span className="text-trace mt-1.5 shrink-0">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

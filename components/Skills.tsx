import { skills } from "@/data/knowledge";

export default function Skills() {
  const entries = Object.entries(skills);
  return (
    <section id="skills" className="border-b border-line">
      <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <h2 className="text-sm font-mono text-faint pt-1">02 — Skills</h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {entries.map(([category, items]) => (
              <div key={category}>
                <p className="text-sm text-ink font-medium mb-2.5">{category}</p>
                <p className="font-mono text-sm text-muted leading-relaxed">
                  {items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

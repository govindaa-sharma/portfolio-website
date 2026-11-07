import { hobbies } from "@/data/knowledge";
import PhotoFrame from "@/components/PhotoFrame";

export default function Hobbies() {
  return <section id="outside" className="border-b border-line bg-[#10151b]">
    <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
      <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-20">
        <div><p className="text-sm font-mono text-trace mb-4">06 / THE OTHER TAB</p><h2 className="text-4xl md:text-5xl tracking-tight text-ink">Outside the terminal.</h2><p className="mt-5 text-muted leading-relaxed max-w-sm">A portfolio should probably admit there’s a person behind the pull requests. Football is one of my answers.</p>
          <div className="pitch-doodle mt-10 max-w-xs aspect-[1.3] relative border border-line rounded-[50%] flex items-center justify-center"><div className="absolute h-full border-l border-line"/><div className="absolute w-1/2 h-1/2 rounded-full border border-line"/><div className="ball" aria-hidden="true">⚽</div><span className="absolute bottom-3 left-4 font-mono text-[10px] text-faint">A VERY SMALL PITCH</span></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 items-start">{hobbies.map((hobby, i) => <article key={hobby.title} className={`hobby-card group ${i === 1 ? "sm:mt-16" : ""}`}>
          <div className="relative"><PhotoFrame src={hobby.image} label={hobby.label} className="hobby-photo aspect-[4/3]"/><span className="hobby-scribble" aria-hidden="true">{i === 0 ? "match day?" : "+"}</span></div>
          <p className="font-mono text-[10px] text-trace mt-4">0{i + 1} / OFF SCRIPT</p><h3 className="text-xl text-ink mt-2">{hobby.title}</h3><p className="text-sm text-muted leading-relaxed mt-2">{hobby.note}</p>
        </article>)}</div>
      </div>
    </div>
  </section>;
}

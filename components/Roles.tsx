import { targetRoles } from "@/data/knowledge";

export default function Roles() {
  return <section id="roles" className="border-b border-line">
    <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div><p className="text-sm font-mono text-faint mb-4">05 / NEXT CHAPTER</p><h2 className="text-4xl md:text-5xl tracking-tight text-ink">Where I’d like to be useful.</h2></div>
        <p className="text-muted max-w-sm leading-relaxed">Roles I’m exploring. Each one puts a different part of the work in focus.</p>
      </div>
      <div className="border-t border-line">{targetRoles.map((role) => <article key={role.title} className="role-row grid md:grid-cols-[70px_1fr_1.2fr] gap-4 md:gap-10 py-7 border-b border-line items-start">
        <span className="font-mono text-xs text-trace pt-1">{role.mark} —</span>
        <h3 className="text-xl md:text-2xl text-ink">{role.title}<span className="role-arrow inline-block ml-2 text-trace">↗</span></h3>
        <div><p className="text-muted leading-relaxed max-w-prose">{role.why}</p><div className="flex flex-wrap gap-2 mt-4">{role.evidence.map((item) => <span key={item} className="font-mono text-[10px] text-faint border border-line px-2 py-1">{item}</span>)}</div></div>
      </article>)}</div>
    </div>
  </section>;
}

import { profile } from "@/data/knowledge";
import PhotoFrame from "@/components/PhotoFrame";

export default function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-[.8fr_1.2fr] gap-12 md:gap-20 items-center">
        <div className="relative md:max-w-sm">
          <PhotoFrame src={profile.images.about} label="CASUAL PHOTO" className="about-photo aspect-[4/5]" />
          <div className="about-stamp absolute -right-5 bottom-7 bg-signal text-base font-mono text-xs px-4 py-3 rotate-3">currently learning<br /><strong>by building</strong></div>
          <p className="font-mono text-[10px] text-faint mt-4">A LITTLE LESS SCREEN, A LITTLE MORE PERSON</p>
        </div>
        <div>
          <p className="text-sm font-mono text-faint mb-6">01 / A QUICK INTRO</p>
          <h2 className="text-3xl md:text-4xl leading-tight tracking-tight text-ink max-w-[19ch]">Computer science student. AI engineer by way of “let me see if this works.”</h2>
          <p className="mt-6 text-muted text-lg leading-relaxed max-w-prose">I’m in my final year of Computer Science (Data Science) at Heritage Institute of Technology. Most of my time goes into building AI systems that connect models to real workflows: agents that use tools, retrieval that can show its sources, and guardrails that do more than politely ask a model to behave.</p>
          <p className="mt-4 text-muted leading-relaxed max-w-prose">I care about the unglamorous parts too: what gets logged, what happens on a bad answer, and whether the next person can understand the code.</p>
          <div className="mt-9 pt-6 border-t border-line">
            <p className="text-sm font-mono text-trace mb-4">ON THE WORKBENCH</p>
            <ul className="grid sm:grid-cols-2 gap-3">{profile.currentlyBuilding.map((item) => <li key={item} className="text-sm text-ink border-l border-trace pl-3 py-1">{item}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

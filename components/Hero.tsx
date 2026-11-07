"use client";

import { profile } from "@/data/knowledge";
import PhotoFrame from "@/components/PhotoFrame";

const stages = ["notice", "reason", "build", "check"];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-line">
      <div className="max-w-col mx-auto px-6 md:px-10 pt-20 pb-20 md:pt-28 md:pb-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-8 items-center">
        <div className="relative z-10">
          <p className="font-mono text-xs md:text-sm text-trace mb-7">AI ENGINEER <span className="text-faint">/ KOLKATA, INDIA / OPEN TO OPPORTUNITIES</span></p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[.98] font-semibold tracking-[-.055em] text-ink max-w-[11ch]">I build AI that has to <span className="text-trace">do something.</span></h1>
          <p className="mt-7 text-lg md:text-xl text-muted max-w-[48ch] leading-relaxed">I’m Govinda Sharma. I like giving language models tools, useful context, and a job to finish—then figuring out what happens when they get it wrong.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="focus-ring inline-flex items-center gap-3 bg-signal text-base font-medium px-5 py-3 hover:bg-[#ffb54a] transition-colors">Explore the work <span aria-hidden="true">↘</span></a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="focus-ring px-2 py-3 text-ink hover:text-trace transition-colors">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="focus-ring px-2 py-3 text-ink hover:text-trace transition-colors">LinkedIn ↗</a>
            <a href="/resume.pdf" download className="focus-ring px-2 py-3 text-ink hover:text-trace transition-colors">Resume ↓</a>
          </div>
          <p className="mt-12 font-mono text-xs text-faint">CURRENTLY THINKING ABOUT <span className="text-ink">agents with good boundaries</span></p>
        </div>

        <div className="hero-collage relative min-h-[430px] sm:min-h-[500px]" aria-label="Portrait placeholder and an animated sketch of an AI workflow">
          <div className="portrait-frame absolute left-[5%] top-[4%] w-[65%] h-[82%] rotate-[-3deg]">
            <PhotoFrame src={profile.images.hero} label="YOUR PHOTO GOES HERE" className="h-full" />
            <span className="absolute -bottom-5 left-4 font-mono text-[10px] text-faint bg-base px-2 py-1">GOVINDA, IN THE WILD (SOON)</span>
          </div>
          <div className="workflow-note absolute right-0 bottom-[2%] w-[53%] bg-surface border border-line p-4 sm:p-5 rotate-[2deg]">
            <div className="flex justify-between items-center mb-5"><span className="font-mono text-[10px] text-faint">A REASONABLE LOOP</span><span className="w-2 h-2 rounded-full bg-signal animate-pulse" /></div>
            <div className="space-y-3">
              {stages.map((stage, i) => <div key={stage} className="flow-step flex items-center gap-3" style={{ animationDelay: `${i * 450}ms` }}><span className="font-mono text-[10px] text-trace">0{i + 1}</span><span className="flex-1 border border-line px-3 py-2 text-sm text-ink">{stage}</span><span className="font-mono text-[10px] text-faint">{i === 3 ? "human?" : "agent"}</span></div>)}
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-muted">Useful autonomy includes knowing when to stop and ask.</p>
          </div>
          <span className="absolute top-[1%] right-[4%] font-mono text-xs text-signal -rotate-6">curiosity → shipped code</span>
        </div>
      </div>
    </section>
  );
}

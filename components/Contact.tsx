import { profile } from "@/data/knowledge";

export default function Contact() {
  return (
    <footer id="contact">
      <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <h2 className="text-sm font-mono text-faint pt-1">08 — Contact</h2>
          <div>
            <p className="text-2xl md:text-3xl text-ink font-medium leading-snug max-w-[20ch]">
              Open to AI/ML internships and applied AI engineering roles.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="focus-ring text-ink hover:text-trace transition-colors w-fit"
              >
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="focus-ring text-muted hover:text-trace transition-colors w-fit"
              >
                GitHub ↗
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="focus-ring text-muted hover:text-trace transition-colors w-fit"
              >
                LinkedIn ↗
              </a>
              <a
                href="/resume.pdf"
                download
                className="focus-ring text-muted hover:text-trace transition-colors w-fit"
              >
                Download resume (PDF) ↓
              </a>
            </div>
          </div>
        </div>
        <p className="font-mono text-xs text-faint mt-24 pt-8 border-t border-line">
          {profile.name} · built with Next.js, deployed on Vercel
        </p>
      </div>
    </footer>
  );
}

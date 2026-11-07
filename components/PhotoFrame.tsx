"use client";

import { useState } from "react";

export default function PhotoFrame({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const [missing, setMissing] = useState(false);
  return <div className={`image-placeholder ${className} ${missing ? "is-missing" : "has-photo"}`}>
    <img src={src} alt={missing ? "" : label} onError={() => setMissing(true)} className={missing ? "hidden" : "photo-image"} loading="lazy" />
    {missing && <span>{label}<small>{src}</small></span>}
  </div>;
}

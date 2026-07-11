"use client";

import Image from "next/image";
import { useState } from "react";

type CountryImageProps = {
  src?: string;
  alt: string;
  country: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  aspectClassName?: string;
};

export default function CountryImage({
  src,
  alt,
  country,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  aspectClassName = "aspect-[4/3]",
}: CountryImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${country} culinary image placeholder`}
        className={`relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.35),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.22),transparent_28%),linear-gradient(135deg,#fff7ed,#fef3c7_55%,#ecfeff)] ${aspectClassName} ${className}`}
      >
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">Culinary Atlas</p>
          <p className="mt-1 text-xl font-black text-slate-950">{country}</p>
          <p className="mt-1 text-sm text-slate-600">Photography is being prepared for this guide.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectClassName} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

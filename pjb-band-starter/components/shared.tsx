import type { ReactNode } from "react";

export const photos = {
  about: "/images/1784175169661.jpg",
  eventOne: "/images/tribes_260.jpg",
  eventTwo: "/images/tribes_261.jpg",
  eventThree: "/images/1784175169661.jpg",
  galleryOne: "/images/1784175169661.jpg",
  galleryTwo: "/images/tribes_260.jpg",
  galleryThree: "/images/tribes_261.jpg",
  galleryFour: "/images/1784175169661.jpg",
  library: "/images/tribes_261.jpg",
};

export function Photo({ src, className = "", label }: { src: string; className?: string; label?: string }) {
  return (
    <div
      className={`photo ${className}`}
      role="img"
      aria-label={label ?? "Prophet Jeremiah Band photo placeholder"}
      style={{ backgroundImage: `url("${src}")` }}
    />
  );
}

export function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`section-label ${light ? "section-label-light" : ""}`}><span />{children}</p>;
}

export function SectionTitle({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className={`section-title ${light ? "section-title-light" : ""}`}>
      <SectionLabel light={light}>{eyebrow}</SectionLabel>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

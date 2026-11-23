import type { ReactNode } from "react";

export const photos = {
  about: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1100&q=85",
  eventOne: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=85",
  eventTwo: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
  eventThree: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85",
  galleryOne: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85",
  galleryTwo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85",
  galleryThree: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=85",
  galleryFour: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
  library: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1100&q=85",
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

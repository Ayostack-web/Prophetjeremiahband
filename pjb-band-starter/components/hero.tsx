"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Play } from "lucide-react";

const heroSlides = [
  { src: "/images/1784175169661.jpg", alt: "Prophet Jeremiah Band anniversary banner held during a celebration" },
  { src: "/images/tribes_260.jpg", alt: "Prophet Jeremiah Band members gathered during the anniversary celebration" },
  { src: "/images/tribes_261.jpg", alt: "Prophet Jeremiah Band anniversary celebration" },
];

export function Hero() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    if (heroPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [heroPaused]);

  return (
    <section
      className="hero"
      id="top"
      onMouseEnter={() => setHeroPaused(true)}
      onMouseLeave={() => setHeroPaused(false)}
    >
      <div className="hero-slides" aria-live="polite">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={index === heroSlide ? slide.alt : ""}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`hero-slide ${index === heroSlide ? "hero-slide-active" : ""}`}
          />
        ))}
      </div>
      <div className="hero-wash" />
      <div className="hero-content page-container">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-line" /> FAITH · MUSIC · PURPOSE</div>
          <h1>A legacy of praise.<br /><em>A calling that speaks.</em></h1>
          <p className="hero-description">Welcome to the digital home of Prophet Jeremiah Band — Oracle of God. Discover our story, celebrate our journey and stay connected to what is ahead.</p>
          <div className="hero-actions">
            <a className="button button-cyan" href="#about">Discover our story <ArrowUpRight size={17} /></a>
            <a className="button button-ghost" href="#gallery"><span className="play-icon"><Play size={12} fill="currentColor" /></span> Explore our moments</a>
          </div>
        </div>
        <div className="hero-side-note"><span className="side-note-rule" /><span>ORACLE OF GOD</span><span className="side-note-year">A BAND. A HERITAGE. A PURPOSE.</span></div>
      </div>
      <a className="hero-scroll" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16} /></a>
      <div className="hero-index" aria-label="Choose hero photograph">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={index === heroSlide ? "hero-index-active" : ""}
            aria-label={`Show hero photograph ${index + 1}`}
            aria-current={index === heroSlide ? "true" : undefined}
            onClick={() => setHeroSlide(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

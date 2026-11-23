"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const heroSlides = [
  { src: "/images/1784175169661.jpg", alt: "Prophet Jeremiah Band anniversary banner held during a celebration" },
  { src: "/images/tribes_260.jpg", alt: "Prophet Jeremiah Band members gathered during the anniversary celebration" },
  { src: "/images/tribes_261.jpg", alt: "Prophet Jeremiah Band anniversary celebration" },
];

export function Hero() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const reduceMotion = useReducedMotion();

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
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
          >
          <div className="hero-kicker"><span className="kicker-line" /> FAITH · MUSIC · PURPOSE</div>
          </motion.div>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
            }}
          >
            A legacy of praise.<br /><em>A calling that speaks.</em>
          </motion.h1>
          <motion.p
            className="hero-description"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
            }}
          >
            Prophet Jeremiah Band is a ministry united by purpose, heritage and the enduring sound of praise. Discover the people and moments behind our journey.
          </motion.p>
          <motion.div
            className="hero-actions"
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
          >
            <a className="button button-cyan" href="#about">Discover our story <ArrowUpRight size={17} /></a>
            <a className="button button-ghost" href="#gallery"><span className="play-icon"><Play size={12} fill="currentColor" /></span> Explore our moments</a>
          </motion.div>
        </motion.div>
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

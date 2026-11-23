"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  ["About", "#about"],
  ["Leadership", "#leadership"],
  ["Members", "#members"],
  ["Events", "#events"],
  ["Archive", "#archive"],
  ["Gallery", "#gallery"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement-bar">
        <span className="announcement-dot" />
        <span>WELCOME TO THE DIGITAL HOME OF PROPHET JEREMIAH BAND</span>
        <a href="#events">Explore upcoming activities <ArrowUpRight size={13} /></a>
      </div>
      <header className="site-header">
        <a href="#top" className="brand-lockup" aria-label="Prophet Jeremiah Band home">
          <Image src="/images/pjb-logo.png" alt="Prophet Jeremiah Band — Oracle of God" width={68} height={70} priority className="brand-logo" />
          <span className="brand-text"><strong>PROPHET JEREMIAH BAND</strong><small>ORACLE OF GOD</small></span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a href="#library" onClick={() => setMenuOpen(false)}>E-Library</a>
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Get in touch <ArrowUpRight size={15} /></a>
        </nav>
        <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
    </>
  );
}

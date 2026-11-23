import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-main">
        <a href="#top" className="footer-brand">
          <Image src="/images/pjb-logo.png" alt="Prophet Jeremiah Band logo" width={74} height={74} />
          <span><strong>PROPHET JEREMIAH BAND</strong><small>ORACLE OF GOD</small></span>
        </a>
        <p>Preserving our heritage.<br />Celebrating our journey.</p>
        <div className="footer-nav">
          <a href="#about">About</a>
          <a href="#leadership">Leadership</a>
          <a href="#events">Events</a>
          <a href="#archive">Archive</a>
          <a href="#gallery">Gallery</a>
        </div>
        <a href="/admin" className="admin-link">Administrator preview <ArrowUpRight size={14} /></a>
      </div>
      <div className="page-container footer-bottom">
        <span>© {new Date().getFullYear()} Prophet Jeremiah Band. All rights reserved.</span>
        <span>ORACLE OF GOD <i /> BUILT WITH PURPOSE</span>
      </div>
    </footer>
  );
}

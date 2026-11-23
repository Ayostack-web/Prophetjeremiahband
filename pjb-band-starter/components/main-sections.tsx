"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  ChevronRight,
  Clock3,
  Facebook,
  Instagram,
  Mail,
  Music2,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Youtube,
} from "lucide-react";
import { Photo, SectionLabel, SectionTitle, photos } from "./shared";

const events = [
  { day: "14", month: "DEC", title: "Annual Thanksgiving Service", type: "Worship & Praise", time: "10:00 AM", image: photos.eventOne },
  { day: "21", month: "DEC", title: "End-of-year Celebration", type: "Fellowship", time: "2:00 PM", image: photos.eventTwo },
  { day: "05", month: "JAN", title: "New Year Prayer Gathering", type: "Prayer Meeting", time: "8:00 AM", image: photos.eventThree },
];

const galleryItems = [
  { title: "Moments of praise", category: "Worship", image: photos.galleryOne, size: "gallery-tall" },
  { title: "Together in purpose", category: "Fellowship", image: photos.galleryTwo, size: "" },
  { title: "The sound of celebration", category: "Events", image: photos.galleryThree, size: "" },
  { title: "A shared journey", category: "Fellowship", image: photos.galleryFour, size: "gallery-wide" },
];

function UsersMark() {
  return <span className="users-mark" aria-hidden="true"><i /><i /><i /></span>;
}

export function MainSections() {
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const filteredGallery = useMemo(
    () => galleryFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === galleryFilter),
    [galleryFilter],
  );

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setNewsletterMessage("Thank you. Newsletter sign-up will be connected when email services are configured.");
    setEmail("");
  }

  return (
    <>
      <section className="intro-strip">
        <div className="page-container intro-grid">
          <div><span className="intro-number">01</span><span>Our story</span></div>
          <div><span className="intro-number">02</span><span>Our people</span></div>
          <div><span className="intro-number">03</span><span>Our moments</span></div>
          <div><span className="intro-number">04</span><span>Our future</span></div>
        </div>
      </section>

      <section className="section about-section page-container" id="about">
        <div className="about-visual">
          <Photo src={photos.about} className="about-photo" label="Temporary music performance image; replace with a Prophet Jeremiah Band photograph" />
          <div className="about-photo-caption"><span className="caption-mark">PJB</span><span>ORACLE OF GOD<br /><small>OUR JOURNEY CONTINUES</small></span></div>
          <div className="about-floating-mark"><Music2 size={34} strokeWidth={1.4} /></div>
        </div>
        <div className="about-copy">
          <SectionLabel>WHO WE ARE</SectionLabel>
          <h2>More than music.<br /><em>A shared purpose.</em></h2>
          <p className="lead-copy">Prophet Jeremiah Band is a community with a story worth preserving and a future worth building.</p>
          <p className="body-copy">This space is where our identity, values, people and milestones come together. As we grow, we remain connected to the people and moments that have shaped our journey.</p>
          <a className="text-link" href="#archive">Explore our history <ArrowUpRight size={17} /></a>
          <div className="about-quote"><Quote size={22} /><p>“Oracle of God”</p><span>THE BAND'S IDENTITY</span></div>
        </div>
      </section>

      <section className="updates-section section-soft">
        <div className="page-container">
          <div className="section-heading-row">
            <SectionTitle eyebrow="STAY CONNECTED" title="The latest from us" text="Announcements, updates and moments you should know about." />
            <a className="text-link heading-link" href="#contact">All updates <ArrowUpRight size={16} /></a>
          </div>
          <div className="updates-grid">
            <article className="update-feature">
              <div className="update-feature-image" style={{ backgroundImage: `url("${photos.eventOne}")` }}><span className="image-tag">FEATURED UPDATE</span></div>
              <div className="update-feature-copy"><span className="meta-line">BAND ANNOUNCEMENT <i /> 21 NOVEMBER 2026</span><h3>Stay close to the moments that bring us together.</h3><p>Important announcements and updates from the Band will be shared here. Check back for the latest information.</p><a href="#contact" className="text-link">Stay informed <ArrowUpRight size={16} /></a></div>
            </article>
            <div className="update-list">
              <article className="update-list-item"><span className="update-date"><strong>01</strong><small>NOTE</small></span><div><span className="meta-line">COMMUNITY</span><h3>A home for our shared memories</h3><p>Our digital archive will keep important records and milestones in one place.</p></div><ArrowUpRight size={17} /></article>
              <article className="update-list-item"><span className="update-date"><strong>02</strong><small>NOTE</small></span><div><span className="meta-line">MEDIA</span><h3>Stories told through sound and image</h3><p>Explore recordings, photographs and videos from the Band's journey.</p></div><ArrowUpRight size={17} /></article>
              <article className="update-list-item"><span className="update-date"><strong>03</strong><small>NOTE</small></span><div><span className="meta-line">HERITAGE</span><h3>Honouring those who came before</h3><p>Past leadership and memorable seasons will have a lasting place here.</p></div><ArrowUpRight size={17} /></article>
            </div>
          </div>
        </div>
      </section>

      <section className="section events-section page-container" id="events">
        <div className="section-heading-row">
          <SectionTitle eyebrow="MARK YOUR CALENDAR" title="Gather. Celebrate. Grow." text="Keep up with upcoming programmes and important Band dates." />
          <a className="button button-outline" href="#contact">View event details <ArrowUpRight size={16} /></a>
        </div>
        <div className="events-grid">
          {events.map((event) => (
            <article className="event-card" key={event.title}>
              <div className="event-image-wrap"><Photo src={event.image} className="event-image" label={`Temporary event image for ${event.title}`} /><span className="event-date"><strong>{event.day}</strong><small>{event.month}</small></span></div>
              <div className="event-card-copy"><span className="event-type">{event.type}</span><h3>{event.title}</h3><div className="event-time"><Clock3 size={14} /> {event.time} <span>·</span> Date to be confirmed</div><a href="#contact" aria-label={`Ask about ${event.title}`}><ArrowUpRight size={18} /></a></div>
            </article>
          ))}
        </div>
        <p className="demo-note"><span /> Sample dates and event titles are placeholders for this design preview. Replace them with confirmed Band programmes.</p>
      </section>

      <section className="leadership-section section-dark" id="leadership">
        <div className="page-container">
          <div className="section-heading-row">
            <SectionTitle eyebrow="THE PEOPLE WHO SERVE" title="Leadership & legacy" text="Recognising those entrusted with guiding and serving the Band." light />
            <a className="button button-dark-outline" href="#contact">Meet the leadership <ArrowUpRight size={16} /></a>
          </div>
          <div className="leadership-grid">
            {[["C", "Captain"], ["V", "Vice-Captain"], ["S", "Secretary"], ["P", "Patron"], ["M", "Matron"]].map(([initial, role], index) => (
              <article className="leader-card" key={role}>
                <div className={`leader-avatar leader-avatar-${index + 1}`}><span>{initial}</span><div className="avatar-corner" /></div>
                <div className="leader-info"><span>{role}</span><h3>Profile coming soon</h3><p>Portrait and biography to be added.</p></div>
                <ArrowUpRight className="leader-arrow" size={17} />
              </article>
            ))}
          </div>
          <div className="leadership-bottom"><span>HONOURING THE PAST. SERVING THE PRESENT. PREPARING THE FUTURE.</span><a href="#archive">Explore past leadership <ArrowRight size={15} /></a></div>
        </div>
      </section>

      <section className="members-section section-soft" id="members">
        <div className="page-container members-inner">
          <div className="members-visual">
            <Photo src={photos.galleryTwo} className="members-photo" label="Temporary group photograph; replace with an approved Prophet Jeremiah Band members photograph" />
            <div className="members-count-mark"><UsersMark /><span>OUR PEOPLE</span></div>
          </div>
          <div className="members-copy">
            <SectionLabel>THE PJB COMMUNITY</SectionLabel>
            <h2>One community.<br /><em>Many stories.</em></h2>
            <p>Our members are at the heart of the Band. This section will introduce the community and, where members have given permission, provide a directory of profiles and contributions.</p>
            <div className="member-points"><div><strong>01</strong><span>Member profiles and introductions</span></div><div><strong>02</strong><span>Shared moments and contributions</span></div><div><strong>03</strong><span>Member information and updates</span></div></div>
            <a className="text-link" href="#contact">Connect with the Band <ArrowUpRight size={17} /></a>
            <p className="members-privacy-note">Public member details will only be displayed with appropriate consent.</p>
          </div>
        </div>
      </section>

      <section className="section archive-section page-container" id="archive">
        <div className="archive-copy">
          <SectionLabel>OUR DIGITAL HERITAGE</SectionLabel>
          <h2>Every chapter<br />deserves <em>to be kept.</em></h2>
          <p>From reports and anniversary records to photographs from years gone by, the archive will preserve the stories that make the Band what it is.</p>
          <a className="button button-primary" href="#contact">Explore the archive <ArrowUpRight size={16} /></a>
          <div className="archive-stats"><div><strong>01</strong><span>Reports & records</span></div><div><strong>02</strong><span>Anniversary history</span></div><div><strong>03</strong><span>Past leadership</span></div></div>
        </div>
        <div className="archive-visual">
          <Photo src={photos.galleryFour} className="archive-photo archive-photo-back" label="Temporary archival event photograph" />
          <Photo src={photos.galleryTwo} className="archive-photo archive-photo-front" label="Temporary archival community photograph" />
          <div className="archive-stamp"><span>THE</span><strong>PJB</strong><span>ARCHIVE</span><i>✳</i></div>
        </div>
      </section>

      <section className="library-section" id="library">
        <div className="page-container library-inner">
          <div className="library-visual"><Photo src={photos.library} className="library-photo" label="Temporary audio recording studio image; replace with Band media" /><div className="library-play"><Play size={22} fill="currentColor" /></div><span className="library-photo-label">LISTEN · WATCH · LEARN</span></div>
          <div className="library-copy"><SectionLabel light>THE E-LIBRARY</SectionLabel><h2>Keep the message<br /><em>within reach.</em></h2><p>A growing collection of sermons, audio recordings, service videos and other resources from the Band's programmes.</p><div className="library-resource-list"><div><AudioLines size={20} /><span><strong>Audio messages</strong><small>Listen again, wherever you are</small></span><ChevronRight size={17} /></div><div><Play size={20} /><span><strong>Video recordings</strong><small>Revisit services and programmes</small></span><ChevronRight size={17} /></div><div><Sparkles size={20} /><span><strong>Featured resources</strong><small>Selected content from the Band</small></span><ChevronRight size={17} /></div></div><a className="button button-cyan" href="#contact">Explore the E-Library <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="section gallery-section page-container" id="gallery">
        <div className="section-heading-row">
          <SectionTitle eyebrow="A LIFE IN MOMENTS" title="The gallery" text="A visual collection of the people, places and experiences that shape our story." />
          <a className="text-link heading-link" href="#contact">View all photographs <ArrowUpRight size={16} /></a>
        </div>
        <div className="gallery-filters" role="group" aria-label="Filter gallery images">
          {["All", "Worship", "Fellowship", "Events"].map((filter) => <button key={filter} className={galleryFilter === filter ? "filter-active" : ""} onClick={() => setGalleryFilter(filter)}>{filter}</button>)}
        </div>
        <div className="gallery-grid">
          {filteredGallery.map((item) => <article className={`gallery-card ${item.size}`} key={item.title}><Photo src={item.image} className="gallery-photo" label={`Temporary gallery image: ${item.title}`} /><div className="gallery-card-overlay"><div><span>{item.category}</span><h3>{item.title}</h3></div><ArrowUpRight size={20} /></div></article>)}
        </div>
        <p className="demo-note"><span /> These are temporary visual references, not official Band photographs. Replace them with selected, approved images.</p>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-pattern" />
        <div className="page-container newsletter-inner"><div><SectionLabel light>KEEP IN THE LOOP</SectionLabel><h2>Good things are<br /><em>worth sharing.</em></h2><p>Get important updates, upcoming programmes and new stories from the Band.</p></div><form className="newsletter-form" onSubmit={handleNewsletter}><label htmlFor="newsletter-email">Your email address</label><div className="newsletter-input-wrap"><input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required /><button type="submit" aria-label="Subscribe"><ArrowUpRight size={20} /></button></div><small>{newsletterMessage || "Newsletter subscriptions will be enabled when email delivery is connected."}</small></form></div>
      </section>

      <section className="contact-section section page-container" id="contact">
        <div className="contact-copy"><SectionLabel>LET'S CONNECT</SectionLabel><h2>Be part of<br /><em>the journey.</em></h2><p>Have a question, a memory to share, or material for the archive? Reach out to the Band.</p><a className="button button-primary" href="#contact">Contact the Band <ArrowUpRight size={16} /></a></div>
        <div className="contact-details"><div className="contact-detail"><span className="contact-icon"><Mail size={19} /></span><div><small>OFFICIAL EMAIL</small><strong>Official email to be confirmed</strong><span>Update this with the Band's Gmail address.</span></div></div><div className="contact-detail"><span className="contact-icon"><ShieldCheck size={19} /></span><div><small>OFFICIAL CHANNELS</small><strong>Stay connected</strong><span>Verified social media links will appear here.</span></div></div><div className="social-links"><a href="#contact" aria-label="Instagram"><Instagram size={18} /></a><a href="#contact" aria-label="Facebook"><Facebook size={18} /></a><a href="#contact" aria-label="YouTube"><Youtube size={18} /></a></div></div>
      </section>
    </>
  );
}

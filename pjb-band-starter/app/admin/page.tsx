"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Archive, Bell, BookOpen, CalendarDays, FileText, Image as ImageIcon,
  LayoutDashboard, LogOut, Mail, Plus, Search, Settings, ShieldCheck,
  Users, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Announcement = { title: string; section: string; status: "Published" | "Draft"; updated: string };

const navigation: { label: string; icon: LucideIcon; group: string }[] = [
  { label: "Overview", icon: LayoutDashboard, group: "WORKSPACE" },
  { label: "Announcements", icon: Bell, group: "CONTENT" },
  { label: "Events", icon: CalendarDays, group: "CONTENT" },
  { label: "Gallery", icon: ImageIcon, group: "CONTENT" },
  { label: "Digital archive", icon: Archive, group: "CONTENT" },
  { label: "E-Library", icon: BookOpen, group: "CONTENT" },
  { label: "Newsletters", icon: Mail, group: "CONTENT" },
  { label: "Leadership", icon: ShieldCheck, group: "ORGANISATION" },
  { label: "Members", icon: Users, group: "ORGANISATION" },
  { label: "Settings", icon: Settings, group: "SYSTEM" },
];

const initialAnnouncements: Announcement[] = [
  { title: "Welcome to the new PJB website", section: "Website update", status: "Published", updated: "Today" },
  { title: "Annual Thanksgiving Service", section: "Programme", status: "Draft", updated: "Yesterday" },
  { title: "Share your memories for the archive", section: "Community", status: "Published", updated: "20 Nov 2026" },
];

export default function AdminPreviewPage() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("Announcement");
  const [status, setStatus] = useState<"Published" | "Draft">("Draft");
  const [feedback, setFeedback] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const visibleAnnouncements = useMemo(
    () => announcements.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())),
    [announcements, search],
  );

  function addAnnouncement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    setAnnouncements((items) => [{ title: title.trim(), section, status, updated: "Just now" }, ...items]);
    setTitle("");
    setFeedback("The announcement was added to this local preview. It has not been saved to Supabase.");
    setShowForm(false);
  }

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <Link href="/" className="admin-brand">
          <Image src="/images/pjb-logo.png" alt="PJB logo" width={48} height={48} />
          <span><strong>PROPHET JEREMIAH BAND</strong><small>CONTENT MANAGEMENT</small></span>
        </Link>
        <div className="admin-top-actions"><span className="demo-badge">DESIGN PREVIEW</span><Link className="admin-back-link" href="/"><LogOut size={14} /> Back to website</Link></div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          {(["WORKSPACE", "CONTENT", "ORGANISATION", "SYSTEM"] as const).map((group) => (
            <div key={group}>
              <p className="admin-sidebar-label">{group}</p>
              {navigation.filter((item) => item.group === group).map((item) => {
                const Icon = item.icon;
                return <button key={item.label} onClick={() => { setActiveSection(item.label); setFeedback(""); }} className={`admin-nav-item ${activeSection === item.label ? "active" : ""}`}><Icon size={15} />{item.label}</button>;
              })}
            </div>
          ))}
        </aside>

        <section className="admin-main">
          <div className="admin-breadcrumb">Workspace / {activeSection}</div>
          <div className="admin-heading-row">
            <div><h1>{activeSection === "Overview" ? "Good morning, Administrator" : activeSection}</h1><p>Manage the content and stories displayed across the Prophet Jeremiah Band website.</p></div>
            <button className="admin-primary-button" onClick={() => { setShowForm((value) => !value); setFeedback(""); }}><Plus size={15} /> New announcement</button>
          </div>

          <div className="admin-stats">
            <article className="admin-stat-card"><div className="admin-stat-top"><span>Announcements</span><span className="admin-stat-icon"><Bell size={15} /></span></div><strong>{announcements.length.toString().padStart(2, "0")}</strong><small>Sample content records</small></article>
            <article className="admin-stat-card"><div className="admin-stat-top"><span>Upcoming events</span><span className="admin-stat-icon"><CalendarDays size={15} /></span></div><strong>03</strong><small>Replace with confirmed dates</small></article>
            <article className="admin-stat-card"><div className="admin-stat-top"><span>Gallery media</span><span className="admin-stat-icon"><ImageIcon size={15} /></span></div><strong>274</strong><small>Photos received for review</small></article>
            <article className="admin-stat-card"><div className="admin-stat-top"><span>Archive items</span><span className="admin-stat-icon"><FileText size={15} /></span></div><strong>00</strong><small>Ready for cataloguing</small></article>
          </div>

          <div className="admin-content-grid">
            <section className="admin-panel">
              <div className="admin-panel-header"><h2>Recent announcements</h2><span>{announcements.length} records</span></div>
              <div className="admin-search"><Search size={14} /><input aria-label="Search announcements" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search announcements..." /></div>
              <table className="admin-table"><thead><tr><th>TITLE</th><th>SECTION</th><th>STATUS</th><th>UPDATED</th></tr></thead><tbody>
                {visibleAnnouncements.map((item, index) => <tr key={`${item.title}-${index}`}><td>{item.title}</td><td>{item.section}</td><td><span className={`status-pill ${item.status === "Draft" ? "status-draft" : ""}`}>{item.status}</span></td><td>{item.updated}</td></tr>)}
                {visibleAnnouncements.length === 0 && <tr><td colSpan={4}>No matching announcements.</td></tr>}
              </tbody></table>
              {feedback && <p className="admin-feedback">{feedback}</p>}
            </section>

            <section className="admin-panel">
              <div className="admin-panel-header"><h2>Recent activity</h2><span>Preview</span></div>
              <div className="admin-activity">
                <div className="admin-activity-item"><span className="activity-dot" /><div><strong>Website content workspace created</strong><small>Just now · System</small></div></div>
                <div className="admin-activity-item"><span className="activity-dot" /><div><strong>274 anniversary photos received</strong><small>Awaiting review · Media</small></div></div>
                <div className="admin-activity-item"><span className="activity-dot" /><div><strong>Brand colours configured</strong><small>Royal blue and cyan · Design</small></div></div>
              </div>
            </section>
          </div>

          {showForm && <section className="admin-panel admin-form-panel">
            <div className="admin-panel-header"><h2>Create announcement</h2><button className="admin-secondary-button" onClick={() => setShowForm(false)} aria-label="Close form"><X size={14} /></button></div>
            <form className="admin-form" onSubmit={addAnnouncement}>
              <label className="full-field">Announcement title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter a clear announcement title" required /></label>
              <label>Category<select value={section} onChange={(event) => setSection(event.target.value)}><option>Announcement</option><option>Programme</option><option>Community</option><option>Media</option><option>Notice</option></select></label>
              <label>Publishing status<select value={status} onChange={(event) => setStatus(event.target.value as "Published" | "Draft")}><option>Draft</option><option>Published</option></select></label>
              <div className="admin-form-actions"><button type="button" className="admin-secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="admin-primary-button">Save preview item</button></div>
            </form>
          </section>}

          <section className="admin-panel admin-form-panel">
            <div className="admin-panel-header"><h2>Media upload test</h2><span>Local browser preview</span></div>
            <label className="admin-form full-field">Choose photographs or videos<input type="file" accept="image/*,video/*" multiple onChange={(event) => setSelectedFiles(Array.from(event.target.files ?? []).map((file) => file.name))} /></label>
            {selectedFiles.length > 0 && <p className="admin-feedback">Selected {selectedFiles.length} file(s): {selectedFiles.slice(0, 3).join(", ")}{selectedFiles.length > 3 ? ` and ${selectedFiles.length - 3} more` : ""}. This preview does not upload files.</p>}
          </section>

          <div className="admin-demo-warning"><strong>Prototype notice:</strong> This dashboard is interactive for design testing, but it is not yet connected to Supabase. New announcements and selected files only exist in the current browser session. Authentication, database writes, Storage uploads and role permissions must be implemented before public launch.</div>
          <p className="admin-footer-note">Prophet Jeremiah Band · Oracle of God · Website administration concept</p>
        </section>
      </div>
    </main>
  );
}

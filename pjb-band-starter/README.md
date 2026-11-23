# Prophet Jeremiah Band — Website Starter

A responsive Next.js prototype for the Prophet Jeremiah Band (Oracle of God). It uses the Band logo colours, takes visual cues from the clean section flow of the CSSF FUNAAB platform, and separates the public-facing website from an administrator dashboard preview.

## 1. Run locally

**Requirements:** Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open:

- Public website: http://localhost:3000
- Administrator design preview: http://localhost:3000/admin

To create a production build:

```bash
npm run build
npm run start
```

No Supabase project is needed to view the current design prototype.

## 2. Brand colours

The logo artwork was sampled as a guide. Its strongest pixels are approximately electric blue `#0309F1` and bright cyan `#04FDFF`. Those are vivid logo colours, so the interface uses more measured working shades for large surfaces and readable text:

| Token | Value | Use |
|---|---|---|
| `--brand-blue` | `#111FC6` | Primary buttons, links and brand emphasis |
| `--brand-blue-deep` | `#090F72` | Hero, footer and dark surfaces |
| `--brand-electric` | `#0309F1` | Original logo blue reference |
| `--brand-cyan` | `#00D6E5` | Accent, highlights and selected states |
| `--brand-cyan-soft` | `#D9FBFD` | Soft accent backgrounds |
| `--ink` | `#101936` | Main text |
| `--surface` | `#F5F7FC` | Alternate section backgrounds |
| `--muted` | `#68728B` | Secondary text |

The colour tokens are centralised at the top of `app/globals.css`, so changing the palette is straightforward. The CSSF-inspired design direction is expressed through clear typography, spacious sections, announcement and event cards, media features and a structured footer; the Band's own blue/cyan identity remains dominant.

## 3. What's included

- Responsive public homepage with About, Updates, Events, Leadership, Digital Archive, E-Library, Gallery, Newsletter and Contact sections.
- Mobile navigation.
- Gallery category filter.
- Newsletter form feedback (demo only; it does not send email).
- Administrator dashboard preview at `/admin`.
- Local announcement creation and search inside the preview dashboard.
- File-picker preview for testing how an administrator might select photos/videos.
- Supabase browser/server client helpers.
- Starter PostgreSQL schema with RLS policies and separate public gallery/private archive storage buckets.
- A shadcn/ui-compatible `Button` primitive and `cn` utility.

## 4. Important prototype boundaries

The site is runnable, but it is **not yet a production CMS**:

- The public page uses temporary Unsplash photographs as visual stand-ins. Replace them with selected, approved Prophet Jeremiah Band photos before launch.
- The event names/dates, leadership names, biographies, official email and social links are placeholders. Confirm them with the Band.
- The `/admin` route is an unauthenticated design preview. Do not publish it as an operational administrator area.
- The dashboard stores new announcement rows only in browser component state. It does not write to PostgreSQL.
- The media picker only shows the filenames selected in the browser. It does not upload files.
- Newsletter submission only displays demo feedback; it does not subscribe anyone or send email.

Before public launch, implement Supabase Auth, server-side admin checks, RLS-backed CRUD operations, Storage uploads, image processing, contact-message handling and email delivery. Add rate limiting and spam protection to public forms.

## 5. Add Supabase when ready

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` using the project's public URL and publishable/anon key. Never put a service-role key in browser-exposed environment variables.
4. Run `supabase/schema.sql` in the Supabase SQL Editor.
5. Implement the admin sign-in flow and create the first `profiles` row with `role = 'super_admin'` for the approved account. Do not enable public sign-up for administrators.
6. Connect the public content sections to published rows and connect dashboard forms to authenticated server actions/route handlers.

The schema creates a public `pjb-gallery` bucket for gallery content and a private `pjb-private-archive` bucket for archive files that should not be publicly accessible. Decide which archive records are public before exposing their files.

## 6. Where to edit

| File | Responsibility |
|---|---|
| `app/page.tsx` | Public homepage content and interactive preview controls |
| `app/admin/page.tsx` | Administrator dashboard preview |
| `app/globals.css` | Brand palette, layout, components and responsive styles |
| `public/images/pjb-logo.png` | Cropped transparent Band logo |
| `lib/supabase/client.ts` | Browser Supabase client |
| `lib/supabase/server.ts` | Server Supabase client |
| `supabase/schema.sql` | Initial database schema and RLS policies |

## 7. Image replacement strategy

Keep only a small, carefully selected set of static brand/design assets in `public/` (logo, favicon and any approved fixed hero/section art). The larger anniversary collection should be reviewed, captioned, organised into albums and uploaded by authorised administrators to Supabase Storage. Store the image metadata and public/private visibility in PostgreSQL. Generate responsive image sizes and thumbnails instead of loading original full-resolution files into every gallery view.

The temporary photos are configured in the `photos` object near the top of `app/page.tsx`. Replace those URLs with approved images or move approved images into `public/images/` once chosen.

# Nyuydze Banven Eric Junior — Personal Portfolio

A premium, dark-editorial developer portfolio built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide icons**.

## Editing your content — one file

Everything personal lives in **`src/config/profile.ts`**:

- Name, roles, location, availability
- Biography, highlights, education, skills
- All six projects (descriptions, tech, features, disclaimers)
- Experience, research interests, milestones, ambitions
- GitHub username & links

The contact email is **not** in that file — it comes from the environment (below), so you can change it without touching code.

## Email — make the contact form actually send

The form posts to `/api/contact` (server-side, Resend-backed). Configure with three variables in `.env` (see `.env.example`):

```bash
# 1. Where messages arrive (already set to your address)
PORTFOLIO_EMAIL=banven100@gmail.com

# 2. API key — create a free account at https://resend.com → API Keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# 3. Verified "from" address (see below)
CONTACT_FROM_EMAIL=
```

### Testing without your own domain (2 minutes)

1. Sign up at [resend.com](https://resend.com) (free, no card needed).
2. Create an API key → put it in `RESEND_API_KEY`.
3. Leave `CONTACT_FROM_EMAIL` empty → the app sends from `onboarding@resend.dev`.
   **Limitation:** in this mode Resend only delivers to the email address that owns
   the Resend account. Make sure your Resend account email is
   `banven100@gmail.com` (or add that address in your Resend account settings).
4. Restart the dev server (`bun run dev`). The form now really delivers.

### Production with your own domain

1. In Resend → **Domains** → add your domain (e.g. `banven.dev`).
2. Add the DNS records Resend shows you (SPF, DKIM, DMARC) and wait for verification.
3. Set `CONTACT_FROM_EMAIL="Portfolio Contact <portfolio@yourdomain.com>"`.
4. Now messages deliver to **any** inbox, and the form is fully production-ready.

### Guarantees & safety

- Success message is shown **only** after Resend accepts the message.
- If delivery is not configured, the form says so honestly and offers a
  pre-filled `mailto:` fallback instead of faking success.
- Server-side validation (zod), sanitisation, control-character stripping
  (prevents header injection), honeypot + time-trap spam protection and
  per-IP rate limiting (5 messages / 15 min) are all implemented in
  `src/app/api/contact/route.ts`.
- No secrets ever ship to the browser — everything sensitive is server-side.

## GitHub repository feed

`/api/github` fetches your public repos (cached 30 min) and feeds the live
repository cards. No token needed for normal use; if you hit rate limits, add
`GITHUB_TOKEN=ghp_xxx` (read-only, no scopes) to `.env`. If the API is
unreachable, the section shows a graceful fallback linking to your profile.

## Run

```bash
bun install
bun run dev     # development (port 3000)
bun run build   # production build
bun run start   # production server
```

## Where things live

```
src/
  app/
    page.tsx              # page composition (server component)
    layout.tsx            # fonts, SEO metadata, JSON-LD
    api/contact/route.ts  # real email endpoint (Resend)
    api/github/route.ts   # repo feed proxy (cached)
  components/
    sections/             # Navbar, Hero, About, Journey, Skills, Projects,
                          # Experience, Research, Milestones, Vision,
                          # GitHubSection, Contact, Footer + ProjectVisual mockups
    shared/               # Reveal/Stagger animations, SectionHeading, Preloader
  config/profile.ts       # ← ALL personal data
  lib/email.ts            # server-side email config & template
public/
  images/                 # your portraits + project imagery
  cv/                     # your CV PDF (Download My CV button target)
```

## Updating later

- New achievement → add an object to `milestones` in `src/config/profile.ts`.
- Publish a project repo → set its `repoUrl` in the same file (the
  "Repository coming soon" chip is replaced automatically).
- New CV → replace `public/cv/Nyuydze_Banven_CV.pdf`.

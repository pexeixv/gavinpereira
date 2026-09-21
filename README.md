# gavn.in

The personal site of **Gavin Pereira** — graphic designer and frontend
developer based in Goa, India. Portfolio, experience, client testimonials and
a contact form, served as a single-page React application.

Live: <https://gavn.in>

---

## Tech stack

| Area            | Choice                                                                          |
| --------------- | ------------------------------------------------------------------------------- |
| Framework       | [React 19](https://react.dev) + TypeScript                                      |
| Build tool      | [Vite 8](https://vite.dev)                                                      |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Icons           | [lucide-react](https://lucide.dev)                                              |
| Routing         | [React Router](https://reactrouter.com)                                         |
| Server state    | [TanStack Query](https://tanstack.com/query)                                    |
| Client state    | [Zustand](https://zustand.docs.pmnd.rs)                                         |
| Forms           | [Formik](https://formik.org) + [Zod](https://zod.dev) via `zod-formik-adapter`  |
| HTTP            | [Axios](https://axios-http.com), through one shared instance                    |
| Markdown        | [react-markdown](https://github.com/remarkjs/react-markdown) + `remark-gfm`     |
| Tooling         | ESLint (type-aware) + Prettier                                                  |
| Package manager | [pnpm](https://pnpm.io)                                                         |

---

## Getting started

Requires **Node 20.19+** and **pnpm 10+**. If pnpm is not installed:
`corepack enable && corepack prepare pnpm@latest --activate`.

```bash
pnpm install
cp .env.example .env.local   # then fill in the values you need
pnpm dev
```

The dev server runs at <http://localhost:5173>.

The site starts without any configuration: the reCAPTCHA widget is skipped
when no site key is present, and the portfolio media is served from the public
ImageKit endpoint baked into `.env.example`. Only the contact form needs a real
backend to do anything useful.

---

## Scripts

| Command             | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `pnpm dev`          | Start the Vite dev server with hot module replacement        |
| `pnpm build`        | Type-check the project, then produce a production build      |
| `pnpm preview`      | Serve the contents of `dist/` locally                        |
| `pnpm typecheck`    | Run the TypeScript compiler without emitting                 |
| `pnpm lint`         | Run ESLint across the project                                |
| `pnpm lint:fix`     | Run ESLint and apply the fixes it can make                   |
| `pnpm format`       | Format everything with Prettier                              |
| `pnpm format:check` | Verify formatting without writing                            |
| `pnpm check`        | `typecheck` + `lint` + `format:check` — run this before a PR |

---

## Environment variables

All configuration lives in `.env.local`, which is git-ignored.
`.env.example` is the checked-in template. Vite only exposes variables
prefixed with `VITE_`, and **everything with that prefix ships in the browser
bundle — never put a secret in one.**

| Variable                  | Required | Default                                     | Purpose                                                                                                                              |
| ------------------------- | -------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_API_BASE_URL`       | Yes      | `/api`                                      | Base URL every request from `axiosInstance` resolves against.                                                                        |
| `VITE_CONTACT_ENDPOINT`   | No       | `/contact`                                  | Path (or absolute URL) the contact form posts to.                                                                                    |
| `VITE_RECAPTCHA_SITE_KEY` | No       | _empty_                                     | Google reCAPTCHA v2 **site** key. Empty hides the widget and submits without a token. The matching secret key belongs on the server. |
| `VITE_IMAGEKIT_BASE_URL`  | No       | `https://ik.imagekit.io/gavin/gavinpereira` | ImageKit delivery endpoint for portfolio media.                                                                                      |
| `VITE_SITE_URL`           | No       | `https://gavn.in`                           | Canonical origin for `<link rel="canonical">` and Open Graph URLs.                                                                   |
| `VITE_SEASON_OVERRIDE`    | No       | _empty_                                     | Pins the seasonal branding to `xmas`, `halloween`, `diwali` or `default`. Empty means detect from the date.                          |

Every value is read once in [`src/lib/env.ts`](src/lib/env.ts); nothing else in
the app touches `import.meta.env` directly.

---

## The contact form

The form posts JSON to `${VITE_API_BASE_URL}${VITE_CONTACT_ENDPOINT}`:

```json
{
  "name": "Jordan Rivera",
  "email": "jordan@example.com",
  "message": "I would like a website for my studio.",
  "recaptchaToken": "03AGdBq26…"
}
```

A successful response is `{ "success": true, "message": "…" }`; the optional
`message` is shown in the success toast. On failure the server should return a
non-2xx status with `{ "message": "…" }` — that message is surfaced to the
visitor verbatim, so keep it human-readable.

`recaptchaToken` is present only when `VITE_RECAPTCHA_SITE_KEY` is set. **The
receiving endpoint must verify the token server-side** against
`https://www.google.com/recaptcha/api/siteverify` with the secret key. The
browser never sees that secret.

---

## Folder structure

```
public/                     Served verbatim at the site root
  ai.txt, llms.txt,         Machine-readable metadata, unchanged
  humans.txt, robots.txt,
  sitemap.xml
  _redirects, vercel.json   Host-level redirects for the site's short links
  img/                      All legacy /img/* URLs, including favicons,
                            seasonal logos, tech icons and client logos

src/
  app/                      Application shell
    App.tsx                 Providers + RouterProvider
    providers.tsx           Query client, theme, tooltips, toasts
    query-client.ts         The single QueryClient
    routes.tsx              Route table; nests pages under the two layouts
  assets/                   Fonts and inline SVG source
  components/
    icons/                  Brand glyphs and decorative artwork
    layout/                 BaseLayout, MarkdownLayout, Header, Nav, Footer,
                            Logo, ThemeToggle, Snowfall, error and loading states
    sections/               Page sections, grouped by the page they belong to
      home/ about/ portfolio/ contact/ shared/
    ui/                     shadcn primitives (see CLAUDE.md before editing)
  content/
    data/                   Projects, testimonials, timeline, tech stack, site copy
    legal/                  Markdown documents plus their registry
  hooks/                    useTheme, useSeason, useHideOnScroll, usePageMeta, …
  lib/
    axios.ts                axiosInstance — the only HTTP client
    api-error.ts            The error type every request rejects with
    env.ts                  All runtime configuration
    imagekit.ts             Media URL and srcset builders
    recaptcha.ts            reCAPTCHA script loader
    queries/                TanStack Query hooks
    schemas/                Zod schemas
    utils.ts                cn() and small helpers
  pages/                    Thin route components that compose sections
  store/                    Zustand stores: theme, season, UI
  types/                    Shared domain types
```

---

## Routing and layouts

Two layouts wrap the route tree, wired up in
[`src/app/routes.tsx`](src/app/routes.tsx):

- **`BaseLayout`** — header, footer, seasonal ornaments and the shared project
  lightbox. Used by `/`, `/about`, `/portfolio`, `/contact` and the 404 route.
- **`MarkdownLayout`** — the same chrome with a constrained reading column and
  a back-to-home link. Used by `/privacy-policy`, `/terms` and `/uses`.

Pages are lazily loaded, so each route ships its own chunk.

### Deployment note

This is a client-routed single-page app, so the host must rewrite unknown paths
to `index.html`. The rules in `public/vercel.json` and `public/_redirects` carry
the site's short links (`/wa`, `/resume`, `/github`, …) across from the previous
setup; add an SPA fallback alongside them for whichever host you deploy to.

---

## Theming and seasons

The theme is a Zustand store persisted to `localStorage`. A small inline script
in `index.html` applies the saved theme before first paint so the page never
flashes the wrong background, and the previous site's `mode` key is still read
and written so a returning visitor keeps the theme they picked.

The active season drives the logo. It comes from `VITE_SEASON_OVERRIDE` when
set, otherwise from the date:

| Season      | Window               |
| ----------- | -------------------- |
| `halloween` | 24–31 October        |
| `diwali`    | 1–15 November        |
| `xmas`      | 1–31 December        |
| `default`   | the rest of the year |

Diwali moves each year, so pin `VITE_SEASON_OVERRIDE=diwali` for the exact
dates when it matters. During `xmas` an animated snowfall overlay is drawn on a
canvas; it is skipped entirely when the visitor prefers reduced motion.

---

## Accessibility

Semantic landmarks throughout, a skip link as the first tab stop, labelled and
described form fields with `role="alert"` validation messages, keyboard-
reachable navigation and dialogs, visible focus rings on every interactive
element, and `prefers-reduced-motion` honoured for both the snowfall and the
global transitions.

---

## Contributing

Read [CLAUDE.md](CLAUDE.md) first — it covers the conventions this codebase
expects. Run `pnpm check` before opening a pull request.

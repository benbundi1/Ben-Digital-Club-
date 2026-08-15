# BenDigitalClub Website Engineering Specification V1.0

Status: DRAFT FOR IMPLEMENTATION
Owner: Ben (Founder)
Purpose: This is the master specification for the BenDigitalClub website — the first production-grade reference implementation of the BenDigitalClub AI OS architecture. This document is the bridge between the engineering pack and the actual GitHub repository. It is meant to be read by both humans and Codex.

This is **File 1 of 5**. Files 2–5 contain the phased directory/architecture breakdowns so that Codex implementation runs stay scoped and don't burn excess tokens. See:
- `02_PHASE1_MVP_ARCHITECTURE.md`
- `03_PHASE2_MARKETING_ENGINE.md`
- `04_PHASE3_AI_DEMO_LAYER.md`
- `05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md`

---

## 1. Product & Brand Naming

| Layer | Name |
|---|---|
| Company / Brand | **BenDigitalClub** |
| Platform | **BenDigitalClub AI OS** |
| Website | **BenDigitalClub** (public-facing name; do not use "WebContentCity AI" anywhere) |
| Core engine | **BenDigitalClub AI OS Core** |
| Command Center | **BenDigitalClub Command Center** |
| Tagline (option A) | "Build. Automate. Optimize. Grow." |
| Tagline (option B) | "AI systems for building and scaling digital growth." |

### Five Products (BenDigitalClub AI OS)
1. **AI Content Production OS**
2. **AI Social Content OS**
3. **AI SEO Growth OS**
4. **Business AI Automation OS**
5. **AI Website Marketing Auditor**

Strategic architecture: Five specialized systems → shared **BenDigitalClub AI OS Core** → **BenDigitalClub Command Center** → future unified client/user dashboard.

The website is not merely a marketing frontend for the five products — it is the first production-grade reference implementation of the BenDigitalClub AI OS architecture, used internally to validate the architecture, workflows, design system, deployment process, analytics, SEO, security, and CI/CD before the same pattern is reused for client projects.

Naming rule for Codex: **Never emit "WebContentCity" anywhere in code, copy, config, package names, or repo names.** Always use `bendigitalclub` (lowercase/kebab for code) or `BenDigitalClub` (display).

---

## 2. Layered System Architecture

```
BENDIGITALCLUB
│
PUBLIC EXPERIENCE
│
┌──────────────────────┼──────────────────────┐
│                       │                      │
Marketing             Products              Services
│                       │                      │
└──────────────────────┼──────────────────────┘
                        │
                 EXPERIENCE API
                        │
        ┌───────────────┴───────────────┐
        │                                │
   AI OS COMMAND                    CUSTOMER
      CENTER                          PORTAL
        │                                │
        └───────────────┬───────────────┘
                         │
              BENDIGITALCLUB AI OS CORE
                         │
   ┌─────────┬───────────┼───────────┬─────────┐
   │         │           │           │         │
Content    Social       SEO      Automation  Auditor
  OS         OS          OS          OS         OS
   │         │           │           │         │
   └─────────┴───────────┼───────────┴─────────┘
                         │
                Shared Intelligence Layer
                         │
        ┌────────────────┼────────────────┐
        │                │                 │
   Knowledge          Agents            Skills
        │                │                 │
        └────────────────┼─────────────────┘
                         │
                   Integrations
```

Three distinct worlds:
- **Public world** — what prospects see (marketing, products, services pages).
- **Product world** — what the five AI systems do.
- **Operating-system world** — how the systems work together (Core, Command Center, Shared Intelligence Layer).

---

## 3. Sitemap / Information Architecture

```
/
├── /products
│   ├── /content-production
│   ├── /social-content
│   ├── /seo-growth
│   ├── /business-automation
│   └── /website-marketing-auditor
│
├── /platform
│   ├── /ai-os
│   ├── /command-center
│   ├── /how-it-works
│   └── /integrations
│
├── /services
│   ├── /ai-strategy
│   ├── /content-marketing
│   ├── /seo
│   ├── /social-media
│   ├── /ai-automation
│   └── /website-audits
│
├── /solutions
│   ├── /startups
│   ├── /small-business
│   ├── /agencies
│   └── /marketing-teams
│
├── /resources
│   ├── /blog
│   ├── /guides
│   ├── /templates
│   ├── /case-studies
│   └── /ai-tools
│
├── /compare
├── /showcase
│   └── /case-studies
├── /pricing
├── /about
├── /contact
├── /demo
├── /docs
├── /login
├── /privacy
├── /terms
├── /cookies
├── /disclaimer
└── /security
```

`/solutions` translates technology into business outcomes ("How can AI help my marketing team?") rather than requiring visitors to already know product names. `/compare` is generated from the Product Registry (see §7), not hand-maintained.

---

## 4. Page Contracts

Every page in the sitemap must declare a **page contract** before implementation. A page contract is a structured spec, not free-form copywriting. Minimum required fields per page:

```yaml
page: /products/[slug]
purpose: "Convert product-curious visitors into demo users or leads"
data_source: ProductRegistry (products/[slug]/product.json)
primary_cta: "Try a Demo"
secondary_cta: "Talk to Ben"
seo:
  title_template: "{product.name} | BenDigitalClub AI OS"
  meta_description: product.seo_metadata.description
  schema: SoftwareApplication
analytics_events: [page_view, product_view, cta_clicked]
accessibility: WCAG 2.1 AA
states: [loading, empty, error, success]
```

### Homepage Contract (detailed)
1. **Hero** — "AI-powered systems for modern digital growth." Sub-copy: "Build, automate, optimize and scale your content, SEO, social media and digital marketing workflows with BenDigitalClub." Primary CTA: `Explore the AI OS`. Secondary CTA: `Work With Me`.
2. **The Problem** — visualize the fragmented marketing stack (Content tool + SEO tool + Social tool + Automation tool + Analytics + Website tools = Fragmented workflow), then introduce the BenDigitalClub AI OS as the unifying answer.
3. **The AI OS** — visual of Create / Optimize / Automate pillars mapped to the five products, sitting on the Shared AI Core.
4. **Five Systems** — five premium product cards, each with: problem, solution, capabilities, target user, workflow, status, CTA. Sourced from the Product Registry.
5. **Services** — position as "YOUR EXPERTISE + AI SYSTEMS = AI-Powered Services." Services are human expertise; the AI OS is technology/productization. They are complementary, not competing.
6. **Trust** — About / Experience / Case Studies / Methodology / Testimonials / Results / Technology / Security / Privacy signals.
7. **Three CTA Paths** (see §5).
8. **Footer** — sitemap, legal links, social, newsletter signup.

---

## 5. Three CTA Paths

```
Visitor
  │
  ├── Explore → AI OS         (/platform/ai-os)
  │
  ├── Try     → Demo          (/demo)
  │
  └── Hire    → Services       (/services)
```

Every marketing page must route its CTA into exactly one of these three paths — never a generic unlabeled "Learn More."

---

## 6. Design System

`packages/design-system/` — a standalone, versioned package so it can later be reused for client websites.

```
packages/design-system/
├── tokens/          (color, spacing, radius, elevation, motion, typography scale)
├── typography/
├── buttons/
├── cards/
├── forms/
├── navigation/
├── modals/
├── product-components/   (ProductCard, StatusBadge, CapabilityList, WorkflowDiagram)
└── marketing-components/ (Hero, CTASection, ComparisonTable, Testimonial, TrustBar)
```

Design principles:
- Tokens-first: no hard-coded colors/spacing in components.
- Every component has documented props, states (default/hover/disabled/loading/error), and an accessibility note.
- Product-status badges (see §30) must be a first-class component (`<StatusBadge status="BETA" />`) since the site is not allowed to claim capability the underlying system doesn't yet have.

---

## 7. Data Models

### Product (`products/[slug]/product.json`)
```ts
interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  status: "CONCEPT" | "ARCHITECTURE" | "PROTOTYPE" | "ALPHA" | "BETA" | "PRODUCTION";
  version: string; // e.g. "1.0.0"
  category: string;
  target_users: string[];
  problems: string[];
  solutions: string[];
  capabilities: string[];
  features: { name: string; description: string }[];
  workflows: { step: number; title: string; description: string }[];
  integrations: string[];
  pricing: { model: string; tiers?: PricingTier[] };
  screenshots: string[];
  demo_url?: string;
  documentation_url?: string;
  cta: { label: string; href: string };
  related_products: string[];
  related_services: string[];
  seo_metadata: { title: string; description: string; og_image: string };
}
```

### Service (`services/[slug]/service.json`)
```ts
interface Service {
  service_id: string;
  name: string;
  description: string;
  target_customer: string;
  pain_points: string[];
  deliverables: string[];
  process: { step: number; title: string; description: string }[];
  pricing_model: string;
  case_studies: string[];
  related_products: string[]; // e.g. SEO Consulting -> "Powered by AI SEO Growth OS"
  cta: { label: string; href: string };
}
```

### Workspace (multi-tenancy scaffold — see §8)
```ts
interface Workspace {
  id: string;
  name: string;
  brand: { logo?: string; colors?: Record<string, string> };
  users: WorkspaceUser[];
  projects: Project[];
  data_scope: string; // isolation key used across DB/queries
}
```

### Analytics Event
```ts
interface AnalyticsEvent {
  event: "page_view" | "product_view" | "product_demo_started" | "product_demo_completed"
       | "service_view" | "cta_clicked" | "contact_submitted" | "pricing_viewed"
       | "signup_started" | "signup_completed";
  timestamp: string;
  session_id: string;
  workspace_id?: string;
  properties: Record<string, unknown>;
}
```

Rule: **components never hard-code product/service copy.** Everything renders from these registries so product cards, product pages, nav, comparison tables, SEO metadata, product sitemap, related-products, and CTA sections all derive from one source of truth.

---

## 8. Component Architecture

```
ProductPage (route)
 └─ uses: ProductRegistry (data) + design-system components (presentation)
      ├─ Hero
      ├─ CapabilityList
      ├─ WorkflowDiagram
      ├─ StatusBadge
      ├─ RelatedProducts
      └─ CTASection
```

Rules:
- Presentational components (design-system) never fetch data.
- Route/page components fetch via Application Services only (never directly call external APIs — see §9).
- Server Components for data-heavy pages (product/service pages, blog); Client Components only where interactivity is required (demo forms, comparison table filters, pricing toggle).

---

## 9. API Boundaries

```
ProductPage
   ↓
Application Service        (packages/product-engine, packages/service-engine)
   ↓
API Client                 (packages/api-client — typed fetch wrapper, retries, error normalization)
   ↓
AI Gateway                 (core/ai-gateway — see §10)
   ↓
BenDigitalClub AI OS Core
```

No component or page is permitted to call an external API (OpenAI, CRM, analytics vendor, CMS) directly. Every external call is mediated by the API Client, and every AI-model call additionally passes through the AI Gateway. This means changing AI providers later does not force a website rebuild.

---

## 10. AI Gateway Architecture

`core/ai-gateway/` sits between the website's Application Services and any model provider (OpenAI, Claude, Gemini, future models).

```
AI Gateway
 ├── Model routing       (select provider/model per task)
 ├── Authentication      (provider credentials, never exposed to client)
 ├── Rate limiting
 ├── Logging              (request/response metadata, not raw PII)
 ├── Retries               (exponential backoff, circuit breaker)
 ├── Cost controls        (per-request/day budget caps)
 └── Safety policies      (input/output filtering before/after model call)
```

The demo layer (Phase 3, see File 4) is the first real consumer of the AI Gateway. It must run against **controlled/simulated responses first**, then be swapped to live gateway calls without changing the calling contract.

---

## 11. Repository Architecture

GitHub Organization: `bendigitalclub`

```
bendigitalclub-ai-os          PRIVATE   (proprietary agents, prompts, core engine)
bendigitalclub-website        PRIVATE initially (this repo)
bendigitalclub-docs           PRIVATE/controlled
selected-public-projects      PUBLIC    (curated, sanitized showcase only)
```

Never commit into any repo, public or private-but-shared: proprietary prompts, API keys, agent logic, private datasets, credentials, internal architecture secrets, or production environment variables. Secrets live only in the deployment environment (Vercel project settings / GitHub Actions secrets).

Monorepo root name: `bendigitalclub-ai/` — see Files 2–5 for the phased directory layout. The full target-state tree (not built day one) is documented in File 5 §"Final Target Tree."

---

## 12. Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) | Server Components by default |
| Language | TypeScript (strict mode) | No `any` in shared packages |
| Monorepo tooling | Turborepo + pnpm workspaces | Caches builds across apps/packages |
| Styling | Tailwind CSS + design-system tokens | No raw hex values in components |
| Content | MDX / structured JSON content model | Not hand-coded pages per article |
| Data validation | Zod | Validates all registry JSON at build time |
| Testing | Vitest (unit), Playwright (e2e), axe-core (a11y) | See §17 |
| Deployment | Vercel | Preview per PR, production on merge to `main` |
| Analytics | Self-hosted event pipeline + (optional) privacy-respecting third party | See §15 |
| Auth (Phase 4+) | NextAuth / Clerk-style provider | Deferred until Command Center phase |
| CI | GitHub Actions | Lint, typecheck, test, security scan, SEO checks, build |

---

## 13. GitHub Workflow

```
Local Development
   │
   ▼
GitHub (feature branch)
   │
   ▼
Pull Request
   │
   ├── lint
   ├── typecheck
   ├── tests
   ├── security scan
   ├── SEO checks
   └── build
   │
   ▼
Vercel Preview
   │
   ▼
QA
   │
   ▼
Production (merge to main)
```

Branch naming: `feature/<phase>-<mission-number>-<slug>` (e.g. `feature/p1-03-product-registry`), so each Codex mission maps directly to a traceable branch and PR.

---

## 14. Vercel Deployment Architecture

- One Vercel project per app in `apps/` (`web`, `demo`, `dashboard` — dashboard deferred to Phase 4).
- Every PR gets an automatic Preview Deployment; Production deploys only from `main`.
- Environment variables managed per-environment in Vercel (never in repo):
  - `.env.local`, `.env.development`, `.env.staging`, `.env.production` — files exist locally for shape/reference only, real values live in Vercel/GitHub Actions secrets.
  - Required keys: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ANALYTICS_ID`, `API_BASE_URL`, `AI_API_KEY`, `DATABASE_URL`, `CRM_API_KEY`.
- Edge caching for static/marketing routes; ISR for product/blog pages so registry updates propagate without a full redeploy.

---

## 15. Security Model

- Secrets: environment-variable only, scoped per environment, rotated on any suspected leak.
- Input validation: Zod on every API boundary (form submissions, demo inputs).
- Rate limiting: at the AI Gateway and on public form endpoints (contact, demo, newsletter).
- Dependency scanning: automated in CI (e.g. `pnpm audit` / Dependabot).
- No secrets, credentials, or proprietary agent logic in any public repository.
- `SECURITY.md` at repo root documents responsible-disclosure process.
- Permissions/role model scaffolded from day one even with a single "Visitor" role in Phase 1 (see File 5 §Permissions).

---

## 16. SEO Specification

- Every page contract includes `title_template`, `meta_description`, and a `schema` type (Organization, SoftwareApplication, Article, BreadcrumbList, FAQPage where relevant).
- `sitemap.xml` and `robots.txt` generated at build time from the route tree + Product/Service Registries — not hand-maintained.
- Canonical URLs on every page; no duplicate-content routes between `/products/[slug]` and any legacy paths.
- Structured data (JSON-LD) injected server-side.
- Core Web Vitals budget enforced in CI (see §18 Performance).
- Blog/guides/case-studies content model includes `slug`, `title`, `description`, `published_at`, `updated_at`, `og_image`, `canonical_url`.

---

## 17. Testing Strategy

```
tests/
├── unit/          (Vitest — components, utilities, registry validation)
├── integration/   (API client, Application Service boundaries)
├── e2e/           (Playwright — critical user journeys: homepage → product → demo → contact)
├── accessibility/ (axe-core automated checks per page template)
├── security/      (dependency scan, header checks, secret-scanning)
├── seo/           (structured data validation, sitemap/robots checks, meta tag presence)
└── performance/   (Lighthouse CI budgets)
```

Definition of Done for any mission includes: unit tests for new logic, an e2e path if a new user journey was introduced, and no CI check regressions.

---

## 18. Accessibility Requirements

- WCAG 2.1 AA minimum across all public routes.
- All interactive elements keyboard-navigable; visible focus states from design-system tokens.
- Color contrast validated against tokens, not per-component overrides.
- All images require `alt`; decorative images use empty `alt=""`.
- Forms (contact, demo, newsletter) have associated labels, error messaging tied via `aria-describedby`, and are usable without a mouse.
- Automated axe-core checks run in CI on every page template; manual screen-reader pass required before Phase 1 launch.

---

## 19. Performance Requirements

- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms on marketing routes (mobile, throttled).
- Lighthouse CI budget enforced in PR checks; a regression below threshold blocks merge.
- Images served via Next.js Image with responsive sizes; fonts subset and self-hosted or preloaded.
- No render-blocking third-party scripts on the homepage above the fold.

---

## 20. Analytics & Conversion Events

Analytics is an architectural service (`packages/analytics`), never sprinkled ad hoc into components. All events (see §7 data model) route through one `trackEvent()` call so the underlying provider can change without touching call sites.

Core events: `page_view`, `product_view`, `product_demo_started`, `product_demo_completed`, `service_view`, `cta_clicked`, `contact_submitted`, `pricing_viewed`, `signup_started`, `signup_completed`.

Conversion funnel to monitor from day one: `page_view → product_view → product_demo_started → product_demo_completed → contact_submitted`.

---

## 21. Demo Architecture (summary — full detail in File 4)

`/demo` does **not** expose the live private AI OS in Phase 1–3. It runs controlled simulations per product (e.g. Content OS Demo takes a prompt like "Create a blog strategy for a SaaS startup" and returns a canned/templated workflow). This validates the demo UX and the AI Gateway contract without exposing proprietary prompts or agent logic. Live-gateway wiring is a distinct, later mission (see File 4).

---

## 22. Client-Project Reference Architecture

The website's real purpose is to be the **BenDigitalClub AI Reference Implementation**: proof that the architecture handles Brand → Marketing → Product → AI → Data → Integration → Client → Deployment end-to-end. Once this repository has shipped through Phase 3, the same `packages/` (design-system, product-engine, service-engine, api-client, analytics, auth, permissions, integrations) become the starting template for client engagements — cloned/forked per client, not rebuilt from scratch.

`/showcase/case-studies` should include, as its first entry, the build of this website itself: Problem (build a professional AI ecosystem website) → Architecture (GitHub + Vercel + component system + content architecture + CI/CD) → Result (a production-ready AI marketing platform).

---

## 23. Definition of Done

A mission (or PR) is **Done** only when all of the following are true:
1. Code merged to `main` via a reviewed PR with all CI checks green (lint, typecheck, tests, security scan, SEO checks, build).
2. Any new page has a completed Page Contract (§4) checked into the repo alongside the code.
3. Any new product/service data lives in the Registry (§7), not hard-coded.
4. Unit tests cover new logic; e2e test added if a new user journey was introduced.
5. Accessibility: axe-core passes with zero critical/serious violations on new/changed pages.
6. Performance: Lighthouse CI budget not regressed.
7. Analytics events fire correctly and are documented in `docs/architecture/analytics.md`.
8. No secrets, proprietary prompts, or agent logic committed.
9. Vercel Preview deployment verified manually before merge.
10. Product/system status badges (CONCEPT → PRODUCTION) accurately reflect real capability — no overclaiming.

---

## 24. 30 Numbered Codex Implementation Missions

> **How to run these with Codex:** Run missions one at a time, in order, each as its own branch/PR. Do not paste the whole spec into every prompt — reference only the relevant section of this file plus the matching phase file (Files 2–5). This keeps each Codex run scoped and token-efficient. Each phase file repeats only the missions relevant to that phase with their directory scope inlined.

### Phase 1 — Website MVP (missions 1–8)
1. Scaffold the monorepo (`bendigitalclub-ai/`) with Turborepo + pnpm workspaces, base `apps/web`, TypeScript strict config, ESLint/Prettier, and CI skeleton (lint/typecheck/build only).
2. Build the Design System package (`packages/design-system`) with tokens, Button, Card, Nav, Footer, and a Storybook (or equivalent) preview.
3. Implement the Product Registry (`products/*/product.json` + Zod schema + loader in `packages/product-engine`) seeded with the five real products.
4. Implement the Service Registry (`services/*/service.json` + Zod schema + loader in `packages/service-engine`).
5. Build the Homepage per the Page Contract in §4 (Hero, Problem, AI OS visual, Five Systems, Services, Trust, Three CTA Paths, Footer).
6. Build `/products` index + `/products/[slug]` dynamic route driven entirely by the Product Registry.
7. Build `/services` index + `/services/[slug]` dynamic route driven entirely by the Service Registry, including the Product↔Service relationship (§7/§related_products).
8. Build `/contact` and `/demo` entry pages (demo simulation logic deferred to Phase 3) plus a working contact form with validation and a stubbed submit handler.

### Phase 2 — Marketing Engine (missions 9–15)
9. Build `/solutions` section (`/startups`, `/small-business`, `/agencies`, `/marketing-teams`) translating products into business outcomes.
10. Build the Content Engine (`packages/content-engine`) with a structured content model (MDX/JSON) powering `/resources/blog`, `/guides`, `/templates`.
11. Build `/showcase` and `/showcase/case-studies`, seeded with the BenDigitalClub website itself as case study #1.
12. Wire the Analytics Service (`packages/analytics`) and instrument all core events across existing pages.
13. Implement SEO infrastructure: dynamic `sitemap.xml`, `robots.txt`, JSON-LD schema injection, and CI SEO checks.
14. Build the Comparison Engine — `/compare` page generated from the Product Registry (capability matrix).
15. Add `/pricing` page with pricing data sourced from the Product/Service Registries.

### Phase 3 — AI Demonstration Layer (missions 16–22)
16. Build `packages/api-client` (typed fetch wrapper, retries, error normalization) — no component may call external APIs directly after this mission.
17. Build `core/ai-gateway` skeleton (model routing, rate limiting, logging, retries, cost controls, safety policy hooks) with a mocked provider.
18. Build the Demo simulation logic for Content OS, SEO OS, and Social OS (controlled/canned responses only, no live model calls).
19. Wire `/demo` UI to the simulation logic end-to-end, with `product_demo_started` / `product_demo_completed` analytics events.
20. Add Integration Layer scaffolding (`integrations/google`, `integrations/social`, `integrations/cms`, `integrations/analytics`, `integrations/email`) with stub adapters.
21. Add Knowledge Layer scaffolding (`core/knowledge`) with placeholder Brand/Product/SEO knowledge documents consumed by the demo simulations.
22. Add experimentation scaffolding (A/B test flagging utility) and run a first headline/CTA test on the homepage.

### Phase 4 — Command Center (missions 23–26)
23. Scaffold `apps/dashboard` (Command Center shell) and the Auth package (`packages/auth`) with a single-workspace login for Ben.
24. Implement the Permissions package (`packages/permissions`) with the role ladder (Visitor → Lead → Customer → Team Member → Administrator) and permission flags (`view_product`, `run_demo`, `create_project`, `manage_content`, `run_audit`, `manage_integrations`, `manage_billing`, `manage_users`).
25. Implement the Workspace data model (multi-tenancy scaffold, §7) even though only one workspace exists initially.
26. Connect the Command Center to live AI Gateway calls for one product (start with AI Content Production OS) behind the Auth + Permissions layer.

### Phase 5 — Client Platform (missions 27–30)
27. Build the Customer Portal shell (Experience API boundary between public site and Command Center) with workspace-scoped routing.
28. Add reporting/output scaffolding (Reports/Outputs module) for a client workspace to view AI OS results.
29. Document the Client-Project Reference Architecture (`docs/architecture/client-reference.md`) describing how to fork this repo's `packages/` for a new client engagement.
30. Full audit pass: run every checklist in §23 Definition of Done against the entire repo, fix gaps, and tag `v1.0.0`.

---

## 25. Status Legend (applies to every product/system)

```
CONCEPT → ARCHITECTURE → PROTOTYPE → ALPHA → BETA → PRODUCTION
```

The website must never make a marketing claim that exceeds the current status of the underlying system.

---

*End of File 1. Continue to File 2 for the Phase 1 MVP directory scope.*

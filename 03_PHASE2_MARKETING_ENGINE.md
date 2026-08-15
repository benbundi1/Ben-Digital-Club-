# BenDigitalClub — Phase 2: Marketing Engine Architecture

File 3 of 5. Companion to `01_BENDIGITALCLUB_ENGINEERING_SPEC_V1.md`.
Scope: Codex missions **9–15** only. Prerequisite: Phase 1 (File 2) Definition of Done met. Feed Codex this file alone plus the specific mission text.

Brand: **BenDigitalClub**. Never use "WebContentCity" anywhere.

Goal of this phase: `SEO + Blog + Resources + Case Studies + Analytics + Lead Capture`.

---

## 1. Directory Scope for This Phase (additions on top of Phase 1)

```
bendigitalclub-ai/
│
├── apps/
│   └── web/
│       └── app/
│           ├── solutions/
│           │   ├── startups/page.tsx
│           │   ├── small-business/page.tsx
│           │   ├── agencies/page.tsx
│           │   └── marketing-teams/page.tsx
│           ├── resources/
│           │   ├── blog/
│           │   │   ├── page.tsx
│           │   │   └── [slug]/page.tsx
│           │   ├── guides/[slug]/page.tsx
│           │   └── templates/[slug]/page.tsx
│           ├── showcase/
│           │   ├── page.tsx
│           │   └── case-studies/[slug]/page.tsx
│           ├── compare/page.tsx
│           ├── pricing/page.tsx      # now fully data-driven, replaces P1 stub
│           ├── sitemap.ts            # dynamic sitemap.xml
│           └── robots.ts
│
├── packages/
│   ├── content-engine/               # structured content model for blog/guides/templates/case-studies
│   │   ├── schema.ts
│   │   └── loader.ts
│   └── analytics/
│       ├── trackEvent.ts
│       └── events.ts                 # canonical event name constants
│
├── content/
│   ├── blog/
│   ├── guides/
│   ├── templates/
│   ├── case-studies/
│   │   └── bendigitalclub-website.mdx   # first case study: this website itself
│   └── product-updates/
│
├── tests/
│   └── seo/                          # structured data + sitemap/robots checks
│
└── docs/
    └── architecture/
        └── analytics.md              # documents every event + where it fires
```

---

## 2. Data Models Needed This Phase

```ts
// packages/content-engine/schema.ts
interface ContentItem {
  slug: string;
  type: "blog" | "guide" | "template" | "case-study" | "product-update";
  title: string;
  description: string;
  body: string;            // MDX
  published_at: string;
  updated_at: string;
  og_image: string;
  canonical_url: string;
  related_products?: string[];
  related_services?: string[];
}
```

```ts
// packages/analytics/events.ts
type AnalyticsEventName =
  | "page_view" | "product_view" | "product_demo_started" | "product_demo_completed"
  | "service_view" | "cta_clicked" | "contact_submitted" | "pricing_viewed"
  | "signup_started" | "signup_completed";
```

`trackEvent(name: AnalyticsEventName, properties?: Record<string, unknown>)` is the **only** call site for analytics anywhere in the codebase. Replace every `// TODO(P2): wire trackEvent` comment left from Phase 1.

---

## 3. Comparison Engine (`/compare`)

Generated at build time from the Product Registry — never hand-maintained. Each product's `capabilities: string[]` array (Phase 1 schema) is diffed against a fixed capability taxonomy (e.g. "Content generation", "Social workflows", "SEO optimization", "Automation", "Website analysis") to render the matrix. If a new capability keyword appears in a product's `capabilities` array that isn't yet in the taxonomy, fail the build with a clear error rather than silently dropping a column.

---

## 4. SEO Infrastructure

- `app/sitemap.ts` — dynamically enumerates all static routes + every `products/*`, `services/*`, and `content/*` slug.
- `app/robots.ts` — standard allow-all for production, disallow-all for preview/staging via `NEXT_PUBLIC_SITE_URL` check.
- JSON-LD injected server-side per page contract's `schema` field (Organization on `/about`, SoftwareApplication on product pages, Article on blog/guides, BreadcrumbList site-wide, FAQPage where relevant).
- CI SEO check (`tests/seo/`) asserts: every page has a unique `<title>`, a meta description under 160 chars, and valid JSON-LD.

---

## 5. Codex Missions — Phase 2 (run one per branch/PR)

9. Build `/solutions` section (`/startups`, `/small-business`, `/agencies`, `/marketing-teams`) translating products into business outcomes, cross-linking to relevant products/services.
10. Build the Content Engine (`packages/content-engine`) with the structured content model above, powering `/resources/blog`, `/guides`, `/templates`.
11. Build `/showcase` and `/showcase/case-studies`, seeded with the BenDigitalClub website itself as case study #1 (Problem / Architecture / Result, per master spec §22).
12. Wire the Analytics Service (`packages/analytics`) and instrument all core events across every existing Phase 1 + Phase 2 page.
13. Implement SEO infrastructure: dynamic `sitemap.xml`, `robots.txt`, JSON-LD schema injection, and CI SEO checks.
14. Build the Comparison Engine — `/compare` page generated from the Product Registry capability matrix.
15. Add fully data-driven `/pricing` page sourced from the Product/Service Registries (replace the Phase 1 stub).

**Branch naming:** `feature/p2-09-solutions`, `feature/p2-10-content-engine`, etc.

**Definition of Done for this phase:** all 7 missions merged, CI green including new `seo` test suite, every core analytics event verifiable in a test environment, `/compare` and `/pricing` fully registry-driven with zero hard-coded values, first case study live at `/showcase/case-studies/bendigitalclub-website`.

Proceed to `04_PHASE3_AI_DEMO_LAYER.md` only after Phase 2 Definition of Done is met.

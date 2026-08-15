# BenDigitalClub — Phase 1: Website MVP Architecture

File 2 of 5. Companion to `01_BENDIGITALCLUB_ENGINEERING_SPEC_V1.md`.
Scope: Codex missions **1–8** only. Feed Codex this file alone (plus the specific mission text) rather than the full spec, to keep runs token-efficient.

Brand: **BenDigitalClub**. Never use "WebContentCity" anywhere.

Goal of this phase: `Brand → Homepage → Services → Five OS products → Product detail pages → Contact/Demo entry`.

---

## 1. Directory Scope for This Phase

Only build what's listed below. Do **not** scaffold `core/`, `integrations/`, `apps/dashboard`, or `apps/demo` yet — those belong to later phases and exist only as empty placeholders with a `README.md` stub if referenced.

```
bendigitalclub-ai/
│
├── apps/
│   └── web/                          # Public marketing website (Next.js App Router)
│       ├── app/
│       │   ├── page.tsx              # Homepage
│       │   ├── products/
│       │   │   ├── page.tsx          # /products index
│       │   │   └── [slug]/page.tsx   # /products/[slug]
│       │   ├── services/
│       │   │   ├── page.tsx          # /services index
│       │   │   └── [slug]/page.tsx   # /services/[slug]
│       │   ├── contact/page.tsx
│       │   ├── demo/page.tsx         # entry page only, no live logic yet
│       │   ├── about/page.tsx
│       │   ├── pricing/page.tsx      # stub, real data model added Phase 2
│       │   └── layout.tsx
│       ├── public/
│       └── next.config.ts
│
├── packages/
│   ├── ui/                           # thin re-export layer, if needed
│   ├── design-system/
│   │   ├── tokens/
│   │   ├── typography/
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── forms/
│   │   ├── navigation/
│   │   └── marketing-components/     # Hero, CTASection, TrustBar
│   ├── product-engine/               # loads + validates products/*/product.json
│   └── service-engine/               # loads + validates services/*/service.json
│
├── products/
│   ├── content-production-os/product.json
│   ├── social-content-os/product.json
│   ├── seo-growth-os/product.json
│   ├── business-automation-os/product.json
│   └── website-marketing-auditor/product.json
│
├── services/
│   ├── ai-strategy/service.json
│   ├── content-marketing/service.json
│   ├── seo/service.json
│   ├── social-media/service.json
│   ├── ai-automation/service.json
│   └── website-audits/service.json
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── .github/
│   └── workflows/
│       └── ci.yml                    # lint, typecheck, test, build only in Phase 1
│
├── AGENTS.md
├── README.md
├── package.json
├── turbo.json
└── pnpm-workspace.yaml
```

---

## 2. Data Models Needed This Phase

Use exactly these two schemas (Zod). Do not add fields belonging to later phases (e.g. no `workspace_id` yet).

```ts
// packages/product-engine/schema.ts
interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  status: "CONCEPT" | "ARCHITECTURE" | "PROTOTYPE" | "ALPHA" | "BETA" | "PRODUCTION";
  version: string;
  category: string;
  target_users: string[];
  problems: string[];
  solutions: string[];
  capabilities: string[];
  features: { name: string; description: string }[];
  workflows: { step: number; title: string; description: string }[];
  pricing: { model: string };
  cta: { label: string; href: string };
  related_products: string[];
  related_services: string[];
  seo_metadata: { title: string; description: string };
}
```

```ts
// packages/service-engine/schema.ts
interface Service {
  service_id: string;
  name: string;
  description: string;
  target_customer: string;
  pain_points: string[];
  deliverables: string[];
  process: { step: number; title: string; description: string }[];
  pricing_model: string;
  related_products: string[];
  cta: { label: string; href: string };
}
```

Seed all five products and six services with real, non-placeholder copy drawn from §1 of the master spec (product names/descriptions) — do not ship `Lorem ipsum` to production.

---

## 3. Page Contracts to Implement This Phase

Use the generic template from the master spec §4. Minimum pages this phase:
- `/` (Homepage — full contract in master spec §4)
- `/products`, `/products/[slug]`
- `/services`, `/services/[slug]`
- `/contact`
- `/demo` (static entry page: explains what the demo will do, CTA disabled or "Coming soon" if mission 18 not yet done)
- `/about`

Every page must declare its `analytics_events` even if the Analytics package itself isn't wired until Phase 2 — leave a `// TODO(P2): wire trackEvent` comment at each call site so Phase 2 work is a pure find-and-replace.

---

## 4. Codex Missions — Phase 1 (run one per branch/PR)

1. Scaffold the monorepo (`bendigitalclub-ai/`) with Turborepo + pnpm workspaces, base `apps/web`, TypeScript strict config, ESLint/Prettier, and CI skeleton (lint/typecheck/build only).
2. Build the Design System package (`packages/design-system`) with tokens, Button, Card, Nav, Footer, and a component preview (Storybook or a `/design-system` internal preview route).
3. Implement the Product Registry (`products/*/product.json` + Zod schema + loader in `packages/product-engine`) seeded with the five real products.
4. Implement the Service Registry (`services/*/service.json` + Zod schema + loader in `packages/service-engine`).
5. Build the Homepage per the Page Contract (Hero, Problem, AI OS visual, Five Systems, Services, Trust, Three CTA Paths, Footer).
6. Build `/products` index + `/products/[slug]` dynamic route driven entirely by the Product Registry.
7. Build `/services` index + `/services/[slug]` dynamic route driven entirely by the Service Registry, including Product↔Service relationships.
8. Build `/contact` and `/demo` entry pages plus a working, validated contact form with a stubbed submit handler.

**Branch naming:** `feature/p1-01-scaffold-monorepo`, `feature/p1-02-design-system`, etc.

**Definition of Done for this phase:** all 8 missions merged, CI green on every PR, Homepage/Products/Services/Contact pages live on a Vercel Preview, zero hard-coded product/service copy outside the registries, zero references to "WebContentCity" anywhere in the codebase.

Proceed to `03_PHASE2_MARKETING_ENGINE.md` only after Phase 1 Definition of Done is met.

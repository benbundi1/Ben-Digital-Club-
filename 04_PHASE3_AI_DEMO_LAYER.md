# BenDigitalClub — Phase 3: AI Demonstration Layer Architecture

File 4 of 5. Companion to `01_BENDIGITALCLUB_ENGINEERING_SPEC_V1.md`.
Scope: Codex missions **16–22** only. Prerequisite: Phase 2 (File 3) Definition of Done met. Feed Codex this file alone plus the specific mission text.

Brand: **BenDigitalClub**. Never use "WebContentCity" anywhere.

Goal of this phase: `Website → Demo → AI Gateway → Selected AI System`, using **controlled simulations only** — the live private AI OS core is never exposed to the public site in this phase.

---

## 1. Directory Scope for This Phase (additions on top of Phase 1–2)

```
bendigitalclub-ai/
│
├── apps/
│   ├── web/
│   │   └── app/demo/page.tsx         # now wired to real simulation logic
│   └── demo/                         # optional standalone demo app if isolation is preferred
│       └── (mirrors apps/web/app/demo structure)
│
├── packages/
│   ├── api-client/                   # typed fetch wrapper, retries, error normalization
│   │   ├── client.ts
│   │   └── errors.ts
│
├── core/
│   ├── ai-gateway/
│   │   ├── router.ts                 # model routing
│   │   ├── auth.ts
│   │   ├── rateLimiter.ts
│   │   ├── logger.ts
│   │   ├── retry.ts
│   │   ├── costControls.ts
│   │   └── safetyPolicies.ts
│   ├── knowledge/
│   │   ├── brand/
│   │   ├── product/
│   │   └── seo/
│   ├── agents/                       # empty/stub in this phase — real agents are private, not public repo
│   └── demo-simulations/
│       ├── content-os.sim.ts
│       ├── seo-os.sim.ts
│       └── social-os.sim.ts
│
├── integrations/
│   ├── google/
│   ├── social/
│   ├── cms/
│   ├── analytics/
│   └── email/
│   (each contains a stub adapter implementing a shared `Integration` interface — no live credentials)
│
├── packages/experimentation/         # A/B test flagging utility
│   └── flags.ts
│
└── tests/
    ├── integration/                  # API client + AI Gateway contract tests
    └── security/                     # secret-scanning, dependency scan config
```

> **Security note:** `core/agents/` and any real prompt engineering stay in the **private** `bendigitalclub-ai-os` repository, not this website repo. This repo only contains the Gateway *interface* and *simulated* responses.

---

## 2. AI Gateway Contract

```ts
// core/ai-gateway/router.ts
interface AIGatewayRequest {
  product_slug: string;         // e.g. "content-production-os"
  task: string;                 // e.g. "generate_blog_strategy"
  input: Record<string, unknown>;
  workspace_id?: string;        // undefined in Phase 3 (single public demo context)
}

interface AIGatewayResponse {
  output: unknown;
  model_used: string;           // "simulated" in Phase 3
  latency_ms: number;
  cost_estimate?: number;
}
```

Every demo call goes `DemoUI → ApplicationService → api-client → ai-gateway → demo-simulations/*` in Phase 3. The **same call signature** must work later when `demo-simulations/*` is swapped for real provider calls — do not let the UI or Application Service know the difference.

---

## 3. Demo Simulations (controlled, not live)

- **Content OS Demo**: visitor enters a prompt like "Create a blog strategy for a SaaS startup" → returns a templated sample workflow (not a live model call).
- **SEO OS Demo**: visitor enters a website URL → returns a controlled/canned sample audit structure (real crawling/analysis deferred).
- **Social OS Demo**: visitor enters a prompt like "AI tools for small businesses" → returns a sample content workflow.

Each simulation must still fire `product_demo_started` on submit and `product_demo_completed` on response render, so the analytics funnel is real even though the underlying compute is simulated.

---

## 4. Integration Layer

Consumers (future OS products) call the Integration Layer, never a vendor SDK directly:

```
Integration Layer
 ├── google      (Analytics/Search Console — stub in Phase 3)
 ├── social      (Meta, etc. — stub)
 ├── cms         (WordPress, etc. — stub)
 ├── analytics   (internal analytics package hookup)
 └── email       (transactional email — stub)
```

Each stub implements:
```ts
interface Integration {
  name: string;
  isConfigured(): boolean;   // false until real credentials are added in a later phase
  execute(action: string, payload: unknown): Promise<unknown>;
}
```

---

## 5. Knowledge Layer (scaffold only)

`core/knowledge/{brand,product,seo}` hold structured markdown/JSON documents that the demo simulations reference for consistent, on-brand sample output (e.g. brand voice guidelines, the real product capability lists from the Product Registry, basic SEO heuristics). This is a lightweight preview of the future Shared Intelligence Layer — not the real knowledge base.

---

## 6. Codex Missions — Phase 3 (run one per branch/PR)

16. Build `packages/api-client` (typed fetch wrapper, retries, error normalization) and refactor every existing external call in the codebase to go through it — no component may call an external API directly after this mission.
17. Build `core/ai-gateway` skeleton (model routing, rate limiting, logging, retries, cost controls, safety policy hooks) using the contract in §2, backed by a mocked/simulated provider.
18. Build the Demo simulation logic for Content OS, SEO OS, and Social OS (`core/demo-simulations/*`) — controlled/canned responses only, no live model calls.
19. Wire `/demo` UI to the simulation logic end-to-end via the Gateway contract, with `product_demo_started` / `product_demo_completed` analytics events firing correctly.
20. Add Integration Layer scaffolding (`integrations/google`, `integrations/social`, `integrations/cms`, `integrations/analytics`, `integrations/email`) with stub adapters implementing the shared `Integration` interface.
21. Add Knowledge Layer scaffolding (`core/knowledge`) with placeholder Brand/Product/SEO knowledge documents consumed by the demo simulations for on-brand sample output.
22. Add experimentation scaffolding (`packages/experimentation/flags.ts`) and run a first headline/CTA A/B test on the homepage, tracked via the analytics event pipeline.

**Branch naming:** `feature/p3-16-api-client`, `feature/p3-17-ai-gateway`, etc.

**Definition of Done for this phase:** all 7 missions merged, CI green including new `integration`/`security` suites, `/demo` fully functional end-to-end for all three products using simulated responses, zero live model credentials present anywhere in this repo, integration test proves the Gateway contract would work unchanged if a simulation were swapped for a real provider call.

Proceed to `05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md` only after Phase 3 Definition of Done is met.

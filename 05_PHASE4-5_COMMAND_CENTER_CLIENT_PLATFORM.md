# BenDigitalClub — Phase 4–5: Command Center & Client Platform Architecture

File 5 of 5. Companion to `01_BENDIGITALCLUB_ENGINEERING_SPEC_V1.md`.
Scope: Codex missions **23–30** only. Prerequisite: Phase 3 (File 4) Definition of Done met. Feed Codex this file alone plus the specific mission text.

Brand: **BenDigitalClub**. Never use "WebContentCity" anywhere.

Goal of Phase 4: `Authentication → Workspace → Command Center → Five AI Systems`.
Goal of Phase 5: `Client → Workspace → Brand Intelligence → AI OS Core → Five Systems → Integrations → Reports/Outputs`.

---

## 1. Directory Scope for Phase 4–5 (additions on top of Phase 1–3)

```
bendigitalclub-ai/
│
├── apps/
│   └── dashboard/                    # BenDigitalClub Command Center
│       └── app/
│           ├── login/page.tsx
│           ├── [workspace]/
│           │   ├── page.tsx          # workspace home
│           │   ├── content-os/
│           │   ├── social-os/
│           │   ├── seo-os/
│           │   ├── automation-os/
│           │   ├── auditor-os/
│           │   ├── reports/          # Reports/Outputs module (Phase 5)
│           │   └── settings/
│           └── layout.tsx
│
├── packages/
│   ├── auth/
│   │   ├── provider.ts
│   │   └── session.ts
│   └── permissions/
│       ├── roles.ts                  # Visitor -> Lead -> Customer -> Team Member -> Administrator
│       └── guards.ts                 # view_product, run_demo, create_project, manage_content,
│                                      # run_audit, manage_integrations, manage_billing, manage_users
│
├── core/
│   └── orchestration/                # coordinates Workspace <-> OS product calls (Phase 4-5 only)
│
├── docs/
│   └── architecture/
│       └── client-reference.md       # how to fork packages/ for a new client engagement
│
└── infrastructure/                   # IaC / env provisioning notes (Vercel projects, DB, secrets layout)
```

---

## 2. Data Models Needed This Phase

```ts
// packages/permissions/roles.ts
type Role = "visitor" | "lead" | "customer" | "team_member" | "administrator";

type Permission =
  | "view_product" | "run_demo" | "create_project" | "manage_content"
  | "run_audit" | "manage_integrations" | "manage_billing" | "manage_users";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  visitor: ["view_product", "run_demo"],
  lead: ["view_product", "run_demo"],
  customer: ["view_product", "run_demo", "create_project"],
  team_member: ["view_product", "run_demo", "create_project", "manage_content", "run_audit"],
  administrator: ["view_product", "run_demo", "create_project", "manage_content", "run_audit",
                   "manage_integrations", "manage_billing", "manage_users"],
};
```

```ts
// Workspace (multi-tenancy scaffold, first introduced conceptually in Phase 1 schema but
// only *used* starting Phase 4)
interface Workspace {
  id: string;
  name: string;
  brand: { logo?: string; colors?: Record<string, string> };
  users: { user_id: string; role: Role }[];
  projects: { id: string; name: string; product_slug: string; created_at: string }[];
  data_scope: string; // isolation key used across every DB query — never omit this filter
}
```

Even with exactly one workspace (Ben's own), every query in `apps/dashboard` must filter by `data_scope` / `workspace_id`. This is what makes Phase 5 multi-tenancy additive rather than a rewrite.

---

## 3. Command Center → AI OS Core Wiring (Phase 4, mission 26)

Only **one** product goes live behind Auth + Permissions in Phase 4: **AI Content Production OS**. Its Command Center page calls the real `core/ai-gateway` (built in Phase 3) with a real provider configured via environment variables — the first time this repo makes a genuine (non-simulated) model call. Gate it behind `permissions.guards.can("run_demo" | "create_project", role)`.

---

## 4. Customer Portal / Experience API (Phase 5, mission 27)

```
Client
  │
  ▼
Workspace
  │
  ▼
Experience API   (packages/api-client consumers scoped by workspace_id)
  │
  ▼
BenDigitalClub AI OS Core
  │
  ▼
Five Systems → Integrations → Reports/Outputs
```

The Customer Portal is workspace-scoped routing inside `apps/dashboard` (or a dedicated `apps/portal` if isolation from the internal Command Center becomes necessary — default to reusing `apps/dashboard/app/[workspace]` unless a real second client forces the split).

---

## 5. Codex Missions — Phase 4 (run one per branch/PR)

23. Scaffold `apps/dashboard` (Command Center shell) and `packages/auth` with a single-workspace login for Ben.
24. Implement `packages/permissions` with the role ladder and permission flags from §2, enforced via a `guards.ts` helper used in every dashboard route/action.
25. Implement the `Workspace` data model (§2) even though only one workspace exists initially — every dashboard query must be workspace-scoped from this mission onward.
26. Connect the Command Center to live `core/ai-gateway` calls for **AI Content Production OS only**, gated by Auth + Permissions.

## 6. Codex Missions — Phase 5 (run one per branch/PR)

27. Build the Customer Portal shell (Experience API boundary between public site and Command Center) with workspace-scoped routing per §4.
28. Add Reports/Outputs scaffolding so a client workspace can view AI OS results (start with Content OS outputs only, matching mission 26's scope).
29. Write `docs/architecture/client-reference.md` describing exactly how to fork this repo's `packages/` (design-system, product-engine, service-engine, api-client, analytics, auth, permissions, integrations) for a new client engagement.
30. Full audit pass: run every checklist item in the master spec's §23 Definition of Done against the **entire** repo, fix any gaps, and tag `v1.0.0`.

**Branch naming:** `feature/p4-23-dashboard-shell`, `feature/p5-27-customer-portal`, etc.

**Definition of Done for Phase 4–5:** all 8 missions merged, CI green, one real (non-simulated) AI Gateway call working end-to-end behind Auth + Permissions, `client-reference.md` complete enough that a second client workspace could plausibly be stood up from it, `v1.0.0` tagged.

---

## 7. Final Target Tree (reference only — do not scaffold all of this on day one)

This is the complete, fully-evolved monorepo shape once Phases 1–5 are done. It exists here purely as a north star for Codex/reviewers to check "does this new file belong somewhere already-planned" — never generate empty folders from this tree preemptively; each phase file above is authoritative for what to build *when*.

```
bendigitalclub-ai/
│
├── apps/
│   ├── web/            # Public Marketing Website
│   ├── demo/            # Product Demonstrations (optional standalone; may live inside web/)
│   └── dashboard/       # Command Center + Customer Portal
│
├── packages/
│   ├── ui/
│   ├── design-system/
│   ├── product-engine/
│   ├── service-engine/
│   ├── content-engine/
│   ├── seo-engine/
│   ├── analytics/
│   ├── experimentation/
│   ├── api-client/
│   ├── auth/
│   ├── permissions/
│   └── integrations/
│
├── products/
│   ├── content-production-os/
│   ├── social-content-os/
│   ├── seo-growth-os/
│   ├── business-automation-os/
│   └── website-marketing-auditor/
│
├── services/
│   ├── seo/
│   ├── content-marketing/
│   ├── social-media/
│   ├── ai-strategy/
│   ├── ai-automation/
│   └── website-audits/
│
├── content/
│   ├── blog/
│   ├── guides/
│   ├── templates/
│   ├── case-studies/
│   ├── resources/
│   └── product-updates/
│
├── core/
│   ├── ai-gateway/
│   ├── knowledge/
│   ├── agents/           # real agent logic stays in the private bendigitalclub-ai-os repo
│   ├── skills/
│   ├── workflows/
│   ├── memory/
│   ├── orchestration/
│   └── demo-simulations/
│
├── integrations/
│   ├── google/
│   ├── social/
│   ├── cms/
│   ├── analytics/
│   └── email/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── accessibility/
│   ├── security/
│   ├── seo/
│   └── performance/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── products/
│   ├── deployment/
│   └── operations/
│
├── infrastructure/
│
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
│
├── AGENTS.md
├── README.md
├── SECURITY.md
├── CONTRIBUTING.md
└── package.json
```

*End of specification set (Files 1–5).*

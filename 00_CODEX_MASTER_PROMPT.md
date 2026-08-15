# BenDigitalClub — Codex Master Prompt Pack

File 0 of 6 (add-on to the Engineering Spec set). Use this file to actually **drive Codex** through setup and all 30 missions using Files 1–5 as the source of truth. Don't paste all 5 spec files into one Codex session — that burns tokens fast and increases hallucination risk. Instead, use the two prompt templates below: one to bootstrap the environment/repo once, and one repeatable template to run per mission.

---

## 0. Before you start

Upload all 6 files (this one + the 5 spec files) into the repo root under `/spec/` before running any Codex prompt, so Codex can reference them by path instead of you re-pasting content every time:

```
/spec/00_CODEX_MASTER_PROMPT.md
/spec/01_BENDIGITALCLUB_ENGINEERING_SPEC_V1.md
/spec/02_PHASE1_MVP_ARCHITECTURE.md
/spec/03_PHASE2_MARKETING_ENGINE.md
/spec/04_PHASE3_AI_DEMO_LAYER.md
/spec/05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md
```

Have ready: a GitHub account/org (`bendigitalclub`), a Vercel account, and Node/pnpm installed locally if you're running Codex CLI locally rather than in a hosted sandbox.

---

## 1. ONE-TIME BOOTSTRAP PROMPT

Run this exactly once, at the very start, before any numbered mission. It creates the repo shell and CI skeleton — nothing product-specific yet.

```
You are setting up a new GitHub repository from scratch for a project called BenDigitalClub.

Read /spec/01_BENDIGITALCLUB_ENGINEERING_SPEC_V1.md and /spec/02_PHASE1_MVP_ARCHITECTURE.md in full before doing anything else. Treat them as the authoritative spec. Do not reference or introduce the name "WebContentCity" anywhere — the brand is BenDigitalClub only.

Do the following, in order:

1. Initialize a git repository in the current directory if one doesn't exist.
2. Create the monorepo skeleton exactly as described in "Directory Scope for This Phase" in 02_PHASE1_MVP_ARCHITECTURE.md — folders and placeholder README.md files only, no product code yet.
3. Set up Turborepo + pnpm workspaces (turbo.json, pnpm-workspace.yaml, root package.json) per the Technology Stack section (§12) of 01_BENDIGITALCLUB_ENGINEERING_SPEC_V1.md.
4. Add TypeScript strict config, ESLint, and Prettier at the repo root.
5. Create .github/workflows/ci.yml implementing only: lint, typecheck, build (test step can be a no-op placeholder for now — Phase 1 mission 1 will not yet have tests to run).
6. Create root README.md summarizing the project per §1–2 of the master spec, AGENTS.md documenting the mission-based workflow (reference /spec/ files), and a .gitignore appropriate for a Next.js + pnpm + Turborepo project.
7. Create .env.local.example, .env.development.example, .env.staging.example, .env.production.example listing the required keys from §14 of the master spec (NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_ANALYTICS_ID, API_BASE_URL, AI_API_KEY, DATABASE_URL, CRM_API_KEY) with placeholder values only — never real secrets.
8. Make an initial commit on a branch named `chore/bootstrap-repo` with a clear commit message, and open it as a PR against `main` (or push directly to main if this is the very first commit and main is empty).
9. Do NOT implement any product/service registries, pages, or components yet — that starts at Mission 1.

When done, summarize exactly what was created and confirm CI passes on the bootstrap PR.
```

After this runs, connect the repo to Vercel (import project, set the environment variables for real in the Vercel dashboard — never commit real values) and enable branch protection on `main` (require PR + passing CI) before continuing.

---

## 2. REPEATABLE MISSION PROMPT TEMPLATE

Use this once per mission, in order, one at a time. Never batch multiple missions into a single Codex run — each one should be its own branch and PR so you can review before moving on.

```
You are implementing Mission {MISSION_NUMBER} of the BenDigitalClub website build.

Read {PHASE_FILE_PATH} in full. Also read the "Definition of Done" (§23) in
/spec/01_BENDIGITALCLUB_ENGINEERING_SPEC_V1.md — every mission must satisfy it.

Do not reference or introduce the name "WebContentCity" anywhere. The brand is
BenDigitalClub only.

Mission {MISSION_NUMBER} text (copy exactly from the phase file's mission list):
"{MISSION_TEXT}"

Instructions:
1. Create a new branch named `feature/{BRANCH_SLUG}` off the latest `main`.
2. Implement only what this mission describes. Do not start work belonging to a later
   mission, even if it seems convenient to bundle it in.
3. Follow the directory scope, data models, and page contracts already defined in
   {PHASE_FILE_PATH} exactly — do not invent new top-level folders that aren't in the spec.
4. Write unit tests for any new logic. Add an e2e test if this mission introduces a new
   user-facing journey.
5. Run lint, typecheck, tests, and build locally and fix any failures before finishing.
6. Update /docs/architecture/analytics.md if this mission adds or changes analytics events
   (only relevant from Mission 12 onward).
7. Open a PR titled "Mission {MISSION_NUMBER}: {SHORT_TITLE}" with a description that
   checklist-confirms each applicable item from the Definition of Done (§23).
8. Do not merge the PR yourself — stop after opening it so it can be reviewed and checked
   against a Vercel Preview deployment.

If anything in the mission description is ambiguous, resolve it using the closest matching
existing convention already established in a previous mission's code, and note the
assumption you made in the PR description rather than guessing silently.
```

Fill in the four `{...}` placeholders per mission using the table in §3 below.

---

## 3. Mission Lookup Table (fill-in values for the template above)

| # | Phase File | Branch Slug | Short Title |
|---|---|---|---|
| 1 | 02_PHASE1_MVP_ARCHITECTURE.md | p1-01-scaffold-monorepo | Scaffold monorepo |
| 2 | 02_PHASE1_MVP_ARCHITECTURE.md | p1-02-design-system | Design system package |
| 3 | 02_PHASE1_MVP_ARCHITECTURE.md | p1-03-product-registry | Product registry |
| 4 | 02_PHASE1_MVP_ARCHITECTURE.md | p1-04-service-registry | Service registry |
| 5 | 02_PHASE1_MVP_ARCHITECTURE.md | p1-05-homepage | Homepage |
| 6 | 02_PHASE1_MVP_ARCHITECTURE.md | p1-06-products-pages | Products index + detail pages |
| 7 | 02_PHASE1_MVP_ARCHITECTURE.md | p1-07-services-pages | Services index + detail pages |
| 8 | 02_PHASE1_MVP_ARCHITECTURE.md | p1-08-contact-demo-entry | Contact + demo entry pages |
| 9 | 03_PHASE2_MARKETING_ENGINE.md | p2-09-solutions | Solutions section |
| 10 | 03_PHASE2_MARKETING_ENGINE.md | p2-10-content-engine | Content engine + blog/guides/templates |
| 11 | 03_PHASE2_MARKETING_ENGINE.md | p2-11-showcase-case-studies | Showcase + case studies |
| 12 | 03_PHASE2_MARKETING_ENGINE.md | p2-12-analytics-wiring | Analytics service wiring |
| 13 | 03_PHASE2_MARKETING_ENGINE.md | p2-13-seo-infrastructure | SEO infrastructure |
| 14 | 03_PHASE2_MARKETING_ENGINE.md | p2-14-comparison-engine | Comparison engine (/compare) |
| 15 | 03_PHASE2_MARKETING_ENGINE.md | p2-15-pricing-page | Data-driven pricing page |
| 16 | 04_PHASE3_AI_DEMO_LAYER.md | p3-16-api-client | API client package |
| 17 | 04_PHASE3_AI_DEMO_LAYER.md | p3-17-ai-gateway | AI Gateway skeleton |
| 18 | 04_PHASE3_AI_DEMO_LAYER.md | p3-18-demo-simulations | Demo simulation logic |
| 19 | 04_PHASE3_AI_DEMO_LAYER.md | p3-19-demo-ui-wiring | Demo UI end-to-end wiring |
| 20 | 04_PHASE3_AI_DEMO_LAYER.md | p3-20-integration-layer | Integration layer scaffolding |
| 21 | 04_PHASE3_AI_DEMO_LAYER.md | p3-21-knowledge-layer | Knowledge layer scaffolding |
| 22 | 04_PHASE3_AI_DEMO_LAYER.md | p3-22-experimentation | Experimentation / first A-B test |
| 23 | 05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md | p4-23-dashboard-shell | Command Center shell + auth |
| 24 | 05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md | p4-24-permissions | Permissions package |
| 25 | 05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md | p4-25-workspace-model | Workspace data model |
| 26 | 05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md | p4-26-live-gateway-content-os | Live AI Gateway for Content OS |
| 27 | 05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md | p5-27-customer-portal | Customer portal shell |
| 28 | 05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md | p5-28-reports-outputs | Reports/outputs scaffolding |
| 29 | 05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md | p5-29-client-reference-docs | Client reference architecture docs |
| 30 | 05_PHASE4-5_COMMAND_CENTER_CLIENT_PLATFORM.md | p5-30-final-audit | Full Definition of Done audit + v1.0.0 tag |

Copy the exact mission text for `{MISSION_TEXT}` from the numbered list in the relevant phase file — don't paraphrase it, so Codex is working from the same wording you reviewed.

---

## 4. PHASE GATE PROMPT (run between phases)

Before starting Mission 9, 16, 23, and 27 (the first mission of each new phase), run this check first:

```
Before starting the next phase, audit the repository against the "Definition of Done for
this phase" section at the end of {PREVIOUS_PHASE_FILE_PATH}. Report pass/fail for each
item. Do not start any new mission until every item passes. If something fails, propose
the smallest fix needed and wait for confirmation before making changes.
```

This keeps Codex from compounding gaps across phases (e.g. building the AI Gateway on top of a Product Registry that's secretly still using placeholder copy).

---

## 5. Guardrails to repeat in every session if Codex drifts

If you notice Codex over-scoping, hallucinating folders not in the spec, or reintroducing "WebContentCity," paste this reset:

```
Stop. Re-read the current mission's phase file section only. Do not add functionality,
folders, or packages beyond what that mission and the "Directory Scope for This Phase"
section describe. The brand name is BenDigitalClub — if "WebContentCity" appears anywhere
in your recent changes, remove it before continuing.
```

---

## 6. Recommended run order (summary)

1. Bootstrap prompt (§1) — once.
2. Missions 1–8, one at a time (§2/§3) — Phase 1.
3. Phase gate check (§4) before Mission 9.
4. Missions 9–15 — Phase 2.
5. Phase gate check before Mission 16.
6. Missions 16–22 — Phase 3.
7. Phase gate check before Mission 23.
8. Missions 23–26 — Phase 4.
9. Phase gate check before Mission 27.
10. Missions 27–30 — Phase 5, ending in the `v1.0.0` tag.

Review and manually approve every PR against its Vercel Preview before merging — Codex should never merge to `main` on its own.

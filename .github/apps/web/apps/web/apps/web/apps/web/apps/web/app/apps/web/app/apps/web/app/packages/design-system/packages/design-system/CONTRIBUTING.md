# CONTRIBUTING

## Workflow

1. **Feature branches** — Create branches from `main` using the naming convention: `feature/<phase>-<mission-number>-<slug>` or `chore/<description>`.
2. **Pull requests** — Every change goes through a PR, reviewed against the spec documents and Definition of Done checklist.
3. **CI checks** — PRs must pass lint, typecheck, build, and test before merge.
4. **Vercel Preview** — QA against the Vercel Preview deployment before merging to `main`.

## Running locally

\`\`\`bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run checks
pnpm lint
pnpm typecheck
pnpm build
\`\`\`

## Phases

This project is implemented in five phases, each with 5–6 missions. See the spec files in the repo root for detailed phase/mission guidance.

- **Phase 1** (Missions 1–8): Website MVP
- **Phase 2** (Missions 9–15): Marketing Engine
- **Phase 3** (Missions 16–22): AI Demonstration Layer
- **Phase 4** (Missions 23–26): Command Center
- **Phase 5** (Missions 27–30): Client Platform

## Questions?

Refer to the engineering spec documents (`01_BENDIGITALCLUB_ENGINEERING_SPEC_V1.md`, `02_PHASE1_MVP_ARCHITECTURE.md`, etc.) for authoritative project context.

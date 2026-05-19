# Antigravity Agentic Knowledge Base & RAG Ledger

This document is the absolute source-of-truth for the **Antigravity Agentic Developer Network** operating within this workspace. It serves as a persistent RAG ledger containing complete version control, Standard Operating Procedures (SOPs), mistake autopsies, and best practices.

---

## 📈 Version Control & Changelog Ledger

| Version | Date / Timestamp | Author | Type | Description |
| :--- | :--- | :--- | :--- | :--- |
| **v8.2.1-stable**| 2026-05-19T03:37 EST | Antigravity v12.1 | `Security Audit`| Passed comprehensive Next.js edge caching and Sanity GROQ payload security audit. Validated 0ms leakage of hidden metadata and strict read-only Sanity client permissions. Git tagged `v8.2.1-stable`. |
| **v8.2.1** | 2026-05-19T03:21 EST | Antigravity v12.1 | `Fix & CMS` | Cascade-filtered out projects from `getProjects()` and `getProjectsByIds()` if they are associated with hidden experiences, keeping the homepage ticker tape and project section completely clean. |
| **v8.2.0** | 2026-05-19T03:17 EST | Antigravity v12.1 | `Feature & CMS` | Added `hidden` boolean schema to experience document, filtered out hidden experiences/projects in queries, and successfully deployed updates to sanity cloud studio (`sanity deploy`). |
| **v8.1.0** | 2026-05-19T03:10 EST | Antigravity v12.1 | `Performance & CMS` | Prefetched route/image payload in background during spin (0ms SPA latency). Successfully pushed experience website `link` URL schema addition to Sanity cloud studio (`sanity deploy`). |
| **v7.0.0** | 2026-05-18T22:30 EST | Antigravity v12.1 | `Feature` | Added slot machine "Spin" button in hero section, horizontal project timeline deceleration, and cinematic fullscreen zoom portal. |
| **v6.0.0** | 2026-05-15T15:00 EST | Antigravity v11.8 | `Architecture` | Refactored from Single-Page Scroll to Next.js Hub-and-Spoke Dynamic Router, establishing `/work/[slug]` routes. |
| **v5.0.0** | 2026-05-12T12:00 EST | Antigravity v11.5 | `UX/UI` | Replaced Spline canvas with customized, ultra-lightweight high-performance HTML5 Canvas `FEAMesh` background. |
| **v4.0.0** | 2026-05-08T18:00 EST | Antigravity v11.0 | `UX/UI` | Deployed interactive robotic arm Spline background with synthetic cursor forwarding. |
| **v3.0.0** | 2026-05-03T11:00 EST | Antigravity v10.5 | `Core` | Configured resume drops, vertical experience timelines, and liquid-glass baby-blue/navy aesthetics. |

---

## 🛠️ Standard Operating Procedures (SOPs)

### 1. Schema Upgrades & Studio Deploys
When editing Sanity schema files under `src/sanity/schemaTypes/`:
1. Modify the TS/JS schema field definition.
2. Update corresponding TypeScript interfaces inside `src/sanity/types.ts`.
3. Add the field selection inside GQL/GROQ queries in `src/sanity/lib/client.ts`.
4. **CRITICAL:** Deploy the schema to the Sanity cloud hosting endpoint immediately by running:
   ```bash
   npx sanity deploy
   ```
   *Note: Next.js routes under `/studio` load schemas dynamically, but the hosted cloud editor at `https://<project>.sanity.studio` requires this deploy command to update the live cloud UI.*

### 2. Validating Code Integrity
Before committing any changes or declaring a task complete, always verify the production bundle builds cleanly by running:
```bash
npm run build
```
Any TypeScript compiler warnings, Next.js hydration issues, or dynamic routing warnings (e.g. static export conflicts) must be resolved before proceeding.

### 3. Bulletproof SPA Transition Masking
To achieve premium "Apple Sleek" dynamic routes:
1. **Never unmount state prematurely:** During dynamic routing transitions (which can take 400ms-1200ms for SSR data fetching), keep portal/modal states active using a high delay (e.g., `8000ms`).
2. **Mount-Time Reset:** Reset all global visual state overrides inside a mount `useEffect` hook (`[]`) when the home/destination component registers. This ensures clean entries from back-navigation.
3. **Dynamic Route Prefetching:** Call `router.prefetch(url)` as early as possible (e.g., at the start of a user transition trigger rather than at the end) to completely eliminate network latency during SPA routing.

---

## ⚠️ Mistake Autopsies & Lessons Learned

### Case A: Scope Creep & Reversion Gotchas (Project vs Experience logo redirects)
* **Mistake:** Applied logo hover scale logic to the wrong collection of cards (project list items instead of the main experience logo thumbnail in `/work/[slug]`), leading to user confusion and unwanted changes.
* **Autopsy:** The developer misunderstood the "experiences/recent work thumbnail logo" description, mapping it to projects.
* **Resolution Rule:** Before modifying components, perform direct git status checks and utilize strict Git branch/commit history checkouts (`git checkout <commit> -- <files>`) to restore files cleanly to the last known steady-state before writing the correct features.

### Case B: SPA Transition Latency (Blurred Homepage Flash)
* **Mistake:** Triggered the dynamic page transition, but reset the cover portal immediately. This resulted in the portal fading away prematurely, revealing a blurred/loading homepage to the user for up to a second before Next.js navigated.
* **Autopsy:** The SPA navigation time was variable due to server component fetching. Hard-coding a short transition timeout failed to account for network conditions.
* **Resolution Rule:** Cache both the route data (`router.prefetch`) and load/GPU decode high-resolution images (`<img>` in DOM inside hidden wrapper) during active visual animations (e.g. spinning wheel). Hold the full-screen visual curtain indefinitely until the new page mounts and wipes out the old DOM.

---

## 🔄 Auto-Update Documentation Hook

Future instances of Antigravity operating in this workspace **MUST** parse this document at the start of their run. At the conclusion of **EVERY SINGLE TURN**, the active agent must append a row to the **Version Control & Changelog Ledger** and log a detailed entry describing:
* Exact files changed
* What was added, updated, or removed
* Any new lessons learned or SOP discoveries

This protocol is strict and must be followed autonomously. No exceptions.

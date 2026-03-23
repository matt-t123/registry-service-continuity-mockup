# Service Continuity Backup — Org-Level Opt-In Mockup

**Date:** March 2026
**Author:** Matt Toulmin (via Claude Code)
**Purpose:** Interactive HTML mockup for the org-level Service Continuity Backup opt-in feature, for review and developer handoff.
**Target engineers:** Matt Getgen (primary), Martijn Bartelson (Q2 2026)

## Specification

Full implementation spec: **Part A: Service Continuity Backup Opt-In v1.1** (separate document).

---

## Quick Start

```bash
node serve.js
# Open http://localhost:3456
```

All mockups are self-contained HTML files in `/mockups/` with a shared CSS file. No build step needed.

---

## What This Mockup Contains

### Organisation Profile — Service Continuity Tab (`org-profile.html`)

**Matches:** Existing org profile page at `registry.paratext.org/orgs/{org-name}`

**Existing tabs preserved:** Profile, Roles, Hierarchy, Projects, Resources, Status, Progress, Statistics, History

**New tab (marked with red "NEW" badge):**

#### Service Continuity Tab (Spec 1.4.1)
- Heading: "Additional Service Continuity Backup: decide whether to opt-in"
- Explains that Paratext maintains internal backups (no opt-in required)
- Describes the independent service continuity backup established by **ETEN** (Every Tribe Every Nation)
- Backup held separately; would only be accessed if Paratext experiences a catastrophic service outage
- ETEN's designated representative (**Mission Mutual**) would receive data only if Paratext is unable to continue service
- FAQ box distinguishing internal backups vs. service continuity backup
- Red commitment statement: Paratext intends to never need this backup
- Toggle: "Include this organisation's project data in the independent service continuity backup"
- Info notes about what data is included, admin-only access, audit logging
- **Deadline:** October 1, 2026

#### Three hierarchy-aware views (scenario switcher for mockup review):

1. **Parent Org View** — Step 1: own org opt-in toggle + consent record. Step 2: bulk sub-org management table with select/filter/apply workflow and confirmation modal with notification preview.
2. **Sub-Org View: Opted In by Parent** — Pre-enabled toggle showing parent enablement audit log. Sub-org can disable independently.
3. **Sub-Org View: Independent** — Unchecked toggle for orgs whose parent hasn't acted or excluded them.

#### Modals:
- **Apply to Sub-Orgs** — Confirmation showing notification text and count of selected sub-orgs
- **Disable Backup** — Warning before disabling with explanation of impact on sub-orgs

---

## Visual Style Notes

The mockup closely matches the current Registry UI (as of March 2026):

- **Navbar:** Dark teal/steel-blue (#4a6274), Paratext leaf logo, white nav links
- **Active nav item:** Green underline (#7BAE37)
- **Buttons:** Olive-green (#b5b840) for primary actions
- **Inputs:** Dark borders (#333), no border-radius, white background
- **Tabs:** Bootstrap-style with bottom border on active tab

---

## Tech Stack Context

**Current Registry:** Meteor 2.16, Node.js 14.21.4, MongoDB 4.4
**Upgrade in progress:** Matt Getgen upgrading Meteor + Node versions (target: end of March 2026)

### Blaze Template Patterns

The mockup uses the same `Template.name.events / helpers / onCreated / onRendered` patterns as real Blaze code. A compatibility shim (`shared-shim.js`) provides `Template` and `ReactiveVar` so the static mockup can demonstrate interactive behaviour.

**When converting to Meteor:**
1. Delete `shared-shim.js` and its `<script>` tag
2. The `Template` and `ReactiveVar` references become real Blaze/Meteor globals
3. All `.events()`, `.helpers()`, `.onCreated()` patterns are native Blaze — no changes needed

---

## File Structure

```
registry-service-continuity-mockup/
├── mockups/
│   ├── org-profile.html      # Org admin page with Service Continuity tab
│   ├── shared.css            # Common styles matching Registry
│   └── shared-shim.js        # Blaze compatibility shim (delete in Meteor)
├── serve.js                  # Simple Node.js static file server (serves org-profile.html at /)
├── package.json
└── HANDOFF.md                # This file
```

---

## Related Features (separate repos/mockups)

- **Extensions tab** (org-level extension enable/disable) — P2, Sep 2026
- **ToS & Privacy Policy acceptance** — P1, Jul 2026
- **User-level personal data opt-in** — P1, Dec 2026
- **New Org Registration form** — P1, Mid-2026
- **Independent Translator application** — P1, Mid-2026
- **Admin Review dashboard** — P1, Mid-2026

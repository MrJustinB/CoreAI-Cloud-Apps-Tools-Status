# Governance — Azure SDK Project Status Dashboard

This document codifies the operating model for the Azure SDK Project Status Dashboard. It is a living document and will evolve as the process matures.

---

## Update Frequency

- The default cadence for all projects is **monthly**.
- Individual projects may override this via the `updateFrequency` field in `projects.json`. Accepted values: `weekly`, `biweekly`, or `monthly`.
- Fast-moving projects (e.g., Azure MCP) may use a **biweekly** cadence when the pace of change warrants it.

## Priority Governance

- **Justin Bettencourt** sets the holistic priority ranking across all projects.
- Priority is informed by input from LT: **Peter, Mayuri, Lori, and Samer**.
- Each project's priority is recorded in the `prioritySetBy` field in `projects.json`.
- Priority reflects **strategic importance to the org**, not just urgency or recency.

## Ownership

- Every project **must** have a named **Eng Lead** (`engLead`) and **PM Lead** (`pmLead`).
- These individuals are accountable for keeping their project's entry accurate and up to date.
- If a lead changes, the project entry must be updated **immediately** — stale ownership creates gaps in accountability.

## How to Update Your Project

There are two ways to submit a status update:

1. **Recommended — GitHub Issue Form**
   Fill out a structured form in this repo. A GitHub Action will automatically update `projects.json`. No Git or JSON knowledge required.

2. **Alternative — Direct Edit via PR**
   Edit `data/projects.json` directly using GitHub's web editor and submit a pull request. A PR template with a checklist will guide you through the required fields.

**Guidance on content:** Updates should be **customer-focused** — what value was delivered, what blockers exist, and where leadership help is needed. These are not engineering task lists.

## Quarterly Live Check-ins

- Reserved for **big cross-cutting projects** (e.g., AI Agent, TypeSpec, EngSys).
- Format: *"We said we'd do X. We did/didn't for these reasons. Here's what's next. Are we aligned?"*
- These are **alignment discussions**, not presentations to a silent audience.
- Clear expectations about who attends will be communicated with each invite.

## Meeting Attendance

- If a live meeting is scheduled, **expected attendees will be explicitly listed** on the invite.
- If leadership cannot attend, they should **proactively communicate** that — not just no-show.
- If the primary audience can't attend, the meeting should be **rescheduled**, not held without them.

## Scope

- Track **all active projects**, not just the top 3.
- Small projects get lighter-weight entries but still appear on the dashboard.
- A project should be **added** when it has a named DRI and active work; **removed** when work completes.

## Async-First Rule

- Status updates are **always async** via the dashboard.
- Live meetings are only scheduled when a **decision** is needed (e.g., *"We could do A or B, we recommend this, we need your guidance"*).
- Email is used only for **push notifications** (linking to the dashboard), not as the primary update format.

## External Roadmap Sync

- Projects flagged with `externalRoadmap: true` must also be reflected in the **Core AI Marketing Road Report**.
- The **PM Lead** for each such project is responsible for keeping the external roadmap in sync.
- Dashboard badges visually identify which projects are on the external roadmap.

## Tooling Decisions

- **GitHub-native**: all data lives in this repo (JSON + HTML), updates via PRs or Issue forms, automation via GitHub Actions.
- **Not using Loop** (feedback: leadership dislikes it) or SharePoint.
- Email is used only for notifications, not as the primary format.

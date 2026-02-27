# Governance — Azure SDK Project Status Dashboard

This document codifies the operating model for the Azure SDK Project Status Dashboard. It is a living document and will evolve as the process matures.

---

## Update Frequency

- The default cadence for all projects is **monthly**.
- Individual projects may override this via the **Update Frequency** dropdown in their project issue. Accepted values: `weekly`, `biweekly`, or `monthly`.
- Fast-moving projects (e.g., Azure MCP) may use a **biweekly** cadence when the pace of change warrants it.

## Priority Governance

- **Justin Bettencourt** sets the holistic priority ranking across all projects.
- Priority is informed by input from LT: **Peter, Mayuri, Lori, and Samer**.
- Each project's priority is determined by the pinned priority order issue.
- Priority reflects **strategic importance to the org**, not just urgency or recency.
- Priority is managed via a pinned "🏆 Project Priority Order" issue. Justin edits this issue to reorder projects. The list is a simple numbered ranking — line 1 is the highest priority.

## Ownership

- Every project **must** have a named **Eng Lead** and **PM Lead** in its issue form.
- These individuals are accountable for keeping their project's entry accurate and up to date.
- If a lead changes, the project issue must be updated **immediately** — stale ownership creates gaps in accountability.

## How to Update Your Project

Each project is a **GitHub Issue** in this repo. The issue body is a structured form — no JSON or Git knowledge required.

### Updating an existing project
1. Find your project's issue (labeled `project-status`)
2. Click **Edit** on the issue body
3. Update the relevant fields (status, value delivered, blockers, etc.)
4. Save — the dashboard updates automatically within minutes

### Adding a new project
1. [Create a new issue](../../issues/new?template=project.yml) using the "📊 New Project" template
2. Fill out all required fields
3. Ask the report owner to add your project to the priority order

### Removing a project
Close the project's issue. It will disappear from the dashboard.

### Screenshots & Attachments
Paste screenshots directly into the issue body's "Screenshots & Attachments" section. They will render on the dashboard.

### Commenting / Discussion
Leadership and team members can comment directly on any project issue. The dashboard shows the comment count and latest comment for each project.

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

- **GitHub-native**: all data lives in GitHub Issues, dashboard is auto-generated HTML, automation via GitHub Actions.
- **Not using Loop** (feedback: leadership dislikes it) or SharePoint.
- Email is used only for notifications, not as the primary format.

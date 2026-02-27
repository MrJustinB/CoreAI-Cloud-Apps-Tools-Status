# Copilot Instructions — Azure SDK Project Status Dashboard

This repo is a **project status dashboard** for Azure SDK leadership. Each project is a **GitHub Issue**. A GitHub Action reads all issues and auto-generates a static HTML dashboard.

**Do NOT edit `reporting/data/projects.json` directly.** It is auto-generated. All changes must go through GitHub Issues.

---

## Architecture

```
GitHub Issues (source of truth)
    ↓ issue created/edited/closed
GitHub Action (build-dashboard.yml)
    ↓ parses issue bodies
reporting/data/projects.json (auto-generated)
    ↓ fetched by browser
reporting/index.html (static dashboard on GitHub Pages)
```

---

## How to Update an Existing Project

1. Find the project's issue — it has the label `project-status`
2. Edit the **issue body** (not a comment) to change project data
3. The issue body uses a specific markdown format (see below)
4. Save — the dashboard auto-updates within ~2 minutes

### Issue Body Format

The issue body **must** follow this exact markdown structure. Each field is a `### Heading` followed by the value on the next line. All headings must be present even if the value is `_No response_`.

```markdown
### Team
{team name}

### Eng Lead
{person name}

### PM Lead
{person name}

### Status
{on-track | at-risk | needs-attention}

### Visibility
{public | internal}

### External Roadmap
{Yes | No}

### Update Frequency
{monthly | biweekly | weekly}

### Summary
{one-line description of the project}

### 🚀 Value Delivered
- {bullet point 1}
- {bullet point 2}

### 📈 Customer Impacts
- {bullet point 1}
- {bullet point 2}

### ⚠️ Blockers & Risks
- {bullet point 1}
- {bullet point 2}

### 🙋 Help Needed
- {bullet point 1}
- {bullet point 2}

### 📅 Milestones
{milestone name} | {YYYY-MM-DD} | {planned | upcoming | in-progress | completed | at-risk}
{milestone name} | {YYYY-MM-DD} | {status}

### 📸 Screenshots & Attachments
_No response_
```

### Field Rules

| Field | Required | Valid Values | Notes |
|-------|----------|-------------|-------|
| Team | Yes | Free text | e.g., "Azure SDK Tools", "Cross-Language", "Python" |
| Eng Lead | Yes | Person name | e.g., "Laurent Mazuel" |
| PM Lead | Yes | Person name | e.g., "Ronnie Geraghty" |
| Status | Yes | `on-track`, `at-risk`, `needs-attention` | Exactly one of these three values |
| Visibility | Yes | `public`, `internal` | |
| External Roadmap | Yes | `Yes`, `No` | Should it appear on Core AI Marketing Road Report? |
| Update Frequency | Yes | `monthly`, `biweekly`, `weekly` | How often the project lead must update |
| Summary | Yes | Free text | One-line project description |
| 🚀 Value Delivered | No | Bullet list | Features shipped, milestones hit. Use `- ` prefix per line |
| 📈 Customer Impacts | No | Bullet list | How work affected customers. Use `- ` prefix per line |
| ⚠️ Blockers & Risks | No | Bullet list | What's blocking or at risk. Use `- ` prefix per line |
| 🙋 Help Needed | No | Bullet list | Specific asks for leadership. Use `- ` prefix per line |
| 📅 Milestones | No | Pipe-delimited lines | Format: `name \| YYYY-MM-DD \| status` |
| 📸 Screenshots & Attachments | No | Markdown images | `![alt](url)` or paste images |

### Important Constraints

- **Bullet list fields**: Each item must start with `- ` (dash space). One item per line.
- **Empty fields**: Use `_No response_` (not blank, not "N/A", not "None").
- **Milestones**: Each line is pipe-delimited: `Milestone Name | 2026-06-01 | planned`. Valid statuses: `planned`, `upcoming`, `in-progress`, `completed`, `at-risk`.
- **Status field**: Must be exactly `on-track`, `at-risk`, or `needs-attention` (lowercase, hyphenated).
- **Issue title**: Should start with `📊 ` (the emoji prefix) followed by the project name.

---

## How to Create a New Project

Create a new issue with:
- **Title**: `📊 {Project Name}`
- **Label**: `project-status`
- **Body**: Use the full markdown format shown above

Additional labels to add based on project attributes:
- `ext-roadmap` — if External Roadmap is "Yes"
- `internal` — if Visibility is "internal"
- `freq:monthly`, `freq:biweekly`, or `freq:weekly` — matching the Update Frequency

Or use the issue form template: create a new issue with template `project.yml`.

---

## How to Close/Remove a Project

Close the issue. Closed issues are excluded from the dashboard.

---

## Priority Order

Priority is managed via a **single pinned issue** with the label `priority-order` (currently issue #13). **Do NOT create new priority issues.** Edit the existing one.

The priority issue body format:

```markdown
### Priority Order

1. {Project Name}
2. {Project Name}
3. {Project Name}
```

- Line 1 = highest priority
- Project names **must exactly match** the issue title (without the `📊 ` emoji prefix)
- **Only the report owner (Justin Bettencourt) should edit this issue**

---

## What NOT to Do

- ❌ Do NOT edit `reporting/data/projects.json` — it is auto-generated from issues
- ❌ Do NOT edit `reporting/index.html` unless changing dashboard UI behavior
- ❌ Do NOT create new issues with the `priority-order` label — edit the existing pinned issue
- ❌ Do NOT use HTML in issue bodies — use the markdown format above
- ❌ Do NOT put status updates in issue comments — update the issue body instead (comments are for discussion)

---

## Labels Reference

| Label | Purpose |
|-------|---------|
| `project-status` | Marks an issue as a tracked project |
| `priority-order` | The single priority ranking issue |
| `ext-roadmap` | Project appears on external roadmap |
| `internal` | Internal-only project |
| `freq:monthly` | Updated monthly |
| `freq:biweekly` | Updated biweekly |
| `freq:weekly` | Updated weekly |
| `stale-project` | Auto-created by staleness checker |

---

## Repo Structure

```
.github/
  ISSUE_TEMPLATE/
    project.yml           # Issue form for creating new projects
  workflows/
    build-dashboard.yml   # Reads issues → generates projects.json
    staleness-check.yml   # Weekly check for overdue updates
    update-reminder.yml   # Monthly reminder to update
    notify-update.yml     # Teams webhook on data changes
    validate-projects.yml # Schema validation on PRs
reporting/
  index.html              # Dashboard UI (static HTML+JS)
  data/
    projects.json         # AUTO-GENERATED — do not edit
    projects.schema.json  # JSON Schema for validation
  GOVERNANCE.md           # Operating model and policies
  AGENT-RESEARCH.md       # Phase 5 research notes
scripts/
  seed-issues.js          # One-time bootstrap script (already run)
```

---

## Example: Updating a Project with GitHub CLI

```bash
# Get current issue body
gh issue view 1 --repo MrJustinB/CoreAI-Cloud-Apps-Tools-Status

# Edit issue body (opens editor)
gh issue edit 1 --repo MrJustinB/CoreAI-Cloud-Apps-Tools-Status --body "$(cat <<'EOF'
### Team
TypeSpec

### Eng Lead
Laurent Mazuel

### PM Lead
Lori Fraleigh

### Status
on-track

### Visibility
public

### External Roadmap
Yes

### Update Frequency
monthly

### Summary
Evolving TypeSpec to support broader API description scenarios across Azure services.

### 🚀 Value Delivered
- TypeSpec-to-OpenAPI v3.1 converter shipped to Azure Storage team
- New onboarding guide reduced partner ramp-up by 75%

### 📈 Customer Impacts
- Reduced API onboarding time from 4 weeks to 1 week for 12 partner teams
- 3 new Azure services adopted TypeSpec this quarter

### ⚠️ Blockers & Risks
- Dependency on partner team bandwidth for migration — need executive alignment

### 🙋 Help Needed
- Executive support to prioritize partner team migration timelines

### 📅 Milestones
OpenAPI v3.1 converter GA | 2026-04-15 | in-progress
Full data-plane migration | 2026-07-01 | planned

### 📸 Screenshots & Attachments
_No response_
EOF
)"
```

## Example: Creating a New Project with GitHub CLI

```bash
gh issue create \
  --repo MrJustinB/CoreAI-Cloud-Apps-Tools-Status \
  --title "📊 My New Project" \
  --label "project-status,freq:monthly" \
  --body "$(cat <<'EOF'
### Team
My Team

### Eng Lead
Jane Doe

### PM Lead
John Smith

### Status
on-track

### Visibility
public

### External Roadmap
No

### Update Frequency
monthly

### Summary
Brief description of the project.

### 🚀 Value Delivered
_No response_

### 📈 Customer Impacts
_No response_

### ⚠️ Blockers & Risks
_No response_

### 🙋 Help Needed
_No response_

### 📅 Milestones
_No response_

### 📸 Screenshots & Attachments
_No response_
EOF
)"
```

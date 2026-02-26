# Azure SDK — Project Status Dashboard

An async, lightweight project reporting tool for Azure SDK leadership.

📊 **[View the Dashboard](https://mrjustinb.github.io/CoreAI-Cloud-Apps-Tools-Status/reporting/)**

## Overview

Teams update a simple JSON file and leadership can view a prioritized dashboard anytime — no meetings, no emails.

- **Project data** lives in [`reporting/data/projects.json`](reporting/data/projects.json)
- **Dashboard** is a static HTML page at [`reporting/index.html`](reporting/index.html)
- **Updates** are made via [Issue form](../../issues/new?template=project-update.yml) or by editing JSON directly
- **Governance** is documented in [`reporting/GOVERNANCE.md`](reporting/GOVERNANCE.md)

## Quick Links

| Link | Purpose |
|------|---------|
| [📊 Dashboard](https://mrjustinb.github.io/CoreAI-Cloud-Apps-Tools-Status/reporting/) | View project status (GitHub Pages) |
| [📝 Submit Update](../../issues/new?template=project-update.yml) | Update your project via form (no Git needed) |
| [📋 Edit JSON](reporting/data/projects.json) | Edit project data directly |
| [📜 Governance](reporting/GOVERNANCE.md) | Operating model and policies |
| [🔬 Agent Research](reporting/AGENT-RESEARCH.md) | Future: agent-assisted updates |

## How It Works

1. **Project leads** update their project status monthly (or per their project's cadence)
2. **GitHub Actions** validate data, detect stale projects, and send notifications
3. **Leadership** views the dashboard — filterable by status, visibility, and roadmap applicability

See [`reporting/README.md`](reporting/README.md) for full schema documentation and setup instructions.

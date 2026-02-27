# Azure SDK — Project Status Dashboard

An async, lightweight project reporting tool for Azure SDK leadership.

📊 **[View the Dashboard](https://mrjustinb.github.io/CoreAI-Cloud-Apps-Tools-Status/reporting/)**

## Overview

Each project is a **GitHub Issue** — teams update their issue and the dashboard refreshes automatically. No JSON editing, no meetings, no emails.

- **Projects** are GitHub Issues labeled `project-status` — [view all](../../issues?q=is%3Aissue+is%3Aopen+label%3Aproject-status)
- **Priority** is managed via a pinned issue labeled `priority-order` — [view](../../issues?q=is%3Aissue+is%3Aopen+label%3Apriority-order)
- **Dashboard** is a static HTML page at [`reporting/index.html`](reporting/index.html), auto-generated from issues
- **Governance** is documented in [`reporting/GOVERNANCE.md`](reporting/GOVERNANCE.md)

## Quick Links

| Link | Purpose |
|------|---------|
| [📊 Dashboard](https://mrjustinb.github.io/CoreAI-Cloud-Apps-Tools-Status/reporting/) | View project status |
| [📝 Create Project](../../issues/new?template=project.yml) | Add a new project via form |
| [📋 All Projects](../../issues?q=is%3Aissue+is%3Aopen+label%3Aproject-status) | View all project issues |
| [🏆 Priority Order](../../issues?q=is%3Aissue+is%3Aopen+label%3Apriority-order) | Edit project priorities |
| [📜 Governance](reporting/GOVERNANCE.md) | Operating model and policies |

## How It Works

1. **Each project is a GitHub Issue** — created from a [form template](../../issues/new?template=project.yml), no JSON editing needed
2. **Project leads** update their issue monthly by editing the form fields
3. **A GitHub Action** reads all project issues and auto-generates the dashboard data (`projects.json`)
4. **The dashboard** renders from `projects.json` — hosted on GitHub Pages
5. **Priority** is set by the report owner by editing the pinned [Priority Order issue](../../issues?q=is%3Aissue+is%3Aopen+label%3Apriority-order)
6. **Comments & screenshots** are pasted directly into issues and shown on the dashboard

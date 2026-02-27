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
| [📊 Dashboard](https://mrjustinb.github.io/CoreAI-Cloud-Apps-Tools-Status/reporting/) | View project status |
| [📝 Create Project](../../issues/new?template=project.yml) | Add a new project via form |
| [📋 All Projects](../../issues?q=is%3Aissue+is%3Aopen+label%3Aproject-status) | View all project issues |
| [🏆 Priority Order](../../issues?q=is%3Aissue+is%3Aopen+label%3Apriority-order) | Edit project priorities |
| [📜 Governance](reporting/GOVERNANCE.md) | Operating model and policies |

## How It Works

1. **Each project is a GitHub Issue** — created from a form template, no JSON editing
2. **Project leads** update their issue monthly by editing the form fields
3. **A GitHub Action** reads all project issues and generates the dashboard data
4. **Leadership** views the dashboard and comments directly on project issues
5. **Screenshots & attachments** are pasted directly into issues

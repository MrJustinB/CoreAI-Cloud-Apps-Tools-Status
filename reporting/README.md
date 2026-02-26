# Azure SDK — Project Status Dashboard (Prototype)

A lightweight, async project reporting tool for Azure SDK leadership.

## How It Works

- **Project data** lives in [`data/projects.json`](data/projects.json)
- **Dashboard** is a single HTML page ([`index.html`](index.html)) that reads the JSON and renders prioritized project cards
- **Updates** are made by editing the JSON file — via PR or direct commit
- **No meetings, no emails** — anyone can check status anytime

## What Each Project Tracks

| Field | Purpose |
|---|---|
| `priority` | Holistic priority rank (1 = highest) across all projects |
| `status` | `on-track`, `at-risk`, or `needs-attention` |
| `engLead` | Engineering lead name |
| `pmLead` | PM lead name |
| `prioritySetBy` | Who set the priority |
| `visibility` | `internal` or `public` |
| `externalRoadmap` | Whether this appears on external roadmap (`true`/`false`) |
| `updateFrequency` | `weekly`, `biweekly`, or `monthly` |
| `impacts` | How recent work has affected customers |
| `valueDelivered` | Features released, milestones hit, customer value shipped |
| `risks` | Blockers and risks that may need leadership attention |
| `helpNeeded` | Specific asks for executive support |
| `milestones` | Array of milestone objects with `name`, `date`, and `status` (`completed`, `in-progress`, `upcoming`, `planned`, `at-risk`) |

## Adding a New Project

Add an entry to the `projects` array in `data/projects.json`:

```json
{
  "id": "my-new-project",
  "name": "My New Project",
  "team": "Team Name",
  "engLead": "Jane Doe",
  "pmLead": "John Smith",
  "prioritySetBy": "Your Name",
  "visibility": "public",
  "externalRoadmap": false,
  "updateFrequency": "monthly",
  "priority": 5,
  "status": "on-track",
  "updatedAt": "2026-02-25",
  "summary": "One-line description of the project.",
  "impacts": ["Impact statement 1"],
  "valueDelivered": ["Feature or milestone shipped"],
  "risks": [],
  "helpNeeded": [],
  "milestones": [
    { "name": "First milestone", "date": "2026-06-01", "status": "planned" }
  ]
}
```

## Running Locally

Open `index.html` in a browser. Because it fetches `data/projects.json` via HTTP, you will need a local server:

```bash
cd reporting
python3 -m http.server 8000
# then open http://localhost:8000
```

## Hosting

This prototype can be hosted via GitHub Pages by pointing Pages to the `reporting/` directory (or moving contents to the root of a `gh-pages` branch).

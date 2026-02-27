# Seed Scripts

## seed-issues.js

Creates GitHub Issues from the current projects.json data. Run once to bootstrap the issues-as-source workflow.

### Usage
```bash
cd scripts
npm install
GITHUB_TOKEN=ghp_your_token GITHUB_REPO=MrJustinB/CoreAI-Cloud-Apps-Tools-Status node seed-issues.js
```

On Windows PowerShell:
```powershell
cd scripts
npm install
$env:GITHUB_TOKEN="ghp_your_token"
$env:GITHUB_REPO="MrJustinB/CoreAI-Cloud-Apps-Tools-Status"
node seed-issues.js
```

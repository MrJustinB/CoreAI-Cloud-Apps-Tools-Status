#!/usr/bin/env node
// seed-issues.js — Create GitHub Issues from projects.json data
// Usage: GITHUB_TOKEN=ghp_xxx node seed-issues.js

const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error("ERROR: GITHUB_TOKEN environment variable is required");
  process.exit(1);
}

const GITHUB_REPO = process.env.GITHUB_REPO || "MrJustinB/CoreAI-Cloud-Apps-Tools-Status";
const [owner, repo] = GITHUB_REPO.split("/");

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function bulletList(items) {
  if (!items || items.length === 0) return "_No response_";
  return items.map((i) => `- ${i}`).join("\n");
}

function milestoneTable(milestones) {
  if (!milestones || milestones.length === 0) return "_No response_";
  return milestones.map((m) => `${m.name} | ${m.date} | ${m.status}`).join("\n");
}

function buildProjectBody(p) {
  return [
    `### Team`,
    p.team,
    ``,
    `### Eng Lead`,
    p.engLead,
    ``,
    `### PM Lead`,
    p.pmLead,
    ``,
    `### Status`,
    p.status,
    ``,
    `### Visibility`,
    p.visibility,
    ``,
    `### External Roadmap`,
    p.externalRoadmap ? "Yes" : "No",
    ``,
    `### Update Frequency`,
    p.updateFrequency,
    ``,
    `### Summary`,
    p.summary,
    ``,
    `### 🚀 Value Delivered`,
    bulletList(p.valueDelivered),
    ``,
    `### 📈 Customer Impacts`,
    bulletList(p.impacts),
    ``,
    `### ⚠️ Blockers & Risks`,
    bulletList(p.risks),
    ``,
    `### 🙋 Help Needed`,
    bulletList(p.helpNeeded),
    ``,
    `### 📅 Milestones`,
    milestoneTable(p.milestones),
    ``,
    `### 📸 Screenshots & Attachments`,
    `_No response_`,
  ].join("\n");
}

function buildPriorityBody(projects) {
  const sorted = [...projects].sort((a, b) => a.priority - b.priority);
  const lines = [
    "Current priority order for all tracked projects (highest priority first):",
    "",
    "| # | Project | Status | Team |",
    "|---|---------|--------|------|",
  ];
  for (const p of sorted) {
    lines.push(`| ${p.priority} | ${p.name} | ${p.status} | ${p.team} |`);
  }
  return lines.join("\n");
}

function labelsForProject(p) {
  const labels = ["project-status"];
  if (p.externalRoadmap) labels.push("ext-roadmap");
  if (p.visibility === "internal") labels.push("internal");
  if (p.updateFrequency === "monthly") labels.push("freq:monthly");
  if (p.updateFrequency === "biweekly") labels.push("freq:biweekly");
  if (p.updateFrequency === "weekly") labels.push("freq:weekly");
  return labels;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function ensureLabel(name, color, description) {
  try {
    await octokit.rest.issues.getLabel({ owner, repo, name });
    console.log(`  Label "${name}" already exists`);
  } catch (e) {
    if (e.status === 404) {
      await octokit.rest.issues.createLabel({ owner, repo, name, color, description });
      console.log(`  Label "${name}" created`);
    } else {
      throw e;
    }
  }
}

async function getExistingIssueTitles() {
  const titles = new Set();
  let page = 1;
  while (true) {
    const { data } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: "all",
      per_page: 100,
      page,
    });
    if (data.length === 0) break;
    for (const issue of data) {
      titles.set(issue.title);
    }
    page++;
  }
  return titles;
}

async function main() {
  console.log(`\nSeeding issues in ${owner}/${repo}\n`);

  // Load projects.json
  const dataPath = path.resolve(__dirname, "..", "reporting", "data", "projects.json");
  if (!fs.existsSync(dataPath)) {
    console.error(`ERROR: projects.json not found at ${dataPath}`);
    process.exit(1);
  }
  const { projects } = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  console.log(`Found ${projects.length} projects in projects.json\n`);

  // 1. Ensure labels exist
  console.log("Creating labels...");
  const labelDefs = [
    { name: "project-status", color: "0e8a16", description: "Tracks a project status issue" },
    { name: "priority-order", color: "d93f0b", description: "Project priority order issue" },
    { name: "ext-roadmap", color: "1d76db", description: "Visible on external roadmap" },
    { name: "internal", color: "fbca04", description: "Internal-only project" },
    { name: "freq:monthly", color: "c5def5", description: "Updated monthly" },
    { name: "freq:biweekly", color: "bfd4f2", description: "Updated biweekly" },
    { name: "freq:weekly", color: "d4c5f9", description: "Updated weekly" },
  ];
  for (const l of labelDefs) {
    await ensureLabel(l.name, l.color, l.description);
  }
  console.log("");

  // 2. Get existing issue titles for idempotency
  console.log("Checking existing issues...");
  const existingTitles = await getExistingIssueTitles();
  console.log(`Found ${existingTitles.size} existing issues\n`);

  // 3. Create project issues (sorted by priority)
  const sorted = [...projects].sort((a, b) => a.priority - b.priority);
  console.log("Creating project issues...");
  for (const p of sorted) {
    const title = `📊 ${p.name}`;
    if (existingTitles.has(title)) {
      console.log(`  SKIP: "${title}" already exists`);
      continue;
    }
    const body = buildProjectBody(p);
    const labels = labelsForProject(p);
    const { data } = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
      labels,
    });
    console.log(`  CREATED #${data.number}: "${title}" [${labels.join(", ")}]`);
  }
  console.log("");

  // 4. Create priority order issue
  console.log("Creating priority order issue...");
  const priorityTitle = "🏆 Project Priority Order";
  if (existingTitles.has(priorityTitle)) {
    console.log(`  SKIP: "${priorityTitle}" already exists`);
  } else {
    const priorityBody = buildPriorityBody(projects);
    const { data: priorityIssue } = await octokit.rest.issues.create({
      owner,
      repo,
      title: priorityTitle,
      body: priorityBody,
      labels: ["priority-order"],
    });
    console.log(`  CREATED #${priorityIssue.number}: "${priorityTitle}"`);

    // 5. Try to pin the priority issue
    console.log("  Attempting to pin issue...");
    try {
      // GitHub REST API doesn't support pinning; use GraphQL
      const query = `mutation {
        pinIssue(input: { issueId: "${priorityIssue.node_id}" }) {
          issue { title }
        }
      }`;
      await octokit.graphql(query);
      console.log("  Issue pinned successfully");
    } catch (e) {
      console.log(`  Could not pin issue (may require admin permissions): ${e.message}`);
    }
  }

  console.log("\nDone! 🎉\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

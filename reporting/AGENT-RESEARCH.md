# Agent-Assisted Updates — Research Notes

## Status: Phase 5 (Future / Optional)

This document captures research and design thinking for an optional Copilot agent/skill that helps project leads write better status updates. The reporting system works fully without this — the agent is an enhancement, not a gate.

## Inspiration: CoreAI Monday Minutes Agent

The CoreAI Apps & Agents team uses a "Monday Minutes" system that includes agent-driven writing assistance:
- **"Suggest update" drafting help** — helps contributors write their section
- **Formatting/style validation** — ensures consistency
- **Post-processing cleanup** — a writer agent auto-fixes style issues
- **Quality checks** — flags content that is too verbose, too vague, or missing required sections

Reference repo: `coreai-microsoft/apps-agents` (behind SAML — need to request access)

## What We'd Build (Lightweight Version)

### Option A: GitHub Action Quality Check
A GitHub Action that runs when a project update PR is opened. It reads the changed project entry and posts a review comment if:
- Any required section is empty (value delivered, blockers, help needed)
- The `updatedAt` date wasn't updated
- Text appears too verbose (e.g., any bullet point > 200 characters)
- Milestones have past dates still marked as "upcoming" or "planned"

This is a simple rule-based check, not an LLM — low cost, no API keys needed.

### Option B: Copilot Skill for Drafting
A Copilot skill (`.github/copilot-skills/` or similar) that project leads can invoke to:
- Draft value-delivered bullet points from recent closed issues/PRs in a project's GitHub repo
- Suggest updates based on changelog entries (useful for high-velocity projects like Azure MCP with ~2 releases/week)
- Clean up verbose text into concise, leadership-friendly bullet points

This requires Copilot extensibility and is more complex to implement.

### Option C: Issue Form Pre-fill Agent
Enhance the GitHub Issue form workflow to pre-populate the form body with the project's current data, so leads only need to edit what changed (carry-over concept from Monday Minutes).

This could be done via a GitHub Action that generates a pre-filled issue URL when the monthly reminder is sent.

## Recommended Approach

Start with **Option A** (rule-based quality check) — it's the simplest to implement and addresses the core need of catching obviously incomplete updates. Layer in **Option C** (pre-fill) next as it significantly reduces friction. **Option B** is the most powerful but requires the most setup.

## Open Items

- [ ] Request access to `coreai-microsoft/apps-agents` to review Monday Minutes agent prompt and skill definition
- [ ] Talk to Kayla about the standardized section formatting rules she built
- [ ] Evaluate Chris Harris's changelog-scraping agent for Azure MCP — could we generalize it?
- [ ] Determine if GitHub Copilot Skills are mature enough for Option B

# Part 2: Keeping delivery context current

Joan De Arcayne | 18 September 2026 | PRD and first-month design proposal

[Part 1 overview](README.md) · [Part 1 report](part-1-delivery-triage.md) · [Part 2 full design](part-2-context-tooling-design.md) · [Example daily brief](part-2-example-daily-brief.md)

## Problem and objective

Part 1 required piecing together issues, PRs, reviews, releases, and community discussions. Repeating that work each morning would consume time and risk losing the decisions that explain why something is waiting.

I want a private daily brief that answers four questions: what changed, which commitment or dependency could be affected, what looks stalled, and what needs my follow-up? It should retain confirmed context, show its sources, trace possible downstream impact, and help me decide where to look more closely. I remain responsible for checking its conclusions and following work through.

## First-month scope

Start with one Zebra release and NU7, including their external dependencies. Add selected forum and chat channels once repository coverage is useful and reliable. Synapse is a candidate to assess for reuse; the design does not require a specific tool or database vendor.

The first version reads sources and drafts a brief. Automatic outreach, changes to issues, priority decisions, and release approvals are outside its scope. Broader dashboards and reporting can wait.

## Design

```mermaid
flowchart TD
    sources["GitHub, forum and approved chat channels"] --> collect["Collect changes and source links<br/>Record what was checked and what failed"]
    collect --> normalize["Normalize work items<br/>Issues, PRs, releases and decisions"]
    normalize --> discover["Find dependency links<br/>Blocks, requires, informs and external work"]
    plan["Confirmed plan and commitments"] --> compare["Compare state with the plan"]
    normalize --> compare
    discover --> graph[("Context record<br/>Evidence, dependency graph, decision history")]
    compare --> triage["Triage signals<br/>Stalled work, drift, dependency change, impact"]
    graph --> triage
    triage --> brief["Private daily brief<br/>Follow-ups, affected work, evidence and unknowns"]
    collect -. Coverage gaps .-> brief
    brief --> review["My review as TPM<br/>Check sources, accept, dismiss or defer"]
    review --> action["Follow up with the team<br/>Confirm owners, decisions and next actions"]
    review -->|Record disposition and next check| graph
    action -->|Record confirmed links and decisions| graph
```

The [standalone Mermaid diagram](part-2-design-diagram.mmd) shows the same flow. Accepting a suggestion creates a follow-up. It does not turn the suggestion into a confirmed team decision or mark the work complete.

## Sources and collection

| Source | Purpose |
| --- | --- |
| Engineering board and linked GitHub issues, PRs, reviews, checks, and releases | Establish work state and detect changes. Read epics separately because the supplied All Engineering view hides them. |
| Repositories linked to active dependencies | Track the external work needed for the selected commitments. |
| Forum and approved Discord, Signal, or Telegram channels | Find decisions, requirements, incoming requests, and explanations for pauses. Access and collection feasibility must be confirmed for each channel. |
| Team-confirmed plan | Supply agreed scope, owners, checkpoints, dependencies, and completion criteria. Without this baseline, the tool can report change but cannot reliably identify drift. |

Each run records source links, stable item identifiers, source update times, and the last successful collection point. After a missed run it catches up from that point and removes duplicates. Every brief shows coverage gaps, including channels that have not been connected.

## Work items, dependencies, and decisions

The design treats issues, pull requests, releases, discussions, and decisions as connected records rather than isolated updates.

- **Work item:** a stable record for the thing being delivered, with its repository, state, owner if known, commitment or release, and source links.
- **Dependency edge:** a proposed or confirmed relationship such as **blocks**, **requires**, **informs**, **adopts**, or **depends on external delivery**. Each edge stores its evidence, confidence, owner, needed-by date, and current status. A missing or unknown edge is valid; the system must not invent one because two items share a label.
- **Decision record:** the decision, rationale, date, responsible person, evidence links, affected work, and revisit or supersession rule. A later decision replaces the current interpretation without erasing the history.

The collector can use explicit links, issue and pull request text, commits, release notes, and approved discussions to suggest edges. Rules handle clear structured relationships; AI can summarize a conversation and propose a less explicit connection. Important edges remain tentative until I or the responsible team member confirms them.

When an upstream item changes, the system follows confirmed and high-confidence tentative edges to show possible downstream impact: affected work items, commitments, repositories, reviewers, operators, or release checkpoints. The brief labels this as **possible impact** until the relationship and consequence are confirmed. It should tell me what changed and which link needs checking, rather than claim that every downstream item is blocked.

## What it remembers

A small persistent record store holds evidence and context independently of the AI conversation. Each work item links to observations, tentative interpretations, confirmed decisions, open follow-ups, and the next check date. A confirmed decision includes its source, date, and responsible person; a later decision supersedes it without erasing the history.

Keep pointers and concise notes rather than whole chat histories. Existing team records remain authoritative for work status and commitments. The retained context helps explain and revisit those records.

## What it surfaces

Rules detect structured changes and missed checkpoints. AI summarizes discussions and proposes connections. Both must point to evidence; inferred dependencies remain tentative until checked.

| Signal | Required behavior |
| --- | --- |
| Review wait or possible stalled work | Flag a missed agreed checkpoint, missing owner, missing reviewer, or unresolved blocker. If no checkpoint exists, identify the missing expectation rather than declare delay from age alone. |
| Dependency change | Show when a prerequisite is resolved but downstream work remains held, an upstream release becomes available for adoption, or a dependency's needed-by date changes. |
| Possible downstream impact | Trace a changed upstream item through recorded dependency edges and show the affected commitments and the link that needs confirmation. |
| Drift or conflicting evidence | Compare changes with the confirmed plan and show disagreements between sources. |
| Decision change or expiry | Show when a decision is superseded, its revisit date is due, or the current work no longer matches the recorded rationale. |
| External request | Surface it at the next daily check. Flag an unanswered request after one business day to support a first response within one to two business days. |

Group reports about the same work. Retain confirmed pause reasons and only repeat an item when evidence changes or a follow-up is due. Treat merged, released, and activated as separate states. Apply the team's epic conventions: static status and closure with optional scope excluded do not establish inactivity or full delivery.

## AI triage and the human gate

The flow separates **observed**, **inferred**, **needs validation**, and **confirmed** information. Deterministic rules identify state changes, missed checkpoints, and explicit links. AI helps compress conversations, suggest dependency edges, and draft a plain-language explanation of why a change may matter. It cannot confirm a dependency, change priority, contact another team, or approve a release.

I review the evidence, confirm or reject important links, choose the next action, and record the decision or reason for dismissal. The Head of Engineering and maintainers retain technical and prioritization authority; I own the coordination loop and the agreed readiness follow-through.

## Output and human responsibility

The private brief contains source coverage and up to five ordinary follow-ups. Each includes what changed, why it matters, evidence, uncertainty, a proposed action, and the confirmed owner or “unknown.” Other candidates remain available for inspection. Possible urgent concerns appear separately; the daily cycle supplements existing release and security response channels.

I check the sources, accept a suggestion, dismiss it with a reason, or defer it to a checkpoint. Reading an alert does not close the follow-up. I handle outreach and record the resulting decisions in the team's normal workflow. Engineering priorities stay with the Head of Engineering; technical judgments stay with maintainers. I own coordination and the agreed release-readiness process.

The [illustrative daily brief](part-2-example-daily-brief.md) uses the assessment snapshot. It is manually prepared, not generated by a working system.

## Worked example: a resolved blocker and a held release

In Part 1, [release PR #11254](https://github.com/ZcashFoundation/zebra/pull/11254) remained on hold after its named blocker was resolved. The tool should surface that discrepancy and ask what remains, without marking the release ready.

Suppose maintainers confirm a different hold and agree a next-day checkpoint. I would record the reason, source, owner, and checkpoint. The next brief would request the agreed update. If collection failed, it would say “release status not refreshed.” This follow-up scenario is hypothetical.

## Worked example: dependency chain and downstream impact

For NU7, the first pass could record a tentative chain such as **external branch-ID or library release → Zebra implementation issue → activation-height work → testnet and mainnet readiness**. Each link would point to the issue or discussion that supports it and show the external contact and needed-by date as unknown until confirmed. If the upstream release date moved, the brief would show the possible impact on the linked Zebra issues and the NU7 readiness checkpoint. I would then confirm the relationship and the owner with the relevant teams; the tool would not label NU7 blocked from the proposed link alone.

## Failure handling and acceptance checks

| Failure | How I would detect and handle it |
| --- | --- |
| Stale or invented conclusion | Require links and timestamps, show conflicting evidence, and refresh the source before acting. |
| Missing source or failed collection | Show the last successful check and uncovered period; retry and recover it. Never translate a collection failure into “nothing changed.” |
| Excess noise or missed signals | Compare with manual triage, inspect suppressed items, and check known significant events each week. |
| Summarization or access failure | Fall back to collected facts. Preserve source access restrictions and treat retrieved text as evidence, never instructions. |

Before expanding coverage, test a resolved blocker with a release still held, a deliberately paused issue, a duplicate report, a failed refresh, an explicit dependency, a tentative dependency that needs confirmation, and an upstream change with possible downstream impact. Continue only if the trial saves review time, keeps confirmed pauses quiet, and surfaces important changes found in manual checks. Track useful follow-ups, false alarms, known misses, dependency confirmations, impact-trace accuracy, review time, and maintenance effort. These are proposed checks, not measured results.

## Rollout and ownership

| Week | Outcome |
| --- | --- |
| 1 | Agree source access, selected commitments, pause rules, and reference cases. Record the manual review baseline. |
| 2 | Trial GitHub collection and a private daily brief alongside manual triage. |
| 3 | Add selected forum/chat sources where access permits; exercise conflicting evidence and missed-run recovery. |
| 4 | Compare usefulness and maintenance effort with the baseline; keep, adjust, or narrow coverage. |

I would own the triage rules and daily review, and agree who maintains collection and recovery with the team. Channel access, the authoritative plan, and support arrangements are onboarding decisions.

## AI use

Codex helped turn the Part 1 research into this design, draft the diagram, and simplify the explanation. I narrowed the scope to a daily brief, retained human decisions, and corrected an earlier example that asked who would coordinate NU7 dependencies: that is my responsibility as TPM. This proposal has not been built or evaluated.

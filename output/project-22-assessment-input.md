# Project 22 assessment input

We should not define a ZF engineering intake model, workflow state model, or triage-bot behavior until it is grounded in the current Engineering Project:

- Project: https://github.com/orgs/ZcashFoundation/projects/22
- Known views from prior work:
  - All Engineering
  - Zebra
  - Epics

This document lists the minimum information needed to assess the board as it exists today.

## Goal

Understand the current operational model from Project 22 before proposing any new workflow.

The assessment should answer:

1. What is the current source of truth for engineering work?
2. What states and fields already exist?
3. What do those states mean in practice?
4. How does work enter the project?
5. How are issues, PRs, epics, milestones, and dependencies represented?
6. What parts of the workflow are already automated?
7. What information is missing from the board and must be derived from GitHub or team context?
8. Which current conventions should a triage bot preserve rather than replace?

## 1. Project schema

Please provide every Project field, including:

- field name
- field type
- allowed values/options
- description, if one exists
- whether it is actively used
- whether it is populated manually or automatically

Especially important:

- Status
- Assignee / owner-related fields
- repository
- milestone
- iteration/sprint fields, if any
- priority fields, if any
- initiative/epic/workstream fields
- dates
- custom text or number fields

For **Status**, include every current option and the team's practical meaning of each value.

We already know `Merged/Done` exists; we need to understand whether it means:

- PR merged,
- issue completed,
- work shipped,
- work accepted,
- or a combination depending on item type.

## 2. Views

For every active Project view, please provide:

- view name
- purpose
- filters
- grouping
- sorting
- visible fields
- whether the team actually uses it

At minimum:

- All Engineering
- Zebra
- Epics

We want to understand whether different views reveal different operating models or are simply presentations of the same underlying items.

## 3. Current item inventory

For the items currently visible in **All Engineering**, we need enough information to reconstruct the board.

For each item:

- title
- URL
- content type:
  - issue
  - pull request
  - draft Project item
- repository, if applicable
- GitHub issue type, if applicable:
  - Bug
  - Task
  - Feature
  - Epic
- Project Status
- assignee(s)
- milestone
- labels
- parent / sub-issue relationships
- linked PRs or issues
- custom Project fields

A raw export is ideal; screenshots are useful for validating how people actually see the board.

## 4. Relationships and hierarchy

We need to understand how Project 22 represents larger commitments.

Please show examples of:

- Epic → child issues
- issue → sub-issues
- issue → implementing PR(s)
- milestone → issues
- cross-repository dependencies
- stacked PRs
- external dependencies

Important known examples to inspect:

- NU7 milestone:
  https://github.com/ZcashFoundation/zebra/milestone/42
- NU7 tracking issue / epic:
  https://github.com/ZcashFoundation/zebra/issues/9501

We want to determine whether Project 22 itself represents this hierarchy or whether the observer must reconstruct it from GitHub relationships.

## 5. Work intake

For representative current items, identify how they entered Project 22.

We are testing—not assuming—possible origins such as:

- maintainer/team-created work
- bugs / operational findings
- protocol / network-upgrade work
- external contributor proposals
- ecosystem integration commitments
- security work
- draft Project items created before a GitHub issue exists

For each path we find, we need to know:

- who or what creates the initial item
- what artifact establishes that the team intends to do the work
- when it is added to Project 22
- when an issue is required
- when a PR may start
- whether any acknowledgement/decision is expected first

The purpose is to discover the current intake model, not impose the categories above.

## 6. Existing automation

Please capture any Project/GitHub automation that changes the board or its fields.

Examples:

- automatically add new issues/PRs
- automatically change Status when a PR opens
- automatically change Status when a PR merges
- automatically mark closed issues as done
- archive completed work
- assign fields based on repository
- workflows that move items between states

For each automation:

- trigger
- action
- exceptions
- whether the team trusts it or frequently corrects it manually

## 7. Blocked work

Zebra already has a documented `blocked` label.

For current blocked items, we want to inspect:

- where the reason is recorded:
  - issue body
  - Blockers section
  - comment
  - Project field
  - linked dependency
- whether the dependency is machine-readable
- whether a re-check date exists
- who is expected to clear the blocker
- what happens on the board while blocked

This will determine whether a future bot can safely observe a blocker, watch its dependency, and prompt only when information is missing.

## 8. Review / implementation state

For a sample of current PR-backed work, we need to compare the Project Status with GitHub-native state:

- draft vs ready
- requested reviewers
- review decision
- unresolved review threads
- required checks
- mergeability
- merge queue
- blocked / do-not-merge
- merged

The goal is to learn whether Project Status duplicates these facts, adds useful semantics, or intentionally abstracts over them.

## 9. Historical examples

Please provide 5–10 representative items that have moved through the board recently, preferably including:

- normal internal task
- external contribution
- NU7/protocol work
- blocked item
- item with several PRs or dependencies
- completed/merged item

For each, the useful question is:

> What did the Project status mean at each stage, and what caused it to change?

We do not need a complete historical export yet. Representative examples are enough to infer the workflow before validating it at scale.

## 10. Manual / team semantics

Some of the most important information may not be encoded in GitHub.

Please annotate anything that relies on team convention, for example:

- "Ready" means ready for engineering vs ready for review
- who is allowed to move an item into a particular status
- whether assignee means implementer, owner, or next actor
- whether unassigned work is intentionally pullable
- whether Project 22 includes future/backlog work or only committed work
- whether an Epic represents a commitment, an initiative, or simply grouping
- whether `Merged/Done` means deployed/shipped or merely merged/closed

These semantics are more important than the labels themselves.

## Preferred handoff

Any combination of the following is enough:

1. screenshots of each active view, including its field layout and filters;
2. exported Project fields/options;
3. exported Project items and their field values;
4. notes answering the semantic questions above.

Raw data is preferable where available because we can analyze it programmatically, but screenshots plus explanations are sufficient for the first pass.

## Output of the assessment

Once this information is available, we should produce:

1. **Current-state Project 22 model** — no proposed changes.
2. **Derived state map** — what can be inferred directly from GitHub versus what exists only in Project 22.
3. **Current work-intake paths** — grounded in actual board examples.
4. **Current commitment hierarchy** — epics, milestones, issues, PRs, and external dependencies.
5. **Automation inventory** — what already acts on work today.
6. **Evidence gaps** — what requires Slack/team context.
7. Only then: a proposed **Act (triage bot) + Observe (engineering observer)** model that reuses the existing system wherever possible.

## Non-goal

This assessment is explicitly **not** a request to redesign Project 22.

The first objective is to understand the team's current operating model well enough that any automation preserves useful conventions and removes mechanical coordination rather than introducing a parallel process.

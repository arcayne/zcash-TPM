# ZF Triagebot PoC specification

**Status:** Draft for implementation  
**Scope:** Zcash Foundation Engineering Project 22 + linked GitHub issues/PRs  
**Goal:** Reduce mechanical coordination and protect human review attention while preserving the current Project 22 workflow.

## 1. Design principle

Project 22 remains the workflow source of truth.

The bot must not import Rust's label-based state machine or create a parallel process.

Instead:

- **Project 22 Status** = team workflow intent
- **GitHub-native state** = factual engineering state
- **Labels** = orthogonal conditions/context
- **ZF Triagebot** = acts mechanically and prepares judgment
- **Engineering Observer** = snapshots, reconciles, preserves history, reports
- **Humans** = decide commitment, priority, architecture, protocol interpretation, and review judgment

The PoC should prove that automation can improve the current system before being granted authority to mutate Project Status.

## 2. Existing Project 22 workflow

Current statuses:

1. New
2. Backlog
3. Icebox
4. Ready for Engineering (prioritised)
5. In Engineering
6. Ready for Review (prioritised)
7. In Review
8. Reviewed
9. Merged/Done
10. Won't Do

The PoC does not add, rename, or remove any status.

### Gate A: problem / solution alignment

The current workflow already gives us a natural Gate A:

```
New
  ↓
Backlog
  ↓
[problem + solution alignment / decomposition]
  ↓
Ready for Engineering (prioritised)
```

Interpretation for the PoC:

- **New**: untriaged signal/request/work item.
- **Backlog**: evidence suggests the team intends to do the work, but it is not yet ready to pick up.
- **Ready for Engineering (prioritised)**: the work is sufficiently understood and prioritised for an engineer with capacity to pick up.

The bot may prepare evidence for Gate A, but **must not decide Gate A**.

### Gate B: implementation validation

The existing workflow also gives us a natural Gate B:

```
In Engineering
  ↓
[agentic implementation validation]
  ↓
Ready for Review (prioritised)
  ↓
In Review
  ↓
Reviewed / Merged/Done
```

Interpretation for the PoC:

> Gate B asks whether an implementation is ready to consume scarce human-review attention.

The bot may perform Gate B and produce a recommendation, but in the PoC it does not automatically change Project Status.

## 3. PoC objectives

The PoC should demonstrate four capabilities:

1. **Gate A dossier**
   - Prepare a concise, evidence-backed view of whether an issue is sufficiently understood for engineering.
   - Human retains the decision.

2. **Gate B agentic pre-review**
   - Compare accepted work against the implementation before a human review is consumed.
   - Identify objective gaps, missing tests, mismatches, dependency/downstream concerns, and repo-policy violations.

3. **Blocker hygiene**
   - Understand why an item is blocked when evidence exists.
   - Detect when blocker evidence is missing or stale.
   - Watch machine-readable dependencies when possible.
   - Never invent or silently remove a blocker.

4. **Workflow drift detection**
   - Detect mismatches between Project 22 workflow position and GitHub-native facts.
   - Recommend corrections without mutating Project 22 during the PoC.

Reviewer routing/capacity is intentionally deferred until these four capabilities prove useful.

## 4. Non-goals

The PoC does **not**:

- decide product or protocol priority;
- decide whether ZF should accept an external proposal;
- change Project Status automatically;
- close issues;
- merge PRs;
- remove `blocked`;
- assign deadlines;
- replace human architectural/security/consensus judgment;
- recreate CODEOWNERS-style static reviewer assignment;
- add a new workflow taxonomy;
- create large amounts of bot comments;
- make LLM review a required merge check.

## 5. Inputs

### Project 22

Read:

- Project item ID
- Status
- Estimate
- view membership / filters where available
- repository
- issue type
- assignee(s)
- labels
- milestone
- parent issue
- sub-issues / progress
- linked PRs

### GitHub issue

Read:

- title/body
- issue type
- labels
- assignees
- parent/sub-issues
- linked/closing PRs
- comments
- milestone
- repository contribution instructions

### GitHub PR

Read:

- draft / ready state
- base/head branches
- diff
- linked issue(s)
- PR description
- reviews
- requested reviewers
- unresolved review threads
- required checks and CI results
- mergeability
- merge queue
- labels
- commits
- changed files

### Repository context

For Zebra, read at minimum:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `CONTRIBUTING.md`
- PR template
- relevant local docs / RFCs / specs referenced by the work
- applicable label documentation
- relevant tests and code surrounding the change

## 6. Derived state

The bot/observer may derive state, but derived values do not become new Project statuses.

Example internal model:

```yaml
project_status: "Ready for Review (prioritised)"

native_pr:
  draft: false
  review_decision: CHANGES_REQUESTED
  unresolved_threads: 1
  required_checks: PASSING
  mergeable: true

derived:
  next_actor: author
  project_drift: true
  gate_b: needs_changes
```

Useful derived fields:

- `next_actor`
  - author
  - engineer
  - reviewer
  - maintainer/team
  - external_dependency
  - none/unknown

- `gate_a_evidence`
  - sufficient
  - incomplete
  - ambiguous
  - not_applicable

- `gate_b_result`
  - pass
  - needs_changes
  - needs_human_judgment
  - cannot_assess

- `project_drift`
  - true / false
  - reason

- `blocker`
  - dependency
  - reason
  - evidence URL/comment
  - re-check date
  - next actor if explicitly supported
  - confidence/evidence quality

## 7. Gate A dossier

### Trigger

PoC triggers:

- manual command on an issue, e.g. `/zfbot assess`; and/or
- observer requests assessment for items in New or Backlog.

No automatic comments on every new issue.

### Output

The dossier should answer:

1. **Problem**
   - What is being requested/fixed?
   - What user/operator/protocol problem is evidenced?

2. **Why this exists**
   - Internal/team work?
   - External contribution?
   - Program context such as NU7?
   - Parent Epic?
   - External dependency/request?
   - Unknown if evidence is insufficient.

3. **Commitment evidence**
   - Project Status
   - parent/milestone
   - maintainer acknowledgement
   - related decision/discussion
   - explicitly distinguish signal from accepted work.

4. **Proposed solution**
   - What approach is currently proposed?
   - Is there an unresolved design question?

5. **Acceptance/testability**
   - Are acceptance criteria present and testable?
   - Are expected tests/evidence identified?

6. **Dependencies/downstream effects**
   - linked issues/PRs
   - external dependencies
   - affected components/repositories
   - rollout/release considerations explicitly stated in source material

7. **Open judgment questions**
   - Only questions that GitHub/repo evidence cannot answer.

### Gate A rule

The bot never says "approved".

It may say:

- "Evidence appears sufficient for human Gate A decision."
- "Missing acceptance criteria."
- "Solution direction is still explicitly undecided."
- "External dependency is proposed but not acknowledged."

The human owns transition to `Ready for Engineering (prioritised)`.

## 8. Gate B: agentic implementation validation

### Trigger

PoC supports both:

1. manual command, e.g. `/zfbot pre-review`; and
2. GitHub `ready_for_review` event for PRs linked to an issue in Project 22.

During early PoC deployment, automatic runs should publish a non-blocking check/result and should not request a human reviewer.

### Review context

Build a review bundle from:

```
linked issue / accepted work
+ parent / Epic / milestone
+ relevant specification / ZIP / RFC
+ PR description
+ diff
+ tests
+ CI
+ AGENTS.md
+ contribution/review instructions
+ unresolved dependencies
```

### Gate B checks

#### A. Problem ↔ implementation

- Does the PR address the problem in the linked issue?
- Is significant work missing?
- Does it introduce unrelated scope?
- Does PR description match the actual diff?

#### B. Solution ↔ implementation

- Does the implementation match the solution direction described/accepted?
- If it deviates, is that deviation explicitly documented?

#### C. Acceptance criteria ↔ evidence

For every explicit acceptance criterion:

- satisfied by code/test/evidence;
- not satisfied;
- cannot verify.

Never invent acceptance criteria that are not present.

#### D. Tests

- Are claimed tests actually present?
- Do tests exercise the key behavior?
- Are important boundary/negative cases explicitly required by the issue but missing?
- Do CI results contradict claims in the PR?

#### E. Repository rules

Check applicable instructions in:

- `AGENTS.md`
- contribution docs
- PR template
- repo-specific review instructions

#### F. Dependency and downstream impact

- Are declared dependencies satisfied?
- Is the PR stacked on another PR?
- Is an external ZIP/spec/partner dependency unresolved?
- Are downstream components explicitly mentioned in the issue/PR handled or deferred?
- Are rollout/release requirements identified when the source material says they matter?

#### G. High-risk context

If labels/context indicate:

- consensus
- security
- network upgrade
- database format
- protocol compatibility

surface the corresponding human-review requirement.

The agent must not declare these concerns resolved merely because automated checks pass.

### Gate B result

Example:

```text
ZF pre-review

Problem match: PASS
Solution match: PASS
Acceptance criteria: 7/8 verified
Tests: NEEDS CHANGE
Repository rules: PASS
Dependencies: PASS
Downstream impact: HUMAN JUDGMENT

Blocking finding:
- Acceptance criterion requiring activation-boundary Regtest coverage has no corresponding test.

Human judgment:
- Confirm whether the changed consensus behavior is the intended interpretation of ZIP 218.

Recommendation:
Keep in In Engineering until the missing test is addressed.
```

Or:

```text
Recommendation:
Implementation appears ready for human review.
```

In the PoC, this is only a recommendation.

## 9. Re-review loop

When new commits are pushed after agent or human findings:

1. identify what changed since the previous review;
2. re-evaluate prior open findings;
3. run Gate B only against relevant changed context plus required invariants;
4. report:
   - resolved findings
   - still-open findings
   - new findings

Do not spam a full duplicate review on every push.

## 10. Blocker model

`blocked` remains an orthogonal label.

### Evidence sources

When an item has `blocked`, inspect in this order:

1. explicit `Blockers` section;
2. explicit dependency/stack relationship;
3. recent maintainer/team comment stating the blocker;
4. PR description;
5. linked external issue/PR.

Do not infer a blocker from correlation alone.

### Structured representation

Example:

```yaml
blocked: true
reason: "Waiting for ZIP 218 amendment"
dependency:
  url: "https://github.com/zcash/zips/pull/1361"
  type: pull_request
wake_condition: merged
recheck_date: null
evidence:
  comment_url: "..."
```

### Missing evidence

If `blocked` is newly applied and no reason is found:

- one bot comment is allowed:
  - ask what it is blocked on;
  - ask for a re-check date when the dependency is not machine-watchable.

Do not backfill comments across all historical blocked items during the PoC.

### Dependency watch

When the blocker is a GitHub issue/PR:

- watch state changes;
- if the dependency closes/merges, notify in the observer/digest and optionally add one comment:
  - "The recorded dependency has changed; please reassess the blocker."

Never remove `blocked` automatically in the PoC.

## 11. Project/GitHub drift detector

The PoC should continuously identify useful contradictions.

Examples:

### Ready for Review but implementation is not review-ready

```
Project: Ready for Review
PR: CHANGES_REQUESTED
→ derived next actor = author
→ drift
```

### Ready for Review but PR is merged

```
Project: Ready for Review
PR: MERGED
→ drift
```

### In Review without active reviewer

```
Project: In Review
requested reviewers: none
active submitted review: none
blocked: false
→ possible drift
```

### In Engineering with draft PR

```
Project: In Engineering
linked PR: draft
→ consistent, no drift
```

### Merged/Done

Do not infer deployment from this status.

Native merge/close is a fact; deployment/shipping remains unknown unless explicit evidence exists.

## 12. Bot write permissions for the PoC

### Allowed

- publish a bot-owned non-required PR check/result;
- respond to explicit bot commands;
- add one targeted blocker-information comment when a newly blocked item lacks required evidence;
- add one dependency-changed notification where configured;
- maintain its own external datastore/state.

### Not allowed

- Project Status mutation;
- issue closure;
- PR merge;
- label removal;
- automatic reviewer assignment;
- priority/estimate changes;
- milestone changes.

This permission boundary should be enforced technically, not only by prompt.

## 13. Reviewer routing: deferred but instrumented

The PoC should collect enough evidence to design routing later:

- files/crates touched
- consensus/security labels
- historical reviewers of similar areas
- requested reviewer
- review turnaround
- current open review load
- author/reviewer pairings

Do not assign reviewers yet.

Outputing an internal candidate ranking for evaluation is acceptable, but it must not request reviews automatically.

This is specifically intended to avoid reproducing Zebra's previous CODEOWNERS problem: static routing without workload/context awareness.

## 14. Integration with the Engineering Observer

Every bot run emits a structured event for the observer.

Example:

```json
{
  "event": "gate_b_completed",
  "item": "ZcashFoundation/zebra#11480",
  "pr": "ZcashFoundation/zebra#11487",
  "project_status": "Ready for Review (prioritised)",
  "result": "needs_changes",
  "next_actor": "author",
  "finding_count": 1,
  "evidence": ["..."],
  "timestamp": "..."
}
```

The observer stores history independently of current GitHub state.

This gives us:

- daily briefs
- biweekly summaries
- review-wait time
- author-wait time
- blocker duration
- Project/native-state drift
- Gate B failure reasons
- repeated workflow pain points

## 15. PoC architecture

Recommended smallest architecture:

```
GitHub webhooks / scheduled reconciliation
                │
                ▼
        ZF Triagebot service
                │
        ┌───────┼─────────┐
        │       │         │
        ▼       ▼         ▼
   Project 22  GitHub   Repository
     state     PR data    context
        │       │         │
        └───────┴─────────┘
                │
                ▼
         rule/agent engine
                │
        ┌───────┴─────────┐
        ▼                 ▼
   GitHub check       structured event
   / targeted comment       │
                            ▼
                    Engineering Observer
```

### Service choice

For the PoC, prefer a small GitHub App/service over a large Triagebot fork.

Reasons:

- we need Project 22 awareness;
- we need repository-specific agentic review;
- Rust Triagebot's state model is not ZF's state model;
- we can still reuse Triagebot patterns and code selectively later.

Implementation can remain small enough to replace if the experiment fails.

## 16. Event triggers

PoC webhook events:

- issues.opened
- issues.reopened
- issues.labeled / unlabeled
- issue_comment.created
- pull_request.opened
- pull_request.ready_for_review
- pull_request.converted_to_draft
- pull_request.synchronize
- pull_request.closed
- pull_request_review.submitted
- pull_request_review.dismissed
- pull_request_review_thread resolved/unresolved where available
- check_suite/check_run completed
- merge_group events if needed for merge queue
- Project item/status changes if webhook/API support is adequate

Also run periodic reconciliation because Project/native events can be missed or Project status may be changed manually.

## 17. PoC scenarios

The implementation is successful if it can handle these representative cases.

### Scenario A — normal internal issue

```
Backlog
→ bot Gate A dossier
→ human moves Ready for Engineering
→ engineer picks up
→ draft PR
→ In Engineering
→ author marks PR ready
→ Gate B
→ recommendation Ready for Review
```

### Scenario B — external proposal

```
New + external-contribution
→ bot summarizes problem/proposal
→ no commitment inferred
→ human chooses Backlog / Won't Do / Icebox
```

### Scenario C — NU7 consensus item

```
NU7 child issue + consensus
→ Gate A resolves parent/milestone/spec context
→ Gate B checks implementation against explicit acceptance criteria
→ consensus interpretation remains human judgment
```

### Scenario D — blocked dependency

```
In Engineering + blocked
→ bot extracts dependency
→ dependency watched
→ dependency merges
→ bot requests reassessment
→ human removes blocker
```

### Scenario E — stale Project state

```
Ready for Review
linked PR merged
→ observer/bot flags drift
→ no automatic mutation in PoC
```

### Scenario F — changes requested

```
Ready for Review
human review requests changes
→ native next_actor = author
→ bot does NOT create waiting-on-author label/status
→ new commit triggers focused re-review
```

## 18. Evaluation metrics

The PoC should be evaluated against coordination cost, not bot activity.

### Quality

- Gate B findings judged useful by engineers
- false-positive rate
- missed obvious PR-readiness problems
- blocker extraction accuracy
- Project/native drift detection precision

### Human attention

- human review time spent on basic/mechanical findings
- number of review rounds caused by missing basics
- median wait for first useful review
- repeated reviewer discoveries that could have been automated

### Workflow health

- time Project state disagrees with native PR state
- blocked items with unknown reason
- stale blockers
- items in review without clear reviewer/next actor

### Noise

- bot comments per PR/issue
- duplicate/redundant findings
- bot findings dismissed as irrelevant

A PoC that produces high comment volume but does not reduce coordination is a failure.

## 19. Implementation sequence

### Phase 0 — read-only plumbing

- ingest Project 22
- ingest linked issue/PR state
- build relationship graph
- persist snapshots/events
- implement drift rules

### Phase 1 — Gate B manual command

- `/zfbot pre-review`
- non-required result
- no status mutation

This is the first feature to put in front of engineers.

### Phase 2 — blocker intelligence

- extract blocker evidence
- structured dependency watch
- targeted missing-info prompt on newly blocked items

### Phase 3 — automatic Gate B on ready-for-review event

- run agent automatically when a linked PR leaves draft
- still advisory

### Phase 4 — Gate A dossier

- manual/on-demand triage assistance for New/Backlog
- human commitment decision retained

### Phase 5 — evaluate routing

- derive reviewer expertise/load from real history
- compare recommendations to human choices
- no automatic assignments until accuracy is established

## 20. Initial acceptance criteria for the PoC

The first usable PoC is complete when:

- [ ] It can load a Project 22 item and its linked issue/PR graph.
- [ ] It preserves exact existing Project Status and never invents a replacement state.
- [ ] It can detect at least the known drift classes: merged PR in review-ready state; changes-requested PR in review-ready state.
- [ ] `/zfbot pre-review` produces a structured Gate B assessment using issue + PR + diff + tests + repository instructions.
- [ ] It maps explicit acceptance criteria to implementation/test evidence.
- [ ] It identifies unresolved blocker evidence without inventing reasons.
- [ ] It emits structured events consumable by the Engineering Observer.
- [ ] It has no permission to mutate Project Status or merge/close work.
- [ ] Its output distinguishes facts, inference, and human-judgment questions.
- [ ] It can be demonstrated on at least one normal engineering item, one NU7/consensus item, one external contribution, and one blocked item.

## 21. Open questions to validate with the team

Do not block PoC implementation on these; record answers as we learn them.

- What exactly is Icebox?
- Does assignee mean implementer, owner, or next actor?
- Is board position inside Ready for Engineering / Ready for Review the authoritative priority?
- Who normally moves items between statuses?
- When should Reviewed be used versus merging directly from In Review?
- What adds direct PR items to Project 22?
- Which private automations/bots also mutate the project?
- What current Slack/meeting decisions need to be reflected into GitHub?
- What review-capacity constraints should future routing respect?

# Part 2: Keeping delivery context current

Joan De Arcayne · 18 September 2026 · Proposed first-month design

This is a proposal. The system has not been built or evaluated.

## What I want to make easier

Part 1 required piecing together issues, pull requests, reviews, releases, and community discussions. Repeating that work each morning would consume time and risk losing the decisions that explain why something is waiting.

Each morning I want to answer four questions: what changed, which commitment or dependency could be affected, what looks stalled, and what needs a decision or follow-up? I would start with one Zebra release and NU7, using the team's agreed commitments and the work they depend on. Synapse is a possible starting point to assess for reuse; the design does not depend on a particular tool.

## An example morning brief

This example is manually prepared and illustrative. It uses the September 18 Part 1 review, including September 17 board observations. The proposed action has not been sent, and the system that would produce a brief has not been built.

### Zebra release: confirm the remaining holds

**Evidence:** [v6.4.0 PR #11254](https://github.com/ZcashFoundation/zebra/pull/11254) remains on hold, although its original blocker, [#11387](https://github.com/ZcashFoundation/zebra/pull/11387), was resolved. [#11448](https://github.com/ZcashFoundation/zebra/issues/11448) reports a wallet integration failure; its proposed diagnosis remains unverified.

**Why it matters:** resolving the original blocker does not establish that the candidate is ready to release.

**What is uncertain:** the current hold reason, the technical owner for the diagnosis, the confirmed cause, and the next readiness checkpoint are not visible in the evidence reviewed.

**My proposed next step:** I would ask the Head of Engineering and relevant maintainers to confirm the remaining holds, who will investigate the failure, and what evidence is needed to proceed. I would maintain the readiness record and follow-up; this does not assign technical ownership.

If maintainers confirm a different hold and agree a next-day checkpoint, I would record the reason, source, responsible person, and checkpoint. The next brief would request the agreed update rather than repeat the original question. If collection failed, it would say “release status not refreshed”; it would not report that nothing changed. That response and checkpoint are hypothetical.

The [full illustrative brief](part-2-example-daily-brief.md) includes two more examples, source coverage, deliberate pauses, and the review outcomes.

## How it would work

**Collect changes → connect work and dependencies → compare with saved decisions and commitments → draft a brief → review and follow up.** Confirmed decisions and the next check return to the saved context. Missing source coverage is shown rather than interpreted as stability.

<div class="source-diagram" data-diagram="output/part-2-design-diagram.mmd"></div>

The tool would read selected sources and retain their links, item identifiers, update times, and last successful checks. Rules would detect structured changes and explicit links. AI could summarize conversations and propose explanations or less explicit connections, but those suggestions would remain tentative until checked. I would review the draft, validate its links, decide what needs follow-up, and record confirmed decisions and the next check.

A dependency graph is a map of what depends on what. A dependency record would carry its evidence, confidence, contact or owner if known, needed-by date, and status. Unknown is valid: the system must not invent a relationship because two items share a label.

These issues share external prerequisites. The tool would flag changes to those prerequisites and show which work may be affected, keeping unconfirmed relationships tentative.

### What comes in

| Source | Why it matters |
| --- | --- |
| [All Engineering board](https://github.com/orgs/ZcashFoundation/projects/22/views/1) and linked repositories | Work status, pull requests, reviews, blockers, checks, and releases. Read linked epics separately because the view hides them. |
| Repositories linked to active dependencies | Changes outside the team that could unblock or delay the selected work. Follow relevant links rather than monitor the whole ecosystem. |
| Forum and selected, approved chat channels | Decisions, changing requirements, external requests, and context behind a pause or blocker. |
| Team-confirmed plan | Commitments, owners, checkpoints, dependencies, and agreed completion evidence. Without this baseline, the tool can identify change but cannot reliably call it drift. |

The team explained that GitHub milestones are legacy and epics stay in place on the board without estimates. An epic can close with optional work left unfinished. The tool needs these rules to avoid misleading reminders.

## What it remembers

A small persistent record store, independent of the AI conversation, would hold:

- source observations, links, timestamps, coverage, and collection failures;
- work items and tentative or confirmed dependency relationships;
- confirmed decisions, their rationale and source, and when they should be revisited;
- open follow-ups, their disposition, and the next agreed check; and
- distinctions between merged, released, and activated work.

Existing team records would remain authoritative for status and commitments. The retained context would keep pointers and concise notes rather than copy whole chat histories. New evidence could supersede a decision without erasing its history.

## What it would flag

| Signal | What the brief would surface |
| --- | --- |
| Review wait or possible stalled work | A missed agreed checkpoint, missing owner, missing reviewer, or unresolved blocker. If no checkpoint exists, ask what is expected rather than infer delay from age alone. |
| Dependency change | A prerequisite is resolved while downstream work remains held, an upstream release is available but adoption is open, or a needed-by date changes. |
| Possible downstream impact | A changed upstream item may affect recorded dependants or a release checkpoint; show the chain and the link that needs confirmation. |
| Drift or conflicting evidence | A confirmed commitment may be at risk, or the board and linked work disagree. Show both sources and the uncertainty. |
| Decision change or expiry | A decision is superseded, its revisit date is due, or current work no longer matches its rationale. |
| External request | Show the request at the next daily check with related work and a suggested contact. Flag it after one business day if unanswered. |
| Source coverage gap | Show what was unavailable and the last successful check. Never turn a failed refresh into “no change.” |

Confirmed pauses and unchanged items can stay quiet until their agreed checkpoint or relevant new evidence. Missing ownership, however, can warrant follow-up when it prevents a decision, review, recovery action, or agreed next step. Reading an alert would not close the action.

## What stays with people

Rules would identify structured changes and AI would propose summaries or links. Priority, ownership, scope, outreach, escalation, dependency confirmation, and release decisions stay with the responsible people.

I would validate source links, accept or dismiss suggestions, coordinate follow-up, and record the resulting decision in the team's normal workflow. I would agree priorities and tradeoffs with the Head of Engineering; maintainers would retain technical authority. The daily brief would supplement existing release and security response channels, not replace immediate incident handling.

## How I would try it

**Week 1:** agree sources, commitments, pause rules, and examples to test. **Week 2:** trial repository collection and a private brief alongside manual triage. **Week 3:** add selected forum or chat sources and test pauses, conflicting evidence, and missed-run recovery. **Week 4:** assess usefulness and maintenance effort, then adjust coverage. WIP dashboards and broader reporting can wait until the brief proves useful.

Before expanding, I would test these failure cases:

- a resolved blocker with a release still on hold;
- a deliberately paused issue;
- a failed source refresh and a missed-run recovery;
- conflicting evidence;
- an explicit dependency and a tentative dependency needing confirmation; and
- an upstream change with possible downstream impact.

I would continue only if the trial reduces daily review time, keeps confirmed pauses quiet, and surfaces the important changes found in manual checks. I would track useful follow-ups, false alarms, known misses, dependency confirmations, review time, and maintenance effort. These are proposed checks, not measured results.

*AI use: Codex helped develop and simplify the design using Part 1 findings, the assessment, and the job description. I narrowed the scope and kept decisions human. This proposal has not been built or evaluated.*

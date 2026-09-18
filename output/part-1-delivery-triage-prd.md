# Zcash Foundation TPM Take-Home

## Part 1: Engineering delivery triage

**Author:** Joan De Arcayne  
**Review date:** 18 September 2026  
**Purpose:** Establish a clear, evidence-backed starting point for delivery follow-up.

This page is the shareable PRD-style summary. The [detailed Part 1 working report](part-1-delivery-triage.md) contains the fuller evidence and discussion notes.

## Executive summary

The engineering team is moving work across releases, NU7, wallets, synchronization, cryptographic libraries, and testing. The September 17 All Engineering snapshot showed 21 cards in Engineering, 14 Ready for Review, 11 In Review, and 2 Reviewed. Those are card counts, not workload or capacity measures, because issues and pull requests can overlap and some cards need cleanup. They do show that a small distributed team is carrying a lot of context at the same time.

I would focus first on two dated decisions: what still holds the Zebra v6.4.0 release, and what each participating team needs to meet the NU7 testnet and mainnet dates. I would then move the wallet migration and recovery handoffs forward, establish the impact and release path for an unreviewed key-conversion fix, and finish the approved fuzzing repair and external enrollment.

The goal is not to reprioritize engineering from a board snapshot. It is to make the next decision, owner, dependency, and evidence visible for each item, then take tradeoffs to the Head of Engineering when commitments compete.

## Problem

Delivery context is spread across the project board, issues, pull requests, reviews, checks, linked repositories, and ecosystem discussions. Those sources describe different stages of work. An open card may represent an active implementation, an unattended review, a deliberate pause, or a record that needs cleanup. A merged change may still need release, adoption, or network activation. Without a shared view, the team can spend time reconstructing context instead of finishing work.

## Objective

Create a first-week delivery picture that gives the team a practical starting point for follow-up. For each important item, the picture should make the current state, next decision, owner, dependency, readiness evidence, and checkpoint easy to find. It should also provide a basis for cross-team NU7 coordination and a daily way to retain context as the work changes.

## Non-goals

- Audit every issue and pull request.
- Infer staffing capacity, private priorities, or individual performance from public activity.
- Diagnose technical failures without the relevant maintainers.
- Change engineering priorities or release decisions without the Head of Engineering and technical owners.

## Scope and evidence

This review uses the [All Engineering board](https://github.com/orgs/ZcashFoundation/projects/22/views/1), linked repositories, and public ecosystem discussions. The hiring team confirmed that All Engineering is the intended assessment view. Board observations are from September 17. I checked selected issues, pull requests, reviews, checks, and the NU7 timeline again on September 18. The Zebra code reference is [ec8f29ea726b](https://github.com/ZcashFoundation/zebra/commit/ec8f29ea726bea2fad73829ddc76af054eae623d) on `main`.

This is a sample for a 3 to 4 hour exercise. It is not an exhaustive backlog audit, a staffing assessment, or a claim about private priorities and ownership. Public activity shows visible contribution and review evidence; it does not prove how much time someone has available.

## Current delivery picture

| Workstream | What the evidence shows | Delivery implication |
| --- | --- | --- |
| Release and CI | [Zebra v6.4.0](https://github.com/ZcashFoundation/zebra/pull/11254) remains open with a `do-not-merge` label. A named consensus blocker has been resolved. A release-linked Zaino wallet test failed, and semver checks are still advisory. | Confirm the remaining release criteria, technical owner, and decision date before recommending that the hold be lifted. |
| NU7 | The [public timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655) sets September 30 for code completion, October 6 for testnet activation, October 20 for the mainnet decision and activation height, and November 5 for planned mainnet activation. | Map each cross-organization deliverable, contact, dependency, readiness evidence, and checkpoint. The schedule leaves six days between code completion and testnet activation. |
| Wallets and operators | The [sidecar compatibility fix](https://github.com/ZcashFoundation/zebra/pull/11413) merged. The [migration guide](https://github.com/ZcashFoundation/zebra/pull/11329) and [Zallet recovery change](https://github.com/zcash/zallet/pull/581) still need review or validation. | Treat migration, recovery, and sidecar adoption as separate handoffs. No dependency between them or release hold was established. |
| Cryptographic libraries | [ed25519-zebra #206](https://github.com/ZcashFoundation/ed25519-zebra/pull/206) remains open without recorded review. Its proposed conversion fix has a concrete correctness concern. | Confirm impact, affected callers and versions, reviewer, and release path before changing queue order. |
| Fuzzing | [Zebra fuzz repair #11394](https://github.com/ZcashFoundation/zebra/pull/11394) has approval but remains open. [OSS-Fuzz enrollment](https://github.com/google/oss-fuzz/pull/15900) is a separate open step. | Finish the merge and external handoff, then add CI coverage that catches future harness breakage. |

The board also shows FROST, seeders, synchronization, and other ecosystem work. I would keep those visible while leaving deliberately paused, superseded, or draft work out of a blanket review chase.

## What I would chase first

### 1. Establish the remaining v6.4.0 release gates

The release candidate is still on hold after its named blocker was resolved. The linked Zaino test failure confirms a symptom, but [issue #11448](https://github.com/ZcashFoundation/zebra/issues/11448) explicitly leaves its proposed diagnosis unverified. The semver repair landed, while the workflow still permits that check to fail.

I would bring the release checklist to the Head of Engineering and relevant maintainers, confirm what remains, assign the wallet-test investigation, and agree whether semver enforcement is a release requirement. As TPM, I would own the release calendar and the agreed readiness criteria. I would keep the release on hold while those criteria are unmet and escalate disagreements to the Head of Engineering.

### 2. Turn the NU7 dates into an owned readiness plan

NU7 now has an agreed cross-ecosystem schedule. The Zebra tracker still shows dependencies on branch IDs, a `librustzcash` release, and activation heights. The public board alone does not show whether those dependencies are on the critical path.

I would map the work across ZF, Tachyon, Valar, ZODL, Shielded Labs, Zakura, and Zebra. Each item should have a deliverable, contact, prerequisite, reviewer, readiness evidence, and next checkpoint. I would also track readiness with exchanges, miners, infrastructure providers, and other node operators, and coordinate operator communications with Communications. If a dependency slips, I would surface the schedule tradeoff to the Head of Engineering and the relevant technical decision makers.

### 3. Move wallet reviews and recovery forward

These are separate handoffs:

- **Migration guidance:** [PR #11329](https://github.com/ZcashFoundation/zebra/pull/11329) awaits review. I would arrange reviewer pickup and resolve whether the guide also needs the architecture decision record requested in the issue.
- **Wallet recovery:** [Zallet PR #581](https://github.com/zcash/zallet/pull/581) passes its targeted scenario but reports a wider failure linked to [#588](https://github.com/zcash/zallet/issues/588). I would confirm the reviewer and owner of #588, then decide whether the PR can ship with an explicit limitation.
- **Sidecar adoption:** [PR #11413](https://github.com/ZcashFoundation/zebra/pull/11413) merged the compatibility fix for the older 99-block reorg limit. I would follow its ordinary release and installation path.

I found no evidence that these three items depend on one another or block v6.4.0 or NU7. The [NU7 announcement](https://forum.zcashcommunity.com/t/nu7-timeline/57655) says it introduces no new transaction formats and should not significantly affect wallets.

### 4. Establish impact and release disposition for ed25519-zebra #206

The contribution corrects a conversion that can produce a different key when converted back. It has no recorded reviewer at the snapshot date. I would ask the library maintainers to validate the regression, identify affected versions and callers, assign a reviewer, and decide the release and downstream communication path. I would not call it an exploit or production loss without evidence.

### 5. Finish the approved fuzzing handoff

The fuzz repair has approval but remains open, while OSS-Fuzz enrollment remains separate. I would confirm the remaining merge condition, assign the external follow-up, validate the external build after merge, and give [#11451](https://github.com/ZcashFoundation/zebra/issues/11451) an owner for ongoing CI protection.

## Work I would leave alone for now

- The [fork-choice fix](https://github.com/ZcashFoundation/zebra/pull/11341) merged into `main` on September 17 and its linked issue is closed. I would let it move through ordinary integration and release checks.
- FROST work has real dependencies, but the original C2SP blocker was replaced by an open issue and one tooling prerequisite has merged. I would reconcile scope and sequence before chasing every child item.
- The seeder prober is still a draft with development deployment reported. I would confirm production intent at its next checkpoint rather than treat it as a current outage.
- The team has explained that legacy infrastructure work is being migrated. I would respect that plan and check successor links only when an active delivery depends on them.
- Large ZSA and v2 synchronization drafts should not enter a blanket review chase based only on labels or age.

## Questions for the first team sync

### NU7 readiness and the Foundation's role

1. With NU7's dates agreed, what gives the teams confidence that they can meet them, and where is the greatest uncertainty? What evidence from testnet and the other teams would support a go decision on October 20, and what would make you hold back? I would own the dependency follow-up as TPM and want the technical evidence and decision owners to be explicit.
2. For changes such as 25-second blocks, how does the Foundation help the community understand both benefits and costs before voting? How do you balance technical advice with the Foundation's neutral role, and bring remaining concerns into the readiness decision?

### Sharing context and finishing work

3. NU7 spans epics, child issues, releases, and discussions across teams. Which parts are hardest to keep shared today? Building on the move to epics, what would make agreed scope, dependencies, and completion clearer, including the distinction between merged, released, and ready for downstream use?
4. The board suggests a lot of work moving at once and a lot of context for the team to carry. Does that match your experience, and where does it make finishing work harder? Would it help to make active work and review waits more visible first, then try a small WIP experiment if useful?

## Approach and AI use

I started with the README and All Engineering board, using Codex as a thinking partner to work through issues, PRs, and unfamiliar concepts. Release holds, waiting reviews, reported failures, and NU7's agreed dates guided where I looked more closely, including linked repositories, documentation, and community discussions. With more time, I would confirm NU7's critical dependencies and operator readiness with the team, then examine the release candidate's remaining test evidence.

Codex helped research sources, explain concepts, connect dependencies, summarize evidence, and draft the report. Source checks corrected several initial readings: the release's named blocker was resolved, an older sync investigation was deliberately paused, and the sidecar work had no established NU7 dependency. I treated AI diagnoses and suggested connections as hypotheses to verify. This work also became the starting point for Part 2, which proposes a daily digest to retain context and surface changes without rereading every board item.

## Proposed outcome

At the end of the first coordination cycle, I would expect:

- A release-readiness record for v6.4.0 with criteria, owners, evidence, and a decision date.
- A NU7 dependency and operator-readiness map with cross-team contacts and checkpoints.
- Reviewers and next decisions assigned for the migration, recovery, key-conversion, and fuzzing handoffs.
- A shared view of what is active, waiting, blocked, deliberately paused, and complete.
- A short daily brief that preserves decisions and points to the source evidence behind each follow-up.

## Primary sources

- [All Engineering board](https://github.com/orgs/ZcashFoundation/projects/22/views/1)
- [Zebra issues](https://github.com/ZcashFoundation/zebra/issues)
- [Zebra v6.4.0 release candidate](https://github.com/ZcashFoundation/zebra/pull/11254)
- [NU7 public timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655)
- [NU7 tracker](https://github.com/ZcashFoundation/zebra/issues/9501)

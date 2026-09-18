# Part 1: Delivery triage

Joan De Arcayne | Review date: 18 September 2026

I reviewed the [All Engineering board](https://github.com/orgs/ZcashFoundation/projects/22/views/1), which the hiring team confirmed as the assessment scope, along with related repositories and public discussions. The Zebra code reference is [ec8f29ea726b](https://github.com/ZcashFoundation/zebra/commit/ec8f29ea726bea2fad73829ddc76af054eae623d) on `main`.

These are the five follow-ups I would start with. The board observations are from September 17; I checked selected PRs and the NU7 timeline again on September 18.

## My read of delivery

The team has work underway across releases, wallets, synchronization, and cryptographic tools. I would first focus on work waiting for review, testing, or release. Zebra's v6.4.0 release is on hold, a wallet integration test needs investigation, and an ed25519-zebra key-conversion fix needs review. NU7 now has an agreed timeline, so I would also check what ZF needs from other teams to meet it.

On September 17, the board showed 21 cards In Engineering, 14 Ready for Review, 11 In Review, and 2 Reviewed. Issues and PRs can overlap, and some cards need cleanup, so these numbers do not prove that the team is overloaded. They suggest a lot of context to carry across apparently active work. I would confirm what is actually moving and keep the next steps and dependencies visible. If two commitments compete, I would document the tradeoff and take it to the Head of Engineering.

The team explained that it uses epics to group work and that milestones are legacy. Epics stay in place on the board and have no estimates. They can close when remaining optional work is dropped, so I would check the agreed child issues and what has shipped before calling the work complete.

## What's in flight

I grouped related work into the areas below. The people listed contributed or reviewed work in the sources I checked; their formal responsibilities still need confirmation.

| Area and purpose | People visible | Delivery picture and dependencies |
| --- | --- | --- |
| Releases and CI: build, test, and publish reliably | Conrado, Alfredo, Gustavo; `andres-pcg` | [Zebra v6.4.0 release](https://github.com/ZcashFoundation/zebra/pull/11254) remains open and blocked. The [semver build repair](https://github.com/ZcashFoundation/zebra/commit/cbbc903b84b1b1e613bd033215c4bb8a91829925) is in, but the [PR gate still allows semver-check failures](https://github.com/ZcashFoundation/zebra/blob/ec8f29ea726bea2fad73829ddc76af054eae623d/.github/workflows/pr-gate.yml#L291), so enforcement needs follow-through. |
| NU7: prepare the next network upgrade | Pili opened implementation issues; the timeline names ZF, Tachyon, Valar, ZODL, Shielded Labs, and the Zakura/Zebra teams | The [public timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655) gives the teams a shared schedule. [The epic](https://github.com/ZcashFoundation/zebra/issues/9501) links Zebra work, including dependencies on branch IDs, a library release, and activation heights. |
| Sync and mining: follow the chain and supply candidate blocks | Marek, Arya, Janito | [Mining performance](https://github.com/ZcashFoundation/zebra/pull/11371) and the fork-choice fix merged into `main`. [v2 protocol guidance](https://github.com/zcash/zips/pull/1346) still needs review alongside implementation. |
| Wallets and operators: support compatibility, migration, and recovery | Arya, Conrado, Alfredo; `nuttycom`, `cleanerzkp` | The [sidecar deep-reorg fix](https://github.com/ZcashFoundation/zebra/pull/11413) merged into `main`. The [migration guide](https://github.com/ZcashFoundation/zebra/pull/11329) and [Zallet rescanning](https://github.com/zcash/zallet/pull/581) still need review or validation. These are separate follow-ups; no dependency between them or release hold was established. |
| Cryptographic libraries: preserve correct key handling | `ouicate`, `dannywillems`; Natalie acknowledged the key fix | [Ed25519 key conversion](https://github.com/ZcashFoundation/ed25519-zebra/pull/206) and [reddsa dependencies](https://github.com/ZcashFoundation/reddsa/pull/272) await independent review. |
| FROST: distributed key generation and signing tools | Conrado, Natalie | [COCKTAIL-DKG](https://github.com/ZcashFoundation/frost/pull/1032) is draft with remaining specification feedback. [Tooling](https://github.com/ZcashFoundation/frost-tools/issues/578) spans merged and open changes; #580 waits for #579. |
| Seeders: help new nodes find healthy peers and keep that service running | `andres-pcg` | [Zeeder](https://github.com/ZcashFoundation/zeeder) is the Foundation's DNS seeder. [#60](https://github.com/ZcashFoundation/zeeder/issues/60) covers the CI/CD path that builds, publishes, and rolls out its image. Most of that work is reported as delivered; full-fleet deployment still needs confirmation. The [monitoring prober](https://github.com/ZcashFoundation/infra-monitoring-kuma/pull/18) is draft with deployment reported in the development environment. |
| Fuzzing: test untrusted inputs for crashes and broken assumptions | Conrado, DC; `john-lawniczak`, `robustfengbin` | Zebra's [fuzz harnesses](https://github.com/ZcashFoundation/zebra/blob/ec8f29ea726bea2fad73829ddc76af054eae623d/zebra-fuzz/README.md) exercise P2P messages, block and transaction parsing, scripts, RPC, and transaction formats. The [repair](https://github.com/ZcashFoundation/zebra/pull/11394) has approval after the transaction refactor broke several targets. Merge, external OSS-Fuzz enrollment, and ongoing CI coverage are separate remaining steps. |

Named Foundation team members above are publicly listed by [ZF](https://zfnd.org/). [DC](https://github.com/alchemydc) identifies as a ZF adviser; `nuttycom` and `robustfengbin` contribute from outside the Foundation in the reviewed work. Other handles have unconfirmed affiliations. Detailed identity evidence is retained in the extended reference.

## What I would chase first

I would start with the held release and NU7's agreed dates, then the wallet review and recovery questions, the key-conversion fix, and approved fuzzing work awaiting completion. This puts immediate release decisions and dated commitments first. The migration guide's high review-queue position supports the wallet follow-up; a higher-impact finding on key conversion would move that item up. I would confirm the order with the Head of Engineering and track each follow-up to a decision or an agreed next checkpoint.

### 1. Confirm what still holds the Zebra v6.4.0 release

[Release PR #11254](https://github.com/ZcashFoundation/zebra/pull/11254) is a bot-generated release candidate. It updates Zebra and its component versions, gathers their changelogs, and asks maintainers to confirm the release checklist before publishing. The PR remains open with a `do-not-merge` label. Its latest visible hold said to wait for the original consensus blocker, [#11387](https://github.com/ZcashFoundation/zebra/pull/11387); that blocker has since been resolved, but the current hold reason is unclear from the comments I checked. A release-linked [Zaino wallet test failed](https://github.com/zcash/integration-tests/actions/runs/35127440197/job/104909375107); [#11448](https://github.com/ZcashFoundation/zebra/issues/11448) reports the symptom but explicitly leaves its AI-generated diagnosis unverified. Separately, the repaired semver check still [permits failure](https://github.com/ZcashFoundation/zebra/blob/ec8f29ea726bea2fad73829ddc76af054eae623d/.github/workflows/pr-gate.yml#L291).

Draft note to the team:

> The v6.4.0 candidate is still on hold after its named blocker was resolved, and a linked wallet test failed. We need a clear account of what still prevents release. I would bring the remaining checklist items to the Head of Engineering and maintainers, confirm who will investigate the test failure, and agree whether semver enforcement is a release requirement. As TPM, I would own the release calendar and agreed readiness criteria, keep the release on hold while those criteria are unmet, and escalate disagreements to the Head of Engineering.

### 2. Check what each team needs to deliver NU7 on time

The [NU7 timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655), published September 17, reports agreement among the participating organizations and engineering teams:

- September 30: code complete and ready for inclusion in the testnet upgrade.
- October 6: testnet activation.
- October 20: decide whether to proceed on mainnet and set its activation height, based on testnet experience.
- November 5: planned mainnet activation, subject to that decision.

The schedule leaves six days between code completion and testnet activation. I would first map the groups named in the announcement: ZF, Tachyon, Valar, ZODL, Shielded Labs, and the Zakura and Zebra teams. For each group, I would confirm its deliverable, contact, dependency, readiness evidence, and next checkpoint. I would ask what testing and release preparation must already be underway to make the testnet date possible. [#11445](https://github.com/ZcashFoundation/zebra/issues/11445) waits for agreed branch IDs and a librustzcash release; [#11446](https://github.com/ZcashFoundation/zebra/issues/11446) also needs activation heights. The checklist leaves testnet heights to be decided; mainnet height selection is scheduled for October 20. I would check when each item is needed before treating a missing height as a delay. The September 17 board placed much of the new work in New or Backlog, but that alone does not tell us whether the schedule is at risk.

Draft note to the team:

> NU7 now has agreed dates, with six days between code completion and testnet activation. I would map what ZF needs from Tachyon, Valar, ZODL, Shielded Labs, Zakura, and the other participating teams, starting with branch IDs, the library release, and testnet activation heights. Each dependency needs a contact and checkpoint. With technical leads, I would confirm the required test results, including agreement between implementations, and raise schedule tradeoffs with the Head of Engineering. I would also track upgrade readiness with exchanges, miners, and infrastructure providers, and coordinate operator communications with the Communications team before mainnet activation.

### 3. Move wallet reviews and recovery work forward

I would follow up on these separately:

- **Migration guidance:** Conrado's [PR #11329](https://github.com/ZcashFoundation/zebra/pull/11329) awaits review; its linked issue was second in the September 17 Ready for Review queue. I would arrange reviewer pickup and resolve whether the guide also needs the architecture decision record requested in the issue.
- **Wallet recovery:** Alfredo's [Zallet rescan PR #581](https://github.com/zcash/zallet/pull/581) reports a passing targeted scenario but a wider failure linked to [#588](https://github.com/zcash/zallet/issues/588). I would confirm a reviewer and the owner of #588, then ask maintainers whether #581 can ship with that limitation. These are author-reported results; I have not established a connection to Zebra #11448.
- **Sidecar adoption:** [PR #11413](https://github.com/ZcashFoundation/zebra/pull/11413) merged, addressing the older sidecar's 99-block reorg limit against Zebra's 1,000. This now needs ordinary release and installation follow-through.

I found no evidence that these three items depend on one another or block v6.4.0 or NU7. The [NU7 announcement](https://forum.zcashcommunity.com/t/nu7-timeline/57655) also says it introduces no new transaction formats and should not significantly affect wallets.

### 4. Review the Ed25519 key-conversion fix and assess its impact

[ed25519-zebra #206](https://github.com/ZcashFoundation/ed25519-zebra/pull/206) corrects a conversion that can produce a different key when converted back. Natalie acknowledged it on July 30, but no review or requested reviewer is recorded. It was fifth in the September 17 Ready for Review queue.

I would ask the library maintainers to confirm who will review it, check the regression test, identify affected versions and callers, and decide how to release it. I would use that impact assessment to decide whether it needs earlier attention. The evidence supports a correctness concern; it does not establish an exploit or production loss.

### 5. Carry fuzzing through merge and external enrollment

[The fuzzing repair](https://github.com/ZcashFoundation/zebra/pull/11394) has approval but remains open. The related [OSS-Fuzz enrollment](https://github.com/google/oss-fuzz/pull/15900) is also open. These are separate steps: merging the repair does not establish external coverage, and enrollment does not prevent a later harness regression.

I would ask what still prevents the merge, who will follow through with OSS-Fuzz, and how CI will catch future harness failures. I would chase the release and NU7 questions first, then help finish this approved work.

## What I would follow up later or leave alone

- The [fork-choice fix](https://github.com/ZcashFoundation/zebra/pull/11341) merged into `main` on September 17 after the requested changes were addressed, and its linked issue is closed. I would let it progress through ordinary integration and release checks rather than restart a review chase.
- Reconcile FROST's remaining scope and dependencies. The original COCKTAIL-DKG feedback was replaced by [C2SP #299](https://github.com/C2SP/C2SP/issues/299), and one tooling prerequisite has merged. Neither fact makes all the remaining work ready.
- Check Zeeder's full release-to-deployment evidence at its next checkpoint. Confirm the draft prober's production intent; its dev deployment does not establish production coverage.
- Respect the explicit pause on [sync investigation #10919](https://github.com/ZcashFoundation/zebra/issues/10919) and the team's planned legacy infra cleanup. Leave large ZSA and v2 sync drafts out of a blanket review chase. A NU7 label alone does not establish committed ZSA scope.

## Questions for the team

The follow-ups above cover the immediate delivery questions. For the presentation, I would focus on two conversations.

**NU7: confidence in delivery and the Foundation's role**

1. With NU7's dates agreed, what gives you confidence that the teams can meet them, and where is the greatest uncertainty? What would you need to see from testnet and the other teams to support a go decision on October 20, and what would make you hold back? I would own the dependency follow-up as TPM; I want to understand the technical evidence and decisions that should guide it.
2. For changes such as 25-second blocks, how does the Foundation help the community understand both the benefits and the costs before voting? How do you balance technical advice with the Foundation's neutral role, and bring any remaining concerns into the readiness decision? I would like to understand how community input and engineering evidence inform each other.

**Sharing context and finishing work**

3. NU7's delivery picture spans epics, child issues, releases, and discussions across teams. Which parts are hardest to keep shared today? Building on your move to epics, what would make it easier for everyone to see the agreed scope, dependencies, and what is actually complete, including the distinction between merged, released, and ready for downstream use?
4. The board suggests a lot of work moving at once and a lot of context for the team to carry. Does that match your experience, and where does it make finishing work harder? Would you be open to first making active work and review waits more visible, then trying a small WIP-limit experiment if it helps? I would assess whether it helps work finish and discuss any priority tradeoffs with the Head of Engineering.

## Approach

I started with the README and All Engineering board, using Codex as a thinking partner to work through issues, PRs, and unfamiliar concepts. Release holds, waiting reviews, reported failures, and NU7's agreed dates guided where I looked more closely, including linked repositories, documentation, and community discussions. I checked source links and used the team's answers to improve my understanding of the board. With more time, I would confirm NU7's critical dependencies and operator readiness with the team, then examine the release candidate's remaining test evidence. I still lack internal context and have not built the software or reproduced the reported failures.

## AI tools appendix

- **How I used it:** Codex helped research sources, explain concepts, connect dependencies, summarize evidence, and draft the report. Working through the material together helped me get up to speed and identify better questions for the team.
- **Where I had to correct it:** Source checks showed that the release's named blocker was already resolved, an old sync investigation was deliberately paused, and the sidecar work had no established NU7 dependency. An incorrect generated commit link also needed correction. I treated AI diagnoses and suggested connections as hypotheses to verify.
- **How this led to Part 2:** The research and notes showed what I would want to retain and refresh in a daily digest, so I could stay current without rereading every board item. Part 2 proposes that design; I have not implemented the daily automation. I own the judgments and follow-up choices in this report.

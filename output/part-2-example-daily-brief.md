# Example output: morning delivery brief

Illustrative output based on the September 18 Part 1 review, including September 17 board observations. I prepared this example manually; the tool has not been built. These are initial findings, with proposed actions that have not been sent. The NU7 forum post is included; chat coverage is not demonstrated.

**Coverage:** board snapshot from September 17; selected GitHub items and the NU7 announcement reviewed September 18. Other repository activity and chat channels are outside this example's coverage. A running tool would show the last successful check and any collection failure for each source.

## Three follow-ups for my review

### 1. Zebra release: confirm the remaining holds

**Evidence:** [v6.4.0 PR #11254](https://github.com/ZcashFoundation/zebra/pull/11254) remains on hold, although its original blocker, [#11387](https://github.com/ZcashFoundation/zebra/pull/11387), was resolved. [#11448](https://github.com/ZcashFoundation/zebra/issues/11448) reports a wallet integration failure; its proposed diagnosis remains unverified.

**Why it matters:** resolving the original blocker does not establish that the candidate is ready to release.

**Suggested next step:** ask the Head of Engineering and relevant maintainers to confirm the remaining holds, who will investigate the failure, and what evidence is needed to proceed. I would own the readiness record and follow-up.

**Still unknown:** technical owner for the diagnosis, confirmed cause, and next readiness checkpoint.

### 2. NU7: confirm external contacts and dependency dates

**Evidence:** [#11445](https://github.com/ZcashFoundation/zebra/issues/11445) records dependencies on branch IDs and a librustzcash release; [#11446](https://github.com/ZcashFoundation/zebra/issues/11446) also requires activation heights.

**Why it matters:** the [NU7 timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655) calls for code completion on September 30 and testnet activation on October 6. The teams plan to decide on mainnet activation and its height on October 20, ahead of the November 5 target. These dates make it worth checking when each outside dependency is needed.

**Suggested next step:** I would own the dependency follow-up, using the [NU7 epic](https://github.com/ZcashFoundation/zebra/issues/9501) to check the required scope against the public plan. Confirm the delivering team's contact and needed-by date for each outside dependency, and agree what happens if one slips.

**Still unknown:** the external contact, delivery commitment, and needed-by date for each dependency. Open issues alone do not show that implementation is stalled.

### 3. Key-conversion fix: confirm reviewer pickup

**Evidence:** [ed25519-zebra #206](https://github.com/ZcashFoundation/ed25519-zebra/pull/206) addresses a key-conversion correctness problem. In the reviewed snapshot, it has an acknowledgment but no recorded review or requested reviewer.

**Why it matters:** impact assessment and independent review are needed before deciding its urgency and release path.

**Suggested next step:** ask the library maintainers to confirm a reviewer and assess affected versions and callers.

**Still unknown:** actual downstream impact. The available evidence does not establish an exploit.

## Deliberately not chasing

- **[Sync investigation #10919](https://github.com/ZcashFoundation/zebra/issues/10919):** an explicit pause is recorded. Keep the reason; revisit on a relevant change or agreed checkpoint.
- **Unmoving epics:** the team has confirmed that epics do not move through board columns. Their age alone should not generate a reminder.
- **Legacy infra cleanup:** the team already knows about the migration. Suppress routine age reminders while watching for an effect on active dependencies.

## What happens after I review this

For each suggestion I can **accept, dismiss with a reason, or defer to a checkpoint**. Any outreach remains mine to review and send.

For example, suppose the Head of Engineering and maintainers confirm that the wallet failure remains a hold and agree a next-day checkpoint. The retained record would capture that decision, its source, the confirmed owner, and the checkpoint. Tomorrow's brief would ask for the agreed update, rather than repeat the original question. If collection fails, it would show "release status not refreshed"; it would not report that nothing changed.

*The response and next-day checkpoint above are hypothetical. They illustrate how the design remembers a decision without treating it as evidence that the release is complete.*

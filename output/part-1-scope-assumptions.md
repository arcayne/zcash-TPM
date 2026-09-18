# Part 1: scope assumptions and team clarification

Working note, updated 18 September 2026. Based on the assessment brief, the four questions Joan reports sending, saved research, and the public [NU7 timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655). This is preparation material, not an additional submission deliverable.

## Confirmed scope after the team reply

September 18 update: the concise report now uses Zebra code reference [ec8f29ea726b](https://github.com/ZcashFoundation/zebra/commit/ec8f29ea726bea2fad73829ddc76af054eae623d) and a check of selected PRs on September 18. The release PR is titled v6.4.0. Sidecar #11413, mining #11371, and fork-choice #11341 have merged; fuzzing replaces the fork-choice review in the five follow-ups. The board counts below remain September 17 observations. The NU7 forum timeline supplies the current public schedule; legacy GitHub milestone dates do not.

The [reply supplied by Joan](../research/2026-09-17/hiring-team-clarifications.md) supersedes the provisional assumptions below. All Engineering is the intended assessment view. Non-Zebra work is in scope, and the current Zebra-heavy sample needs a bounded comparison with those cards before finalizing the five follow-ups.

Milestones are legacy; use epics and their child issues for current scope discovery. Epics are intentionally hidden from All Engineering, not moved or estimated, and may close after optional remaining work is excluded. Do not infer delay from the NU7 milestone date or static epic status. Legacy infra has a known migration/cleanup explanation, not an established inactivity problem. Identify the affected cards before excluding any from workload estimates.

The September 17 All Engineering queue counts are the primary historical baseline: **21 In Engineering, 14 Ready for Review, 11 In Review, 2 Reviewed**. The clarification changes their interpretation, not the observed counts. No verified count excluding legacy infra exists yet. Synapse reuse is explicitly allowed. Ordinary child issues' merge-versus-release completion semantics remain unresolved by the epic-specific answer.

Completed: a [bounded non-Zebra review](../research/2026-09-17/non-zebra-triage.md) checked those eight board items and relevant dependencies at approximately 14:00–14:07 UTC. It promotes ed25519-zebra #206 into the five follow-ups, expands wallet recovery to include Zallet #581/#588, and moves fuzzing to secondary follow-through. Seeder, FROST, and ZIP decisions are documented. This remains a sample, not an exhaustive backlog audit; the report retains five ranked follow-ups.

## Historical working scope before the reply (superseded)

Start from Zebra and follow specific dependencies into other repositories where they explain a Zebra delivery risk or handoff. Use the supplied Engineering board provisionally as planning context; its inclusion awaits the answer to question 1. Keep every principal finding supported by public issues, PRs, comments, or release/check evidence wherever possible.

The brief expects approximately 3–4 hours for Part 1 and 1–2 hours for Part 2, explicitly does not expect exhaustive coverage, and asks for 3–5 ordered follow-ups. A broader repository scope would change the sample and potentially the follow-up order, not justify an exhaustive organization-wide audit.

## Historical assumptions and expected effects (superseded)

| Sent question | Working assumption | Consequence of a different answer |
| --- | --- | --- |
| 1. Board permission and Zebra versus All Engineering | Zebra is the triage focus; other repositories provide dependencies and context. Board observations are provisional. | Full Engineering coverage requires sampling other workstreams and reconsidering the top 3–5. Public-only sources require removing board-only queue positions, counts, and interpretations, then reassessing findings that depended on them. |
| 2. Milestones versus epics | The milestone and linked Epic are useful discovery paths, not proof of complete NU7 scope or an agreed delivery plan. | A canonical planning source may add, remove, supersede, or regroup work and change our assessment of scope coverage, ownership gaps, or risk. Do not count parents and their children as independent units of delivered work. |
| 3. Merged/Done | Report the observed board status separately from merge, release inclusion, and activation evidence. | The answer changes completion classification and which follow-through is still appropriate. A released implementation may still await network activation. It does not change the underlying raw card counts. |
| 4. Synapse for Part 2 | Reuse is a design option pending clarification; current internal adoption is unverified. | This changes the Part 2 starting architecture and reuse proposal. It does not change Part 1's evidence or counts. |

The sent email's question 3 ends with the meaning of Merged/Done. The testnet/activation questions and governance discussion remain preparation questions for the presentation; they were not included in the sent email.

## Numerical baseline and limits

These are historical snapshot observations from `research/2026-09-16/board-notes.md` and `evidence-notes.md`, not a fresh live count.

- **518 Zebra-only view cards:** filter `repo:ZcashFoundation/zebra -label:ai-generated`; includes all displayed statuses, including Merged/Done and Won't Do.
- **622 All Engineering view cards:** filter `-label:ai-generated`. The saved view totals differ by 104 cards. That is not 104 additional active tasks or a measure of additional effort. Later observations in the conversation used different totals; do not combine those with this snapshot.
- **141 Zebra Merged/Done cards:** an observed status count, not a verified total of released features or a basis for a completion percentage.
- **13 NU7-label matches:** the temporary filter omitted the AI-label exclusion, so its population differs from the saved Zebra view. It also omitted linked child #11447, whose issue snapshot had no NU7 label. This is not the NU7 scope denominator.
- **58 open PRs in the saved inventory:** distinct from board cards and milestone issues. Follow linked issues and PRs as related work rather than adding their counts.
- **Five proposed follow-ups:** an editorial selection within the brief's 3–5 requirement, not a total of all risks. Their order remains provisional pending commitments and team context.

Do not calculate overall delivery completion, throughput, staffing capacity, or percentage of NU7 complete from these counts. The draft can meet the brief without any aggregate completion percentage.

## Findings to retain and validate

Continue examining release follow-through, the wallet integration failure, NU7 dependencies, sidecar adoption, the fork-choice review, and fuzzing enrollment against the saved evidence. These are candidates, not a fixed priority order. Board answers may change framing; a broader scope or an existing plan may change their relative priority.

NU7 is one workstream within the Zebra triage. The exercise calls for identifying consequential gaps and proposing follow-ups, not constructing a complete NU7 epic or solving governance. The September 17 public timeline gives the work a shared target path: September 30 code completion, October 6 testnet activation, October 20 mainnet decision and activation-height setting, and November 5 mainnet activation. Treat October 20 as the public go/no-go gate; the November 5 date is a shared target, not proof that activation is unconditional. Missing activation heights should be described as a dependency; whether they are late or blocking today's work requires the cross-organization critical path and ownership view.

Preserve the dated review window. The saved notes record research starting at 18:40 UTC on 16 September; verify that timezone before using it in the final submission, since Joan originally described Wednesday at 18:40 without specifying a timezone. The NU7 timeline was published September 17 and incorporated in an explicitly revised 16–18 September snapshot. Other later checks should be labeled separately or incorporated into an explicitly revised snapshot.

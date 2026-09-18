# Scope and snapshot notes

These notes explain what I reviewed and how I interpreted it. The delivery judgments are in [Part 1](part-1-delivery-triage.md).

## What I reviewed

The hiring team confirmed that the assessment covers the All Engineering board. The Zebra view is a filtered version of that board. I reviewed selected work across the linked repositories and public discussions; this was a delivery sample, not a full backlog audit.

The brief allows approximately 3 to 4 hours for Part 1 and 1 to 2 hours for Part 2, and asks for 3 to 5 ordered follow-ups. I chose five based on the release hold, NU7's dates, waiting reviews, and work close to completion.

## When I checked it

- September 16: initial repository and board research.
- September 17: board observations and a review of selected work outside Zebra.
- September 18: selected PRs and the public NU7 timeline checked again. The Zebra code reference is [ec8f29ea726b](https://github.com/ZcashFoundation/zebra/commit/ec8f29ea726bea2fad73829ddc76af054eae623d).

The board counts remain September 17 observations. Editing the report does not make them a new snapshot.

## What the team clarified

The team uses epics to group work; milestones are legacy. Epics are hidden from All Engineering, do not move through its columns, and have no estimates. An epic may close when all required work is complete, even if optional work is left out.

I therefore checked the child issues and release evidence before describing work as complete. The team's answer about epics did not fully resolve how Merged/Done applies to ordinary issues. Merged, released, and activated remain separate states in the report.

The team also explained that the older infra project is awaiting migration and cleanup. Its age alone is not evidence of stalled work. Reusing Synapse for Part 2 is allowed; that does not establish whether the team currently uses it.

## What the counts tell us

The September 17 board had **21 In Engineering, 14 Ready for Review, 11 In Review, and 2 Reviewed**. These are cards, and linked issues and PRs can overlap. I have not verified a count that excludes legacy infra.

Earlier saved inventory counts use different populations:

| Observation | How to read it |
| --- | --- |
| 518 Zebra-view cards and 622 All Engineering cards | These include completed and rejected work. The difference is not 104 extra active tasks. |
| 141 Zebra Merged/Done cards | A workflow count, not a verified total of released features. |
| 13 NU7-label matches | The filter differed from the saved view and missed linked work. It is not the full NU7 scope. |
| 58 open PRs | A separate inventory from board cards. Do not add the two totals. |

I would not use these figures to calculate completion percentages, throughput, or staffing capacity. They help direct the review towards work whose next step needs clarification.

## How I read the NU7 dates

The [September 17 announcement](https://forum.zcashcommunity.com/t/nu7-timeline/57655) sets September 30 for code completion, October 6 for testnet activation, October 20 for the mainnet decision and activation-height setting, and November 5 as the planned mainnet activation date.

November 5 depends on the October 20 decision. Missing activation heights are dependencies to follow up, but whether they are late depends on when the implementing teams need them. The legacy milestone date is not the schedule used in this report.

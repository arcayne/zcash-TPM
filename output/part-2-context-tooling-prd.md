# Design details and checks

These notes add detail to [Part 2](part-2-context-tooling-design.md). The proposal starts with one Zebra release and NU7. It has not been built or evaluated.

## What I would store

I would keep a small record store outside the AI conversation. Existing team records would remain the source for status and commitments.

| Record | What it needs to retain |
| --- | --- |
| Work item | Source ID and link, repository, observed state, owner if known, related release or commitment, and last successful check. |
| Dependency | The two related items, direction and type of relationship, supporting evidence, whether someone has confirmed it, contact if known, and needed-by date. |
| Decision | What was decided, why, by whom, when, and which work it affects. Keep the source and any later decision that replaces it. |
| Follow-up | Proposed next action, whether I accepted, dismissed, or deferred it, the reason, and the next check. |
| Collection record | What was checked, what failed, and where the next run should resume. |

Store concise notes and links rather than whole chat histories. Retain only the information needed for the follow-up and respect the source's access restrictions.

## How dependency discovery would work

Start with explicit issue links, PR references, and stated prerequisites. AI could suggest additional relationships from release notes or discussions, but those suggestions need evidence and review. Sharing a label or repository is not enough to establish a dependency.

A change to a prerequisite would prompt a check of the work that depends on it. The brief would show the relationship, source, possible consequence, and what still needs confirmation. A discussion that informs a decision must not be treated as a delivery blocker.

For example, NU7 issues record prerequisites involving branch IDs, a library release, and activation heights. I would confirm the contacts and needed-by dates before treating a missing prerequisite as late. The [full example brief](part-2-example-daily-brief.md) shows that follow-up.

## How the brief would stay useful

Each brief would show source coverage and up to five routine follow-ups. Other candidates would remain available to inspect. Possible urgent concerns would appear separately, alongside the team's existing release and security response channels.

Each follow-up needs the change, its possible impact, source links, uncertainty, proposed next step, and a confirmed owner or an explicit unknown. Group duplicate reports about the same work. Keep confirmed pauses quiet until a checkpoint or relevant change. A missing owner may still need attention if it prevents the next step.

I would check the sources, accept or dismiss suggestions, and record decisions through the team's normal workflow. Accepting a suggestion creates an open follow-up; reading it does not complete the work. The Head of Engineering owns engineering priorities, and maintainers make technical judgments. I would own coordination and the agreed readiness follow-up.

## When something goes wrong

| Problem | Expected response |
| --- | --- |
| A source cannot be refreshed | Show the last successful check and the missing period. Resume from that point and remove duplicates. |
| Sources disagree | Show both accounts and their dates. Ask for confirmation before choosing an interpretation. |
| AI invents or overstates a connection | Require supporting links. Keep the connection tentative and let me reject it with a reason. |
| Summarization fails | Show the collected facts and source links. |
| A decision changes | Keep its history, mark the newer decision as current, and revisit affected follow-ups. |
| The brief becomes noisy or misses important work | Compare it with manual review and inspect items it left out. Adjust the rules or narrow coverage. |

Treat retrieved text as evidence to assess, never as instructions for the tool to follow.

## Checks before expanding

I would try cases where a release remains held after a blocker is resolved, work is deliberately paused, a refresh fails, reports are duplicated, sources conflict, and a prerequisite changes. I would also check that tentative dependencies stay tentative and that merged, released, and activated work remain distinct.

The trial is useful if it reduces my review time while still finding important changes. I would track useful follow-ups, false alarms, known misses, dependency confirmations, and the time spent reviewing and maintaining it. These are proposed checks, not measured results.

## Who would maintain it

I would own the triage rules and daily review. During onboarding, I would agree source access, the plan to compare against, and who maintains collection and recovery. Synapse is an option to assess for reuse; the proposal does not depend on a particular tool or database.

The first-month plan is in [Part 2](part-2-context-tooling-design.md#how-i-would-try-it). Broader reporting can wait until the daily brief proves useful.

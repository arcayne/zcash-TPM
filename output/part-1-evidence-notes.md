# Evidence behind Part 1

These notes explain how I grouped the work, read the board, and identified contributors. They use the same September 17 and 18 snapshot as [Part 1](part-1-delivery-triage.md). The five proposed follow-ups and team questions are in that report.

## How I grouped the work

The eight areas in Part 1 are my way of organizing the review. They are not official team names or board labels. I grouped items by what they help deliver and the dependencies they share: releases and CI, NU7, sync and mining, wallets and operators, cryptographic libraries, FROST, seeders, and fuzzing.

An area can span repositories and involve several people. Appearing in the same area does not mean two items depend on each other. For example, the sidecar update, migration guide, and Zallet recovery work have separate next steps. I found no evidence that they form a single dependency chain or block NU7.

## What the board adds

The board shows queue order and workflow stage across repositories. Linked issues and pull requests add the review history, test results, and reasons why work is waiting. I used both because a board card alone can miss an important change.

The September 17 snapshot showed 21 cards In Engineering, 14 Ready for Review, 11 In Review, and 2 Reviewed. Some issues and pull requests describe the same work, and some cards need cleanup. These counts help identify questions about active work and review waits; they do not measure capacity.

For example, [#10725](https://github.com/ZcashFoundation/zebra/pull/10725) was closed and its author said the v2 protocol stack replaced it, despite its In Engineering placement. That is a reason to check the card, not chase the old implementation.

The first three Ready for Review cards linked to [#11430](https://github.com/ZcashFoundation/zebra/pull/11430), [#11329](https://github.com/ZcashFoundation/zebra/pull/11329), and [#11431](https://github.com/ZcashFoundation/zebra/pull/11431). At that check, none had a requested reviewer or recorded review. I would confirm reviewer pickup; I would not infer that nobody owns the work.

Ready for Review does not require an assignee in its description. In Engineering asks for an assignee or blocked label, and In Review asks for a reviewer or blocked label. These distinctions matter when deciding which gaps to follow up.

## Contributors and affiliations

Affiliations were checked against public sources on September 17. “ZF team” means publicly identified as part of the Foundation team; it does not establish employment terms, available capacity, or ownership of every issue they touch. External contributors can also be experienced maintainers.

| Classification | People appearing in this review | Evidence and limits |
| --- | --- | --- |
| ZF team | Pili Guerra (`mpguerra`), Alfredo Garcia (`oxarbitrage`), Arya (`arya2`), Conrado (`conradoplg`), Marek (`upbqdn`), Gustavo Valverde (`gustavovalverde`), Janito Vaqueiro Ferreira Filho (`jvff`) | Listed on the [Foundation team page](https://zfnd.org/), with names corroborated by their GitHub profiles. This is the subset visible in this review, not the full staff roster. |
| ZF adviser | DC (`alchemydc`) | His [GitHub profile](https://github.com/alchemydc) identifies him as an adviser to the Foundation. Keep this distinct from staff capacity. |
| External ecosystem contributor | Kris Nuttycombe (`nuttycom`) | His [GitHub profile](https://github.com/nuttycom) lists Electric Coin Company. Treat this as a self-reported affiliation; the precise current organization and engagement terms need confirmation. |
| External contributor to the fuzzing effort | `robustfengbin` | In [#11166](https://github.com/ZcashFoundation/zebra/issues/11166), he offers to hand the suite to the Foundation, says he is not a Zebra committer, and requests a Foundation maintainer contact. This establishes his role in this handoff, not contractual status. |
| Affiliation unconfirmed | `john-lawniczak`, `cleanerzkp`, `andres-pcg` | Their inspected public profiles do not establish a Foundation role. The Foundation lists Andrés Rodríguez as a platform engineer, but the mapping to `andres-pcg` was not independently established. Absence from a roster does not prove someone is external. [John](https://github.com/john-lawniczak), [cleanerzkp](https://github.com/cleanerzkp), [andres-pcg](https://github.com/andres-pcg), [Andrés announcement](https://zfnd.org/zcash-foundation-welcomes-a-new-platform-engineer/). |

For triage, record affiliation separately from the observed role: author, issue assignee, reviewer, or coordination contact. These distinctions help identify internal review and external handoffs, but do not support dividing board-card counts by contributor counts to estimate team workload.


## What still needs confirmation

The report identifies visible activity, not a complete account of each person's work. I would confirm responsibilities, review availability, and external contacts with the team before using them in a delivery plan. The [scope notes](part-1-scope-assumptions.md) explain the snapshot dates and the team's board conventions.

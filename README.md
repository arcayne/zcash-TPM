# Zcash Foundation assessment site

A static GitHub Pages site for Joan De Arcayne's TPM take-home assessment. The site is organized as three consistent destinations:

- `index.html` renders the canonical Part 1 delivery triage from `output/part-1-delivery-triage.md`.
- `part-2.html` renders the canonical Part 2 proposal from `output/part-2-context-tooling-design.md`.
- `supporting-notes.html` indexes scope and snapshot notes, the full illustrative brief, and optional design detail.

`report.html` preserves the shared extended-reference URL. `prd.html` redirects to canonical Part 1.

## Run locally

The readable document pages load their Markdown sources with `fetch`, so use a local HTTP server rather than opening the HTML files directly:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Deploy to GitHub Pages

1. Create a GitHub repository and copy these files into it.
2. Commit to the `main` branch and push.
3. In **Settings → Pages**, select **GitHub Actions** as the source.
4. The workflow in `.github/workflows/pages.yml` deploys the repository root on every push to `main`.

No build toolchain or runtime dependency is required. The workflow assembles the public HTML, CSS, renderer, and intended Markdown and diagram sources. Captured `research/` files are retained in source history but are not deployed.

## Published content sources

- `output/part-1-delivery-triage.md` — canonical Part 1
- `output/part-1-delivery-triage-extended.md` — historical extended reference
- `output/part-1-scope-assumptions.md` — scope and snapshot notes
- `output/part-2-context-tooling-design.md` — canonical Part 2
- `output/part-2-example-daily-brief.md` — full illustrative brief
- `output/part-2-context-tooling-prd.md` — optional design detail
- `output/part-2-design-diagram.mmd` — source for the generated relationship diagram

The older Part 1 PRD remains in source history but is not a primary presentation route.

# Engineering delivery triage · Part 1

A static GitHub Pages site for the Zcash Foundation TPM take-home. The landing page turns the Part 1 PRD into a shareable delivery brief; `prd.html` renders the compact PRD and `report.html` renders the extended markdown report in the browser.

## Run locally

The detailed report loads markdown with `fetch`, so use a local HTTP server rather than opening the HTML file directly:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Deploy to GitHub Pages

1. Create a new GitHub repository and copy these files into it.
2. Commit to the `main` branch and push.
3. In **Settings → Pages**, select **GitHub Actions** as the source.
4. The workflow in `.github/workflows/pages.yml` deploys the repository root on every push to `main`.

No build toolchain or runtime dependency is required. The workflow assembles only the public HTML, CSS, renderer, and three intended markdown documents; the captured `research/` directory is not deployed. The report renderer is intentionally local; external source links open in a new tab.

## Content sources

- `output/part-1-delivery-triage-prd.md` — compact PRD
- `output/part-1-delivery-triage-extended.md` — detailed report rendered by the site
- `output/part-1-scope-assumptions.md` — scope and numerical guardrails
- `research/2026-09-16/` and `research/2026-09-17/` — captured evidence and clarifications

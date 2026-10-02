# Scrum Role Studio

An interactive Scrum role explorer for comparing Project Manager, Product Owner, and Scrum Master responsibilities, with six situations, a comparison table, interview examples, and ten original practice questions.

## Publishing

GitHub Actions publishes the static site from the repository root to GitHub Pages on every push to `main`. In the repository settings, select **Pages → Build and deployment → Source → GitHub Actions** before the first deployment. The workflow can also be run manually from the Actions tab.

No build step, npm dependencies, API keys, backend, or ChatGPT subscription are required to run the site.

## Run locally

    python3 -m http.server 4173

Open http://localhost:4173.

## Edit

- `index.html`: page content and comparison table
- `styles.css`: styling and responsive layouts
- `app.js`: situations, interview examples, quiz questions, and scoring
- `.github/workflows/deploy.yml`: GitHub Pages deployment

Quiz progress is saved only in each visitor’s browser, when localStorage is available. No analytics or visitor database are included.

The exported site uses relative asset paths so it works under a GitHub Pages repository URL. Search exclusion metadata is retained; it is not access control.

## References

Scrum distinctions are grounded in the November 2020 Scrum Guide and Scrum.org. Project Manager examples are organization-dependent. Practice questions are original and are not official PSM I exam questions.

The Scrum Guide is © 2020 Ken Schwaber and Jeff Sutherland, CC BY-SA 4.0. Linked reference materials retain their respective licenses.

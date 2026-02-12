# Personal Website

This repository hosts a static personal website served from the repository root.

## Updating Content

### Profile (name, bio, email, affiliations)
- File: index.html
- Update the sidebar section (name, affiliation, email) and the “About Me” paragraph.
- Profile photo path: assets/img/shuibai_profile.JPG
  - Recommended size: square image, at least 400×400 px.

### Publications
- File: data/publications.json
- Add one object per publication.
- Fields used by the site:
  - title (string): paper title
  - url (string): link to PDF/arXiv/DOI
  - authors (string): author list
  - venue (string): venue + year (this is where the date goes)

Example:
- {
-   "title": "Paper Title",
-   "url": "https://arxiv.org/abs/xxxx.xxxxx",
-   "authors": "Author A, Author B",
-   "venue": "Conference Name (2026)"
- }

### Experience
- File: data/experience.json
- Add one object per role.
- Fields used by the site:
  - title (string)
  - location (string)
  - date (string): date range like "Aug 2024 – Present"
  - mentor (string, optional)
  - bullets (array of strings)

Example:
- {
-   "title": "Research Assistant",
-   "location": "University Name",
-   "date": "Aug 2024 – Present",
-   "mentor": "Supervised by ...",
-   "bullets": [
-     "First responsibility.",
-     "Second responsibility."
-   ]
- }

Ordering is top-to-bottom in the JSON file.

### Projects
- File: data/projects.json
- Add one object per project.
- Fields used by the site:
  - title (string)
  - description (string)
  - links (array of { label, url })
  - periodical (string): project type or date (use this field for the project date if needed)

Example:
- {
-   "title": "Project Title",
-   "description": "Short summary.",
-   "links": [
-     { "label": "💻 GitHub", "url": "https://github.com/..." }
-   ],
-   "periodical": "Course Project (2025)"
- }

### Local preview / rebuild
- This is a plain static site. No build step is required.
- You can preview locally using any static file server of your choice.

### Deployment (GitHub Pages)
- Commit and push to the default branch.
- Configure GitHub Pages to serve from the repository root.
- No build command is necessary for deployment.

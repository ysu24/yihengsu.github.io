async function loadJson(path) {
  const response = await fetch(new URL(path, document.baseURI), { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

function renderProjects(items) {
  const container = document.getElementById("projects");
  if (!container) return;

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = "<p>Projects coming soon.</p>";
    return;
  }

  container.innerHTML = items
    .map((project) => {
      const title = project.title ? `<div class="title">${project.title}</div>` : "";
      const description = project.description
        ? `<div class="description">${project.description}</div>`
        : "";
      const links = Array.isArray(project.links) && project.links.length
        ? `<div class="project-links">${project.links
            .map(
              (link) =>
                `<a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`
            )
            .join("<span>|</span>")}</div>`
        : "";
      const periodical = project.periodical
        ? `<div class="periodical"><em>${project.periodical}</em></div>`
        : "";

      return `
        <div class="project">
          ${title}
          ${description}
          ${links}
          ${periodical}
        </div>
      `;
    })
    .join("");
}

function renderPublications(items) {
  const publicationsContainer = document.getElementById("publications");
  const preprintsContainer = document.getElementById("preprints");
  if (!publicationsContainer || !preprintsContainer) return;

  if (!Array.isArray(items) || items.length === 0) {
    publicationsContainer.innerHTML = "<p>Publications coming soon.</p>";
    preprintsContainer.innerHTML = "<p>Preprints coming soon.</p>";
    return;
  }

  const renderItems = (entries) => entries
    .map((pub) => {
      const title = pub.title ? `<div class="title">${pub.title}</div>` : "";
      const authors = pub.authors
        ? `<div class="author">${pub.authors.replace(/\bYiheng Su\b/g, "<strong>Yiheng Su</strong>")}</div>`
        : "";
      const venueName = pub.type === "Journal" || pub.type === "Conference"
        ? `<strong>${pub.venue}</strong>`
        : pub.venue;
      const venue = pub.venue
        ? `<div class="periodical"><em>${venueName}</em>${pub.year ? `, ${pub.year}` : ""}.${pub.type ? ` <strong>[${pub.type}]</strong>` : ""}</div>`
        : "";
      const links = Array.isArray(pub.links) && pub.links.length
        ? `<div class="publication-links">${pub.links
            .map((link) => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">[${link.label}]</a>`)
            .join(" ")}</div>`
        : "";

      return `
        <div class="publication">
          ${title}
          ${authors}
          ${venue}
          ${links}
        </div>
      `;
    })
    .join("");

  const isPreprint = (pub) => pub.type === "Preprint" || /under review/i.test(pub.venue || "");
  const publications = items.filter((pub) => !isPreprint(pub));
  const preprints = items.filter(isPreprint);

  publicationsContainer.innerHTML = publications.length
    ? renderItems(publications)
    : "<p>Publications coming soon.</p>";
  preprintsContainer.innerHTML = preprints.length
    ? renderItems(preprints)
    : "<p>Preprints coming soon.</p>";
}

function renderExperience(items) {
  const container = document.getElementById("experience");
  if (!container) return;

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = "<p>Experience coming soon.</p>";
    return;
  }

  container.innerHTML = items
    .map((job) => {
      const title = job.title ? `<div class="title">${job.title}</div>` : "";
      const location = job.location ? `<div class="location">${job.location}</div>` : "";
      const date = job.date ? `<div class="date">${job.date}</div>` : "";
      const mentor = job.mentor ? `<div class="mentor">${job.mentor}</div>` : "";
      const bullets = Array.isArray(job.bullets) && job.bullets.length
        ? `<ul>${job.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>`
        : "";

      return `
        <div class="job">
          ${title}
          ${location}
          ${date}
          ${mentor}
          ${bullets}
        </div>
      `;
    })
    .join("");
}

function renderTeaching(items) {
  const container = document.getElementById("teaching");
  if (!container) return;

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = "<p>Teaching coming soon.</p>";
    return;
  }

  container.innerHTML = items
    .map((entry) => {
      const title = entry.title ? `<div class="title">${entry.title}</div>` : "";
      const institution = entry.institution
        ? `<div class="institution">${entry.institution}</div>`
        : "";
      const term = entry.term ? `<div class="term"><em>${entry.term}</em></div>` : "";

      return `
        <div class="teaching-item">
          ${title}
          ${institution}
          ${term}
        </div>
      `;
    })
    .join("");
}

async function initContent() {
  try {
    const projects = await loadJson("data/projects.json");
    renderProjects(projects);
  } catch (error) {
    console.error(error);
    const container = document.getElementById("projects");
    if (container) container.innerHTML = "<p>Projects coming soon.</p>";
  }

  try {
    const publications = await loadJson("data/publications.json");
    renderPublications(publications);
  } catch (error) {
    console.error(error);
    const publicationsContainer = document.getElementById("publications");
    const preprintsContainer = document.getElementById("preprints");
    if (publicationsContainer) publicationsContainer.innerHTML = "<p>Publications coming soon.</p>";
    if (preprintsContainer) preprintsContainer.innerHTML = "<p>Preprints coming soon.</p>";
  }

  try {
    const experience = await loadJson("data/experience.json");
    renderExperience(experience);
  } catch (error) {
    console.error(error);
    const container = document.getElementById("experience");
    if (container) container.innerHTML = "<p>Experience coming soon.</p>";
  }

  try {
    const teaching = await loadJson("data/teaching.json");
    renderTeaching(teaching);
  } catch (error) {
    console.error(error);
    const container = document.getElementById("teaching");
    if (container) container.innerHTML = "<p>Teaching coming soon.</p>";
  }
}

document.addEventListener("DOMContentLoaded", initContent);

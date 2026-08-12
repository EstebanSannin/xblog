// Loads the site config and Markdown documents over fetch().
// (Needs to be served over HTTP — fetch does not work from a file:// URL,
// exactly like the old jQuery AJAX code.)

import { parseFrontmatter, renderMarkdown } from "./markdown.js";

const BASE = "content/";

export async function loadConfig() {
  const res = await fetch(BASE + "site.json", { cache: "no-cache" });
  if (!res.ok) throw new Error(`site.json: HTTP ${res.status}`);
  return res.json();
}

// Fetch one Markdown file and return its metadata, raw body, and rendered HTML.
export async function loadDoc(path) {
  const res = await fetch(BASE + path, { cache: "no-cache" });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  const raw = await res.text();
  const { meta, body } = parseFrontmatter(raw);
  meta.slug = meta.slug || path.split("/").pop().replace(/\.md$/, "");
  meta.path = path;
  return { meta, body, html: renderMarkdown(body) };
}

// Fetch a list of Markdown files in parallel.
export function loadCollection(paths) {
  return Promise.all((paths || []).map(loadDoc));
}

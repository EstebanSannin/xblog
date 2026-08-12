// Markdown + frontmatter helpers.
//
// We render with `marked` (vendored, no CDN) and syntax-highlight with
// highlight.js *after* the HTML is in the DOM — the same two-step the old
// jQuery code did, but without jQuery and without the deprecated APIs.

import { marked } from "../vendor/marked.esm.js";

marked.setOptions({ gfm: true, breaks: false });

// Parse a tiny subset of YAML frontmatter: `key: value` lines fenced by `---`.
// That is all a static blog needs, and it keeps us dependency-free.
export function parseFrontmatter(raw) {
  const meta = {};
  raw = raw.replace(/^\uFEFF/, "");
  const fence = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fence) return { meta, body: raw };
  for (const line of fence[1].split(/\r?\n/)) {
    const kv = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.*?)\s*$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { meta, body: raw.slice(fence[0].length) };
}

// Content is authored by the site owner (trusted), so we render it directly.
// If you ever accept untrusted Markdown, sanitise the output before insertion.
export function renderMarkdown(body) {
  return marked.parse(body);
}

// Highlight every code block inside an element already attached to the DOM.
export function highlight(el) {
  if (!window.hljs) return;
  el.querySelectorAll("pre code").forEach((block) => window.hljs.highlightElement(block));
}

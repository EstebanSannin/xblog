// View renderers. Each one builds HTML and drops it into #content, then runs
// syntax highlighting over any code blocks.

import { loadDoc, loadCollection } from "./content.js";
import { highlight } from "./markdown.js";

const escapeHtml = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

function mount(html) {
  const el = document.getElementById("content");
  el.innerHTML = html;
  highlight(el);
  window.scrollTo(0, 0);
}

export async function renderHome(config) {
  const doc = await loadDoc(config.home);
  mount(`<div class="prose">${doc.html}</div>`);
}

export async function renderBlog(config) {
  const posts = await loadCollection(config.posts);
  const items = posts.map((p) => `
    <li>
      <time>${escapeHtml(p.meta.date || "")}</time>
      <a href="#/post/${encodeURIComponent(p.meta.slug)}">${escapeHtml(p.meta.title || p.meta.slug)}</a>
    </li>`).join("");
  mount(`<h2>Blog</h2><ul class="post-list">${items || "<li>No posts yet.</li>"}</ul>`);
}

export async function renderPost(config, slug) {
  const posts = await loadCollection(config.posts);
  const post = posts.find((p) => p.meta.slug === slug);
  if (!post) return renderNotFound(slug);
  const { title, date, author } = post.meta;
  const meta = [date, author].filter(Boolean).map(escapeHtml).join(" · ");
  mount(`
    <article class="prose">
      <h1>${escapeHtml(title || slug)}</h1>
      ${meta ? `<p class="post-meta">${meta}</p>` : ""}
      ${post.html}
      <p class="back"><a href="#/blog">&larr; all posts</a></p>
    </article>`);
}

export async function renderPage(config, slug) {
  const pages = await loadCollection(config.pages);
  const page = pages.find((p) => p.meta.slug === slug);
  if (!page) return renderNotFound(slug);
  mount(`<article class="prose"><h1>${escapeHtml(page.meta.title || slug)}</h1>${page.html}</article>`);
}

export function renderNotFound(what) {
  mount(`<h2>Not found</h2><p>Nothing here for <code>${escapeHtml(what || "")}</code>.</p>
         <p><a href="#/">&larr; home</a></p>`);
}

export function renderError(err) {
  mount(`<h2>Something went wrong</h2><p class="error">${escapeHtml(err.message || String(err))}</p>`);
}

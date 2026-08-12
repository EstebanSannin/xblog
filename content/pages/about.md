---
title: About xBl0g
slug: about
---

**xBl0g** is a tiny, static, no-build blog engine. The whole site is plain files
served over HTTP: an `index.html` shell, a handful of vanilla ES modules, and your
content as Markdown. There is no framework, no bundler, and no backend.

### How it is wired

| Piece | What it does |
|-------|--------------|
| `index.html`       | The shell: header, menu, content area, footer |
| `css/theme.css`    | Responsive dark "terminal" theme (CSS variables) |
| `js/app.js`        | Entry point + hash router |
| `js/content.js`    | Loads `site.json` and Markdown files |
| `js/markdown.js`   | Parses frontmatter and renders Markdown (marked + highlight.js) |
| `js/views.js`      | Renders home, blog list, single post, and pages |
| `content/site.json`| Site config: title, menu, and the list of posts/pages |
| `content/**/*.md`  | Your actual content |

### Adding a post

1. Drop a Markdown file in `content/posts/` with a small frontmatter block:

   ```text
   ---
   title: My New Post
   date: 2026-01-15
   author: you
   slug: my-new-post
   ---

   Write your post here in **Markdown**.
   ```

2. Add its path to the `posts` array in `content/site.json` (newest first).

That is the whole workflow — no rebuild, just edit files and reload.

### Adding a page or menu entry

Pages work the same way but live in `content/pages/`. To link one from the top
menu, add an entry to `menu` in `site.json`:

```json
{ "title": "about", "route": "#/page/about" }
```

Use `"url"` instead of `"route"` for an external link.

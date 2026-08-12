# xBl0g

A fast, minimal "nerd" blog. Static files only — **no build step, no backend, no
framework**. `index.html` loads a few small vanilla ES modules that render your
**Markdown** on the client. `marked` and `highlight.js` are vendored in `vendor/`,
so nothing is fetched from a CDN.

## Run

Serve the folder over HTTP (browser `fetch` doesn't work from `file://`):

```bash
python3 -m http.server 8099
# open http://localhost:8099
```

Deploy by copying the folder to any static host (GitHub Pages, Netlify, nginx, …).

## Add a post

1. Create `content/posts/2026-01-15-my-post.md`:

   ```text
   ---
   title: My Post
   date: 2026-01-15
   author: you
   slug: my-post
   ---

   Write in **Markdown**. Code blocks get syntax highlighting.
   ```

2. Add its path to the `posts` list in `content/site.json` (newest first).

Pages work the same way in `content/pages/`. No rebuild — edit and reload.

## Configure

Everything lives in `content/site.json`: `siteName`, `subtitle`, `social` links,
the `menu`, and the `posts` / `pages` lists. A menu item with `"route"` is an
internal link (`#/blog`, `#/page/about`); one with `"url"` is external.

## Themes

Colors are CSS variables, so a theme is just a token block in `css/theme.css`:

```css
:root[data-theme="clear"] { --bg: #f7f7f4; --fg: #1b1b1b; --menu: #aa0000; /* … */ }
```

List a theme in `"themes"` in `site.json` and it appears in the footer switcher
(the choice is remembered). `"theme"` sets the default.

## Layout

```
index.html          shell: header, menu, content, footer
css/theme.css       responsive theme(s), CSS variables
js/app.js           entry point, router, theme switch
js/content.js       loads site.json + Markdown
js/markdown.js      frontmatter + marked + highlight.js
js/views.js         renders home / blog / post / page
content/            site.json and your .md files
vendor/             marked + highlight.js (no CDN)
legacy/             original jQuery + XML version, for reference
```

Routes: `#/` home · `#/blog` post list · `#/post/<slug>` a post · `#/page/<slug>` a page.

---

xBl0g 1.0.0 · by Stefano Viola (estebanSannin), 2011 — modernized 2026.

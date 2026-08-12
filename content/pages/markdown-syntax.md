---
title: Markdown Page
slug: markdown-syntax
---

*xBl0g*: Fast, Simple, minimal Nerd BLOG :-)

This page is itself a Markdown file (`content/pages/markdown-syntax.md`). Everything
below is rendered client-side by [marked](https://github.com/markedjs/marked).

### Headings, emphasis, lists

- **bold**, *italic*, `inline code`
- [links](https://github.com/EstebanSannin)
- > block quotes

### Code blocks with highlighting

```python
def greet(name: str) -> str:
    return f"hello, {name}"

print(greet("world"))
```

### Tables

| Feature      | Old xBl0g | New xBl0g |
|--------------|-----------|-----------|
| Content      | XML       | Markdown  |
| DOM library  | jQuery    | none      |
| CDN at runtime | yes     | no (vendored) |
| Responsive   | no        | yes       |

See the [marked documentation](https://marked.js.org/) for the full supported
syntax.

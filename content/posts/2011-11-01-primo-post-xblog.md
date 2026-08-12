---
title: Primo Post xBl0g
date: 2011-11-01
author: estebanSannin
slug: primo-post-xblog
---

Questo è il primo post di esempio del progetto chiamato **xBl0g**: un piccolo CMS
scritto in JavaScript e gestito interamente tramite file di testo. Non serve alcun
linguaggio di backend come PHP, Perl o Ruby, ed è adatto ai sistemi *embedded* dove
la capacità di calcolo è limitata.

Oggi la configurazione e i contenuti sono in **Markdown** invece che in XML — più
semplici da scrivere e da versionare con git.

```javascript
import { marked } from "../vendor/marked.esm.js";

const text = "# Ciao mondo";
const html = marked.parse(text);
console.log("MARKDOWN RESULT:", html);
```

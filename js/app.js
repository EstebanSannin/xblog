// Entry point: load the config, build the page chrome (title, menu, footer),
// then drive a tiny hash router. No framework, no build step.

import { loadConfig } from "./content.js";
import * as views from "./views.js";

let config;

const $ = (sel) => document.querySelector(sel);

const THEME_KEY = "xblog-theme";

// Apply a theme by name and remember the choice. "default" needs no attribute
// (the base :root tokens are the default), everything else is a data-theme.
function applyTheme(name) {
  if (name && name !== "default") document.documentElement.dataset.theme = name;
  else delete document.documentElement.dataset.theme;
  try { localStorage.setItem(THEME_KEY, name); } catch { /* private mode */ }
  document.querySelectorAll("#theme-switch button").forEach((b) => {
    b.classList.toggle("active", b.dataset.theme === name);
  });
}

function currentTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch { /* ignore */ }
  const known = config.themes || ["default"];
  return known.includes(saved) ? saved : (config.theme || "default");
}

function buildThemeSwitch() {
  const themes = config.themes || [];
  const host = $("#theme-switch");
  if (!host || themes.length < 2) return;   // nothing to switch between
  host.innerHTML = themes
    .map((t) => `<button type="button" data-theme="${t}" title="${t} theme">${t}</button>`)
    .join("");
  host.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => applyTheme(b.dataset.theme));
  });
}

function buildChrome() {
  document.title = config.siteName || "xBl0g";
  $("#site-title").textContent = config.siteName || "";
  $("#subtitle").textContent = config.subtitle || "";

  // Top menu. `route` is an internal hash link; `url` is an external link.
  $("#menu").innerHTML = (config.menu || []).map((m) => {
    if (m.url) {
      return `<li><a href="${m.url}" target="_blank" rel="noopener noreferrer">${m.title}</a></li>`;
    }
    return `<li><a href="${m.route}" data-route="${m.route}">${m.title}</a></li>`;
  }).join("");

  // Social links: render only the ones that are set.
  const labels = { github: "GitHub", linkedin: "LinkedIn", mastodon: "Mastodon", twitter: "Twitter" };
  $("#social").innerHTML = Object.entries(config.social || {})
    .filter(([, href]) => href)
    .map(([key, href]) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer">${labels[key] || key}</a>`)
    .join("");

  $("#footer-meta").innerHTML =
    `xBl0g ${config.version || ""} &mdash; ${config.author || ""}`;
}

function markActive() {
  const hash = location.hash || "#/";
  document.querySelectorAll("#menu a[data-route]").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("data-route") === hash);
  });
}

async function route() {
  const hash = (location.hash || "#/").replace(/^#\/?/, "");
  const [section, ...rest] = hash.split("/");
  const arg = decodeURIComponent(rest.join("/") || "");
  document.body.classList.add("loading");
  try {
    if (section === "" || section === "home") await views.renderHome(config);
    else if (section === "blog") await views.renderBlog(config);
    else if (section === "post") await views.renderPost(config, arg);
    else if (section === "page") await views.renderPage(config, arg);
    else views.renderNotFound(hash);
  } catch (err) {
    console.error("[xblog]", err);
    views.renderError(err);
  } finally {
    document.body.classList.remove("loading");
    markActive();
  }
}

async function init() {
  try {
    config = await loadConfig();
  } catch (err) {
    console.error("[xblog]", err);
    views.renderError(err);
    document.body.classList.remove("loading");
    document.body.classList.add("ready");
    return;
  }
  buildChrome();
  buildThemeSwitch();
  applyTheme(currentTheme());
  window.addEventListener("hashchange", route);
  await route();
  document.body.classList.add("ready");
}

init();

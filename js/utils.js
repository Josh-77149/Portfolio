export const $ = (selector, root = document) => root.querySelector(selector);

// Échappe le texte venant de la base avant de l'injecter dans le HTML
export const esc = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

// N'accepte que les liens http(s)
export const safeUrl = (url) => (/^https?:\/\//i.test(url || "") ? url : null);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

export const typeLabel = (type) => (type === "scenario" ? "Scénario" : "Article");
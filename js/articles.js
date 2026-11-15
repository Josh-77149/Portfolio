import { supabase } from "./config.js";
import { $, esc, formatDate, typeLabel } from "./utils.js";

let articles = [];

export async function loadArticles() {
  const box = $("#articlesList");
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("publie", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    box.innerHTML = '<p class="error">Impossible de charger les textes. Rechargez la page.</p>';
    return;
  }
  articles = data;
  if (!data.length) {
    box.innerHTML = '<p class="note">Aucun texte publié pour le moment.</p>';
    return;
  }

  box.innerHTML = data.map((a, i) => `<button class="row" type="button" data-i="${i}">
      <span class="meta">${typeLabel(a.type)} · ${formatDate(a.created_at)}</span>
      <h3>${esc(a.titre)}</h3>
      ${a.resume ? `<span class="meta">${esc(a.resume)}</span>` : ""}
    </button>`).join("");

  setupReader();
}

function setupReader() {
  const reader = $("#reader");
  const body = $("#readerBody");

  $("#articlesList").addEventListener("click", (e) => {
    const row = e.target.closest(".row");
    if (!row) return;
    const a = articles[row.dataset.i];
    body.innerHTML = `<button class="close" type="button" id="closeReader">Fermer</button>
      <span class="meta note">${typeLabel(a.type)} · ${formatDate(a.created_at)}</span>
      <h3>${esc(a.titre)}</h3>
      <div class="body">${esc(a.contenu || "Ce texte n’a pas encore de contenu.")}</div>`;
    reader.showModal();
  });

  reader.addEventListener("click", (e) => {
    if (e.target === reader || e.target.id === "closeReader") reader.close();
  });
}

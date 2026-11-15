import { supabase } from "./config.js";
import { $, esc, safeUrl } from "./utils.js";

export async function loadFilms() {
  const box = $("#filmsList");
  const { data, error } = await supabase
    .from("films")
    .select("*")
    .eq("publie", true)
    .order("annee", { ascending: false, nullsFirst: false });

  if (error) {
    console.error(error);
    box.innerHTML = '<p class="error">Impossible de charger les films. Rechargez la page.</p>';
    return;
  }
  if (!data.length) {
    box.innerHTML = '<p class="note">Aucun film pour le moment. Revenez bientôt.</p>';
    return;
  }

  box.innerHTML = data.map((f) => {
    const img = safeUrl(f.affiche_url);
    const link = safeUrl(f.lien);
    const upcoming = f.statut && f.statut !== "sorti";
    const meta = [f.annee, upcoming ? f.statut : null].filter(Boolean).map(esc).join(" · ");
    return `<article class="film">
      <div class="poster"${img ? ` style="background-image:url('${esc(img)}')" role="img" aria-label="Affiche de ${esc(f.titre)}"` : ""}>${img ? "" : esc(f.titre)}</div>
      <h3>${esc(f.titre)}</h3>
      ${meta ? `<span class="meta">${meta}</span>` : ""}
      ${f.description ? `<p>${esc(f.description)}</p>` : ""}
      ${link ? `<a href="${esc(link)}" target="_blank" rel="noopener noreferrer">Regarder le film</a>` : ""}
    </article>`;
  }).join("");
}

import { supabase } from "./config.js";
import { $ } from "./utils.js";

export function setupContact() {
  const form = $("#contactForm");
  const status = $("#contactMsg");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Champ piège anti-robots : un humain ne le remplit jamais
    if (form.website.value) return;

    if (!form.reportValidity()) return;

    button.disabled = true;
    status.className = "status";
    status.textContent = "Envoi en cours…";

    const { error } = await supabase.from("messages").insert({
      nom: form.nom.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    });

    button.disabled = false;

    if (error) {
      console.error(error);
      status.className = "status error";
      status.textContent = "Le message n’a pas été envoyé. Vérifiez votre connexion et réessayez.";
      return;
    }

    form.reset();
    status.textContent = "Message envoyé. Merci, je vous réponds bientôt.";
  });
}

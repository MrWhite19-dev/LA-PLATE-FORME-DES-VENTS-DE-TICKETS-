/* =========================================================
   M'AS-TU VU ? — Gestion des formulaires de réservation
   Chaque formulaire prépare un message et ouvre WhatsApp.
   IMPORTANT : configurez le numéro du vendeur avant publication.
   Format attendu : indicatif pays + numéro, chiffres uniquement.
   Exemple Côte d'Ivoire : 2250700000000
   ========================================================= */

"use strict";

// Remplacez cette valeur par le numéro WhatsApp qui reçoit les commandes.
// Ne mettez pas le signe +, les espaces ou les tirets.
const WHATSAPP_NUMBER = "225XXXXXXXXXX";

const toast = document.getElementById("toast");
let toastTimeout;

// Affiche un petit message d'information sur la page.
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 5000);
}

// Formate les montants avec un séparateur de milliers adapté au français.
function formatFCFA(amount) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

// Traite les trois formulaires sans recharger la page.
document.querySelectorAll(".ticket-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // La validation native du navigateur est complétée par cette vérification.
    if (!form.reportValidity()) return;

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      showToast("Le site est prêt. Pour activer les réservations, remplacez WHATSAPP_NUMBER dans script.js par le numéro WhatsApp du vendeur, au format international.");
      return;
    }

    const ticket = form.dataset.ticket;
    const price = Number(form.dataset.price);
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const customerPhone = String(formData.get("phone") || "").trim();
    const quantity = Number(formData.get("quantity"));
    const total = price * quantity;

    if (!name || !customerPhone || !Number.isInteger(quantity) || quantity < 1) {
      showToast("Veuillez vérifier les informations saisies.");
      return;
    }

    // Message récapitulatif envoyé au vendeur pour confirmer la commande.
    const message = [
      "Bonjour Art Spirit Studio, je souhaite réserver des pass pour l'avant-première du film M'AS-TU VU ?",
      "",
      "Pass : " + ticket,
      "Prix unitaire : " + formatFCFA(price),
      "Quantité : " + quantity,
      "Total estimé : " + formatFCFA(total),
      "Nom : " + name,
      "Mon numéro WhatsApp : " + customerPhone,
      "",
      "Date : samedi 12 décembre 2026 à 17H00",
      "Lieu : Jeckad Espace Événementiel",
      "Merci de me confirmer la disponibilité et les modalités de règlement."
    ].join("\n");

    const whatsappURL = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    const newWindow = window.open(whatsappURL, "_blank", "noopener,noreferrer");

    // Certains navigateurs bloquent les nouvelles fenêtres : proposer un lien direct.
    if (!newWindow) {
      showToast("WhatsApp n'a pas pu s'ouvrir automatiquement. Autorisez les fenêtres contextuelles puis réessayez.");
    }
  });
});

// Le bouton principal fait défiler vers les pass ; cette classe aide le retour visuel clavier.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.setAttribute("tabindex", "-1");
  });
});

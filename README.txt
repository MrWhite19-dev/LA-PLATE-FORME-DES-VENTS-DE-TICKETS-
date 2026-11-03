# M'AS-TU VU ? — Site de réservation des pass

Site vitrine de réservation responsive en HTML5, CSS3 et JavaScript, style « Offre Digital Futuriste » noir, rouge et blanc.

## Contenu
- `index.html` : structure de la page et les trois formulaires GP, VIP et VVIP.
- `style.css` : design responsive mobile, tablette et ordinateur.
- `script.js` : validation des formulaires et création du message WhatsApp.
- `assets/affiche-mas-tu-vu.jpeg` : affiche fournie.

## Numéro de réservation WhatsApp
1. Ouvrez `script.js`.
2. Le numéro de réservation configuré est `22550182565` ; il est affiché sous les formulaires et reçoit les demandes.
3. Si nécessaire, remplacez `WHATSAPP_NUMBER` par le numéro du vendeur au format international, chiffres uniquement, sans signe `+`, espaces ni tirets.
4. Pour un numéro ivoirien, conservez le préfixe `225`, puis enregistrez le fichier et testez les trois formulaires.

## Lancer le site
- Double-cliquez sur `index.html` pour tester dans un navigateur.
- Pour un test local plus fiable, ouvrez le dossier avec Visual Studio Code et utilisez Live Server.
- Pour publier le site, envoyez `index.html`, `style.css`, `script.js` et le dossier `assets` sur votre hébergement.

## À vérifier avant publication
- L'offre GP est affichée à 3 000 FCFA au lieu de 5 000 FCFA, avec la mention « fin le 7 » comme indiqué dans le brief. Le mois n'étant pas précisé, il n'a pas été inventé.
- Vérifiez les informations de l'événement, la date, le lieu, les tarifs et le numéro de réservation.
- Le site ne collecte pas de paiement et ne confirme pas automatiquement les billets : WhatsApp sert à transmettre la demande à l'organisateur.
- Les polices Google nécessitent une connexion Internet ; des polices de remplacement sont prévues.

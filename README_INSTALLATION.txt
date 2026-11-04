M'AS-TU VU ? — VERSION PHP / MYSQL
====================================

1) INSTALLATION WAMPSERVER
- Décompressez le dossier mas-tu-vu-php dans C:\wamp64\www\
- Démarrez WampServer (icône verte).
- Ouvrez http://localhost/phpmyadmin
- Importez le fichier database.sql (onglet Importer).
- Vérifiez config/db.php : par défaut WampServer local = root, mot de passe vide.
- Ouvrez http://localhost/mas-tu-vu-php/create_admin.php pour créer votre compte administrateur.
- Choisissez un mot de passe long (12 caractères minimum).
- IMPORTANT : supprimez ensuite create_admin.php du dossier du site.

2) ACCÈS
- Site : http://localhost/mas-tu-vu-php/index.php
- Publications : http://localhost/mas-tu-vu-php/contenus.php
- Administration : http://localhost/mas-tu-vu-php/admin/login.php

3) PUBLIER UNE PUBLICITÉ / BANDE-ANNONCE
- Connectez-vous à l'administration.
- Choisissez le titre, la catégorie et le média.
- Image : JPG, PNG, WEBP ; vidéo : MP4 ou WEBM (50 Mo maximum).
- Pour une longue bande-annonce, choisissez Lien YouTube et collez l'URL.
- Cochez Publier immédiatement puis cliquez Ajouter le contenu.
- Vous pouvez modifier, masquer/republier ou supprimer chaque contenu.
- La page contenus.php lit automatiquement les contenus publiés depuis MySQL à chaque chargement.

4) STOCK DES BILLETS
- La page d'accueil lit les stocks de la table tickets.
- Les valeurs initiales sont GP 100, VIP 50, VVIP 20 : remplacez-les par les quantités réellement attribuées dans phpMyAdmin.
- IMPORTANT : cette version affiche les stocks depuis MySQL mais ne décrémente PAS automatiquement après une demande WhatsApp. Une demande WhatsApp n'est pas une vente confirmée. Avant toute vente en ligne, il faut ajouter un workflow de réservation en attente puis confirmer le paiement/vente dans l'administration avec une transaction SQL.

5) SECURITE ET HEBERGEMENT
- Gardez config/db.php hors d'un dépôt public et changez les identifiants en production.
- Utilisez HTTPS sur le serveur public.
- Ne laissez jamais create_admin.php après création du compte.
- Les médias sont contrôlés par type MIME et taille. Le dossier uploads bloque l'exécution des scripts PHP.
- Faites des sauvegardes régulières de la base et du dossier uploads.

Le projet utilise PDO, requêtes préparées, mots de passe hashés, sessions et jetons CSRF pour les actions d'administration.

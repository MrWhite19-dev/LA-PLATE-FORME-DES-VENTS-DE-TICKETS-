# M'AS-TU VU ? — Billetterie cinéma PHP / MySQL

## Analyse et architecture retenue

Le projet d'origine est une page unique `index.html` stylée par `style.css` et animée par `script.js`. Elle présente l'avant-première de M'AS-TU VU ?, son affiche et son MP4, ainsi que trois formulaires GP, VIP et VVIP. Le stock localStorage et le compte à rebours étaient des démonstrations et ne constituaient pas une réservation réelle.

Le design, les feuilles de style et les médias existants sont conservés. La page est devenue `index.php` pour pouvoir lire films, séances, prix et disponibilités depuis MySQL. Les formulaires créent désormais des demandes en attente via Fetch API; ils ne retirent plus de stock dans le navigateur et n'ouvrent pas automatiquement WhatsApp. Le nom, l'e-mail et le téléphone sont vérifiés côté serveur. Les demandes en attente et confirmées occupent une place; seules les confirmées comptent comme ventes et chiffre d'affaires. Les catégories GP/VIP/VVIP ont leurs propres capacités en plus de la capacité totale de la séance.

Fichiers conservés : `style.css`, `script.js`, `assets/affiche-mas-tu-vu.jpeg`, les images et la vidéo sous `assets/`.

Fichiers applicatifs : `index.php`, `config/database.php`, `includes/bootstrap.php`, `database/cinema_billetterie.sql`, `api/`, `admin/`, `admin.css` et `.htaccess`.

## Installation sur WampServer

1. Copiez le dossier dans `C:\wamp64\www\mas-tu-vu-ticket-site` (ou dans le dossier `www` de votre installation).
2. Démarrez Apache et MySQL depuis WampServer.
3. Ouvrez phpMyAdmin, puis importez `database/cinema_billetterie.sql`. Le script crée `cinema_billetterie`, les tables, les index et les relations. Il ajoute les informations déjà présentes dans le site : le film, sa séance du 12 décembre 2026 à 17 h et les capacités GP/VIP/VVIP 100/50/20 avec les prix actuellement affichés. Ce ne sont pas des réservations fictives.
4. Configurez MySQL avant le premier accès. Par défaut, `config/database.php` utilise `127.0.0.1:3306`, base `cinema_billetterie`, utilisateur `root` et mot de passe vide, valeurs courantes d'une installation Wamp locale. Pour tout autre environnement, définissez `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` et `DB_PASSWORD` dans la configuration Apache/PHP. Ne publiez pas de vrais identifiants dans un dépôt public.
5. Ouvrez `http://localhost/mas-tu-vu-ticket-site/admin/setup.php` sur la machine Wamp. Cette page n'accepte que les connexions locales et disparaît dès qu'un premier administrateur existe. Créez un mot de passe d'au moins 12 caractères, puis connectez-vous sur `admin/login.php`. En production, réalisez l'initialisation depuis un environnement local contrôlé et supprimez ou bloquez `admin/setup.php` après usage.
6. Ouvrez `http://localhost/mas-tu-vu-ticket-site/` pour le site public. Les pages d'administration sont sous `/admin/`.

PHP 8+, MySQL/InnoDB, PDO MySQL, mbstring et Fileinfo sont requis. Activez `file_uploads` et réglez `upload_max_filesize` et `post_max_size` à au moins 100 Mo si vous téléversez des vidéos MP4. Apache doit autoriser `.htaccess`; le module `mod_rewrite` n'est pas nécessaire. Le serveur doit pouvoir écrire dans `uploads/affiches`, `uploads/bannieres` et `uploads/videos`; ils sont créés au premier téléversement.

## Administration

- `admin/dashboard.php` : statistiques MySQL, visiteurs, réservations, chiffre confirmé, prochaines séances, séances presque complètes et dernières demandes; les cartes sont actualisées toutes les 30 secondes.
- `admin/films.php` : films, description, affiche, bannière, bande-annonce MP4 ou lien HTTPS YouTube/Vimeo, durée, acteurs, réalisateur et statut.
- `admin/seances.php` : séances, capacité de salle, horaires, statut et prix/capacités de chaque type de pass. Les capacités ne peuvent pas descendre sous les demandes actives ou confirmées.
- `admin/reservations.php` : recherche, historique paginé et passage entre attente, confirmée et annulée.
- `admin/contenus.php` : bandes-annonces et contenus publiés/brouillons, médias MP4, liens vidéo et miniatures. Les bandes-annonces publiées sont visibles sur le site public.
- `admin/visiteurs.php` : statistiques agrégées et purge selon la durée de conservation.
- `admin/parametres.php` : numéro de contact WhatsApp et durée de conservation des statistiques.

## Sécurité et règles de disponibilité

PDO utilise les requêtes préparées. Les actions d'administration vérifient la session et un jeton CSRF; les mots de passe sont hachés avec `password_hash()`. Les fichiers téléversés sont contrôlés par MIME, taille et nom généré aléatoirement. Les liens externes vidéo sont limités à YouTube/Vimeo. Le site applique l'échappement HTML aux données affichées.

La création d'une demande utilise une transaction et verrouille les lignes de séance/catégorie pendant le contrôle du stock. Une référence unique est générée par demande. Les demandes en attente occupent des places jusqu'à une action manuelle de l'administrateur (confirmation ou annulation); il n'y a pas d'expiration automatique. Une annulation libère les places. Une demande en attente n'est pas une vente, un paiement ou un billet confirmé.

Le tableau de bord signale une augmentation des demandes en attente pendant qu’un administrateur y est connecté. Aucune notification e-mail ou SMS n’est configurée.

Les statistiques de fréquentation utilisent un identifiant aléatoire dans un cookie HttpOnly de 30 jours. Les adresses IP et agents utilisateurs ne sont pas conservés. Les lignes de visites sont purgées au-delà de 90 jours par défaut (modifiable entre 1 et 365 jours dans les paramètres). Adaptez votre information de confidentialité aux obligations applicables avant une mise en ligne publique.

## Vérifications recommandées avant production

- Configurer un compte MySQL dédié avec droits minimaux, mot de passe fort, HTTPS et sauvegardes.
- Tester une demande en attente, sa confirmation, son annulation et les dernières places simultanément depuis plusieurs navigateurs.
- Contrôler les capacités, les prix, les horaires et les informations de contact dans l'administration.
- Supprimer `admin/setup.php` après initialisation et vérifier les permissions des dossiers téléversés.
- Les fichiers PHP n'ont pas pu être exécutés ici : PHP/WampServer n'est pas installé dans l'environnement de développement actuel.

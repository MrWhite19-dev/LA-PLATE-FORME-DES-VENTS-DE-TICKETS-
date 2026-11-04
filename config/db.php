<?php
// Connexion PDO MySQL — adaptez les identifiants à votre installation WampServer.
declare(strict_types=1);
$DB_HOST = '127.0.0.1';
$DB_NAME = 'mas_tu_vu';
$DB_USER = 'root';
$DB_PASS = '';
$dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false];
try { $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options); }
catch (PDOException $e) { http_response_code(500); exit('Connexion à la base impossible. Vérifiez config/db.php et importez database.sql.'); }

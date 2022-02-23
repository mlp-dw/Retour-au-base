<?php 
// connexion a la base de donnée
try{$db = new PDO(
    'mysql:host=localhost;dbname=language_war;charset=utf8', // serveur;base de donnée; encodage de caractère
    'root', // mon compte à moi pour me connecter au serveur
    '' // mon mot de passe pour me connecter au serveur
);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch (\Throwable $th) {
    die('erreur db');
}

?>
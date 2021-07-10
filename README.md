Groupomania - Projet 7 OpenClassrooms
=====================================

Afin de tester ce projet, veuillez cloner ce dépôt dans un nouveau répertoire :

    git clone https://github.com/raphael-carre/RaphaelCarre_7_03072021.git ./

Vous avez dès lors deux possibilités :
- soit vous disposez de Docker installé sur votre machine,
- soit vous n'avez pas Docker, mais Node (v14+) et MySQL sont installés.

Dans les deux cas, depuis ce nouveau répertoire, lancez la commande suivante :

    ./groupomania

Ceci lancera un script bash qui s'adaptera en fonction de la présence ou non de Docker sur votre système.

Il vous sera demandé si vous souhaitez lancer l'application en mode 'prod' ou en mode 'dev'. Le mode par défaut est le mode 'prod'.

***

Configuration avec Docker
-------------------------
Le script vous demandera de saisir un nom pour le compte administrateur de la base de données, puis de choisir un mot de passe.  
Il se chargera ensuite de créér les images nécessaires puis de lancer les différents containers (lors du premier lancement, il peut y avoir un certain délai entre le container de la base de données et celui du back-end).

Une fois les containers lancés, il vous suffit de vous rendre à l'adresse suivante pour tester l'application : http://localhost (http://localhost:8080 en mode 'dev').

> En mode 'prod', attention de bien vérifier que le port 80 de votre machine soit disponible.

L'API peut être testée depuis l'adresse http://localhost:3080.

Pour arrêter les containers, vous n'avez qu'à réexecuter l'instruction suivante :

    ./groupomania

> Le contenu de la base de donnée sera persisté.

***

Configuration avec Node et MySQL
--------------------------------
> Pour que cette configuration fonctionne, Docker ne doit pas être installé sur la machine.

Après avoir choisi le mode d'execution ('prod' ou 'dev'), le script vous demandera l'adresse de votre base de données (le plus souvent 'localhost').  
Il vous demandera ensuite de définir un nom pour l'administrateur, ainsi qu'un mot de passe. Cette action va créer un fichier `dbInit.sql` dans le dossier `./database/files`. Il vous sera alors demandé d'importer ce fichier dans votre client MySQL. Vous pouvez également, depuis un autre terminal, utiliser la commande suivante depuis l'invite de commande MySQL :

    SOURCE /chemin_vers_le_dossier_de_l_application/database/files/dbInit.sql

Une fois le fichier importé, pressez une touche pour continuer.

L'exécutable se chargera ensuite d'installer les dépendances pour le front-end et le back-end.

En mode 'prod', un dossier `build` contenant l'ensemble des fichiers statiques de l'application (html, css, javascript) sera créé dans le dossier `./front`, puis le serveur back-end sera lancé.

L'application sera alors accessible en ouvrant le fichier suivant :

    ./front/build/index.html

Vous avez également la possibilité d'ouvrir ce fichier avec, par exemple, l'extension `Live Server` de VSCode.

L'API quand à elle sera accessible depuis l'adresse : http://localhost:3080

En mode 'dev' cependant, la procédure sera la même, si ce n'est que le script s'interrompra après l'installation des dépendances.  
Il vous faudra alors manuellement lancer l'application depuis deux fenetres de terminal différentes avec les instructions suivantes :

Depuis `./back`:

    npm run dev

Depuis `./front`:

    npm run dev

Vous aurez alors accès à l'application depuis l'adresse http://localhost:8080, et à l'API depuis http://localhost:3080.

***

Informations complémentaires
----------------------------

### Logs :

Des fichiers de logs seront automatiquement générés dans le dossier `./logs`. En mode dev, la console affichera un retour des requêtes SQL, ainsi que les requêtes et réponses http en cas d'erreur, alors qu'en mode 'prod', ces informations n'apparaîtront que dans les fichiers de logs.

### Réinitialisation :

Vous pouvez réinitialiser l'application en utilisant la commande suivante :

    ./groupomania reset

> Dans le cas d'une utilisation avec Docker, toutes les données de la base de données seront supprimées, tout comme les fichiers de variables d'environnement et les fichiers de logs.

> Dans le cas d'une utilisation avec Node et MySQL, seuls les fichiers de variables d'environnement et les fichiers de logs seront supprimés. Vous devrez donc supprimer manuellement la base de données 'groupomania' et le compte administrateur créé.

### Documentation :

En mode 'dev uniquement, la documentation complète (Swagger/OpenApi et JSDoc) est disponible dans votre navigateur depuis l'adresse http://localhost:3080.

> Attention : cette documentation ne fonctionne pas avec Safari.
Groupomania - Projet 7 Développeur Web - OpenClassrooms
=====================================

Afin de tester ce projet, veuillez cloner ce dépôt dans un nouveau répertoire :

    git clone https://github.com/raphael-carre/RaphaelCarre_7_03072021.git ./

Vous avez dès lors deux possibilités :
- soit vous disposez de Docker installé et lancé sur votre machine,
- soit vous n'avez pas Docker (ou il n'est pas lancé), mais Node (v14+) et MySQL sont installés.

Dans les deux cas, depuis ce nouveau répertoire, lancez la commande suivante :

    ./groupomania

Ceci lancera un script bash qui s'adaptera en fonction de la présence ou non de Docker sur votre système.

> Attention : si vous êtes sous Windows, il faudra vous assurer que vous pouvez executer les scripts bash !

Il vous sera alors demandé si vous souhaitez lancer l'application en mode 'prod' ou en mode 'dev'. Le mode par défaut (conseillé) est le mode 'prod'.

> - la configuration via docker est plus longue mais assure la compatibilité des dépendances avec les environnements crées, ainsi que la séparation du frontend, du backend et de la base de données.
> - la configuration sans docker est plus rapide mais des alertes de dépréciation pour certaines dépendances liées à Webpack peuvent apparaître (Chokidar, url-loader...). En mode 'prod', les fichiers compilés sont ajouté au backend dans un dossier `/public` afin de simplifier le test de l'application.

***

Configuration avec Docker
-------------------------
Le script vous demandera de saisir un nom pour le compte utilisateur de la base de données et de choisir un mot de passe, d'indiquer l'adresse d'un serveur de messagerie ainsi que le nom d'utilisateur et le mot de passe associé, puis d'entrer une clé secrète pour le Json Web Token (facultatif).  
Il se chargera ensuite de créér les images nécessaires puis de lancer les différents containers (lors du premier lancement, le temps d'attente peut être relativement long).

Une fois les containers lancés, il vous suffit de vous rendre à l'adresse suivante pour tester l'application : http://localhost:8080.

L'API peut être testée depuis l'adresse http://localhost:3080.

Pour arrêter les containers, vous n'avez qu'à réexecuter l'instruction suivante :

    ./groupomania

> Le contenu de la base de donnée sera persisté.

***

Configuration avec Node et MySQL
--------------------------------
> Pour que cette configuration fonctionne, Docker ne doit pas être installé, ou lancé, sur la machine.

Après avoir choisi le mode d'execution ('prod' ou 'dev'), le script vous demandera l'adresse de votre base de données (le plus souvent 'localhost').  
Il vous demandera ensuite de définir un nom pour l'utilisateur, ainsi qu'un mot de passe. Cette action va créer un fichier `dbInit.sql` dans le dossier `./database`. Il vous sera alors demandé d'importer ce fichier dans votre client MySQL. Vous pouvez également, depuis un autre terminal, utiliser la commande suivante depuis l'invite de commande MySQL :

    SOURCE /chemin_vers_le_dossier_de_l_application/database/dbInit.sql

Une fois le fichier importé, pressez une touche pour continuer.

Le script vous demandera alors d'indiquer l'adresse d'un serveur de messagerie ainsi que le nom d'utilisateur et le mot de passe associé, puis de créer une clé secrète pour le Json Web Token (facultatif). 

Il se chargera ensuite d'installer les dépendances pour le front-end et le back-end.

En mode 'prod', il lancera également la compilation des fichiers HTML, Javascript et CSS.

L'application sera alors accessible depuis l'adresse : http://localhost:3080


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

> Dans le cas d'une utilisation avec Node et MySQL, les fichiers de variables d'environnement, les fichiers de logs et les fichiers compilés seront supprimés. En revanche, vous devrez supprimer manuellement la base de données 'groupomania' et le compte administrateur créé.

### Documentation :

En mode 'dev uniquement, la documentation complète (Swagger/OpenApi et JSDoc) est disponible dans votre navigateur depuis l'adresse http://localhost:3080.

> Attention : cette documentation ne fonctionne pas avec Safari.
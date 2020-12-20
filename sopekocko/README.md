# Projet 6 SOPEKOCKO API SECURISEE MEAN

Sopekocko est une API permettant à des utilisateurs ,identifiés et authentifiés de manière sécurisée,
de publier des sauces et de les liker ou disliker. Possibilité de:
Créer | Lire | Modifier | effacer les sauces en question => CRUD
Télécharger des images par les users

- Installation des packages nodes (back + front)
- Installation de dépendances: cf backend/package.json.
- Mise en place du serveur
- Mise en place des Models/controllers/routes (MVC)
- Mise en place de app.js
- Correction des bugs de compatibilité avec la version 7.0.2 d'Angular fournie par OC

# Installation du projet

# 1) FRONTEND

- Télécharger la dernière version de Node sur NodeJs.org
- Dans votre terminal , installer Angular CLI avec la commande npm install -g @angular/cli
- Clonez l'application front-end avec la commande git clone "lien du projet"
- cd frontend pour aller dans le dossier cloné
- npm install pour les dépendances
- ng serve l'application se lancera sur le localhost:4200

# 2) BACKEND

- Cloner le repository backend produit
- Ajouter un fichier .env à la racine du dossier fourni avec une variable d'environnement 
DB_CONNECTION = 'lien vers la base de donnée que nous vous avons fournie"
- Ouvrez un autre terminal tapez cd backend pour accéder à ce dossier
- npm install pour installer les dépendances du projet
- nodemon server.js


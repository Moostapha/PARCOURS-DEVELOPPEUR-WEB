
# PROJET DE DEVELOPPEMENT D'UN BACKEND POUR UNE API SECURISEE MEAN à partir d'un Frontend Angular fourni

Sopekocko est une API permettant à des utilisateurs ,identifiés et authentifiés de manière sécurisée,
de publier des sauces et de les liker. Possibilité de:
Créer | Lire | Modifier | effacer les sauces en question.

# ASPECTS TECHNIQUES REALISATION DE L'API

Prise en compte et respect de la note de cadrage fournie pour ce projet

- Respect des règles RGPD et OWASP
- Chiffrage des mots de passe uilisateur (plugin bcrypt)
- Unicité des mails de connection utilisateurs (plugin mongoose-unique-validator)
- Authentification renforcée sur les routes de l'API via des webtokens dans son header (plugin jsonwebtoken)
- Utilisation d'une base de données sécurisées comme mongoDB Atlas
- Respect des chemins routes fournies par le frontend
- Respect stricte des schémas de données Sauce et User fourni


# TECHNOLOGIES UTILISEES POUR CE PROJET

- Language Javascript
- Express Framework NODE JS
- serveur NODE JS
- MongoDB Database
- Pack Mongoose pour interaction avec la BD
- Dépendances nécessaires à ce projet dans le fichier lock.json suivant(infos non fournies, mis en place par le développeur)
- Dépendances du projet
 "bcrypt": "^5.0.0",
 "body-parser": "^1.19.0",
 "dotenv": "^8.2.0",
 "express": "^4.17.1",
 "express-bouncer": "^0.2.0",
 "helmet": "^4.2.0",
 "jsonwebtoken": "^8.5.1",
 "mongoose": "^5.10.7",
 "mongoose-unique-validator": "^2.0.3",
 "mongoose-validator": "^2.1.0",
 "morgan": "^1.10.0",
 "multer": "^1.4.2"

# UTILISATION DES DEPENDANCES DANS LE PROJET:

Projet structuré (dossiers et fichiers) selon une architecture MV(Routes)C

- MODELS
User: "mongoose" et plugin "mongoose-unique-validator"
Sauce: "mongoose"

- CONTROLLERS
users: 
 "jsonwebtoken" (signature token avec .sign())
 "bcrypt" ( cryptage passwordavec méthodes .hash() et .compare() )
sauces:
 Package 'fs' de Node afin de gérer le système de fichier
 


- MIDDLEWARES
Autorisation => auth.js avec "jsonwebtoken"
Gestion des fichiers statiques uploadés par les users => multer-config.js avec "multer"
Validation des champs de saisies user (route PUT) => formSauceValidation avec "mongoose-validator"

- ROUTERS
Express et router via méthode Router() d'Express
Les controllers et middlewares nécessaires à la construction de notre router seront importés ici.

- APP.JS
Nos routes sont importés ici
La connection à mongoDB atlas se fera dans ce fichier
"express"
"mongoose"
"path"
"helmet"
"body-parser"

commit
Optimisation + améliorations structure du code (models | middleware | controllers) et implémentation des fonctions du controllers

- Component html header et sauce-form: Correction des fautes d'orthographe
- README détaillé
- MODELS Sauce: Correction du schéma de données (error 400), ajout du validator.
- MIDDLEWARES: Implémentation de multer et de formSauceValidation
- CONTROLLERS:
user.js => mise en place de bcrypt et correction erreur  signup | Mise en place de Token login
sauce.js => Modification des routes POST PUT DELETE pour la prise en charge fichiers users | Implémentation logique like/dislike
- APP.JS => Ajout de plugins helmet, morgan, path (pour gestion des fichiers statiques), amélioration écriture
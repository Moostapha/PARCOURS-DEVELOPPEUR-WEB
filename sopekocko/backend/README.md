
# PROJET DE DEVELOPPEMENT D'UN BACKEND POUR UNE API SECURISEE MEAN à partir d'un Frontend Angular fourni

Sopekocko est une API permettant à des utilisateurs ,identifiés et authentifiés de manière sécurisée,
de publier des sauces et de les liker. Possibilité de:
Créer | Lire | Modifier | effacer les sauces en question.

# ASPECTS TECHNIQUES REALISATION DE L'API

Prise en compte et respect de la note de cadrage fournie pour ce projet

SECURITE:
- Respect des règles RGPD et OWASP
- Chiffrage des mots de passe uilisateur (plugin bcrypt)
- Unicité des mails de connection utilisateurs (plugin mongoose-unique-validator)
- Authentification renforcée sur les routes de l'API via des webtokens dans son header (plugin jsonwebtoken)
- Utilisation d'une base de données sécurisées comme mongoDB Atlas
- Respect des chemins routes fournies par le frontend
DONNEES
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
"helmet": "^4.2.0",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.10.7",
"mongoose-unique-validator": "^2.0.3",
"mongoose-validator": "^2.1.0",
"morgan": "^1.10.0",
"multer": "^1.4.2"

# UTILISTION DES DEPENDANCES DANS LE PROJET:

- MODELS
1) User
2) Sauce

- CONTROLLERS
1) users
2) sauces

- ROUTERS

- MIDDLEWARES
1) Autorisation => auth.js
2) Gestion des fichiers statiques uploadés par les users => multer-config.js
3) Validation des champs de saisies user (route PUT) => formSauceValidation






import Vue from 'vue'
import VueRouter from 'vue-router'
import Inscription from '../views/Inscription.vue' // Component pour page inscription
import Connexion from '../views/Connexion' // Component pour page connexion
import Accueil from '../views/Accueil.vue'

Vue.use(VueRouter)

/* ROUTES DE L'APPLICATION
Tableau contenant des objets définissant chaque route
*/

const routes = [

  // Route pour la page inscription pour signup
  // Route pour la view Inscription contenant component Signup
  {
    path: '/signup',
    name: 'Inscription',
    component: Inscription
  },
  

  // Route pour la page connexion pour login
  // Route pour la view Connexion contenant component Login
  {
    path: '/login',
    name: 'Connexion',
    component: Connexion // component venant de views importé en haut
  },


  {
    path: '/posts',       // URL correspondant au composant
    name: 'Accueil',    // Nom de cette route pas obligatoire | champ non obligatoire
    component: Accueil,  // Composant affiché lorsque le path est trouvé
  },
]


//mode:'history' => pour enlever le # de l'URL
const router = new VueRouter({
  routes,
  mode:'history'
})


export default router

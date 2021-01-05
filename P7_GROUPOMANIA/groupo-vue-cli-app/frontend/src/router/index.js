import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inscription from '../views/Inscription.vue' // Component pour page inscription
import Connexion from '../views/Connexion' // Component pour page connexion

Vue.use(VueRouter)

/* ROUTES DE L'APPLICATION
Tableau contenant des objets définissant chaque route
*/

const routes = [
  {
    path: '/',       // URL correspondant au composant
    name: 'Home',    // Nom de cette route
    component: Home  // Composant affiché lorsque le path est trouvé
  },

  // Route pour la page inscription pour signup
  // Route pour la view Inscription contenant component Signup
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription
  },

  // Route pour la page connexion pour login
  // Route pour la view Connexion contenant component Login
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

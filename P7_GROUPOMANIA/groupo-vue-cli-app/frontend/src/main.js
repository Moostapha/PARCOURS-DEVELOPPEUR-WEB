import Vue from 'vue'
// Vue.forceUpdate()

import App from './App.vue'

import axios from 'axios'
// Ajout de bootstrap by us
import "bootstrap/dist/css/bootstrap.css";

// Plugin vue router 
import router from './router/route'

// Refactoring préfixe URL de l'application
axios.defaults.baseURL = 'http://localhost:3000/';

// Gestion des tokens par axios
//token à la place de AUTH_TOKEN => clé: valeur | token: AUTH_TOKEN

axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token'); 

// Global setting des headers POST: mettre header pour que le front configure les infos correctement pour le backend
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// refactoring préfixe URL endpoints API import du folder ici
// import axiosConfig from '../axiosConfig'; 
// Vue.use(axiosConfig); 

/* Plugin vee-validate pour customer inputs, installation globale => les règles de validation ne sont pas mises par défaut, nous les avons toutes importées*/
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';

Vue.component('ValidationProvider', ValidationProvider);


//Dictionnaire de traduction en francais des messages lors de saisie user


/* Plugin de vee-validate permettant de soumettre le formulaire qu'APRES validation des champs*/
import { ValidationObserver } from 'vee-validate';
Vue.component('ValidationObserver', ValidationObserver);


// Ajout de vue-flash-message pour user notifs, global setting pour use du component dans toute l'application
import VueFlashMessage from '@smartweb/vue-flash-message';
// import vueFlashMsgCommon from 'node_modules/@smartweb/vue-flash-message/build/vue-flash-msg.common';
Vue.use(VueFlashMessage);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  // watch:{
  //   '$route' (to) {
  //     if(to.currentRoute.meta.reload==true){window.location.reload()}
  //   }
  // }
}).$mount('#app')

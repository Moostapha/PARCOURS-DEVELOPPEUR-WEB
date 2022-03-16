import Vue from 'vue'
// Vue.forceUpdate()

import App from './App.vue'

// Ajout de bootstrap by us
import "bootstrap/dist/css/bootstrap.css";

// Plugin vue router 
import router from './router/route'

// refactoring préfixe URL endpoints API import du folder ici
import  ('../axiosConfig');  

/* Plugin vee-validate pour customer inputs, installation globale => les règles de validation ne sont pas mises par défaut, nous les avons toutes importées*/
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';

Vue.component('ValidationProvider', ValidationProvider);


//Dictionnaire de traduction en francais des messages lors de saisie user


/* Plugin de vee-validate permettant de soumettre le formulaire qu'APRES validation des champs*/
import { ValidationObserver } from 'vee-validate';
Vue.component('ValidationObserver', ValidationObserver);


// Ajout de vue-flash-message pour user notifs, global setting pour use du component dans toute l'application
import VueFlashMessage from '@smartweb/vue-flash-message';
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

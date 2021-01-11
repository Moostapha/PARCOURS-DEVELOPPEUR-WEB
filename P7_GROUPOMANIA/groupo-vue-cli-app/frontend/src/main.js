import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css"; // Ajout de bootstrap by us
import router from './router/route'
import  ('../axiosConfig');  // refactoring préfixe URL endpoints API import du folder ici
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

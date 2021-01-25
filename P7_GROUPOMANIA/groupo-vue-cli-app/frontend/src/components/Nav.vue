<template>
  <div id="nav">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link to="/groupomania/login">Accueil</router-link> 
      </li>
      <li class="nav-item">
        <router-link to="/groupomania/signup">S'inscrire</router-link> 
      </li>
      <li class="nav-item">
        <router-link to="/groupomania/publications">Fil d'actualité</router-link> 
      </li>
      <li class="nav-item">
        <router-link to="/groupomania/useraccount">Profil</router-link>
      </li>
      <!-- <li v-if="user" class="nav-item">
        <router-link to="/groupomania/login">logout</router-link>
      </li> -->
    </ul>
  </div>
</template>


<script>
// import axios from 'axios'
export default {
  
    name:'Nav',
    // data() {
    //   return {
    //     user: ""
    //   }
    // },
    // created(){
    //   axios.get('api/user').then(response => {
    //     console.log(response);
    //     console.log(response.data.user); 
    //     this.user = response.data.user;
    //     localStorage.setItem('token', response.data.AUTH_TOKEN);
    //     this.$router.push('/groupomania/login');
    //   })
    // },
    // methods: {

    // }
}
</script>



<style lang="sass" scoped>
#nav 
  padding: 30px
  a 
    font-weight: bold
    color: #2c3e50
    padding: 5px
    text-decoration: none
    border-radius: 20px
    cursor: pointer
    transition: 1000ms
    &:hover
      background-color: #42b7b9
    &.router-link-exact-active 
      color: #007bff
</style>









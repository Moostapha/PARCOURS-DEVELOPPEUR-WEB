<template>

<div id="nav">
<!-- Lien URL avec son component associé  -->
    <router-link to="/www.groupomania.fr/login">Accueil</router-link> 
    <router-link to="/www.groupomania.fr/signup">S'inscrire</router-link> 
    <router-link to="/www.groupomania.fr/posts">Fil d'actualité</router-link> 
    <router-link to="/www.groupomania.fr/user ">Profil</router-link>
</div>

<!-- <ul class="nav justify-content-center">
  <li class="nav-item">
    <a class="nav-link active" href="#">Accueil</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">S'inscrire</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Fild'actualité</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li>
</ul> -->

</template>

<script>
export default {
    name:'Nav'
}
</script>


<style lang="sass" scoped>
#nav 
    padding: 30px
    a 
        font-weight: bold
        color: #2c3e50
        padding: 15px
        text-decoration: none
        border-radius: 20px
        cursor: pointer
        transition: 1000ms
        &:hover
            background-color: #42b7b9
        &.router-link-exact-active 
            color: #007bff
            



</style>









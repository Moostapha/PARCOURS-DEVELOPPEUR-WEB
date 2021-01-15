<template>

<div id="nav" class="" >
<!-- Lien URL avec son component associé  -->
    <router-link to="/www.groupomania.fr/login">Accueil</router-link> 
    <router-link to="/www.groupomania.fr/signup">S'inscrire</router-link> 
    <router-link to="/www.groupomania.fr/posts">Fil d'actualité</router-link> 
    <router-link to="/www.groupomania.fr/user ">Profil</router-link>
</div>


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









<template>
  <div id="app">
    <div id="nav">
      <!-- Lien URL avec son component associé -->
      <router-link to="/inscription">M'inscrire</router-link> 
      <router-link to="/connexion">Me connecter</router-link> 
      <router-link to="/">Home</router-link> 
    </div>
      <!-- component de vue router: zone de page apparition du component de l'URL -->
      <router-view/>
  </div>
</template>


<style lang="sass">
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50


#nav 
  padding: 30px
  background-color: #007bff

  a 
    font-weight: bold
    color: #2c3e50
    padding: 20px

    &.router-link-exact-active 
      color: white
    
  

</style>

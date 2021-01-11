<template>
  
  <div id="app">
    <Nav />
    <!-- <div id="nav">
      
      <router-link to="/signup">M'inscrire</router-link> 
      <router-link to="/login">Me connecter</router-link> 
      <router-link to="/posts">Accueil</router-link> 
    </div> -->
      <!-- component de vue router: zone de page apparition du component de l'URL -->
      <router-view/>
  </div>
  
</template>

<script>
import Nav from './components/Nav'
export default {
  name:'App',
  components: {
    Nav
  }
}
</script>

<style lang="sass">
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  //color: #2c3e50
  

// #nav 
//   padding: 30px
//   background-color: #007bff

//   a 
//     font-weight: bold
//     color: #2c3e50
//     padding: 20px
//     text-decoration: none
//     border-radius: 20px
//     cursor: pointer
//     transition: 1000ms
    
//     &.router-link-exact-active 
//       background-color: blue
//       color: white
</style>

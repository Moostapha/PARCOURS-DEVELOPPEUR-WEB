<template>
  <nav id="navbar">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link to="/groupomania/login"><i class="fas fa-sign-in-alt"></i>Login</router-link> 
      </li>
      <li class="nav-item">
        <router-link to="/groupomania/signup"><i class="fas fa-user-edit"></i>Signup</router-link> 
      </li>
      <li class="nav-item">
        <router-link to="/groupomania/publications"><i class="fas fa-comments"></i> Publications</router-link> 
      </li>
      <li class="nav-item">
        <router-link to="/groupomania/profil/:userId"><i class="fas fa-user-circle"></i>Profil</router-link>
      </li>
      <!-- lien de déconnexion -->
      <li class="nav-item">
        <a href="javascript:void(0)" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
      </li>
    </ul>
  </nav>

  <!-- <router-link class="router-link" :to="{ name : 'OnePublication', params: { id: publication.publicationId }}">
    <div class="titre px-5 py-3">{{publication.publicationTitre}}</div>
    <div class="description px-5 py-3">{{publication.publicationDescription}}</div>
  </router-link> -->
</template>


<script>

export default {
  name:'Nav',
  
  methods: {
    // fonction de suppression de session user (items du localStorage)
    logout() {
      // remove user session
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      console.log('Deconnexion réussie');
      
      // redirection vers accueil/login
      this.$router.push('/groupomania/login');
    }
  }
}
</script>


<style lang="sass" scoped>
#navbar 
  padding: 30px
  font-size: x-large
  a 
    font-weight: bold
    color: #2c3e50
    padding: 5px
    margin: 10px
    text-decoration: none
    border-radius: 20px
    cursor: pointer
    transition: 1000ms
    &:hover
      background-color: #42b7b985
    &.router-link-exact-active 
      color: #007bff
</style>
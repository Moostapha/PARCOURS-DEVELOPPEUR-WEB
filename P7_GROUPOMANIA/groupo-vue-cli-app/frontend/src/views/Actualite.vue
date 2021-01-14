<template>
  <div class="accueil-posts">
    <Posts msg="Tous les posts et commentaires"/>
  </div>
</template>


<script>
// @ is an alias to /src
import Posts from '../components/Posts.vue'

// export vers index.js + template du haut
export default {
  name: 'Actualite',
  components: { Posts },
}
</script>

<template>
  <div class="accueil-posts">
    <Posts msg ="MUR DES PUBLICATIONS"/>
  </div>
</template>


<script>
// @ is an alias to /src
import Posts from '../components/PostsComments.vue'

// export vers index.js + template du haut
export default {
  name: 'Actualite',
  components: { Posts },
}
</script>

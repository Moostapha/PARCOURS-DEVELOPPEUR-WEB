<template>
  <div class="posts">
    <h1>{{ msg }}</h1>

    <div class="postetcommentaires">
      <!-- <div class="post"> -->
        <h1>Post</h1>
        <!-- <ul> -->

          <p v-for="item in Posts" :key="item.id"> {{item.post}} - {{item.date_creation}} </p> 
          <!-- Dynamique ici code moustache -->
          <!-- <li>{{ Posts.date_creation }}</li> -->
          <!-- Dynamique ici code moustache -->
        <!-- </ul> -->
      <!-- </div> -->

      <div class="commentaire">
        <ul>
          <li>commentaire</li>
          <!-- Dynamique ici code moustache -->
        </ul>
      </div>
    </div>

    <div class="addPost">
      <label for="addPost">Ajouter un post:</label>
      <textarea name="addPost" id="" cols="30" rows="10"></textarea>
    </div>
  </div>
</template>


<script>
  // Plugin permettant de faire des requêtes http
  import axios from "axios";

  export default {

    name: "Posts",
    props: { msg: String },

    // On ecrira ici le code dynamique pour récupérer dynamiquement les infos de la db
    // En utilisant le plugin axios ici dans mounted()
    mounted() {
      axios
        .get("api/post") // URL API pour lire all posts
        .then( response => {
          console.log(response.data); // données récupérées via URL
          this.Posts = response.data.post; // envoie des données récupérées vers tableau vide ligne 54, ajouter le nom de la table post
        })
        .catch( (error) => {
          console.log(error);
          //this.Posts = ['Un erreur est survenue !!!'];
          //this.Posts = {message: 'Un erreur est survenue !!!'};
        });
    },

    data() {
      return {
        Posts: [], // tableau vide rempli par ligne 50
      };
    },
  };
</script>


<style scoped lang="sass">
.posts
  height: 100vh
  padding-top: 5vh
  background-image: url('../assets/icon.png')
  background-repeat: no-repeat
  background-position: center

.addPost
  display: flex
  flex-direction: column
  width: 100vh
  padding: 15px 30px 30px 30px
  margin: auto

h3
  margin: 40px 0 0

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px
</style>



<template>
  <div class="filActualite">
    <div class="container">
      <h1>{{ msg }}</h1>
      
      <div class="postetcommentaires">
        <div class="jumbotron">
          <h1 class="display-4">Groupomania</h1>

          <div class="posts">
            <p class="lead">POSTS</p>
            <p v-for="item in Posts" :key="item.id"> {{item.post}} - {{item.date_creation}} </p> 
            <div class="commentaire">
              <ul>
                <li>commentaire</li>
                <!-- Dynamique ici code moustache -->
              </ul>
            </div>
          </div>

          <hr class="my-4">
          
          <div class="addPost">
            <label for="addPost">Ajouter un commentaire</label>
            <textarea name="addPost" class="container" id="addPost"  rows="10"></textarea>
          </div>
          
          <a class="btn btn-primary btn-lg" href="#" role="button">Valider</a>
        </div>
      </div>
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
      // URL API pour lire all posts
      axios.get("api/post") 
        .then( response => {
          console.log(response.data); // données récupérées via URL
          this.Posts = response.data.post; // envoie des données récupérées vers tableau vide ligne 54, ajouter le nom de la table post
        })
        .catch( (error) => {
          console.log(error);
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
  background-image: url('../assets/icon-above-font.svg')
  background-repeat: no-repeat
  background-position: center

.addPost
  display: flex
  flex-direction: column
  width: 100vh
  padding: 15px 30px 30px 30px
  margin: auto
  textarea
    border: 0px
    max-width: 100vh

h3
  margin: 40px 0 0

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px
</style>



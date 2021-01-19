<template>
<main class="filActualite">
  <div class="jumbotron">
      <div class="postcomment">

        <!-- <div class="addPost"> -->

            <h1 v-if="user"> Bonjour {{user.username}}</h1>
            <h1 v-if="!user"> Connection impossible !!!</h1>

            <div class="addPost">
              <label for="addPost">Que voulez vous dire?</label>
              <textarea name="addPost" class="sm md lg xl"  rows="3" cols="4" placeholder="Editer vos posts ici"></textarea>
            </div>
            <div class="buttonComment">
              <button type="button" class="sm md lg xl btn btn-primary btn-lg ">Ajouter votre post</button>
            </div>
        <!-- </div> -->

        <hr class="my-4">

        <div class="posts">
          <h1>{{ msg }}</h1>
          <!-- <p v-for="item in Posts" :key="item.id"> {{item.post}} - {{item.date_creation}} </p> 
          <p v-for="item in commentaire" :key="item.id"> {{item.commentaire}} - {{item.date_creation}} >COMMENTS<p> -->
          <p>POST 1: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta odit asperiores sequi vel doloremque recusandae</p>
          <ul>
            <li>
              <p>COMMENTS SUR UN POST1</p> 
            </li>
            <li>
              <p>COMMENTS SUR UN POST1</p>
            </li>
          </ul>
          <p>POST 2: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta odit asperiores sequi vel doloremque recusandae</p>
          <ul>
            <li>
            <p>commentaire 1 sur Post2</p>
          </li>
          <li>
            <p>commentaire 2 sur Post2</p>
          </li>
          <li>
            <p>commentaire 3 sur Post2</p>
          </li>
          </ul>
        </div>
        <hr class="my-4">
          
          <div class="addComment">
            <label for="addComment">Ajouter un commentaire</label>
              <textarea name="addComment"  rows="3" cols="4" placeholder="commenter les posts ici..."></textarea>
          </div>
            
            <div class="buttonComment">
              <button type="button" class="sm md lg xl btn btn-primary btn-lg ">
              Ajouter votre commentaire
              </button>
            </div>
      </div>
  </div>
</main>
</template>


<script>
// Clien http
import axios from "axios";

export default {

  name: "Posts",
  props: { msg: String },

  data() {
    return {
      user: null,
      // Posts: [], 
    };
  },
  
  //Récupération du user loggé et redirigé vers post/accueil
  created() {
      axios.get('api/user') 
      .then(response => {
        console.log(response)
        this.user = response.data.user
      })
      .catch((error) => {
        console.log(error);
      }) 
      
  }
  

  
  // On ecrira ici le code dynamique pour récupérer dynamiquement les infos de la db
  // En utilisant le plugin axios ici dans mounted()
  // mounted() {
  //   // URL API pour lire all posts
  //     axios.get("api/post").then( response => {
  //       console.log(response.data); // données récupérées via URL
  //       this.Posts = response.data.post; // envoie des données récupérées vers tableau vide ligne 54, ajouter le nom de la table post
  //     })
  //     .catch( (error) => {
  //       console.log(error);
  //     });
  // },
}
</script>

<style scoped lang="sass">

.filActualite
	display: flex
	flex-direction: column
	min-height: 80vh
.jumbotron
  flex: 1
  padding-top: 9vh
  background-image: url('../assets/icon-left-font-monochrome-white.svg')
  background-repeat: no-repeat
  background-position: top
  background-color: #42b7b9
  .posts, .commentaire, li
    display: flex
    flex-direction: column
.postcomment
  padding-top: 8vh
  
.addPost,.addComment
  display: flex
  flex-direction: column
  padding: 15px 30px 30px 30px
  margin: auto
  
  .buttonComment
    margin-top: 2vh
  
h1, h2, p, label
  color: white
  font-weight: bold
ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

</style>




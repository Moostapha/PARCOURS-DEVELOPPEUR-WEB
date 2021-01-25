<template>
  <main class="filActualite">
    <div class="jumbotron">
      <div class="postcomment">
        
        <h1 v-if="user"> Bonjour {{user.username}}</h1>
        <h1 v-if="!user"> Connection impossible !!!</h1>
        
        <!-- TEXTAREA ET BOUTON POUR AJOUT DE POST (PUBLICATION) -->
        <form @submit.prevent="handleSubmit(submitPost)">
          <div class="addPost">
            <label for="addPost">Que voulez vous dire?</label>
            <textarea 
              v-model="post"
              name="addPost" class="sm md lg xl"  rows="3" cols="4" placeholder="Editer vos posts ici">
            </textarea>
          </div>
            <!-- Bouton de création de post avec fonction associée -->
          <div class="buttonPost">
            <button 
              @click="submitPost"
              type="button" class="sm md lg xl btn btn-primary btn-lg ">
              Ajouter votre post
            </button>
          </div>
        </form>
        
        <!-- ============================================ interligne ========================================== -->
        <hr class="my-4">
        
        <!-- RENDU DYNAMIQUE DES POSTS ET DES COMMENTAIRES  -->
        <div class="posts">
          <h1>{{ msg }}</h1>
          <div class="card" v-for="post in posts" :key="post.id">
            <span>auteur: {{post.userId}} </span>
            <span>Publié le: {{post.date_creation}} </span>
            <div class="postContent">
              <p>Post: {{post}}</p> 
            </div>
          </div>
            
          <!-- <p v-for="item in posts" :key="item.id"> {{item.post}} - {{item.date_creation}} </p> 
          <p v-for="item in commentaire" :key="item.id"> {{item.commentaire}} - {{item.date_creation}} >COMMENTS<p> -->
          <p>POST 1: Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Soluta odit asperiores sequi vel doloremque recusandae
          </p>
          <ul>
            <li>
              <p>COMMENTS SUR UN POST1</p> 
            </li>
            <li>
              <p>COMMENTS SUR UN POST1</p>
            </li>
          </ul>
        </div>
        
        <!-- ======================================== interligne ===============================================  -->
        <hr class="my-4">
        
        <!-- TEXTAREA ET BOUTON POUR AJOUT DE commentaire sur post (PUBLICATION) -->
        <form @submit.prevent="handleSubmit(submitComment)">
          <div class="addComment">
            <label for="addComment">Ajouter un commentaire</label>
            <textarea 
              v-model="comment"
              name="addComment"  rows="3" cols="4" placeholder="commenter les posts ici...">
            </textarea>
          </div>
          <!-- Bouton de création de commentaire avec fonction associée -->
          <div class="buttonComment">
            <button 
              @click="submitComment"
              type="button" class="sm md lg xl btn btn-primary btn-lg ">
              Ajouter votre commentaire
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>


<script>
// Client http
import axios from "axios";

export default {

  name: "Posts",
  props: { msg: String },

  data() {
    return {
      // infos à getter du backend
      users: [],
      posts: [], 
      comments: [],
      user: "", // infos user loggé authentifié et connecté avec AUTH_TOKEN
      // infos à poster au backend
      post:"",
      comment:"",
      userId: "",
    };
  },
  
  created() {
    //Récupération du user loggé et redirigé vers fil d'actualité
      axios.get('api/user').then(response => {
        console.log(response);
        // tableau vide sans infos user loggé
        console.log(response.data.user); 
        this.user = response.data.user;
        //response.data.user
        
      })
      .catch((error) => {
        console.log(error);
      }) 
      
    //Affichage de tous les posts => endpoint API 'http://localhost:3000/api/post/'
      axios.get('api/post').then(response => {
        console.log(response);
        this.posts = response.data.post;
      })
      .catch((error) => {
        console.log(error);
      })
      
    //Affichage de tous les comments => endpoint API 'http://localhost:3000/api/comment/'
      axios.get('api/comment').then(response => {
        console.log(response);
        this.comments = response.data.comment
      })
      .catch((error) => {
        console.log(error);
      })
  },
  
  // Méthodes allouées aux boutons créer post et comment
  methods: {

  // Fonction Bouton "Ajouter votre poste"
    submitPost(){
      const createPost = {
        post: this.post,
        userId: this.userId,
      }
      console.log(createPost);
      
      axios.post('api/post/create', createPost)
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    },

  // Fonction Bouton "Ajouter votre poste"
    submitComment(){
      const createComment = {
        comment: this.comment,
        userId: this.userId,
      }
      console.log(createComment);
      
      axios.post('api/comment', createComment).then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
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
      .buttonComment,.buttonPost
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













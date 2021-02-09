<template>
  <main class="filActualite">
    <div class="jumbotron">
      <div class="postcomment">
        
        <h1 v-if="user"> Bonjour {{user.username}}</h1>
        <h1 v-if="!user"> Accés impossible !!! Identifiants incorrects</h1>

        <!-- TEXTAREA ET BOUTON POUR AJOUT DE POST (PUBLICATION) -->
        <form @submit.prevent="handleSubmit(submitPost)" enctype="multipart/form-data" method="post">
          <div  v-if="user" class="addPost">
            <!-- <h1 v-if="!user"> Vous n'avez pas accés !!!</h1> -->
            <label for="addPost">Que voulez vous dire?</label>
            <textarea 
              v-model="publication.post"
              name="addPost" class="sm md lg xl"  rows="2" cols="4" placeholder="Editer vos posts ici">
            </textarea>
          </div>
            <!-- Bouton de création de post avec fonction associée -->
          <div v-if="user" class="buttonPost">
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
          <h1 v-if="user">{{ msg }}</h1>
          
          <!-- vue warn duplicated key -->
          <div class="card" v-for="(post, index) in posts" :key="index">   
            <div class="postContent">
              <span>auteur: {{post.username}} - publié le: {{post.date_creation}}</span>
              <p>Post: {{post.post}}</p> 
              <!-- post.id === userId -->
              <p>PostId: {{post.id}}</p> 
            </div>
            
            <!-- TEXTAREA ET BOUTON POUR AJOUT DE commentaire sur post (PUBLICATION) -->
            <form @submit.prevent="handleSubmit(submitCommentaire)" enctype="multipart/form-data" method="post">
              <div class="addComment">
                <label for="addComment"></label>
                <textarea 
                  v-model="commentaire.contenu"
                  name="addComment" rows="2" cols="4" placeholder="Votre commentaire...">
                </textarea>
              </div>
              <!-- Bouton de création de commentaire avec fonction associée -->
              <div class="buttonComment">
                <button 
                  @click="submitCommentaire"
                  type="button" class="sm md lg xl btn btn-primary btn-lg ">
                  <i type="button"  class="far fa-comments"></i>
                  Publiez
                </button>
              </div>
            </form>
          </div>
        </div>
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
      
      // infos user loggé authentifié et connecté avec AUTH_TOKEN
      user: "", 
      // user: {
      //   username: ""
      // },
      
      // infos à getter du backend, toutes les données des 3 tables
      users: [],
      posts: [], 
      comments: [],
      
      // infos à poster au backend
      publication: {
        post:"",
        userId:"",
        username:"",
      },
      
      commentaire:{
        contenu:"",
        postId:"",
        userId:"",
        username:"",
      },
    };
  },
  
  mounted() {
    //Récupération du user loggé et redirigé vers fil d'actualité
      axios.get('api/user')
      .then(response => {
        console.log(response);
        console.log(response.data.user); 
        this.user = response.data.user;
      })
      .catch((error) => {
        console.log(error);
      }) 
    
    //Affichage de tous les users 
      axios.get('api/user/users')
      .then(response => {
        console.log(response);
        this.users = response.data.users;
      })
      .catch((error) => {
        console.log(error);
      })
    
    //Affichage de tous les posts 
      axios.get('api/post')
      .then(response => {
        console.log(response);
        this.posts = response.data.post;
      })
      .catch((error) => {
        console.log(error);
      })
    
    //Affichage de tous les comments 
      axios.get('api/comment')
      .then(response => {
        console.log(response);
        this.comments = response.data.comment
      })
      .catch((error) => {
        console.log(error);
      })
  },
  
  // Méthodes allouées aux boutons créer post et comment
  // Fonction Bouton "Ajouter votre poste"
  // Formatage des données de formulaire transmis via axios, il faut préciser, traduire les données transmises
  // Comme données transmises on a un tableau avec +sieurs types de données différents à envoyer => string, int, images etc....
  // Création objet FormData() sur lequel la méthode append() est appliquée pour ajouter name:
  // FormDta => infos createdPost
  
  methods: {
    
    // Fonction Bouton "Ajouter votre poste"
    submitPost(){
      
    // Récupération des userInputs (données postées) pour les poster au backend
      const formData = new FormData();
      formData.append("post" , this.publication.post);
      formData.append("userId" , localStorage.getItem('userId'));
      formData.append("username" , localStorage.getItem('username'));
    
    // Affichage de notre objet formData dans la console
      console.log(Array.from(formData));
      for(let obj of formData) {
        console.log(obj);
      }
    
    // envoie des données par requête
      axios.post('api/post/createPost', formData, { 
        headers: {
        // mettre header pour que le front conigure les infos correctement pour le backend
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer '+ localStorage.getItem('token'),
        }
      })
      .then(response => {
        console.log(response);
        
        // récupération de l'id du post créé por la fonction submitCommentaire
        localStorage.setItem('postId', response.data.post.insertId);
        console.log(response.data.post.insertId);
      })
      .catch((error) => {
        console.log(error);
      })
    },
    
    // Fonction Bouton "Ajouter votre commentaire"
    submitCommentaire(){
    
    // Récupération des userInputs (données postées) pour les poster au backend
      const formData = new FormData();
      formData.append('commentaire', this.commentaire.contenu);
      formData.append('postId', localStorage.getItem('postId'));
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('username', localStorage.getItem('username'));
    
    // Affichage de notre objet formData dans la console
      console.log(Array.from(formData));
      for(let obj of formData) {
        console.log(obj);
      }
    
    // envoie des données par requête
      axios.post('api/comment/:postId/createCommentaire', formData, {
        header: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer '+ localStorage.getItem('token'),
        }
      })
      .then(response => {
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
      .postContent
        background-color:#cbdce8
      .postcomment
        padding-top: 8vh
      .addPost,.addComment
        display: flex
        flex-direction: column
        padding: 1px 30px 1px 30px
        margin: auto
      .buttonPost
        margin-top: 2vh
      .buttonComment
        margin: 2vh
      h1, h2
        color: white
        font-weight: bold
      ul
        list-style-type: none
        padding: 0
      li
        display: inline-block
        margin: 0 10px
</style>

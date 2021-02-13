<template>
  <main class="filActualite">
    <div class="jumbotron">
      <div class="postcomment">
        
        <h1 v-if="user"> Bonjour {{username}}</h1>
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

        <hr class="my-4">
        <!-- ============================================ interligne ========================================== -->
        
        <h1 v-if="user">{{ msg }}</h1>
        <!-- rendu dynamique des posts -->
        <div v-for="(post, index) in posts" :key="index" class="card mb-3">
          <div class="row">
            <div class="col-md-3">
              <img src="../assets/userAccount.jpg" class="card-img" alt="UserPicture">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <div class="info">
                    <h5 class="card-title">Publication de {{post.username}}</h5>
                    <p class="card-text">{{post.post}}</p>
                    <small class="text-muted">auteur: {{post.username}} - publié le: {{post.date_creation}} </small>
                    <div class="btnModifSup">
                      <button type="button" class="btn btn-success">Modifier</button>
                      <button type="button" class="btn btn-danger">Supprimer</button>
                    </div>
                </div>
              </div>
              
              <hr class="my-4">
              <!-- ============================================ interligne ========================================== -->
              
              <!-- rendu dynamique des commentaires -->
              <!-- <div  v-for="(commentaire, index) in comment" :key="index"> -->
                <div class="commentaire">
                  <span><small>{{comment.commentaire}}</small></span>
                  <small class="text-muted">{{comment.username}} {{comment.date_creation}} </small>
                </div>
              <!-- </div> -->
              
              
              <!-- TEXTAREA ET BOUTON POUR AJOUT DE commentaire sur post (PUBLICATION) -->
              <form @submit.prevent="handleSubmit(submitCommentaire)" class="commentAndButton" enctype="multipart/form-data" method="post">
                <div class="addComment">
                  <label for="addComment"></label>
                  <textarea 
                    v-model="comment.commentaire"
                    class="sm md lg xl" 
                    name="addComment" rows="1" cols="3" placeholder="Commenter ce post...">
                  </textarea>
                </div>
                <!-- Bouton de création de commentaire avec fonction associée -->
                <div class="buttonComment">
                  <button 
                    @click="submitCommentaire"
                    type="button" class="sm md lg xl btn btn-primary btn-lg ">
                    <i type="button"  class="far fa-comments"></i>
                    Publier
                  </button>
                </div>
              </form>
            </div>
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
      username: "", 
      
      // infos à getter du backend, toutes les données des 3 tables
      users: [],
      posts: [], 
      comments: [],
      
      // infos à poster au backend dans la table posts
      publication: {
        post:"",
        userId:"",
        username:"",
      },
      
      // infos à poster au backend dans la table comments
      comment:{
        commentaire:"",
        postId:"",
        userId:"",
        username:"",
      },
    };
  },
  
  created() {
    //Récupération du user loggé et redirigé vers fil d'actualité
      axios.get('api/users/:userId')
      .then(response => {
        // réponse vide
        console.log(response);
        // récupération du username du user loggé pour affichage dynamique
        const username = localStorage.getItem("username");
        console.log(username);
        this.user = response.data.user;
        this.username = username;
      })
      .catch((error) => {
        console.log(error);
      }) 
    
    //Affichage de tous les users renvoient une réponse vide
      axios.get('api/users')
      .then(response => {
        console.log(response);
        this.users = response.data.users;
      })
      .catch((error) => {
        console.log(error);
      })
    
    //Affichage de tous les posts 
      axios.get('api/posts')
      .then(response => {
        console.log(response);
        this.posts = response.data.posts;
      })
      .catch((error) => {
        console.log(error);
      })
    
    //Affichage de tous les comments 
      axios.get('api/comments')
      .then(response => {
        console.log(response);
        this.comments = response.data.comments
      })
      .catch((error) => {
        console.log(error);
      })
  },
  
  // Formatage des données de formulaire transmis via axios, il faut préciser, traduire les données transmises
  // on a un tableau avec +sieurs types de données différents à envoyer => string, int, images etc....
  // Création objet FormData() sur lequel la méthode append() est appliquée pour ajouter name:
  // FormDta => infos createdPost
  
  methods: {
    
    // Fonction Bouton "Ajouter votre poste"
    submitPost(){
      
    // 1) Récupération des userInputs (données postées) pour les poster au backend
      const formData = new FormData();
      formData.append("post" , this.publication.post);
      formData.append("userId" , localStorage.getItem('userId'));
      formData.append("username" , localStorage.getItem('username'));
    
    // 2) Affichage de notre objet formData dans la console
      console.log(Array.from(formData));
      for(let obj of formData) {
        console.log(obj);
      }
    
    // 3) envoie des données par requête
      axios.post('api/posts/createPost/:postId', formData, { 
        headers: {
        // mettre header pour que le front configure les infos correctement pour le backend
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer '+ localStorage.getItem('token'),
        }
      })
      .then(response => {
        console.log(response);
        
        // 4) récupération de l'id du post créé por la fonction submitCommentaire
        localStorage.setItem('postId', response.data.post.insertId);
        console.log(response.data.post.insertId);
        
      })
      .catch((error) => {
        console.log(error);
      })
      // 4) reset du form
      this.publication = "";
    },
    
    // Fonction Bouton "Ajouter votre commentaire"
    submitCommentaire(){
    // 1) Récupération des userInputs (données postées) pour les poster au backend
      const formData = new FormData();
      formData.append('commentaire', this.comment.commentaire);
      formData.append('postId', localStorage.getItem('postId'));
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('username', localStorage.getItem('username'));
    
    // 2) Affichage de notre objet formData dans la console
      console.log(Array.from(formData));
      for(let obj of formData) {
        console.log(obj);
      }
    
    // 3) envoie des données par requête
      axios.post('api/comments/:postId/createCommentaire', formData, {
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
    
    // 4) reset du input commentaire
      this.comment = "";
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
      h1, h2, label
        color: white
        font-weight: bold
      ul
        list-style-type: none
        padding: 0
      li
        display: inline-block
        margin: 0 10px
      p 
        background-color: #e0e3ea
      .posts, .commentaire, li
        display: flex
        flex-direction: column

      // style du card
      .row 
        justify-content: space-evenly
      .card-body
        display: flex
        flex: 1
        justify-content: space-between
        padding: 0px
      .card-img
        flex-shrink: 0
        width: 50%
        margin: 4vh
      .info
        flex: 2
      
      .btnModifSup
        margin-top: 0vh
        .btn
          margin: 1vh
          font-size: 0.65rem
          padding: 0.5rem 0.5rem
      
      .postcomment
        padding-top: 8vh
      .addPost
        display: flex
        flex-direction: column
        padding: 1px 30px 1px 30px
        margin: auto
      .buttonPost
        margin-top: 2vh
      .commentAndButton
        flex: 1
        display: flex
        justify-content: space-around
        .addComment
          display: flex
          flex: 2
          flex-direction: column
        .buttonComment
          margin: 1vh
          .btn-lg,
            font-size: 0.8rem
            padding: 0.5rem 0.5rem
</style>
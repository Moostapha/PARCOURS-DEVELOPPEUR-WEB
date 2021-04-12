<template>
  <main class="filActualite">

    <!-- NOTICATION USER DE CONNEXION-->
      <div v-if ="user" class="alert alert-success" role="alert">
        <strong>Connexion réussie ! Bienvenue sur votre réseau GROUPOMANIA.</strong>
        <button 
          @click="closeNotifConnexion"
          type="button" 
          class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

    <div class="jumbotron">

      <div class="logo"></div>

      <div class="postcomment">
        
        
        <!-- <p>userId est {{$route.params.userId}} </p> -->
        <!-- <p>username est {{$route.params.username}} </p> -->

        <!-- NOTICATION USER -->
        <!-- <div v-if ="user" class="alert alert-success" role="alert">
          <strong>Connexion réussie  !</strong>
          <button 
            @click="closeNotifConnexion"
            type="button" 
            class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div> -->

        <!-- MESSAGE NOTIFICATION SUCCES POST-->
        <!-- <div v-if="user" class="alert alert-success" role="alert">
            <strong>Succés !!!</strong> Post publié
            <button 
                @click="closeNotifSuccess" 
                type="button" 
                class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div> -->

        <!-- <div v-if="isDisplay"> -->
        <!-- ERREUR VALIDATOR SUR CHAMP POST -->
        <div v-if="error" class="alert alert-danger" role= "alert">
          <strong>Erreur ! Vérifiez les informations saisies </strong> 
          <button
              @click="closeErrorValidationPost"
              type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
          <ul>
              <!-- <strong>{{errorValidator.param}}:</strong> -->
              <li v-for="(errorValidator, index) in error" :key="index">
                  {{errorValidator.msg}}
              </li>
          </ul>
        </div>
        <!-- </div> -->


        <h1 v-if="user"> Bonjour {{username}}</h1>
        <h1 v-if="!user"> Accés impossible !!! Veuillez vous connecter</h1>
        
        <div class="espacement"></div>

        <!-- 1) TEXTAREA ET BOUTON POST -->
        <form class="formPost" @submit.prevent="handleSubmit(submitPost)"  method="post">

          <!-- a) CHAMP PUBLICATION (POST) -->
          <div  v-if="user" class="addPost">
              <label for="addPost">Que voulez vous dire?</label>
              <textarea 
                v-model="publication.post"
                placeholder="Editer vos posts ici"
                name="addPost" class="sm md lg xl"  
                rows="2" cols="4"
              > 
              </textarea>
          </div>


          <!-- b) BOUTON DE SOUMISSION DES PUBLICATIONS-->
          <div v-if="user" class="buttonPost">
            <button 
              @click="submitPost"
              type="button" class="sm md lg xl btn btn-primary btn-lg ">
              Ajouter votre post
            </button>
          </div>
          
        </form>

        <hr class="my-4">
        <!-- =========================================================== interligne ====================================================== -->


        <!-- MESSAGE NOTIFICATION ERREUR EXPRESS-VALIDATOR POST-->
        <!-- <div v-if="user" class="alert alert-danger" role="alert">
            <strong>Echec !!!</strong> Post non publié
            <button
                @click="closeNotifDanger" 
                type="button" 
                class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div> -->

        <h1 v-if="user">{{ msg }}</h1>

        <!-- 2) RENDU DYNAMIQUE DES POSTS ET DES COMMENTAIRES-->
        
        <!-- a) PUBLICATIONS DES USERS -->

        <div v-for="(post, index) in posts" :key="index" class="card mb-3">
          <div class="row">

            <div class="col-md-3">
              <img src="../assets/userAccount.jpg" class="card-img" alt="UserPicture">
            </div>

            <div class="col-md-8">
              
              <div class="card-body">
                
                <div class="info">

                  <h5 class="card-title">Publication de {{post.username}}</h5>

                  <div class="card-text">

                    <div class="publication">
                      <p>{{post.post}}</p>
                    </div>

                    <div v-show="user" class="btnModifSupPublication">
                      <button @click="updatePost" type="button" class="btn btn-success"><i class="fas fa-pen"></i></button>
                      <button @click="deletePost" type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                    </div>
                  </div>

                  <small class="text-muted">auteur: {{post.username}} - publié le: {{dateFormat(post.date_creation)}} </small>

                </div>
              </div>

              <!-- b) RENDU DYNAMIQUE DES COMMENTAIRES USERS-->
              <!-- <div  v-for="(commentaire, index) in comment" :key="index"> -->
                <div class="commentaire">
                  <span><small>{{comment.commentaire}}</small></span>
                  <small class="text-muted">{{comment.username}} {{comment.date_creation}} </small>
                </div>
              <!-- </div> -->


              <!-- 3) TEXTAREA ET BOUTON POUR AJOUT DE commentaire sur post (PUBLICATION) -->
              <form @submit.prevent="handleSubmit(submitCommentaire)" class="commentAndButton" enctype="multipart/form-data" method="post">
                
                <!-- a) CHAMP COMMENTAIRE -->
                <div class="addComment">
                  <label for="addComment"></label>
                  <textarea 
                    v-model="comment.commentaire"
                    class="sm md lg xl" 
                    name="addComment" 
                    rows="1" cols="3" 
                    placeholder="Commenter ce post..."
                  >
                  </textarea>
                </div>


                <!-- b) BOUTON SOUMISSION DU COMMENTAIRE -->
                <div class="buttonComment">
                  <button 
                    @click="submitCommentaire"
                    type="button" class="sm md lg xl btn btn-primary btn-lg ">
                    <i type="button"  class="far fa-comments"></i>
                    
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
// Client http axios
import axios from "axios";

export default {
  
  name: "Posts",
  props: { msg: String},
  // props: ['user'],
  data() {
    return {
      
      // infos user loggé authentifié et connecté avec AUTH_TOKEN
      user: "", 
      username: "", 
      userId: "",
      
      // Affichage de tous les users | posts | comments => infos à getter du backend, toutes les données des 3 tables
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

      // gestion des erreurs de saisie du formulaire + apparition notif user
      error:'',

      // isDisplay: true,
    }
  },
  
  created() {
    
      //Récupération du user loggé et redirigé vers fil d'actualité
      // axios.get('/user', {
      //   params: {
      //     ID: 12345
      //     userId: $route.params.userId
      // }
      // });

      // loadData() {
      //   axios.get('http://localhost:8080/route/'+ this.selectedRoute)
      //   .then(response => (this.chosenRoute = response.data));
      // }
      axios.get('api/users/:userId')
      .then(response => {
        // réponse vide
        console.log(response.data);
        this.user = response.data.user;
        
        // récupération du username du user loggé pour affichage dynamique
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem('userId');
        this.username = username;
        this.userId = userId;
      })
      .catch((error) => {
        console.log(error);
      }) 
    
    
    //Affichage de tous les users 
      axios.get('api/users')
      .then(response => {
        console.log(response.data);
        this.users = response.data.users;
      })
      .catch((error) => {
        console.log(error);
      })
    
    //Affichage de tous les posts 
      axios.get('api/posts')
      .then(response => {
        console.log(response.data);
        this.posts = response.data.posts;
      })
      .catch((error) => {
        console.log(error);
      })
    
    //Affichage de tous les comments 
      axios.get('api/comments')
      .then(response => {
        console.log(response.data);
        this.comments = response.data.comments
      })
      .catch((error) => {
        console.log(error);
      })
  },
  
  // Formatage des données de formulaire transmis via axios, il faut préciser, traduire les données transmises
  // on a un tableau avec +sieurs types de données différents à envoyer => string, int, images etc....
  // Création objet FormData() sur lequel la méthode append() est appliquée pour ajouter name:
  // FormData => infos createdPost
  
  methods: {
    
  ////////////////////////////////////////////////////////////////////////////////////////// PARTIE DES POSTS: /////////////////////////////////////////////////////////////////////////////////////
    // I) FONCTION BOUTON "AJOUTER UN POST"
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
        console.log(response.data);
      })
      .catch((error) => {
        this.error = error.response.data.errors;
        console.log(error);
        // const errorValidator = error.response.data.errors
        // alert(errorValidator);
      })
      // 4) reset du input post form
      this.publication = "";
    },
    
    // II) FONCTION BOUTON MODIFICATION DE POST
    updatePost(){
      console.log('clicked');
    },
    
    // III) FONCTION BOUTON SUPPRESSION DE POST
    deletePost(){
      axios.delete('api/posts/:postId',{
        headers: {
        // mettre header pour que le front configure les infos correctement pour le backend
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer '+ localStorage.getItem('token'),
        }
      })
      .then(response => {
        console.log(response.data);
        console.log('clicked');
      }) 
      .catch((error) => {
        console.log(error);
        
      })
    },
    


  /////////////////////////////////////////////////////////////////////////////// PARTIE DES COMMENTAIRES: ///////////////////////////////////////////////////////////////////////////
    // IV) FONCTION BOUTON "AJOUTER UN COMMENTAIRE"
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
    },
    
  ///////////////////////////////////////////////////////////////////////////  AUTRES FONCTIONS  //////////////////////////////////////////////////////////////////////////////
  // V) FONCTION DE FERMETURE DES DIFFERENTES NOTIFS
    closeNotifConnexion(){  
      console.log('clicked');
      document.getElementsByClassName('alert')[0].style.display='none';
    },
    
      closeErrorValidationPost(){
        document.getElementsByClassName('alert')[1].style.display='none';
      },
    
    // closeNotifSuccess(){
    //   console.log('clicked');
    //   document.getElementsByClassName('alert')[1].style.display='none';
    // },

    // closeNotifDanger(){
    //   console.log('clicked');
    //   document.getElementsByClassName('alert')[2].style.display ='none';
    // },

    

  // VI) fonction qui transforme le format de la date reçu pour un meilleur affichage
    dateFormat(date){                                                       
      const event = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('fr-FR', options);
    },
    
    // show() {
    //   this.isDisplay = true
    // },
    
    // hide(){
    //   this.isDisplay = false
    // },
  }
}
</script>


<style scoped lang="sass">
  .filActualite
    padding-top: 13vh
    height: fit-content
    display: flex
    flex-direction: column
    // @media screen and (max-width: 508px) 
    //     min-height: 50vh
    .jumbotron
      // background-color: #42b7b9
      padding-top: 6vh
      flex: 1
      margin-bottom: 0vh
      background-image: url('../assets/myPics/imgPost1.jpg')
      background-size: 100%
      @media screen and (max-width: 508px) 
          min-height: 58vh
      @media screen and (max-width: 1040px) 
        padding-top: 36px
      .logo
        margin-top: 10px
        background-image: url('../assets/icon-left-font-monochrome-white.svg')
        background-repeat: no-repeat
        background-position: top
        height: 14vh
        @media screen and (max-width: 536px) 
          display: none
        @media screen and (max-width: 768px) 
          height: 20vh
      h1, h2, label
        color: white
        font-weight: bold
      h1
        @media screen and (max-width: 576px)
          font-size: 2rem
      h5
        box-shadow: 2px 5px 5px #e0e3ea
        font-weight: bold
      ul
        list-style-type: none
        padding: 0
      li
        display: inline-block
        margin: 0 10px
      textarea
        border-radius: 20px
        padding: 1vh
      .posts, .commentaire, li
        display: flex
        flex-direction: column
      
      // style du card
      .card
        border: solid, 1px
        box-shadow: 0px 5px 5px 0px 
        border-radius: 20px
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
      .card-text
        display: flex
        justify-content: space-between
        border: solid, 1px
        box-shadow: 0px 5px 5px #e0e3ea
        .publication 
          // width: 80%
          margin: 1vh
          p 
            margin: 0vh
      .btnModifSupPublication
        margin-top: 0vh
        width: 20%
        .btn
          margin: 1vh
          font-size: 0.8rem
      .postcomment
        // padding-top: 5vh
        .espacement
          height: 39vh // espace nécessaire pour la pic
          @media screen and (max-width: 768px)
            height: 6vh
      .addPost
        display: flex
        flex-direction: column
        padding: 1px 30px 1px 30px
        margin: auto
        margin-top: 4vh
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
          margin-top: 0.10vh
          margin-bottom: 2.5vh
        .buttonComment
          margin: 1vh
          .btn-lg,
            font-size: 0.8rem
            padding: 0.5rem 0.7rem
</style>



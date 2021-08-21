<template>
  <main class="filActualite">
    
    <!-- NOTICATION USER DE CONNEXION REUSSIE -->
    <Alert v-if="user" 
      alertType="alert-success" 
      alertMsg= 'Connexion réussie ! Bienvenue sur votre réseau GROUPOMANIA'
    /> 
    <!-- FIN -->
    
    <!-- NOTICATION USER DE CONNEXION ECHOUEE -->
    <Alert v-if="!user" 
      alertType="alert-danger" 
      alertMsg= 'Connexion echouée ! Veuillez vous connecter'
    /> 
    <!-- FIN -->
    
    
    <!-- ajout de div v-else ici -->
    <div class="jumbotron">
      
      <div class="logo"></div>
      
      <div class="postcomment">
        <!-- MESSAGE D'ACCUEIL + MESSAGE BLOQUANT ACCES APERCU APP -->
          <div v-if="user">
            <h1>Bonjour {{username}}</h1>
          </div>
          <div v-else>
            <h1> Accés non autorisé !!!! Contenu non accessible </h1>
          </div>
        <!-- FIN -->
        
        <div class="espacement"></div>
        
        <!-- ERREUR VALIDATOR SUR CHAMP POST -->
          <AlertNotifValidator v-if="error" 
            alertType= "alert-danger"
            alertMsg= 'Erreur ! Vérifiez les informations saisies:'
            :error="error"
          />
        <!-- FIN -->
        
        <div v-if="user">
          <!-- TEXTAREA + BTN PUBLIER + BTN TELECHARGER FICHIER -->
            <ValidationObserver v-slot="{ handleSubmit}">
              <form @submit.prevent="handleSubmit(createPost)" class="formPost" method="post">
              
                <!--  CHAMP PUBLICATION (POST) => Seuls les champs de formulaires valides sont inclus dans un objet FormData, c'est-à-dire ceux qui portent un nom (attribut name) -->
                  <label for="inputpost">Que voulez vous dire?</label>
                  <div class="addPost">
                    <validationProvider name="publication" rules="required|alpha_num" v-slot="{ errors }">
                      <textarea v-model="publication.contentPost"
                        enctype="multipart/form-data"
                        name="contentPost"  
                        type="text"
                        id="inputpost"
                        class="form-control sm md lg xl"
                        placeholder="Editer vos posts ici"
                        rows="2" cols="4"> 
                      </textarea>
                      <span>{{ errors[0] }}</span>
                    </validationProvider>
                  </div>
                <!-- FIN -->
                
                <!-- BOUTONS DE SOUMISSION DES PUBLICATIONS + TELECHARGEMENT DE FICHIER-->
                  <div class="buttonPost">
                    <!-- BTN PUBLIER -->
                      <button @click="createPost"
                        id="btnPost"
                        method="post"
                        class="sm md lg xl btn btn-primary">
                        <i class="far fa-paper-plane"></i>
                        Publier
                      </button>
                    <!-- FIN -->
                    <!-- CHOISIR UN FICHIER -->
                      <input 
                        enctype="multipart/form-data"
                        method="post" 
                        class="form-control-file sm md lg xl btn btn-primary" 
                        id="btnPost" 
                        type="file"
                      />
                    <!-- FIN -->
                    <!-- BTN TELECHARGER -->
                      <button
                        id="btnPost"  
                        class="sm md lg xl btn btn-primary form-control-file" 
                        type = "button"
                        method="post"><i class="fa fa-download"></i>
                        Télécharger
                      </button>
                      <!-- FIN -->
                  </div>
                <!-- FIN -->
              </form>
            </ValidationObserver>
            <hr class="my-4">
            <h1> {{msg}} </h1>
          <!-- FIN -->
        </div>
        
        <!-- RENDU DYNAMIQUE DES POSTS ET DES COMMENTAIRES-->
          <div v-for="(post, index) in posts" :key="index" class="card mb-3">
            <div class="row">
              
              <div class="col-md-8">
                <div class="card-body">
                  <div class="info">
                      <img src="../assets/user_icon.png" class="card-img" alt="UserPicture">
                      <!-- AFFICHANGE DYNAMIQUE AUTEUR CONTENU DU POST -->
                        <h5 class="card-title">
                          {{ post.username }}
                        </h5>
                      <!-- FIN -->
                      <!-- AFFICHAGE CONTENU DU POST + BOUTONS -->
                        <div class="card-text">
                          <div class="publication">
                            <p>{{ post.contentPost }}</p>
                            <small class="text-muted">
                              auteur: {{ post.username }} - publié le: {{dateFormat(post.date_creation)}} 
                            </small>
                            <!-- <p>{{ post.contentPost }}</p> -->
                            <div class="space"></div>
                            <!-- BOUTON THUMB + HEART + COMPTEUR LIKES -->
                              <div class="likeThumbsCommenter">
                                <router-link :to="{ name: 'NewComment' , params: {postID: post.postID} }">
                                  <button 
                                      id="btnCommenter"
                                      type="button"
                                      class="sm md lg btn btn-outline-primary">
                                      <i type="button"  
                                      class="far fa-comments"></i>
                                      Commenter
                                  </button>
                                </router-link>
                                <!-- BOUTONS LIKE + DISLIKE -->
                                  <button @click="counterlike"
                                    method="post"
                                    id='btnThumb' 
                                    type="button"
                                    class="sm md lg btn btn-outline-primary"> 
                                    <i class="far fa-thumbs-up"></i>
                                    <span id="like">0</span>
                                  </button>
                                  <button @click="counterdislike"
                                    method="post"
                                    id='btnThumb' 
                                    type="button"
                                    class="sm md lg btn btn-outline-danger"> 
                                    <i class="far fa-thumbs-down"></i>
                                    <span id="dislike">0</span>
                                  </button>
                                <!-- FIN -->
                              </div>
                            <!-- FIN -->
                          </div>
                          <!-- BOUTONS UPDATE + DELETE POST -->
                            <!-- RENDU CONDITIONNEL L'ADMIN A ACCES A TOUTE ACTION SUR TOUS LES POSTS -->
                            <div v-if="user.is_admin === 1" class="btnModifSupPublication">
                              <!-- BOUTON MODIFPOST -->
                                <router-link :to="{ name: 'ModifPost', params: {postID: post.postID} }">
                                  <button 
                                    type="button" 
                                    class="btn btn-outline-success">
                                    <i class="fas fa-pen"></i>
                                  </button>
                                </router-link>
                              <!-- FIN -->
                              <!-- BOUTON DELETEPOST -->
                                <button @click="deletePost(post.postID)" 
                                  type="button" 
                                  class="btn btn-outline-danger">
                                  <i class="fas fa-trash-alt"></i>
                                </button>
                              <!-- FIN -->
                            </div>
                            <!-- RENDU CONDITIONNEL DES BOUTONS DELETE ET UPDATE: SSI LE USER EST AUTEUR DU POST -->
                            <div v-else-if="userID === post.id_user_auteur_post" class="btnModifSupPublication">
                              <!-- BOUTON MODIFPOST -->
                                <router-link :to="{ name: 'ModifPost', params: {postID: post.postID}}">
                                  <button type="button" class="btn btn-success">
                                    <i class="fas fa-pen"></i>
                                  </button>
                                </router-link>
                              <!-- FIN -->
                              <!-- BOUTON DELETEPOST -->
                                <button @click="deletePost" 
                                  type="button" 
                                  class="btn btn-danger">
                                  <i class="fas fa-trash-alt"></i>
                                </button>
                              <!-- FIN -->
                            </div>
                          <!-- FIN -->
                        </div>
                      <!-- FIN -->
                      
                      <hr class="my-0.5">
                    </div>
                  <!-- FIN -->
                </div>
                <!-- RENDU DYNAMIQUE DES COMMENTAIRES USERS-->
                  <div  v-for="(comment, index) in comments" :key="index">
                    <!-- RENDU COMMENT SSI Il EST FAIT SUR CE POST -->
                      <div v-if="comment.id_post_commented === post.postID">
                        <h6 class="card-title">Commentaires sur ce post</h6>
                        <div class="commentaire">
                          <div class="comment-info">
                            <small class="text-muted">
                              {{ comment.username }}, le {{ dateFormat(comment.date_creation) }}, a commenté:
                            </small>
                            <p>{{ comment.contentComment }}</p>
                          </div>
                          <!-- ACCES BOUTON DELETE COMMENT SSI C'EST L'AUTEUR -->
                            <button @click="deleteComment(comment.commentID)" v-if="comment.id_user_auteur_comment === userID"
                              type="button" class="close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          <!-- FIN -->
                        </div> 
                      </div>
                    <!-- FIN -->
                  </div>
                <!-- FIN -->
              </div>
            </div>
          </div>
        <!-- FIN -->
      </div>
    </div>
  </main>
</template>


<script>
// Client http axios
import axios from "axios";
// component pour notififications user
import Alert from '../components/Alert.vue';
// component pour notif erreur des champs invalides (post + comment)
import AlertNotifValidator from '../components/AlertNotifValidator.vue';

export default {
  // Export du component de notif validator dans template 
  components: { 
    // nom donné sera la tag used dans template
    Alert, 
    AlertNotifValidator 
  },
  
  // sera exporté vers views/Actualites.vue
  name: "Posts",
  props: { msg: String},
  
  data() {
    return {
      
      // Statut administrateur
      is_admin: 1,
      
      // data pour state connection + infos user loggé authentifié récupéré depuis localStorage
      user: "", 
      username: localStorage.getItem("username"), 
      userID: +localStorage.getItem("userID"),
      
      // Affichage de tous les users | posts | comments => infos à getter du backend, toutes les données des 3 tables
      users: [],
      posts: [], 
      comments: [],
      
      // infos à envoyer au backend dans la table posts
      publication: {
        userID:"", // id_user_auteur_post 
        username:"",
        contentPost:"",
      },
      
      // infos à envoyer au backend dans la table comments
      commentaire:{
        id_post_commented:"", // postID
        id_user_auteur_comment:"", // userID
        username:"",
        contentComment:"",
      },
      
      // gestion des erreurs de saisie du formulaire + apparition notif user
      error:'',
    }
  },
  
  created() {
      
      // axios.get(`api/users/${userID}`)
      axios.get('api/users/' + this.userID)
      .then(response => {
        // réponse vide sans this.userID
        console.log(response.data);
        this.user = response.data.user;
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
      axios.get('api/posts/readAll')
      .then(response => {
        console.log(response.data);
        this.posts = response.data.posts;
      })
      .catch((error) => {
        console.log(error);
      })
    
    //Affichage de tous les comments 
      axios.get('api/comments/readAll')
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
      
      // FONCTION BOUTON "AJOUTER UN POST"
      createPost(){
      
     // 1) Récupération des userInputs (données postées) pour les poster au backend
      const formData = new FormData();
      formData.append("userID" , this.userID);
      formData.append("username" , this.username);
      formData.append("contentPost" , this.publication.contentPost );
      
      // 2) Affichage de notre objet formData dans la console
      console.log(Array.from(formData));
      
      // 3) envoie des données par requête axios => headers configuré en global dans axiosConfig.js
      axios.post('api/posts/create', formData)
      .then(response => {
        console.log(response.data);
        this.$router.push('/groupomania/publications')
      })
      .catch((error) => {
        console.log(error);
        // Erreurs de validation champ formulaire 
        this.error = error.response.data.errors;
      })
      
      // 4) reset du input post form
      this.publication = "";
    },
    
    
    // FONCTION BOUTON SUPPRESSION DE POST PAR SON AUTEUR + ADMIN
    deletePost(postID){
      axios.delete( `api/posts/${postID}/delete`)
      .then(response => {
        console.log(response.data);
        // this.$router.push('/groupomania/publications')
      }) 
      .catch((error) => {
        console.log(error);
      })
    },
    
    deleteComment(commentID){
      axios.delete( `api/comments/${commentID}/delete`)
      .then(response => {
        console.log(response.data);
        console.log('clicked');
      }) 
      .catch((error) => {
        console.log(error);
      })
    },
    
    // FONCTION BOUTON SUPPRESSION DE COMMENTAIRE PAR SON AUTEUR + ADMIN 
    counterlike(){
      let countLike = 0;
      countLike++;
      document.getElementById('like').innerHTML= countLike;
      console.log('clicked');
    },
    
    counterdislike(){
      let countDislike = 0;
      countDislike++;
      document.getElementById('dislike').innerHTML= countDislike;
      console.log('clicked')
    },
    
    //fonction qui transforme le format de la date reçu pour un meilleur affichage
    dateFormat(date){                                                       
      const event = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('fr-FR', options);
    },
    
  }
}
</script>



<style scoped lang="sass">
  .filActualite
    margin-top: 2vh
    padding-top: 13vh
    height: fit-content
    display: flex
    flex-direction: column
    .jumbotron
      padding-top: 6vh
      flex: 1
      margin-bottom: 0vh
      background-image: url('../assets/imgPost1.jpg')
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
      label
        font-size: xx-large
        @media screen and (max-width: 768px)
          font-size: larger 
      h5, h6
        box-shadow: 2px 5px 5px #e0e3ea
        font-weight: bold
      h6 
        padding: 0.6rem
      ul
        list-style-type: none
        padding: 0
      li
        display: inline-block
        margin: 0 10px
      #inputpost
        border-radius: 20px
        padding: 1vh
        padding-left: 3vh
      .posts, .commentaire, li
        display: flex
        flex-direction: column
      // espace nécessaire pour la pic de ce doux visage 
      .espacement
        height: 39vh 
        @media screen and (max-width: 768px)
          height: 6vh
      
      // Partie formulaire de publication + post + upload
      .formPost
        background-color: #b8b8b81c
        padding-bottom: 4vh
        border-radius: 8vh
        margin-top: 2vh
      // div Champs poster publication
      .addPost
        padding: 1px 30px 1px 30px
        margin-top: 4vh
        @media screen and (max-width: 768px)
          margin-top: 0vh
        span
          color: red
      // Boutons publier + télécharger 
      .buttonPost
        display: inline-flex
        justify-content: space-around
        align-items: center
        @media screen and (max-width: 768px)
          display: flex
          flex-direction: column
          margin-top: 0vh
          padding: 0vh 4vh 0vh 4vh
        #btnPost
          width: 45%
          margin: 1vh
          @media screen and (max-width: 768px)
            width: 20%
            font-size: small
            @media screen and (max-width: 500px)
              font-size: x-small
            padding: 1vh
            margin: 2vh
          .fa-paper-plane, .fa-download
            font-size: larger
      
      // style du card
      .card
        border: solid, 1px
        box-shadow: 0px 5px 5px 0px 
        border-radius: 20px
        padding-bottom: 4vh
      .row 
        justify-content: space-evenly
      .card-body
        display: flex
        flex: 1
        justify-content: space-between
        padding: 0px
      .card-img
        flex-shrink: 0
        width: 20% //50%
        margin: 4vh
      .info
        flex: 2
      .card-title
        padding: 2vh
        @media screen and (max-width: 768px)
            margin: 0vh 1vh 0vh 1vh
      .card-text
        margin: 3vh 1vh 3vh 1vh
        display: flex
        justify-content: space-between
        border: solid, 1px
        box-shadow: 0px 5px 5px #e0e3ea
        background-color: #f2f4f6
        align-items: flex-end
        .publication 
          width: 95%
          margin: 1vh
          display: flex
          flex-direction: column
          align-items: flex-start
          margin-bottom: 4vh
          p 
            margin: 1vh
          small
            align-self: center
          .space
            height: 6vh
          .likeThumbsCommenter
            @media screen and (max-width: 440px) 
              display: flex
              flex-direction: column
          .fa-thumbs-up, .fa-thumbs-down
            margin: 0 rem
            font-size: x-large
          #like, #dislike
            font-size: large
          #btnThumb
            padding: 0.5vh
            margin-left: 1vh
            @media screen and (max-width: 440px)
              padding: 0vh
              margin-top: 1vh
              width: 15vh
          #btnCommenter
            margin-right: 1vh
            @media screen and (max-width: 440px)
              margin: 0vh
      .btnModifSupPublication
        // display: flex
        margin-top: 0vh
        margin-bottom: 3vh
        width: 24%
        .btn
          margin: 1vh
          font-size: large
      //FIN style card
      
      // style partie commentaire
      .commentaire
        background-color: #f2f4f6
        box-shadow: 0px 5px 5px #e0e3ea
        margin: 2vh 1vh 0vh 1vh
        border-radius: 4vh
        display: flex
        flex-direction: row
        width: 60%
        .comment-info
          width: 90%
</style>
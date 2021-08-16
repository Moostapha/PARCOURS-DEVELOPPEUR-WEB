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
          <!-- INPUTPOST ET BOUTON POST -->
          <ValidationObserver v-slot="{ handleSubmit}">
            <form @submit.prevent="handleSubmit(createPost)" class="formPost" method="post">
              <!--  CHAMP PUBLICATION (POST) => Seuls les champs de formulaires valides sont inclus dans un objet FormData, c'est-à-dire ceux qui portent un nom (attribut name) -->
                <label for="inputpost">Que voulez vous dire?</label>
                <div class="addPost">
                  
                  <validationProvider name="publication" rules="required|alpha_num" v-slot="{ errors }">
                    
                    <input v-model="publication.contentPost"
                      name="contentPost"  
                      type="text"
                      id="inputpost"
                      method="post"
                      class="form-control sm md lg xl"
                      placeholder="Editer vos posts ici"
                      rows="2" cols="4"> 
                    <!-- </textarea> -->
                    
                    <span>{{ errors[0] }}</span>
                  </validationProvider>
                </div>
                
              <!-- FIN -->
              <!-- BOUTON DE SOUMISSION DES PUBLICATIONS -->
                <div class="buttonPost">
                  <button 
                    @click="createPost"
                    id="btnPost"
                    method="post"
                    class="sm md lg xl btn btn-primary">
                    <i class="far fa-paper-plane"></i>
                    Publier
                  </button>
                  <!-- <div class="uploadInputBtn"> -->
                    <input 
                        enctype="multipart/form-data" method="post" 
                        class="form-control" id="formFileLg" type="file" 
                    />
                    <button 
                        id="btnPost"  
                        class="sm md lg xl btn btn-primary form-control-file" type = "button">
                        <i class="fa fa-download"></i>
                        Télécharger
                    </button>
                    <!-- </div> -->
                </div>
                
              <!-- FIN -->
            </form>
          </ValidationObserver>
            <hr class="my-4">
            <h1> {{msg}} </h1>
          <!-- FIN -->
        </div>
        
        <!-- RENDU DYNAMIQUE DES POSTS ET DES COMMENTAIRES-->
          <div v-for="(post, index) in posts" :key="index" 
            class="card mb-3"
          >
            <div class="row">
              <!-- USER AVATAR -->
                <div class="col-md-3">
                  <img src="../assets/user_icon.png" class="card-img" alt="UserPicture">
                </div>
              <!-- FIN -->
              <div class="col-md-8">
                <div class="card-body">
                  <div class="info">
                      <!-- AFFICHANGE DYNAMIQUE AUTEUR CONTENU DU POST -->
                        <h5 class="card-title">
                          Publication de {{ post.username }}
                        </h5>
                      <!-- FIN -->
                      <!-- AFFICHAGE CONTENU DU POST + BOUTON DELETE ET MODIF -->
                        <div class="card-text">
                          <div class="publication">
                            <p>{{ post.contentPost }}</p>
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
                                  <button 
                                    @click="counterlike"
                                    method="post"
                                    id='btnThumb' 
                                    type="button"
                                    class="sm md lg btn btn-outline-primary"> 
                                    <i class="far fa-thumbs-up"></i>
                                    <span id="like">0</span>
                                  </button>
                                  <button 
                                    @click="counterdislike"
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
                                <button @click="deletePost" 
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
                      <!-- AFFICHAGE AUTEUR | DATE CREATION DU POST -->
                        <small class="text-muted">
                          auteur: {{ post.username }} - 
                          publié le: {{dateFormat(post.date_creation)}} 
                        </small>
                      <!-- FIN -->



                      <!-- AFFICHAGE COMMENTAIRE SUR CE POST SSI COMMENTAIRE EXISTE-->
                        <div class="commentaire">
                          <h6>Commentaires sur ce post</h6>
                          <span>
                            <small>
                              {{ commentaire.contentComment }}
                            </small>
                          </span>
                          <small class="text-muted">
                            {{ commentaire.username }} {{ commentaire.date_creation }} 
                          </small>
                        </div>
                      <!-- FIN -->
                  </div>
                </div>
                <!-- RENDU DYNAMIQUE DES COMMENTAIRES USERS-->
                  <div  v-for="(comment, index) in comments" :key="index">
                    <div class="commentaire">
                      <span>
                        <small style="white-space: pre-line;">
                          {{ commentaire.contentComment }}
                        </small>
                      </span>
                      <small class="text-muted">
                        {{ commentaire.username }} {{ commentaire.date_creation }} 
                      </small>
                    </div>
                  </div>
                <!-- FIN -->
                <!-- TEXTAREA ET BOUTON POUR AJOUT DE commentaire sur post (PUBLICATION) -->
                  <form @submit.prevent="handleSubmit(createComment)" class="commentAndButton" enctype="multipart/form-data" method="post">
                    <!--  CHAMP COMMENTAIRE -->
                      <div class="addComment">
                        <label for="addComment"></label> 
                        <textarea 
                          v-model="commentaire.contentComment"
                          class="sm md lg xl" 
                          name="addComment" 
                          rows="1" cols="3" 
                          placeholder="Commenter ce post..."
                          method="post"
                        >
                        </textarea>
                      </div>
                    <!-- FIN -->
                    <input type="hidden" name="postID" :value="post.postID">
                    <!-- BOUTON SOUMISSION DU COMMENTAIRE -->
                      <div class="buttonComment">
                        
                        <button 
                          @click="createComment"
                          id="btnSend"
                          type="button" class="sm md lg xl btn btn-outline-primary btn-lg ">
                          <i type="button" class="far fa-paper-plane"></i>
                        </button>
                      </div>
                    <!-- FIN -->
                  </form>
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
        postID :"", // id_post_commented
        userID:"", // id_user_auteur_comment
        username:"",
        contentComment:"",
      },
      
      // gestion des erreurs de saisie du formulaire + apparition notif user
      error:'',
      // isDisplay: true,
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
    
  ////////////////////////////////////////////////////////////////////////////////////////// PARTIE DES POSTS: /////////////////////////////////////////////////////////////////////////////////////
    // I) FONCTION BOUTON "AJOUTER UN POST"
    createPost(){
     // 1) Récupération des userInputs (données postées) pour les poster au backend
      const formData = new FormData();
      formData.append("userID" , this.userID);
      formData.append("username" , this.username);
      formData.append("contentPost" , this.publication.contentPost );
      
      // 2) Affichage de notre objet formData dans la console
      console.log(Array.from(formData));
      for(let obj of formData) {
        console.log(obj);
        console.log('type valeur: ', typeof obj[1])
      }
      
      // const dataSent = JSON.parse(JSON.stringify(formData));
      // console.log(dataSent);
      // console.log('Type: ', typeof dataSent)

      // 3) envoie des données par requête
      axios.post('api/posts/create', formData, { 
        headers: {
        // mettre header pour que le front configure les infos correctement pour le backend
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer '+ localStorage.getItem('token'),
          }
      })
      .then(response => {
        console.log(response.data);
        // window.location.assign('http://localhost:8080/groupomania/publications')
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
    
    
    
    // IV) FONCTION BOUTON "AJOUTER UN COMMENTAIRE"
    createComment(){
      // 1) Récupération des userInputs (données postées) pour les poster au backend
      const formData = new FormData();
      formData.append('id_post_commented', this.postID);  // renvoie null? this.postID
      formData.append('userID', this.userID ); 
      formData.append('username', this.username ); 
      formData.append('content', this.commentaire.contentComment);
      
      // 2) Affichage de notre objet formData dans la console
      console.log(Array.from(formData));
      for(let obj of formData) {
        console.log(obj);
        localStorage.setItem('objetFormdata', JSON.stringify(obj));
        const objStockedFormdata = JSON.parse(localStorage.getItem('objetFormdata'));
        console.log('éléments Formdata: ', objStockedFormdata);
        console.log(typeof objStockedFormdata); // type objet
      }
    
    // 3) envoie des données par requête
      axios.post('api/comments/create/', formData, {
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
        // erreur validator validation champ formulaire 
        this.error = error.response.data.errors;
      })
    
    // 4) reset du input commentaire
      this.comment = "";
    },

    
    // II) FONCTION BOUTON MODIFICATION DE POST
    
    
    // III) FONCTION BOUTON SUPPRESSION DE POST
    deletePost(){
      axios.delete('api/posts/deleteOne/' + this.postID,{
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
    
    
  ///////////////////////////////////////////////////////////////////////////  AUTRES FONCTIONS  //////////////////////////////////////////////////////////////////////////////
  // VI) fonction qui transforme le format de la date reçu pour un meilleur affichage
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
    // @media screen and (max-width: 508px) 
    //     min-height: 50vh
    .jumbotron
      // background-color: #42b7b9
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
      h5
        box-shadow: 2px 5px 5px #e0e3ea
        font-weight: bold
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
      // Partie formulaire de publication de post + upload
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
        // padding: 2vh
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
          .fa-paper-plane
            font-size: larger
      
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
      .card-title
        padding: 2vh
        @media screen and (max-width: 768px)
            margin: 0vh 1vh 0vh 1vh
      .card-text
        margin: 4vh 1vh 1vh 1vh
        display: flex
        justify-content: space-between
        border: solid, 1px
        box-shadow: 0px 5px 5px #e0e3ea
        background-color: #f2f4f6
        .publication 
          // width: 80%
          margin: 1vh
          display: flex
          flex-direction: column
          align-items: flex-start
          margin-bottom: 4vh
          p 
            margin: 0vh
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
            // margin-left: 0.5vh
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
            // padding: 0.5rem 0.7rem
        .fa-paper-plane
          font-size: large
          margin-right: 1vh 
        #btnSend
          padding: 1vh 2vh
</style>
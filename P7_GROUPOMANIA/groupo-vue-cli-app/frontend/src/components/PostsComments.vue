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
        
        <div v-if="user" class="textImageSubmit">
          <!-- TEXTAREA + BTN PUBLIER + BTN TELECHARGER FICHIER -->
            <label for="inputpost" id="labelInputPost">Publiez du texte ou...</label>
            <ValidationObserver v-slot="{ handleSubmit}">
              <form @submit.prevent="handleSubmit(createPost)" class="formPost" method="post" enctype="multipart/form-data">
              
                <!--  CHAMP PUBLICATION (POST) => Seuls les champs de formulaires valides sont inclus dans un objet FormData, c'est-à-dire ceux qui portent un nom (attribut name) -->
                  <!-- <label for="inputpost">Que voulez vous dire?</label> -->
                  <div class="addPost">
                    <validationProvider name="publication" rules="required|alpha_num" v-slot="{ errors }">
                      
                      <textarea v-model="publication.contentPost"
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
                  <!-- <div class="buttonPost"> -->
                    <!-- BTN PUBLIER -->
                      <button @click="createPost()"
                        id="btnPost"
                        method="post"
                        class="sm md lg xl btn btn-primary btnpublier">
                        <i class="far fa-paper-plane"></i>
                        Publier
                      </button>
                    <!-- FIN -->
              </form>
            </ValidationObserver>
            
            
            <label>...Ajoutez des images</label>
            <div class="buttonPost">
              <!-- CHOISIR UN FICHIER -->
                <input @change="handleFileSelected"
                  type="file"
                  method="post" 
                  style="display: none"
                  ref="fileSelectedInput"
                  class="btnPost form-control-file sm md lg xl btn btn-primary"
                />
                <button @click="$refs.fileSelectedInput.click()" id="btnPost"  
                  class="sm md lg xl btn btn-primary" >
                  Choisir une image
                </button>
              <!-- FIN -->  
              <!-- BTN TELECHARGER -->
                <button @click="submitFile()"
                  name="imagePost"
                  id="btnPost"  
                  type = "button"
                  method="post"
                  class="sm md lg xl btn btn-primary form-control-file">
                  <i class="fa fa-download"></i>
                    publier image
                </button>
              <!-- FIN -->
            </div>
            
            <hr class="my-4">
            <h1> {{msg}} </h1>
          <!-- FIN -->
        </div>
        
        <!-- RENDU DYNAMIQUE DES POSTS ET DES COMMENTAIRES-->
          
          <div id="allPosts" v-for="(post, index) in posts" :key="index" class="card mb-5">
            
            <div class="row">
              <div class="col-md-8">
                <div class="card-body">
                  
                  <div class="info">
                    
                    <!-- RENDU DYNAMIQUE ET CONDITIONNELS DES AVATARS (AUTEUR USER AVATAR SUR SON POST) -->
                      <div class="avatar">
                        <!-- boucle sur [users] -->
                          <div class="allUsersForPost" v-for="(user, index) in users" :key="index" >
                            <!-- condition assignant avatar de l'auteur sur son post -->
                              <img class="card-img"  v-if="user.userID === post.id_user_auteur_post" :src=" user.avatar" :alt="user.username">
                            <!-- fin -->
                          </div>
                        <!-- fin -->
                        <!-- AFFICHAGE DYNAMIQUE DU USER AUTEUR DU POST -->
                          <h5 class="card-title">
                            {{ post.username }}
                          </h5>
                        <!-- FIN -->
                      </div>
                    
                    <div class="imgPostContentPost">
                    <!-- PUBLICATION IMAGE -->
                      <figure v-if="post.imagePost"  class="imgPost">
                        <img :src="post.imagePost" alt="">
                        <figcaption v-for="(user, index) in users" :key="index"> 
                          <small class="text-muted" v-if="user.userID === post.id_user_auteur_post">
                            Image postée par {{user.username}}
                          </small>
                        </figcaption>
                      </figure>
                    <!-- FIN -->
                    <!-- AFFICHAGE CONTENU DU POST + BOUTONS -->
                      <div class="card-text">
                        <!-- <figure v-if="post.imagePost"  class="imgPost">
                          <img :src="post.imagePost" alt="" style="width:80%">
                        </figure> -->
                        <div class="publication">
                        
                          <!-- PUBLICATION TEXTE -->
                            <p>{{ post.contentPost }}</p>
                            <small class="text-muted">
                              auteur: {{ post.username }} - publié le: {{dateFormat(post.date_creation)}} 
                            </small>
                          <!-- FIN -->
                          
                          <div class="space"></div>
                          
                          <!-- BOUTONS COMMENTER + LIKES | DISLIKE -->
                            <div id="likeThumbsCommenter">
                            
                              <!-- BOUTON COMMENTER -->
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
                              <!-- FIN -->
                            
                              <!-- BOUTON LIKE + NOMBRE DE LIKES SUR CHAQUE POST -->
                                <button v-if ="like" @click="likePost(post.postID)"
                                  method="post"
                                  id='btnThumb' 
                                  type="button"
                                  class="sm md lg btn btn-outline-primary"> 
                                  <i class="far fa-thumbs-up"></i>
                                    <!-- boucle sur [likes]  -->
                                      <div class= "allLikes" v-for="(like, index) in likes" :key="index">
                                        <!-- condition assignant le like sur son post -->
                                          <span id="like"  v-if="like.postID === post.postID">
                                            {{like.reactionsLike}}
                                          </span>
                                        <!-- fin -->
                                      </div>
                                    <!-- fin -->
                                </button>
                              <!-- FIN -->  
                            
                              <!-- BOUTON DISLIKE + NOMBRE DE DISLIKE SUR CHAQUE POST -->
                                <button @click="dislikePost(post.postID)"
                                  method="post"
                                  id='btnThumb' 
                                  type="button"
                                  class="sm md lg btn btn-outline-danger"> 
                                  <i class="far fa-thumbs-down"></i>
                                  <!-- boucle sur [dislikes] -->
                                    <div class= "allLikes" v-for="(dislike, index) in dislikes" :key="index">
                                      <!-- condition assignant le dislike sur son post -->
                                        <span id="dislike" v-if="dislike.postID === post.postID" >
                                          {{dislike.reactionsDislike}}
                                        </span>
                                      <!-- fin -->
                                    </div>
                                  <!-- fin -->
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
                              <button  @click="deletePost(post.postID)" 
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
                                  <button type="button" class="btn btn-outline-success">
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
                          <!-- FIN -->
                      </div>
                      </div> 
                    <!-- FIN -->
                    
                    
                  </div>
                  <!-- FIN CARD INFO -->
                </div>
                <!-- FIN CARD-BODY -->
                
                
                <!-- --------------------------------------------------------------  COMMENTAIRES  --------------------------------------------------------------------------- -->
                <!-- PARTIE COMMENTAIRE DES POSTS -->
                <!-- RENDU DYNAMIQUE DES COMMENTAIRES USERS-->
                
                  <div id="allComments" v-for="(comment, index) in comments" :key="index">
                    <!-- RENDU COMMENT SSI Il EST FAIT SUR CE POST -->
                      
                        <div v-if="comment.id_post_commented === post.postID" class="commentaire">
                          
                          <div class="comment-info-imgAvatar">
                            <!-- RENDUS DYNAMIQUES ET CONDITIONNELS AVATAR AUTEUR COMMENTAIRES -->
                              <div id="allUsers" v-for="(user, index) in users" :key="index" class="imgAvatar">
                                <img class="avatar_commentateur" 
                                v-if="user.userID === comment.id_user_auteur_comment" :src="user.avatar" :alt="user.username">
                              </div>
                            <!-- FIN -->
                            <!-- COMMENTAIRES -->
                              <div class="comment-info">
                                <small class="text-muted">
                                  {{ comment.username }}, le {{ dateFormat(comment.date_creation) }}, a commenté:
                                </small>
                                <p>{{ comment.contentComment }}</p>
                              </div>
                            <!-- FIN -->
                          </div>
                          
                          <!-- ACCES BOUTON DELETE + UPDATE  COMMENT SSI C'EST L'AUTEUR -->
                            <div class="actionOnComment" v-if="comment.id_user_auteur_comment === userID" >
                              <span @click="show= !show">...</span>
                              <div class="btnOnComment"  v-if="show">
                                <span @click="updateComment(comment.commentID)" 
                                  id="updateComment" class="btn btn-outline-success" aria-hidden="true">
                                  <i class="fas fa-pen"></i>
                                </span>
                                
                                <span @click="deleteComment(comment.commentID)" 
                                  id="deleteComment" class="btn btn-outline-danger" aria-hidden="true">
                                  <i class="fas fa-trash-alt"></i>
                                </span>
                                <!-- <i class="far fa-paper-plane"></i>
                                  <input> -->
                              </div>
                            </div>
                          <!-- FIN -->
                          
                          <!-- ACCES BOUTON DELETE + UPDATE  COMMENT  SI C'EST L'ADMIN-->
                            <div class="actionOnComment" v-else-if="user.is_admin === 1">
                              <span @click="show= !show">...</span>
                              <div class="btnOnComment"  v-if="show">
                                <span @click="updateComment(comment.commentID)" 
                                  id="updateComment" class="btn btn-outline-success" aria-hidden="true">
                                  <i class="fas fa-pen"></i>
                                </span>
                                <span @click="deleteComment(comment.commentID)" 
                                  id="deleteComment" class="btn btn-outline-danger" aria-hidden="true">
                                  <i class="fas fa-trash-alt"></i>
                                </span>
                                </div>
                            </div>
                          <!-- FIN -->
                        </div> 
                      
                    <!-- FIN -->
                  </div>
                <!-- FIN -->
              </div>
            </div>
          </div>
        <!-- FIN -->
      </div>
      <!-- USER NOTIFS -->
        <FlashMessage></FlashMessage>
      <!-- FIN -->
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
  props: { msg: String },
  
  data() {
    return {
      
      // Statut administrateur
      is_admin: 1,
      like: 1,
      // isLiked: 1,
      // isNotLiked: 0,
      // data pour state connection
      user: "", 
      
      // infos user connecté + authentifié récupéré depuis localStorage
      username: localStorage.getItem("username"), 
      userID: +localStorage.getItem("userID"),
      
      // fichier image téléchargé
      fileSelected: null,
      
      // Affichage de tous les users | posts | comments | likes | dislikes => infos à getter du backend, toutes les données des 3 tables
      users: [],
      posts: [], 
      comments: [],
      likes: [],
      dislikes: [],
      
      // compteur ilke/dislike
      counter:0,
      
      // infos à envoyer au backend dans la table posts
      publication: {
        userID:"", // id_user_auteur_post 
        username:"",
        contentPost:"",
        imagePost:"",
      },
      
      // infos à envoyer au backend dans la table comments
      commentaire:{
        id_post_commented:"", // postID
        id_user_auteur_comment:"", // userID
        username:"",
        contentComment:"",
      },
      
      reaction:{
        id_post_reacted:"", // postID
        id_user_auteur_reaction:"",  // userID
        like:"",
        dislike:""
      },
      
      // gestion des erreurs de saisie du formulaire + apparition notif user
      error:'',
      
      // montrer actions possibles sur commentaire auteur + admin
      show: false,
      
      componentKey: 0
    }
    
  },
  
  
  mounted() {
    
  // Affichage user loggé
    axios.get('api/users/' + this.userID)
    .then(response => {
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
    
  // Affichage de tous les likes
    axios.get('api/reactions/likes')
    .then(response => {
      console.log(response.data);
      this.likes = response.data.likes
    })
    .catch((error) => {
      console.log(error);
    })
  
  // Affichage de tous les dislikes
    axios.get('api/reactions/dislikes')
    .then(response => {
      console.log(response.data);
      this.dislikes = response.data.dislikes
    })
    .catch((error) => {
      console.log(error);
    })
    
    // this.forceRerender()
  },
  
  // Formatage des données de formulaire transmis via axios, il faut préciser, traduire les données transmises
  // on a un tableau avec +sieurs types de données différents à envoyer => string, int, images etc....
  // Création objet FormData() sur lequel la méthode append() est appliquée pour ajouter name:
  // FormData => infos createdPost
    
    methods: {
    
    // forceRerender() {
    //   this.componentKey += 1;
    // },
    
    // FONCTION BOUTON "AJOUTER UN POST" POUR DU TEXTE
    createPost(){
      // Création post texte
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
        // this.posts = response.data; // on met le data dans array posts
        // refreshing page actuelle (windows.go(n))
        // this.$router.go(0)
        // this.contentPost = this.publication.contentPost
        // notification de réussite avec FlashMessage
        this.flashMessage.show({
          status: 'success',
          icon: true,
          title: 'PUBLICATION REUSSIE !!!',
          message: 'Votre post a été publié avec succés'
        })
      })
      .catch((error) => {
        console.log(error);
        // Erreurs de validation champ formulaire 
        this.error = error.response.data.errors;
        // notif erreur avec flashmessage
        this.flashMessage.show({
          status: 'error',
          icon: 'success',
          title: 'ERREUR !!!',
          message: 'Une erreur est survenue'
        })
      })
      
      // 4) reset du input post form
      this.publication = "";
      
      // refreshing page
      // this.componentKey += 1;
      // this.$router.push('/groupomania/publications')
      // this.$router.go(this.$router.currentRoute)
      // this.$forceUpdate('/groupomania/publications')
    },
    
    
    // Stockage fichier img de l'input
    handleFileSelected(event){
      this.fileSelected = event.target.files[0];
      console.log(event);
    },
    
    
    // FONCTION TELECHARGEMENT DE FICHIER IMAGE POUR POST (createImg)
    submitFile(){
      let formData = new FormData();
      formData.append("userID" , this.userID);
      formData.append("username" , this.username);
      formData.append('imagePost', this.fileSelected);
      
      console.log(Array.from(formData));
      
      axios.post('api/posts/uploadImg', formData)
      .then(response => {
        console.log('SUCCES: ', response.data);
        // notification de réussite avec FlashMessage
        this.flashMessage.show({
          status: 'success',
          title: 'TELECHARGEMENT REUSSIE !!!',
          message: 'Votre fichier a été téléchargé avec succés'
        })
      })
      .catch((error) => {
        console.log('ERREUR: ', error);
         // notif erreur avec flashmessage
        this.flashMessage.show({
          status: 'error',
          title: 'ERREUR !!!',
          message: 'Une erreur est survenue'
        })
      })
    },
    
    
    // FONCTION BOUTON SUPPRESSION DE POST PAR SON AUTEUR + ADMIN (régulateur)
    deletePost(postID){
      
      if(confirm(this.username +', voulez vous vraiment supprimer ce post?'))
        axios.delete( `api/posts/${postID}/delete`)
        .then(response => {
          console.log(response.data);
          this.$router.push('/groupomania/publications')
          // notification de réussite avec FlashMessage
          this.flashMessage.show({
            status: 'success',
            title: 'SUPPRESSION REUSSIE !!!',
            message: 'Votre post a été supprimé avec succés'
          })
        }) 
        .catch((error) => {
          console.log(error);
          // notif erreur avec flashmessage
          this.flashMessage.show({
            status: 'error',
            title: 'ERREUR !!!',
            message: 'Une erreur est survenue'
          })
        })
    },
    
    
    // FONCTION BOUTON DE SUPPRESSION DU COMMENTAIRE PAR SON AUTEUR + ADMIN (régulateur)
    deleteComment(commentID){
      
      if(confirm(this.username+', voulez vous vraiment supprimer ce commentaire ?'))
      axios.delete( `api/comments/${commentID}/delete`)
      .then(response => {
        console.log(response.data);
        // this.$router.push('/groupomania/publications');
         // notification de réussite avec FlashMessage
        this.flashMessage.show({
          status: 'success',
          icon: '../assets/success.png',
          title: 'SUPPRESSION REUSSIE !!!',
          message: 'Votre commentaire a été supprimé avec succés'
        })
      }) 
      .catch((error) => {
        console.log(error);
         // notif erreur avec flashmessage
        this.flashMessage.show({
          status: 'error',
          icon: 'success',
          title: 'ERREUR !!!',
          message: 'Une erreur est survenue'
        })
      })
    },
    
    updateComment(){
      
      
    },
    
    // FONCTION BOUTON LIKE 
    likePost(postID){
      
      // test pour le postID dynamique
      alert(postID)
      
      // Préparation envoie données du formulaire (entrées = lignes table likes)
      const formData = new FormData();
      formData.append('id_post_reacted', postID);
      formData.append('id_user_auteur_reaction', this.userID);
      // formData.append('like', 1);
      console.log(Array.from(formData));
      
      axios.post('api/reactions/like' , formData)
      .then(response => {
        console.log(response.data);
        
        // Notif reussite
        this.flashMessage.show({
          status: 'success',
          icon: true,
          title: 'LIKE REUSSIE !!!',
          message: 'Vous aimez ce post !!!'
        })
      })
      .catch((error) => {
        console.log(error);
        
        // Notif échec
        this.flashMessage.show({
          status: 'error',
          icon: 'success',
          title: 'ERREUR !!!',
          message: 'Une erreur est survenue'
        })
      })
      
      // let countLike = 0;
      // countLike++;
      // document.getElementById('like').innerHTML= countLike;
      // console.log('clicked');
      
    },
    
    // FONCTION BOUTON DISLIKE 
    dislikePost(postID){
      
      // test pour le postID dynamique
      alert(postID)
      
      // Préparation envoie données du formulaire (entrées = lignes table likes)
      const formData = new FormData();
      formData.append('id_post_reacted', postID);
      formData.append('id_user_auteur_reaction', this.userID);
      formData.append('dislike', 1);
      
      // datas envoyés dans console
      console.log(Array.from(formData));
      
      axios.post('api/reactions/dislike' , formData)
      .then(response => {
        console.log(response.data);
        this.flashMessage.show({
          status: 'success',
          icon: true,
          title: 'DISLIKE REUSSIE !!!',
          message: 'Vous n\'aimez pas ce post !!!'
        })
      })
      .catch((error) => {
        console.log(error);
      })
      
      
      // let countDislike = 0;
      // countDislike++;
      // document.getElementById('dislike').innerHTML= countDislike;
      // console.log('clicked')
      //alert(postID)
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
        
      @media screen and (min-width: 1024px)
        padding: 5rem 10rem
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
      #labelInputPost
          float: left
          margin-left: 7vh
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
        padding-top: 5vh
        border-radius: 8vh
        // margin-top: 2vh
        // display: flex
        // align-item: center
      // div Champs poster publication
      .addPost
        padding: 1px 30px 1px 30px
        margin-top: 1vh
        @media screen and (max-width: 768px)
          margin-top: 0vh
        span
          color: red
      .btnpublier
        margin-top: 3vh
        width: 15%
        border-radius: 4vh
        font-size: large
        font-weight: bold
        @media screen and (max-width: 1041px)
          width: 16%
        @media screen and (max-width: 768px)
          font-size: small
          width: 15%
          border-radius: 2vh
        @media screen and (max-width: 500px)
          font-size: x-small
          width: 20%
          border-radius: 2vh
          padding: 1vh
      // Boutons publier + télécharger 
      .buttonPost
        // display: inline-flex
        display: flex
        justify-content: space-around
        align-items: center
        @media screen and (max-width: 320px)
          display: flex
          flex-direction: column
          margin-top: 0vh
          padding: 0vh 4vh 0vh 4vh
        #btnPost
          width: 20%
          border-radius: 4vh
          font-size: large
          font-weight: bold
          // margin: 1vh
          @media screen and (max-width: 1200px)
            font-size: large
            width: 23%
          @media screen and (max-width: 768px)
            width: 25%
            font-size: small
            border-radius: 1vh
            @media screen and (max-width: 500px)
              font-size: x-small
            padding: 1vh
            margin: 2vh
          .fa-paper-plane, .fa-download
            font-size: larger
      
      // style du card PARTIE POST (PUBLICATIONS DES USERS)
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
      .info
        flex: 2
      .avatar //div contenant image avatar + nom
        padding: 0vh
        display: flex
        flex-direction: row
        align-items: center
        margin-left: -12vh
        @media screen and (min-width: 1599px)
          margin-left: -10vh
        @media screen and (max-width: 1599px)
          margin-left: -11vh
        @media screen and (max-width: 768px)
          flex-direction: column
          margin-left: 0vh
        // avatarUser
        .card-img
          margin: 2vh 0vh
          flex-shrink: 1
          background-color: #f2f4f6
          box-shadow: 0px 5px 5px #e0e3ea
          border: groove
          border-radius: 100%
          width: 45%
          @media screen and (max-width: 1440px)
            width: 40%
          @media screen and (max-width: 768px)
            width: 35%
        // Username
        .card-title
          margin-top: 2vh
          margin-left: -13vh
          padding: 2vh
          border: groove 0.3px //inset
          border-radius: 2vh
          width: 70%
          @media screen and (min-width: 1599px)
            width: 73%
            margin-left: -7vh
          @media screen and (max-width: 1599px)
            width: 72%
            margin-left: -9vh
          @media screen and (max-width: 768px)
            margin: 0vh 1vh 0vh 1vh
            width: 60%
            margin-left: 0vh
      .imgPost
        box-shadow: 0px 5px 5px #e0e3ea
        margin-top: 2vh
        border-radius: 3vh
        border: solid .5px
        @media screen and (max-width: 768px)
          border: none 
          margin-top: 2vh
        img
          margin: 1vh 0vh 0vh 0vh
          padding: 0vh 1vh
          width: 100%
          border-radius: 2vh
      .card-text
        margin: 3vh 1vh 3vh 1vh
        padding-left: 2vh
        display: flex
        justify-content: space-between
        border-radius: 4vh
        box-shadow: 0px 5px 5px #e0e3ea
        background-color: white
        border: solid .5px
        align-items: flex-end
        @media screen and (max-width: 768px)
          border: none
        .publication 
          width: 95%
          margin: 0vh 0vh 2vh
          display: flex
          flex-direction: column
          align-items: flex-start
          // margin-bottom: 4vh
          p 
            margin: 1vh
          small
            align-self: center
          .space
            height: 1vh
          #likeThumbsCommenter
            display: flex
            
            @media screen and (max-width: 440px) 
              display: flex
              flex-direction: column
            .fa-thumbs-up, .fa-thumbs-down
              margin: 0 rem
              font-size: x-large
            // .allLikes
            //   display: flex
            //   flex-direction: row
            #like, #dislike
              font-size: large
            #btnThumb
              padding: 0.5vh
              margin-left: 1vh
              display: flex
              @media screen and (max-width: 440px)
                padding: 0vh
                margin: .5vh 0vh
                padding-top: 1vh
                width: 15vh
            #btnCommenter
              margin-right: 1vh
              @media screen and (max-width: 440px)
                margin-bottom: .5vh
      .btnModifSupPublication
        // display: 
        margin-top: 0vh
        margin-bottom: 1vh
        width: 24%
        .btn
          margin: 1vh
          font-size: large
      //FIN style card
      
      // style PARTIE COMMENTAIRE
      .commentaire
        background-color: #f2f4f6
        box-shadow: 0px 5px 5px #e0e3ea
        margin: 2vh 1vh 0vh 1vh
        border-radius: 4vh
        display: flex
        flex-direction: row
        width: 70%
        //ajouter rules pour devices sur ce width
        @media screen and (max-width: 768px)
          width: 90%
          margin: 2vh 2vh
        .comment-info-imgAvatar
          width: 90%  // à ajuster sur smartphone
          display: flex
          padding-top: 1vh
          // .imgAvatar
          //   @media screen and (max-width: 768px)
          //     width: 15vh
          .avatar_commentateur
            width: 30%
            border-radius: 100%
            padding-bottom: 1vh
            @media screen and (max-width: 768px)
              width: 20%
          .comment-info
            width: 100%
        
        // Boutons action sur commentaire par son auteur + admin
        .actionOnComment
          margin: -1vh 1vh
          font-weight: bolder
          cursor: pointer
          font-size: x-large
          padding: 0vh 1vh 1vh 1vh
        .btnOnComment
          display: flex
          flex-direction: column
        #updateComment,#deleteComment
          margin: 1vh
        .close
          // margin-left: 1vh
          cursor: pointer
          padding: 1vh
          font-size: medium
</style>
<template>
<div class="updatePost">
    
    <div class="formAndBtns">
        <label for="updatePostInputForm" id="updateLabel">{{msg}}</label>
        <form @submit.prevent action="" method="post" type="submit" enctype="multipart/form-data">
            
            <!-- <h2>{{msg}}</h2> -->
            
            <AlertNotifValidator v-if="error" 
            alertType= "alert-danger"
            alertMsg= 'Erreur ! Vérifiez les informations saisies:'
            :error="error"/>
            
            <!-- <label for="updatePostInputForm" id="updateLabel">{{msg}}</label> -->
            
            <!-- Note : Seuls les champs de formulaires valides sont inclus dans un objet FormData, 
            c'est-à-dire ceux qui portent un nom (attribut name) -->
            <!-- DEMANDE MODIF EN SOUTENANCE: affichage de l'ancien post dans le textarea pour sa modification -->
            
            <textarea
                
                v-model="contentPost"
                name="contentPost"
                id="updatePostInputForm"
                type="text"
                class="form-control sm md lg" 
                placeholder="Modifier votre post ici... "
                require="required">
                
            </textarea>
            
            
            <div v-for="(post, index) in posts" :key="index" >
                <!-- PREVISUALISATION ANCIEN FICHIER -->
                    <!-- S'il existe -->
                        <div v-if="post.imagePost" id="preview">
                            <h4>Ancien Fichier:</h4> 
                            <img  :src="post.imagePost"/>
                        </div>
                    <!-- fin -->
                    <!-- Sinon -->
                        <div v-else  >
                            <h4>Ancien Fichier: aucun</h4> 
                        </div>
                    <!-- fin -->
                <!-- FIN -->
            </div>
            <!-- FIN -->
            
            <!-- PREVISUALISATION NOUVEAU FICHIER CHOISI PAR USER -->
                <div v-if="url"  id="preview">
                    <h4>Fichier séléctionné:</h4> 
                    <img :src="url"/>
                </div>
            <!-- FIN -->
        </form>
        
        <div class="dispoBtn">
                
                <!-- BTN PUBLIER -->
                    <!-- Greffage sur le même bouton des fonctions update de texte et d'image  -->
                        <button @click="updatePost(); updateFile()"
                            method="post"
                            type="button" 
                            class="sm md lg btn btn-outline-success">
                            Publier
                        </button>
                <!-- FIN -->
                
                <!-- CHOISIR UN FICHIER -->
                    <input @change="handleFileSelected"
                        type="file"
                        method="post" 
                        style="display: none"
                        ref="fileSelectedInput"
                        class="btnPost form-control-file sm md lg xl btn btn-primary"
                    />
                    <button @click="$refs.fileSelectedInput.click()"  
                        class="sm md lg xl btn btn-outline-primary" >
                        Choisir image
                    </button>
                <!-- FIN -->  
                
                <!-- BTN TELECHARGER FICHIER CHOISI -->
                    <!-- <button @click="updateFile()"
                        name="imagePost"
                        type = "button"
                        method="post"
                        class="sm md lg xl btn btn-outline-primary">
                        <i class="fa fa-download"></i>
                        Modifier image
                    </button> -->
                <!-- FIN -->
                
                <!-- BTN ANNULER RETOUR VERS PAGE DE PUBLICATION -->
                    <router-link :to="{name:'Fil d\'actualité'}">
                        <button type="button" class="btn btn-outline-danger">
                            Annuler
                        </button>
                    </router-link>
                <!-- FIN -->
            </div>
    </div>
    <!-- USER NOTIFS -->
        <FlashMessage></FlashMessage>
    <!-- FIN -->
</div>
</template>


<script>
import axios from 'axios';
import AlertNotifValidator from '../components/AlertNotifValidator.vue';
export default {
    
    components: {
        AlertNotifValidator
    },
    
    name: 'UpdatePost',
    props: {
        msg: {String},
        // contentPost: ['contentPost']
    },
    
    data(){
        
        return {
            
            // infos Poste sélectionné à modifier
            posts:[],
            
            // récupération dynamique du postID dans l'URL
            postID: +this.$route.params.postID, 
            
            // récupération dynamique du contentPost dans l'URL => affichage ancien message dans textarea
            // saisi et actualisation du post
            // récupération dynamique du postID dans l'URL
            contentPost: this.$route.params.contentPost, 
            
            // newImagePost Fichier choisi par user
            newFileSelected: null, 
            
            // prévisualisation fichier à télécharger
            url: null, 
            
            // récupération du username pour boite de dialogue dynamique pour confirmation
            username: localStorage.getItem("username"), 
            
            // Gestion erreurs
            error:"", 
        }
    },
    
    mounted() {
        // GET infos du post à modifier 
        axios.get('api/posts/readOne/' + this.postID)
        .then(response => {
        console.log(response.data); 
        this.posts = response.data.post;
        })
        .catch((error) => {
        console.log(error);
        })
    },
    
    methods: {
        
        // Modif contentPost (texte publication) => 1ere fonction sur le bouton publier
        updatePost(){
            
            // 1) Données à transmettre au back avec constructeur FormData et sa fonction append()
            let postUpdated = new FormData();
            postUpdated.append('postID', this.postID );
            postUpdated.append('contentPost', this.contentPost );
            
            // 2) Affichage de notre objet formData dans la console
            console.log('postUpdated => ',Array.from(postUpdated));
            for(let obj of postUpdated) {
                console.log(obj);
            }
            
            // 3) requête axios du frontend vers le backend => Récup. dynamique de postID dans l'URL via vue.router
            //headers d'axios configuré en global dans axiosConfig.js => Token + content-type
            axios.put(`api/posts/${this.postID}/update`, postUpdated)
            .then(response => {
                console.log(response);               
            })
            .catch((error) =>{
                console.log(error);
                this.error =  error.response.data.errors;
                // notif erreur avec flashmessage
                this.flashMessage.show({
                    status: 'error',
                    icon: 'success',
                    title: 'ERREUR !!!',
                    message: 'Une erreur est survenue' + error.message
                })
            })
            console.log('clicked')
            
            this.contentPost=""
        },
        
        // Stockage fichier img de l'input
        handleFileSelected(event){
            
            // Affectation et récupération du fichier
            this.newFileSelected = event.target.files[0];
            console.log(event);
            
            // preview image sélectionnée
            const file = event.target.files[0];
            this.url = URL.createObjectURL(file);
        },
        
        //Modif imagePost (image publication) => 2e et dernière fonction sur le bouton publier
        updateFile(){
            
            // 1) Préparation du formdata à envoyer au back avec constructeur FormData et sa fonction append()
            
            // si modif image
            let imgUpdated = new FormData();
            imgUpdated.append('imagePost', this.newFileSelected);
            imgUpdated.append('postID', this.postID);
            
            // 2) Affichage de notre objet formData dans la console
            console.log(Array.from(imgUpdated));
            for(let obj of imgUpdated) {
                console.log(obj);
            }
            
            // sinon modif image => ancienne image contentPost récupérée dynamiquement
            // let oldImg = new FormData();
            // oldImg.append('imagePost', this.imagePost);
            // oldImg.append('postID', this.postID);
            
            // console.log('imgUpdated: ',Array.from(oldImg));
            // for(let obj of oldImg) {
            //     console.log(obj);
            // }
            
            // 3) Gestion des cas d'exception et boite de dialogue user
            
            // Affichage dans console de la valeur du nouveau fichier
            console.log('Valeur new file: ', imgUpdated.get('imagePost'));
            
            // Affichage dans console de la valeur de l'ancien fichier
            // console.log('Valeur de old file: ', oldImg.get('imagePost'));
            
            // CAS 1 => pas de fichier sélectionné et télécharge 
            if (imgUpdated.get('imagePost') === 'null') {
                // info user pour confirmation
                confirm(this.username+", vous n'avez pas sélectionné de nouveau fichier, conserver l'ancien ? ")
                // Redirection vers forum
                // this.$router.push('/groupomania/publications')
                this.$router.go(1)
            } 
            // CAS 2 => Fichier sélectionné et téléchargé
            else if (imgUpdated.get('imagePost') !== 'null'){
                confirm(this.username+', modifier cette image ?')
            }
            
            // 4) Requête PUT axios vers ctler
            // axios.put(`api/posts/${this.$route.params.postID}/updateImg`, imgUpdated)
            axios.put(`api/posts/${this.postID}/updateImg`, imgUpdated)
            .then(response =>{
                console.log(response);
                
                // redirection sur la dernière fonction update() du btn publier
                this.$router.push('/groupomania/publications')
                
                // flashmessage ('Modif réussie !!!!')
                this.flashMessage.show({
                    status: 'success',
                    icon: '../assets/success.png',
                    title: 'SUCCES !!!',
                    message: 'Modification de la publication réussie',
                    time: 3000
                })
            })
            .catch((error) =>{
                // erreur
                console.log(error);
                // notif erreur avec flashmessage
                this.flashMessage.show({
                    status: 'error',
                    icon: 'success',
                    title: 'ERREUR !!!',
                    message: 'Une erreur est survenue'
                })
            })
        }
    }
}
</script>


<style lang="sass" scoped>
    .updatePost
        display: flex    
        flex-direction: column
        align-items: center
        background-image: url('../assets/img2.jpg')
        background-size: cover
        .formAndBtns
            padding: 30vh 0vh 15vh 0vh
        #updateLabel
            color: white
            margin: 0vh 
            float: left
            font-size: xx-large
            @media screen and (max-width: 768px) 
                font-size: large
        #updatePostInputForm
            height: 30vh
            width: 100vh
            @media screen and (max-width: 440px) 
                width: 70vh
                height: 20vh
                margin-right: 0vh
            @media screen and (max-width: 348px) 
                width: 60vh
                height: 20vh
            padding-top: 2vh
            border-radius: 25px
            margin-top: 2vh
            padding-left: 2vh
        #preview
            display: flex
            flex-direction: column
            margin: 2vh
            @media screen and (max-width: 440px) 
                width: 70vh
                height: 20vh
                margin-right: 0vh
        h4 
            color: white
        .dispoBtn
            display: flex
            margin-top: 1vh
            @media screen and (max-width: 440px)
                flex-direction: column
            .btn
                margin: 1vh
                // @media screen and (max-width: 768px) 
                //     font-size: small
</style>
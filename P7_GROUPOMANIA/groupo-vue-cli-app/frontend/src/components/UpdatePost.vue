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
            <textarea 
                v-model="contentPost"
                name="contentPost"
                id="updatePostInputForm"
                type="text"
                class="form-control sm md lg" 
                placeholder="Modifier votre post ici..." 
                require="required">
            </textarea>
            <!-- <label for="floatingTextarea">Modifier...</label> -->
            
        </form>
        <div class="dispoBtn">
                <button @click="updatePost()"
                    method="post"
                    type="button" 
                    class="sm md lg btn btn-outline-success">
                    Publier
                </button>
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
                <!-- BTN TELECHARGER -->
                    <button @click="updateFile()"
                        name="imagePost"
                        type = "button"
                        method="post"
                        class="sm md lg xl btn btn-outline-primary">
                        <i class="fa fa-download"></i>
                        Modifier image
                    </button>
                <!-- FIN -->
                <router-link :to="{name:'Fil d\'actualité'}">
                    <button type="button" class="btn btn-outline-danger">
                        Annuler
                    </button>
                </router-link>
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
        
    },
    
    data(){
        return {
            postID: +this.$route.params.postID,
            contentPost:"",
            newFileSelected: null, // newImagePost
            error:"",
        }
    },
    
    methods: {
        // Modif contentPost
        updatePost(){
            // Données à transmettre au back
            let postUpdated = new FormData();
            postUpdated.append('contentPost', this.contentPost);
            postUpdated.append('postID', this.postID );
            console.log(Array.from(postUpdated));
            //headers d'axios configuré en global dans axiosConfig.js => Token + content-type
            axios.put(`api/posts/${this.$route.params.postID}/update`, postUpdated)
            .then(response => {
                console.log(response);
                this.$router.push('/groupomania/publications');
                // flashmessage ('Modif réussie !!!!')
                this.flashMessage.show({
                    status: 'success',
                    icon: '../assets/success.png',
                    title: 'SUCCES !!!',
                    message: 'Modification de la publication réussie'
                })
            })
            .catch((error) =>{
                console.log(error);
                this.error =  error.response.data.errors;
                // notif erreur avec flashmessage
                this.flashMessage.show({
                    status: 'error',
                    icon: 'success',
                    title: 'ERREUR !!!',
                    message: 'Une erreur est survenue'
                })
            })
            console.log('clicked')
            
            this.contentPost=""
        },
        
        // Stockage fichier img de l'input
        handleFileSelected(event){
            this.newFileSelected = event.target.files[0];
            console.log(event);
        },
        
        //Modif imagePost
        updateFile(){
            // Préparation du formdata à envoyer au back
            let imgUpdated = new FormData();
            imgUpdated.append('imagePost', this.newFileSelected);
            imgUpdated.append('postID', this.postID);
            
            console.log('Fichier modifié: ',Array.from(imgUpdated));
            
            // Requête axios au back => envoie des données modifiées
            axios.put(`api/posts/${this.$route.params.postID}/updateImg`, imgUpdated)
            .then(response =>{
                console.log(response);
                // redirection vers page publication
                this.$router.push('/groupomania/publications');
                
                // flashmessage ('Modif réussie !!!!')
                this.flashMessage.show({
                    status: 'success',
                    icon: '../assets/success.png',
                    title: 'SUCCES !!!',
                    message: 'Modification de l\'image réussie'
                })
            })
            .catch((error) =>{
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
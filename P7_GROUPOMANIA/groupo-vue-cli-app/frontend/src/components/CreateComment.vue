<template>
<div class="createComment">
    
    <div class="form">
        <form method="post" type="submit" enctype="multipart/form-data">
            <h2>{{msg}}</h2>
            <!-- NOTIF USER SANITIZER CHAMPS FROM -->
                <AlertNotifValidator v-if="error" 
                    alertType= "alert-danger"
                    alertMsg= 'Erreur ! Vérifiez les informations saisies:'
                    :error="error"
                />
            <!-- FIN -->
            <textarea v-model="contentComment"
                name=""
                id="commentInputForm"
                require="required"
                class="sm md lg " 
                placeholder="Votre commentaire..." 
            >
            <!-- <label for="floatingTextarea">Modifier...</label>  -->
            </textarea>
            <!-- BOUTONS -->
                <div class="dispoBtn">
                    <button @click="createComment"
                        method="post"
                        type="button" 
                        class="sm md lg btn btn-outline-success">
                        Publier
                    </button>
                    <!-- BOUTON ANNULER RETOUR SUR PUBLICATIONS -->
                        <router-link :to="{name:'Fil d\'actualité'}">
                            <button type="button" class="btn btn-outline-danger">
                                Annuler
                            </button>
                        </router-link>
                    <!-- FIN -->
                </div>
            <!-- FIN -->
        </form>
    </div>
</div>
</template>


<script>
import axios from 'axios';
import AlertNotifValidator from '../components/AlertNotifValidator.vue';
export default {
    
    components: {
        AlertNotifValidator
    },
    
    name: 'CreateComment',
    props: {msg: String},
    
    data () {
        return {
            
            // Infos à poster au back (dans l'ordre des colonnes de ma table comments)
            id_post_commented : this.$route.params, 
            id_user_auteur_comment: +localStorage.getItem('userID'), 
            username: localStorage.getItem('username'),
            contentComment:"",
            
            // Gestion erreurs 
            error: ""
        }
    },
    
    methods: {
        
        createComment(){
            const formdata = new FormData();
                formdata.append('id_post_commented', this.id_post_commented);
                formdata.append('id_user_auteur_comment', this.id_user_auteur_comment );
                formdata.append('username', this.username );
                formdata.append('contentComment', this.contentComment );
                
                console.log('elements du formdata: ', Array.from(formdata));
                
                // for(let obj of formdata) {
                //     console.log(obj);
                //     localStorage.setItem('objetFormdata', JSON.stringify(obj));
                //     const objStockedFormdata = JSON.parse(localStorage.getItem('objetFormdata'));
                //     console.log('éléments Formdata: ', objStockedFormdata);
                //     console.log(typeof objStockedFormdata); // type objet
                // }
            
            // axios.post('/create/'+ this.postID)
            axios.post('api/comments/create/'+ this.id_post_commented, formdata, {
                header: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer '+ localStorage.getItem('token'),
                }
            })
            .then(response => {
                console.log(response);
                window.location.assign('http://localhost:8080/groupomania/publications')
            })
            .catch((error) => {
                console.log(error);
                this.error = error.response.data.errors
            })
            // requete axios vers route update post/comment
            console.log('clicked')
            this.contentComment = "";
        },
    }
}
</script>


<style lang="sass" scoped>
    .form
        display: flex
        justify-content: center
        padding: 30vh 0vh 15vh 0vh
        background-image: url('../assets/img3.jpg')
        background-size: cover
        h2
            color: white
        #commentInputForm
            height: 30vh
            width: 100vh
            border-radius: 25px
            margin-top: 3vh
            padding-top: 2vh
            padding-left: 2vh
            @media screen and (max-width: 440px) 
                width: 80vh
                height: 20vh
            @media screen and (max-width: 348px) 
                width: 60vh
                height: 20vh
        .dispoBtn
            display: flex
            .btn
                margin: 1vh
</style>
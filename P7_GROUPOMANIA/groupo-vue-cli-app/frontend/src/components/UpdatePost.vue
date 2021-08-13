<template>
<div class="updatePost">
    
    <div class="form">
        
        <form action="" method="post" type="submit">
            <h2>{{msg}}</h2>
            
            <AlertNotifValidator v-if="error" 
                alertType= "alert-danger"
                alertMsg= 'Erreur ! Vérifiez les informations saisies:'
                :error="error"
            />
            
            <textarea v-model="contentPost"
                name="" 
                id="updatePostInputForm"
                class="sm md lg" 
                placeholder="Modifier votre post ici..." 
                require="required"
            >
            </textarea>
            <!-- <label for="floatingTextarea">Modifier...</label> -->
            <div class="dispoBtn">
                <button @click="updatePost"
                    method="post"
                    type="button" 
                    class="sm md lg btn btn-outline-success">
                    Publier
                </button>
                <router-link :to="{name:'Fil d\'actualité'}">
                    <button 
                        type="button" class="btn btn-outline-danger">
                        Annuler
                    </button>
                </router-link>
            </div>
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
    
    name: 'UpdatePost',
    props: {msg: String},
    
    data(){
        return {
            
            postID: +this.$route.params.postID,
            contentPost:"",
            error:"",
        }
    },
    
    methods: {
        
        // Fonction update post
        updatePost(){
            
            // let dataUpdated = {
            //     contentPost: this.contentPost,
            //     postID: this.postID
            // }
            let postUpdated = new FormData();
            postUpdated.append('contentPost', this.contentPost);
            postUpdated.append('postID', this.postID );
            
            axios.put(`api/posts/${this.$route.params.postID}/update`, postUpdated,{
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer '+ localStorage.getItem('token'),
                }
            })
            .then(response =>{
                console.log(response);
                // window.location.assign('http://localhost:8080/groupomania/publications')
                this.$route.push('/groupomania/publications')
            })
            .catch((error) =>{
                console.log(error);
                this.error =  error.response.data.errors;
            })
            console.log('clicked')
            
            this.contentPost=""
            // this.$router.push('/groupomania/publications')
        },
        
    }
}
</script>


<style lang="sass" scoped>
    // .updatePost
        
    .form
        display: flex
        justify-content: center
        padding: 30vh 0vh 15vh 0vh
        background-image: url('../assets/img2.jpg')
        background-size: cover
        // margin: auto
        h2
            color: white
        #updatePostInputForm
            height: 30vh
            width: 100vh
            @media screen and (max-width: 440px) 
                width: 80vh
                height: 20vh
            @media screen and (max-width: 348px) 
                width: 60vh
                height: 20vh
            padding-top: 2vh
            border-radius: 25px
            margin-top: 2vh
            padding-left: 2vh
        .dispoBtn
            display: flex
            .btn
                margin: 1vh
</style>



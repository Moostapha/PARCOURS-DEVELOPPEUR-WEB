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
            <textarea v-model="ContentPost"
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
                <button @click="cancel"
                    type="button" class="btn btn-outline-danger">
                    Annuler
                </button>
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
            // postID: +localStorage.getItem(postID),
            ContentPost:"",
            error:[]
        }
    },
    
    methods: {
        
        // Fonction update post
        updatePost(){
            
            let dataUpdated = {
                ContentPost: this.ContentPost 
            }
            // `api/posts/updateOne/${this.$route.params.postID}`
            // 'api/posts/updateOne/'+ this.postID
            //API ROUTE
            // 
            axios.put('api/posts/update/:postID', dataUpdated,{
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer '+ localStorage.getItem('token'),
                }
            })
            .then(response =>{
                console.log(response);
            })
            .catch((error) =>{
                console.log(error);
                this.error =  error.response.data.errors;
            })
            console.log('clicked')
            
            this.ContentPost=""
            // this.$router.push('/groupomania/publications')
        },
        
        // Fonction annulation et retour vers page publications
        cancel(){
            this.$router.push('/groupomania/publications')
        }
    }
}
</script>


<style lang="sass" scoped>
    // .updatePost
        
    .form
        display: flex
        justify-content: center
        padding: 30vh 15vh 20vh
        background-image: url('../assets/img2.jpg')
        background-size: cover
        // margin: auto
        h2
            color: white
        #updatePostInputForm
            height: 30vh
            width: 100vh
            padding-top: 2vh
            border-radius: 25px
            margin-top: 2vh
            padding-left: 2vh
            @media screen and (max-width: 440px) 
                width: 80vh
            @media screen and (max-width: 348px) 
                width: 60vh
        .dispoBtn
            display: flex
            .btn
                margin: 1vh
</style>



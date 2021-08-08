<template>
<div class="createComment">
    
    <div class="form">
        <form action="" method="post" type="submit">
            <h2>{{msg}}</h2>
            <AlertNotifValidator v-if="error" 
                alertType= "alert-danger"
                alertMsg= 'Erreur ! Vérifiez les informations saisies:'
                :error="error"
            />
            <textarea v-model="contentComment" 
                name=""
                id="commentInputForm"
                require="required"
                class="sm md lg " 
                placeholder="Votre commentaire..." 
            >
            </textarea>
            <!-- <label for="floatingTextarea">Modifier...</label> -->
            <div class="dispoBtn">
                <button @click="createComment"
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
    
    name: 'CreateComment',
    props: {msg: String},
    
    data () {
        return {
            contentComment:"",
            error: []
        }
    },
    
    methods: {
        
        createComment(){
            // axios.post('/create/'+ this.postID)
            axios.post('api/comments/create/:postID')
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                this.error = error.response.data.errors
            })
            // requete axios vers route update post/comment
            console.log('clicked')
        },
        
        cancel(){
            this.$router.push('/groupomania/publications')
        }
    }
}
</script>


<style lang="sass" scoped>
    .form
        display: flex
        justify-content: center
        padding: 30vh 15vh 20vh
        background-image: url('../assets/img3.jpg')
        background-size: cover
        // margin: auto
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

<template>
    <div class="card mb-3">
        <div class="row">
            <!-- USER AVATAR -->
            <div class="col-md-3">
                <img src="../assets/user_icon.png" class="card-img" alt="UserPicture">
            </div>
            <!-- FIN -->
            <div class="col-md-8">
                <div class="card-body">
                    <!-- COMPONENT POST devra commencer here -->
                    <div class="info">
                        <!-- AFFICHANGE DYNAMIQUE AUTEUR CONTENU DU POST -->
                            <h5 class="card-title">
                            Publication de {{ post.username }}
                            </h5>
                        <!-- FIN -->
                        <!-- AFFICHAGE CONTENU DU POST +  BOUTON COMMENTER + BOUTON LIKE + DELETE ET MODIF -->
                            <div class="card-text">
                                <div class="publication">
                                    <p>{{ post.contentPost }}</p>
                                    <div class="space"></div>
                                    <!-- BOUTONS COMMENTER + THUMB + HEART + COMPTEUR LIKES -->
                                        <div class="likeThumbsCommenter">
                                            <button
                                                @click="commenter"
                                                id="btnCommenter"
                                                type="button"
                                                class="sm md lg  btn btn-primary">
                                                <i type="button"  
                                                class="far fa-comments"></i>
                                                Commenter
                                            </button>
                                            <button 
                                                @click="counterlike"
                                                type="button"
                                                class="btn btn-outline-primary"> 
                                                <i class="far fa-thumbs-up"></i>
                                                <span id="like">0</span>
                                            </button>
                                            <button 
                                                @click="counterdislike"
                                                type="button"
                                                class="btn btn-outline-danger"> 
                                                <i class="far fa-thumbs-down"></i>
                                                <span id="dislike">0</span>
                                            </button>
                                            
                                        </div>
                                    <!-- FIN -->
                                </div>
                                <!-- BOUTONS UPDATE + DELETE POST -->
                                    <!-- RENDU CONDITIONNEL L'ADMIN A ACCES A TOUTE ACTION  -->
                                    <div v-if="user.is_admin === 1" 
                                        class="btnModifSupPublication">
                                        <button @click="updatePost" 
                                            type="button" 
                                            class="btn btn-success">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button @click="deletePost" 
                                            type="button" 
                                            class="btn btn-danger">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                    <!-- RENDU CONDITIONNEL: SSI LE USER EST AUTEUR DU POST -->
                                    <div v-else-if="userID === post.id_user_auteur_post" 
                                        class="btnModifSupPublication">
                                        <button @click="updatePost" 
                                            type="button" 
                                            class="btn btn-success">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button @click="deletePost" 
                                            type="button" 
                                            class="btn btn-danger">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
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
                    </div>   
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    
    name: 'Publications',
    
    methods: {
        commenter(){
            this.$router.push('/groupomania/publications/:postID/update')
        },
        
        counterlike(){
            let countLike = 0;
            countLike++;
            document.getElementById('like').innerHTML= countLike;
            console.log('clicked');
        },
        
        counterdislike(){
            let countDislike = 0;
            countdislike++;
            document.getElementById('dislike').innerHTML= countDislike;
            console.log('clicked');
        },
    }
}
</script>

<style lang="sass" scoped>
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
        margin: 1vh
        display: flex
        flex-direction: column
        align-items: flex-start
        margin-bottom: 4vh
        p 
            margin: 0vh
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
        margin-top: 0vh
        width: 24%
    .btn
        margin: 1vh
        font-size: large
    
    // Dans component PostsComments:
        // <publication
        //     v-for="post in posts"
        //     v-bind:key="post.postID"
        //     v-bind:content="post.contentPostt"
        //     v-bind:date_creation="post.date_creation"
        //     v-bind:comments="post.comments"
        // ></publication>
</style>
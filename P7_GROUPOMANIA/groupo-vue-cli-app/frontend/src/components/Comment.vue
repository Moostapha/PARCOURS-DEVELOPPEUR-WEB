<template>
<div class="col-md-8">
    <div class="card-body">
        <div class="info">
            <!-- RENDU DYNAMIQUE DES COMMENTAIRES USERS-->
                <!-- <div  v-for="(comment, index) in comments" :key="index"> -->
                <div class="commentaire">
                    <span>
                    <small>
                        {{ commentaire.contentComment }}
                    </small>
                    </span>
                    <small class="text-muted">
                        {{ commentaire.username }} publié le {{ commentaire.date_creation }} 
                    </small>
                </div>
                <!-- </div> -->
            <!-- FIN -->
            <!-- TEXTAREA ET BOUTON POUR AJOUT DE commentaire sur post (PUBLICATION) -->
                <form @submit.prevent="handleSubmit(createCommentaire)" 
                    class="commentAndButton" 
                    enctype="multipart/form-data" 
                    method="post">
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
                    <!-- BOUTON SOUMISSION DU COMMENTAIRE -->
                        <div class="buttonComment">
                            <button 
                                @click="createCommentaire"
                                type="button" 
                                class="sm md lg xl btn btn-primary btn-lg ">
                                <i type="button"  class="far fa-comments"></i>
                            </button>
                        </div>
                    <!-- FIN -->
                </form>
            <!-- FIN -->
        </div>
    </div>
</div>  
</template>

<style lang="sass" scoped>
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
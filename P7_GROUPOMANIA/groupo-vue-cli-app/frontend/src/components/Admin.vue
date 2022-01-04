<template>
    
    <div id='admin'>
        <!-- TODOS => Page admin
            1) liste de all users
            2) Voir leurs "stats" cad:
                - nbre de posts
                - nbre de comments
                - nbre de likes/dislinkes
            3) Pouvoir supprimer définitivement un profil depuis ce dash
                - Bouton delete présent sur chaque user
        -->
        <h1>ADMIN DASHBOARD</h1>
            <!-- v-if="!user && is_admin" -->
            <ul>
                <li id="allUsers" v-for="(user, index) in users" :key="index"  class='card mb-4'>
                    <h3>{{user.username}}</h3>
                    <img class="card-img" :src=" user.avatar" :alt="user.username">
                    <div class="userInfos">
                        <strong><h4>Informations</h4></strong>
                        <p>
                            <strong>Email:</strong> 
                            {{user.email}} <br>
                            <strong>Création du compte:</strong><br>
                            {{dateFormat(user.date_creation_compte)}}<br>
                            
                        </p>
                        <strong><h4>Statistiques</h4></strong>
                        <p>
                            Auteur de {{user.nbre_de_posts}} publication(s)<br>
                            A commenté {{user.nbre_de_commentaires}} publication(s)<br>
                            A liké {{user.nbre_de_like}} publication(s)<br>
                            A disliké {{user.nbre_de_like}} publication(s)<br>
                        </p>
                    </div>
                    
                    <button @click="deleteBanUser(user.userID)"
                        type="button" class="btn btn-outline-danger">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </li>
            </ul>
        <FlashMessage></FlashMessage>
    </div>
</template>

<script>
    
    // import axios
    import axios from 'axios';
    
    export default {
        
        name: 'Admin',
        props: {
            msg: String,
            Admin: String
        },
        
        data() {
            return {
                
                // user: false,
                // is_admin: 1,
                users: [],
                posts: [], 
                comments: [],
                likes: [],
                dislikes: [],
            }
        },
        
        mounted(){
            // Requête Affichage de tous les users avec leurs infos + stats
            axios.get('api/admin')
            .then(response => {
            console.log(response.data);
            this.users = response.data.users;
            })
            .catch((error) => {
            console.log(error);
            })
        },
        
        methods: {
            
            // Fonction requête delete user par l'admin
            deleteBanUser(userID){
                // test pour le postID dynamique
                alert(userID)
                // Message d'avertissement
                if(confirm('voulez vous vraiment bannir l\'utilisateur '+this.username+' du réseau GROUPOMANIA ?'))
                
                //Requêtes axios vers endpoint admin => '/:userID/delete'
                axios.delete(`api/admin/${userID}/delete,`)
                .then(response => {
                    console.log(response.data);
                    console.log('button cliked !!!');
                    // notification de réussite avec FlashMessage
                    this.flashMessage.show({
                        status: 'success',
                        icon: '../assets/success.png',
                        title: 'SUPPRESSION REUSSIE !!!',
                        message: 'Utilisateur supprimé avec succés !!!'
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
            
            //fonction qui transforme le format de la date reçu pour un meilleur affichage
            dateFormat(date){                                                       
                const event = new Date(date);
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                return event.toLocaleDateString('fr-FR', options);
            },
        },
    }
</script>


<style lang="sass" scoped>
    h1 
        color: #51a4fe
        font-weight: bold
    #admin
        background-image: url('../assets/img5.jpg')
        background-size: 100%
        margin-top: 2vh
        padding-top: 13vh
        height: fit-content
        display: flex
        flex-direction: column
        ul
            display: flex
            flex-wrap: wrap
            justify-content: center
            margin: 2vh
            padding-top: 2vh
            background-color: #fffc
            li
                padding: 2vh
                margin: 1vh
                // background-color: #b8b8b81c
                h3,h4 
                    font-weight: bold
                    color: royalblue
                h4 
                    margin-top: 2vh
                strong 
                    color: royalblue
                p 
                    margin-top: 2vh
                button
                    width: 20%
                    magin: 0vh 0vh 2vh 2vh
                
</style>
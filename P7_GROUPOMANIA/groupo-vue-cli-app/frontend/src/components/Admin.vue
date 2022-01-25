<template>
    
    <main id='admin'>
        
        <!-- NOTIFICATION USER -->
            <Alert v-if="is_admin === 0"
                alertType="alert-danger" 
                alertMsg= 'Vous ne pouvez pas accéder à cette page !!!'
            />
        <!-- FIN NOTIFICATION USER -->
        
        <!-- NOTIFICATION ADMIN -->
            <Alert v-if="is_admin === 1"
                alertType="alert-success" 
                alertMsg= 'Bonjour Administrateur, bienvenue sur votre Dashboard'
            />
        <!-- FIN NOTIFICATION ADMIN -->
        
        
        <div class="container">
            
            <!-- LOGO GROUPOMANIA -->
                <div class="logo"></div>
            <!-- FIN LOGO GROUPOMANIA -->
            <div class="space"></div>
            <!-- RENDU CONDITIONNEL SSI ADMIN CONNECTED -->
                <div  v-if="is_admin === 1">
                    
                    <h1>ADMIN DASHBOARD</h1>
                    <ul >
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
                                    A réagi à {{user.nbre_de_reactions}} publication(s)<br>
                                    <!-- Boucle sur [reactions] -->
                                        <em v-for="(reaction, index) in reactions" :key="index">
                                            
                                            <!-- Condition affichage 1 => Affectation du nbre de reactions sur le user auteur si ce like ou dislike existe -->
                                                <p v-if="reaction.userID === user.userID && reaction.nbre_de_like !== null && reaction.nbre_de_like !== null ">
                                                    Dont {{reaction.nbre_de_like}} like(s)<br>
                                                    et {{reaction.nbre_de_dislike}} dislike(s)<br>
                                                </p>
                                            <!-- fin -->
                                            
                                            <!-- Condition affichage 2 => Affectation du nbre de reactions sur le user auteur si ce like ou dislike n'existe pas-->
                                                <p v-if="reaction.userID === user.userID && reaction.nbre_de_like === null && reaction.nbre_de_dislike === null">
                                                    Dont 0 like(s)<br>
                                                    et 0 dislike(s)<br>
                                                </p>
                                            <!-- fin -->
                                        </em>
                                    <!-- fin -->
                                </p>
                            </div>
                            
                            <button @click="deleteBanUser(user.userID)"
                                type="button" class="btn btn-outline-danger">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            <!-- FIN RENDU CONDITIONNEL SSI ADMIN CONNECTED -->
            
            <!-- RENDU SI ADMIN NON CONNECTED | SI SIMPLE USER -->
                <div v-else>
                    
                    <h1>
                        Accés réservé à l'administrateur !!!
                    </h1>
                </div>
            <!-- FIN RENDU CONDITIONNEL SSI ADMIN CONNECTED -->
        </div>
        
        
        <!-- ADMIN ACTIONS NOTIFS -->
            <FlashMessage></FlashMessage>
        <!-- NOTIFICATION USER -->
        
    </main>
    
</template>



<script>
    
    // import axios
    import axios from 'axios';
    
    // import Alert.vue pour notifications sur page AdminDashboard
    import Alert from '../components/Alert.vue';
    
    export default {
        
        components: {
            Alert
        },
        
        // Export vers views AdminDashboard
        name: 'Admin',
        props: {
            msg: String,
            Admin: String
        },
        
        data() {
            return {
                
                // Récupération statut administrateur pour rendu conditionnel
                is_admin: +localStorage.getItem("is_admin"),
                
                // Affichage infos et stats de tous les users (requête getUsersInfosAndStats() de Administrateurs.js)
                users: [],
                
                // Affichage du nbre de likes et de dislikes par user
                reactions: []
            }
        },
        
        mounted(){
            
            // Requête Affichage de tous les users avec leurs infos + stats
            axios.get('api/admin/infos')
            .then(response => {
            console.log(response.data);
            this.users = response.data.users;
            })
            .catch((error) => {
            console.log(error);
            });
            
            // Requête Affichage de tous les likes et dislikes de chaque user
            axios.get('api/admin/reactions')
            .then(response => {
            console.log(response.data);
            this.reactions = response.data.reactions;
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
                // Message d'avertissement avant destruction
                if(confirm('voulez vous vraiment bannir cet utilisateur du réseau GROUPOMANIA ?'))
                
                //Requêtes axios vers endpoint admin => '/:userID/delete'
                axios.delete(`api/admin/${userID}/delete`)
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
                        message: 'Une erreur est survenue ' + error.message
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
    
    #admin
        background-image: url('../assets/img5.jpg')
        background-size: 100%
        margin-top: 6vh
        padding-top: 12vh    // à baisser sur large écran
        min-height: 90vh    // hauteur minimum au cas ou pas de contenu pour que l'image apparaisse correctement
        display: flex
        flex-direction: column
        @media screen and (max-width: 768px) 
            margin: 0vh
        @media screen and (max-width: 991px) 
            padding-top: 6vh
        // @media screen and (max-width: 1040px) 
        //     min-height: 95vh
        //     padding-top: 16vh
        .container
            flex: 1
            padding-top: 4vh
            padding-bottom: 4vh
            height: fit-content
        h1 
            // color: #51a4fe
            color: white //#ff0000
            font-weight: bold
            background-color: #8785f761  //#8785f7 //black
            margin: auto
            border-radius: 3vh
            @media screen and (max-width: 576px)
                font-size: 2rem
        ul
            display: flex
            flex-wrap: wrap
            justify-content: center
            margin: 5vh 3vh 3vh 3vh
            padding: 2vh 0vh 0vh 0vh
            background-color: #fffc
            
            li
                padding: 2vh
                margin: 1vh
                h3,h4 
                    font-weight: bold
                    color: royalblue
                h4 
                    margin-top: 2vh
                    background-color: #357f7f21
                strong 
                    color: royalblue
                p 
                    margin-top: 2vh
                button
                    width: 20%
                    margin: 0vh 0vh 2vh 2vh
    .logo
        background-image: url('../assets/icon-left-font-monochrome-white.svg')
        background-repeat: no-repeat
        background-position: top
        background-color: #8785f761 //#8785f7   //black
        height: 8vh
        margin: auto
        border-radius: 2vh
        @media screen and (max-width: 508px) 
            display: none
        @media screen and (max-width: 1024px) 
            height: 15vh   
        @media screen and (min-width: 1024px) 
            height: 14vh 
    .space 
        height: 4vh        
</style>
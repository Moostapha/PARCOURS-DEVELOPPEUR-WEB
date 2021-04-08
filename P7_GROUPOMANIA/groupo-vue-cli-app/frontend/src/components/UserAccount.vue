<template>
    <main class = "useraccount">
        <div class="container" > 
        <div class="logo"></div>
            <div class="sm md lg xl">

                <h1 class="noConnexion" v-if ="!user">Accés impossible !!! Veuillez vous connecter</h1>

                <div v-if="user" class="card">
                    <div class="card-body">
                        <h2>PROFIL </h2>
                        <div class="d-flex flex-column align-items-center text-center">
                            <!-- :src="require(`@/assets/${user.image}`)"  :alt="user.name"-->
                            <img src="../assets/userAccount.jpg" alt="userPic" class="rounded-circle" width="150">
                            <div class="mt-3">

                                <h4> {{username}} </h4>
                                <p class="text-secondary mb-1">Membre du Social network Groupomania</p>
                                <!-- <small class="text-muted">{{username}} {{date_creation}} </small> -->
                                <!-- <p class="text-muted font-size-sm">Changer votre photo</p> -->
                                <p>userId est {{$route.params.userId}} </p>

                                <!-- Bouton déroulant les options de modification du compte Mettre type="button" pour éviter "form not connected" -->
                                <div>
                                    <button v-on:click="show" type="button" class="btn btn-primary"><i class="fas fa-pen"></i> 
                                        Modifier votre compte
                                    </button> 
                                </div>

                                <div class="space"></div>

                                    DIV NOTIF USER HERE
                                <div v-if="isDisplay">
                                    
                                    <!-- TELECHARGEMENT FICHIER IMAGE DU USER -->
                                    <form >
                                        <!-- RENDU DYNAMIQUE DE L'ETAT DE L'UPLOAD -->
                                        <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`" >
                                            <div class="message-body"> {{message}} </div>
                                        </div>
                                        <label for="formFileLg" class="form-label">
                                            Sélectionnez une image
                                        </label>
                                        <input class="form-control form-control-lg" id="formFileLg" type="file" enctype="multipart/form-data" method="put" />
                                        fonction sendImage to server
                                        <button @click="uploadFile" 
                                        class="btn btn-primary form-control-file" type = "button"><i class="fa fa-download"></i> 
                                            Télécharger
                                        </button>
                                    </form> 
                                    

                                    <div class="space"></div> 

                                    DIV NOTIF USER HERE
                                    <!-- MESSAGE ERREUR CHAMPS INVALIDES (EXPRESS-VALIDATOR) -->
                                    
                                    <div v-if="error" class="alert alert-danger" role= "alert">
                                        <strong>Erreur ! Vérifiez les informations saisies </strong> 
                                        <button 
                                            @click="closeNotification"
                                            type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <ul>
                                            <!-- <strong>{{errorValidator.param}}:</strong> -->
                                            <li v-for="(errorValidator, index) in error" :key="index">
                                                {{errorValidator.msg}}
                                            </li>
                                            
                                        </ul>
                                    </div>

                                    <!-- CHAMPS UPDATE USERNAME ET PASSWORD -->
                                    <ValidationObserver v-slot="{ handleSubmit}">
                                        
                                        <form @submit.prevent="handleSubmit(submit)">

                                            <!-- CHAMP UPDATE USERNAME -->
                                            <div class="form-group">
                                                <label for="InputUsername">Changer votre username</label>
                                                <!-- regex supp caractères spéciaux à rajouter dans rules pour protection injections  -->
                                                <validationProvider name="username" rules="required|alpha_num" v-slot="{ errors }">
                                                    <!-- 2 way binding grâce à v-model qui remplira data avec userinput -->
                                                    <input v-model="updatedUsername"
                                                        autocomplete="username"
                                                        type="text"  required="required" 
                                                        class="form-control" id="InputUsername" 
                                                        placeholder="Chiffres et lettres uniquement, max 10 caractères"
                                                    />
                                                    <span>{{ errors[0] }}</span>
                                                </validationProvider>
                                            </div>

                                            <!-- CHAMP UPDATE PASSWORD -->
                                            <div class="form-group">
                                                <label for="InputPassword">Changer votre mot de passe</label>
                                                <!-- regex supp caractères spéciaux à rajouter dans rules pour protection injections  -->
                                                <validationProvider name="password" rules="required|alpha_num" v-slot="{ errors }">
                                                    <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                                                    <input v-model="updatedPassword"
                                                        type="password" autocomplete="current-password" required="required" class="form-control" id="InputPassword" 
                                                        placeholder="Chiffres et lettres uniquement, max 10 caractères"
                                                    />
                                                    <span>{{ errors[0] }}</span>
                                                </validationProvider>
                                            </div>

                                            <!-- Bouton de validation Mettre type="button" pour éviter "form not connected" -->
                                            <div>
                                                <button @click="submitUpdated" type="button" class="btn btn-primary"><i class="fas fa-pen"></i> Modifier</button>
                                            </div>

                                            <div class="space"></div>
                                            NOTIF USER HERE

                                            <!-- BOUTON SUPPRESSION DE COMPTE mettre en dehors de validationObserver en dessous-->
                                            <!-- Bouton de validation Mettre type="button" pour éviter "form not connected" -->
                                            <div>
                                                <label for="deleteAccount">Vous voulez nous quitter?</label><br>
                                                <button @click="deleteAccount" type="button" class="btn btn-primary"><i class="fas fa-trash-alt"></i> 
                                                    Supprimer votre compte
                                                </button>
                                            </div>

                                        </form>
                                    </ValidationObserver>

                                    <div class="space"></div>

                                    <button v-on:click="hide" type="button" class="btn btn-primary">Cacher</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script>
    import axios from 'axios'
    
    export default {
    name: 'UserAccount',
    props: {
        msg: String,
    },
    
    data () {
        return {
            // infos user loggé
            user : "",
            username:"",
            userId: this.$route.params.userId,
            
            // infos des updates
            updatedUsername:"",
            updatedPassword:"",
            file:"",
            
            // Gestion message d'erreurs des champs de saisie miidleware express-validator
            error:"",
            // error: false,
            
            // état du bouton "modifier votre compte"
            isDisplay: false,
        }
    },
    
    created () {
        // route dynamique avec id du user loggé en paramètre
        axios.get('api/users/' + this.userId)
        .then(response => {
            console.log(response.data)
            this.user = response.data.user;
            const username = localStorage.getItem('username');
            console.log( 'Profil de:', username);
            this.username = username;
            this.userId = response.data.userId;
            // this.userId = this.$route.params.userId
        })
        .catch((error) => {
            console.log(error);
        })
        
    },
    
    methods: {
        // FONCTION DE CHARGEMENT DE FICHIER USER
        uploadFile() {
            
            // 1) Récupération des userInputs (données postées) pour les poster au backend
            const fileUploaded = new FormData();
            fileUploaded.append('file', this.file);
            
            // 2) Affichage de notre objet formData dans la console
            console.log(Array.from(fileUploaded));
            for(let obj of fileUploaded) {
                console.log(obj);
            }
            
            axios.put('api/users/updateuser/:userId', fileUploaded, {
                headers: {
                    // mettre header pour que le front configure les infos correctement pour le backend
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer '+ localStorage.getItem('token'),
                }
            })
            .then(response => {
                console.log(response.data);
                this.message = 'Fichier téléchargé';
                this.error = false;
                console.log('clicked');
            })
            .catch((error) => {
                console.log(error);
                this.message = 'Un erreur est survenue';
                this.error = true;
            })
            
            // reset champ file
            this.file ="";
        },
        
        
        // Fonction submitUpdated des updatedDatas
        submitUpdated() {
            // 1) Récupération des données à poster au backend
            const dataPosted = new FormData();
            dataPosted.append('newUsername', this.updatedUsername);
            dataPosted.append('newPassword', this.updatedPassword);
            
            // 2) Affichage de notre objet formData dans la console
            console.log(Array.from(dataPosted));
            for(let obj of dataPosted) {
                console.log(obj);
            }
            // image du user
            // avatar:`${req.protocol}://${req.get('host')}/image/${req.file.filename}`
            
            // 3) Requête axios post vers endpoint express.js
            axios.post('api/users/updateuser/:userId', dataPosted, {
                headers: {
                    // mettre header pour que le front configure les infos correctement pour le backend
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer '+ localStorage.getItem('token'),
                }
            })
            .then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                this.error = error.response.data.errors; 
                console.log(error);
            })
            
            // 4) reset inputs
            this.updatedUsername = "";
            this.updatedPassword= "";
        },
        
        
        // Fonction qui supprime le compte user
        deleteAccount() {
            // 2) Requête axios delete vers endpoint express.js
            axios.delete('api/users/deleteuser/:userId', {
                headers: {
                    // mettre header pour que le front configure les infos correctement pour le backend
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer '+ localStorage.getItem('token'),
                }
            })
            .then(response => {
                console.log(response.data);
                console.log('button cliked !!!');
            })
            .catch((error) => {
                console.log(error);
            })
            
            // 3) Redirection vers page signup
        },
        
        // Fonction Boutons déroulants
        show() {
            this.isDisplay = true
        },
        
        hide(){
            this.isDisplay = false
        },

        // fonction qui transforme le format de la date reçu pour un meilleur affichage
        dateFormat(date){                                                       
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        },
    },   
}
</script>


<style lang="sass" scoped>
.useraccount
    padding-top: 16vh
    padding-bottom: 3vh
    min-height: 97vh
    display: flex
    flex-direction: column
    background-image: url('../assets/myPics/useraccount.jpg')
    background-size: cover
    @media screen and (max-width: 1040px) 
        min-height: 95vh
    // background-color: #42b7b9
    .logo
        background-image: url('../assets/icon-left-font-monochrome-white.svg')
        background-repeat: no-repeat
        background-position: top
        height: 14vh
        margin-top: 3vh
        @media screen and (max-width: 508px) 
            display: none
        @media screen and (max-width: 768px) 
            height: 20vh
    .container
        flex: 1
        padding-top: 4vh
        padding-bottom: 4vh
        height: fit-content
        h1
            color: white
            font-weight: bold
        .noConnexion
            color: white
            @media screen and (max-width: 576px)
                font-size: 2rem
        h2
            font-weight: 800
            color: royalblue
        .card
            padding-top: 5vh
            box-shadow: 0px 15px 15px 0px 
            border-radius: 20px
            background-color: #ffffffd4
            label
                font-weight: bold
                color: royalblue
                // color: #42b7b9
            span
                color: red
            .space
                height: 3vh 
</style>
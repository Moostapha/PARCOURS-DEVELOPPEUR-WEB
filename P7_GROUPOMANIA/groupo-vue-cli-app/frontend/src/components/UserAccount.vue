<template>
    <main class = "useraccount">
        <div class="container" >
            <!-- NOTICATION USER DE CONNEXION ECHOUEE -->
                <Alert v-if="!user" 
                alertType="alert-danger" 
                alertMsg= 'Connexion echouée ! Veuillez vous connecter'
                /> 
            <!-- FIN -->
            <div class="logo"></div>
            <div class="sm md lg xl">
                <!-- RENDU CONDITIONNEL SI USER NON CONNECTE -->
                    <div v-if="!user">
                        <h1 class="noConnexion">
                            Accés impossible !!! Veuillez vous connecter
                        </h1>
                    </div>
                <!-- FIN -->
                <!-- RENDU SI USER CONNECTE: -->
                <div v-else>
                    <div class="card">
                        <div class="card-body">
                            <h2>
                                Profif de {{user.username}}
                            </h2>
                            <div class="d-flex flex-column align-items-center text-center">
                                <!-- :src="require(`@/assets/${user.image}`)"  :alt="user.name"-->
                                <img :src="user.avatar" alt="userPic" class="rounded-circle" width="150" ref="fileSelectedInput">

                                <input @change="handleFile"
                                    type="file"
                                    method="post" 
                                    style="display: none"
                                    ref="fileSelectedInput"
                                    class="btnPost form-control-file sm md lg xl btn btn-primary"
                                />
                                <button @click="$refs.fileSelectedInput.click()" class="sm md lg xl btn btn-primary">Choisir une image</button>

                                <div class="mt-3">
                                    <!-- <div class="col-md-3"> -->
                                    <!-- INFOS DU PROFIL -->
                                        <h4 >Infos de votre compte:</h4>
                                        <p class="text-secondary mb-1">
                                            Email: {{user.email}}
                                        </p>
                                        <p class="text-secondary mb-1">
                                            Date de création du compte: {{ dateFormat(user.date_creation) }}
                                        </p>
                                    <!-- FIN -->
                                    <!-- </div> -->
                                    <div class="space"></div>
                                    <!-- BOUTON DEROULANT les options de modification du compte Mettre type="button" pour éviter "form not connected" -->
                                        <div>
                                            <button  v-on:click="show = !show" 
                                                id='btnShow'
                                                type="button" class="btn btn-primary sm md lg xl">
                                                <i class="fas fa-pen"></i> 
                                                Modifier votre profil
                                            </button> 
                                        </div>
                                    <!-- FIN -->
                                    <div class="space"></div>
                                    
                                        <!-- DIV NOTIF USER HERE -->
                                    <!-- OPTIONS DE MODIFICATION DU COMPTE -->
                                    <div v-if="show">
                                        <!-- TELECHARGEMENT FICHIER IMAGE DU USER -->
                                            <form>
                                                <!-- RENDU DYNAMIQUE DE L'ETAT DE L'UPLOAD -->
                                                    <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`" >
                                                        <div class="message-body"> 
                                                            {{message}} 
                                                        </div>
                                                    </div>
                                                <!-- FIN -->
                                                
                                                <label for="formFileLg" class="form-label">
                                                    Sélectionner fichier
                                                </label><br>
                                                
                                                <!-- INPUT FILE UPLOAD ET BOUTON UPLOAD -->
                                                    <div id="uploadInputBtn">
                                                        
                                                        <input @change="handleFile"
                                                            type="file"  
                                                            method="post"
                                                            id="formFileLg"
                                                            class="form-control form-control-lg"
                                                        />
                                                        <!-- <button @click="$refs.inputFileSelected.click()" class="sm md lg xl btn btn-primary">
                                                            Choisir un fichier
                                                        </button> -->
                                                        
                                                        <button @click="uploadFile()"
                                                            method="post"
                                                            type = "button"
                                                            id="btnUpload"  
                                                            class="sm md lg xl btn btn-outline-success form-control-file primary" >
                                                            <i class="fa fa-download"></i>
                                                        </button>
                                                    </div>
                                                <!-- FIN -->
                                            </form>
                                            
                                        <!-- FIN -->
                                        
                                        <div class="space"></div> 
                                        
                                        <!-- MESSAGE ERREUR CHAMPS INVALIDES (EXPRESS-VALIDATOR) -->
                                            <AlertNotifValidator v-if="error"
                                                alertType= 'alert-danger'
                                                alertMsg= 'Erreur ! Vérifiez les informations saisies:'
                                                :error="error"
                                            />
                                        <!-- FIN -->
                                        
                                        <!-- CHAMPS UPDATE USERNAME ET PASSWORD -->
                                            <ValidationObserver v-slot="{ handleSubmit}">
                                                <form @submit.prevent="handleSubmit(submit)">
                                                    <!-- CHAMP UPDATE USERNAME -->
                                                        <div class="form-group">
                                                            <label for="InputUsername">Nouveau username</label>
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
                                                    <!-- FIN -->
                                                    
                                                    <!-- CHAMP OLD PASSWORD -->
                                                        <div class="form-group">
                                                            <label for="InputPassword">Ancien mot de passe</label>
                                                            <!-- regex supp caractères spéciaux à rajouter dans rules pour protection injections  -->
                                                            <validationProvider name="password" rules="required|alpha_num" v-slot="{ errors }">
                                                                <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                                                                <input v-model="password"
                                                                    type="password" autocomplete="current-password" required="required" class="form-control" id="InputOldPassword" 
                                                                    placeholder="Chiffres et lettres uniquement, max 10 caractères"
                                                                />
                                                                <span>{{ errors[0] }}</span>
                                                            </validationProvider>
                                                        </div>
                                                    <!-- FIN -->
                                                    
                                                    <!-- CHAMP UPDATED PASSWORD -->
                                                        <div class="form-group">
                                                            <label for="InputPassword">Nouveau mot de passe</label>
                                                            <!-- regex supp caractères spéciaux à rajouter dans rules pour protection injections  -->
                                                            <validationProvider name="password" rules="required|alpha_num" v-slot="{ errors }">
                                                                <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                                                                <input v-model="updatedPassword"
                                                                    type="password" autocomplete="current-password" required="required" class="form-control" id="InputNewPassword" 
                                                                    placeholder="Chiffres et lettres uniquement, max 10 caractères"
                                                                />
                                                                <span>{{ errors[0] }}</span>
                                                            </validationProvider>
                                                        </div>
                                                    <!-- FIN -->
                                                    
                                                    <!-- POSITION BOUTONS UPDATE ET DELETE -->
                                                        <div class='btnUpdateDelete'>
                                                            <!-- Bouton de validation Mettre type="button" pour éviter "form not connected" -->
                                                                <button @click="submitUpdated(user.userID)"
                                                                    id="btnModif" 
                                                                    type="button" class="sm md lg xl btn btn-outline-success">
                                                                    <i class="fas fa-pen"></i> 
                                                                </button>
                                                            <!-- FIN -->

                                                            <div class="space"></div>
                                                            <!-- BOUTON SUPPRESSION DE COMPTE mettre en dehors de validationObserver en dessous-->
                                                            <!-- Bouton de validation Mettre type="button" pour éviter "form not connected" -->
                                                                <button @click="deleteAccount(user.userID)" id="btnDelete" type="button" class="sm md lg xl btn btn-outline-danger">
                                                                    <i class="fas fa-trash-alt"></i> 
                                                                </button>
                                                            <!-- FIN -->
                                                        </div>
                                                    <!-- FIN -->
                                                </form>
                                            </ValidationObserver>
                                        <!-- FIN -->
                                        <div class="space"></div>
                                    </div>
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
    // Notifs user + champ de validation des formulaires
    import Alert from '../components/Alert.vue';
    import AlertNotifValidator from '../components/AlertNotifValidator.vue';
    
    export default {
        
        components: {
            Alert,
            AlertNotifValidator
        },
        
        name: 'UserAccount',
        props: {
            msg: String,
        },
        
        data () {
        return {
            
            // Etat de connection pour rendu conditionnel
            user: "",
            
            // Infos user logged récupération dans localStorage et conversion en int avec +
            userID: +localStorage.getItem("userID"),
            username: localStorage.getItem("username"), 
            // avatar:"",
            
            // infos des updates
            file: null, // avatar user
            updatedUsername:"",
            password:"",
            updatedPassword:"",
            
            // Gestion message d'erreurs des champs de saisie middleware express-validator
            error:"",
            
            message:"",
            
            // état du bouton "modifier votre compte"
            isDisplay: false,
            show: false
        }
    },
    
    created () {
        
        // route dynamique avec id du user loggé en paramètre
        axios.get('api/users/'+ this.userID)
        .then(response => {
            console.log(response.data)
            this.user = response.data.user;
        })
        .catch((error) => {
            console.log(error);
        })
    },
    
    
    methods: {
        
        handleFile(event){
            this.file= event.target.files[0];
            console.log(event);
        },
        
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
            
            // axios.get(`api/users/${userID}`)
            // axios.get(`api/users/${this.$route.params.id}`)
            axios.post('api/users/updateuser/:userId', fileUploaded, {
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
        submitUpdated(userID) {
            
            // 1) Récupération des données à poster au backend
            const dataPosted = new FormData();
            dataPosted.append('newUsername', this.updatedUsername);
            dataPosted.append('newPassword', this.updatedPassword);
            
            // 2) Affichage de notre objet formData dans la console
            console.log(Array.from(dataPosted));
            for(let obj of dataPosted) {
                console.log(obj);
            }
            
            // boite de dialogue pour confirmation
            if(confirm(this.username+', voulez vous modifier vos informations?'))
            // 3) Requête put axios vers endpoint express.js
            axios.put(`api/users/${userID}/update`, dataPosted)
            .then(response => {
                console.log(response.data);
                // notification de réussite avec FlashMessage
                this.flashMessage.show({
                    status: 'success',
                    icon: '../assets/success.png',
                    title: 'PUBLICATION REUSSIE !!!',
                    message: 'Votre post a été publié avec succés'
                })
            })
            .catch((error) => {
                console.log(error);
                this.error = error.response.data.errors;
                // notif erreur avec flashmessage
                this.flashMessage.show({
                    status: 'error',
                    icon: 'success',
                    title: 'ERREUR !!!',
                    message: 'Une erreur est survenue'
                })
            })
            
            // 4) reset inputs
            this.updatedUsername = "";
            this.updatedPassword= "";
        },
        
        
        // Fonction qui supprime le compte user
        deleteAccount(userID) {
            if(confirm(this.username+', voulez vous vraiment supprimer votre compte?'))
                axios.delete(`api/users/${userID}/delete,`)
                .then(response => {
                    console.log(response.data);
                    console.log('button cliked !!!');
                    // redirection vers page signup
                    this.$router.push('/groupomania/signup');
                    // notification de réussite avec FlashMessage
                    this.flashMessage.show({
                        status: 'success',
                        icon: '../assets/success.png',
                        title: 'SUPPRESSION DU COMPTE REUSSIE !!!',
                        message: 'Votre compte a été supprimé avec succés'
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
            
            // 3) Redirection vers page signup
            // this.$router.push('/groupomania/signup');
        },
        
        
        // hide(){
        //     this.isDisplay = false
        // },
        
        // fonction qui transforme le format de la date reçu pour un meilleur affichage
        dateFormat(date){                                                       
            const event = new Date(date);
            // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        },
    },   
}
</script>


<style lang="sass" scoped>
.useraccount
    // background-color: #42b7b9
    padding-top: 16vh
    padding-bottom: 3vh
    min-height: 97vh
    display: flex
    flex-direction: column
    background-image: url('../assets/useraccount.jpg')
    background-size: cover
    @media screen and (max-width: 991px) 
        padding-top: 6vh
    @media screen and (max-width: 1040px) 
        min-height: 95vh
        padding-top: 10vh
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
            margin-top: 1vh
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
                display: block
                float: left
            span
                color: red
            .space
                height: 3vh 
                width: 2vh
            ul
                margin-top: 1rem
                margin-bottom: 1rem
                list-style: none
                padding: 0
            #btnShow
                width: 30vh
            #formFileLg
                margin-right: 1vh
                
            #uploadInputBtn
                display: inline-flex
                justify-content: space-between
                align-items: center
                // #btnUpload
                //     height: 7vh
                //     width: 8vh
            .btnUpdateDelete
                display: flex
            #btnUpload, #btnModif, #btnDelete,
                width: fit-content
                // display: block
                padding: 0.5vh
                height: 7vh
                width: 10vh
</style>


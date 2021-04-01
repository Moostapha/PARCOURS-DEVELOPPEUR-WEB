<template>
    <div class="signup">
        <div class="container">
            
            <!-- MESSAGES NOTIFICATION -->
            
            <!-- MESSAGE ECHEC -->
            <div v-if="error" class="alert alert-danger" role="alert">
                <strong>Echec de l'inscription !</strong> Une erreur est survenue, veuillez réessayer.
                <button 
                    @click="closeNotification"
                    type="button" 
                    class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <ul>
                    <li v-for="(element, index) in error" :key="index"> 
                        {{element.msg}}
                    </li>
                    
                </ul>
            </div>
            


            <!-- ALERT SUCCES -->
            <!-- <div v-else  class="alert alert-success" role="alert">
                <strong>Inscription réussie  !</strong> Bienvenue dans votre social network 
                <button 
                    
                    type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    
                </button>
            </div> -->
            
            
            
            <!-- MESSAGE INFO -->
            <!-- <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Champs requis !</strong> Veuillez remplir les informations ci-dessous.
                <button 
                    type="button" 
                    class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> -->


            <h1>SOCIAL NETWORK</h1>
            <h2>{{ msg }}</h2>


            <!-- Formulaire avec 3 champs : username | email | password -->
            <ValidationObserver v-slot="{ handleSubmit}">
                
                <form @submit.prevent="handleSubmit(submit)">  <!-- Ajout de l'eventlistener(fonction submit ligne 60) avec .prevent pour empêcher comportement par défaut -->
                <i class="far fa-user"></i>
                    <div class="form-group">
                        <label for="InputUsername">Username</label>
                        <!-- Validation de champ avec vee-validate-->
                        <validationProvider name="Username" rules="required|alpha_num|max_value:10" v-slot="{ errors }">
                            <!-- 2 way binding avec v-model qui remplira data (objet signup ligne 55) avec input -->
                            <input v-model="username"  
                                type="text" autocomplete="current-password"  class="form-control" id="InputUsername" 
                                aria-describedby="emailHelp" placeholder="Nom ou pseudo" method="post"
                            />
                            <span>{{ errors[0] }}</span>
                        </validationProvider>
                    </div>

                    <div class="form-group">
                        <label for="InputEmail">Adresse Email</label>
                        <!-- Validation de champ avec vee-validate-->
                        <validationProvider name="email" rules="email|required|alpha_num|max_value:10" v-slot="{ errors }">
                            <!-- 2 way binding avec v-model qui remplira data (objet signup ligne 55) avec input -->
                            <input v-model="email" 
                                type="email" required="required" class="form-control" id="InputEmail" 
                                aria-describedby="emailHelp" placeholder="email@adresse.com" method="post"
                            />
                            <span>{{ errors[0] }}</span>
                        </validationProvider>
                    </div>

                    <div class="form-group">
                        <label for="InputPassword">Mot de passe</label>
                        <!-- Validation de champ avec vee-validate-->
                        <validationProvider name="password" rules="required|alpha_num|max_value:10" v-slot="{ errors }">
                            <!-- 2 way binding avec v-model qui remplira data (objet signup ligne 55) avec input -->
                            <input v-model="password" 
                                type="password" autocomplete="current-password" required="required" class="form-control" id="InputPassword" 
                                aria-describedby="emailHelp" placeholder="Chiffres et lettres uniquement, max 10 caractères" method="post"
                            />
                            <span>{{ errors[0] }}</span>
                        </validationProvider>
                    </div>

                    <!-- Bouton de soumission du formulaire Mettre type="button" pour éviter "form not connected" -->
                    <div>
                        <button v-on:click="submit" 
                            type="button" class="btn btn-primary">Inscription
                        </button>
                    </div>
                </form>
                
            </ValidationObserver>
        </div>
    </div>
</template>


<script>

    // Librairie pour les API calls
    import axios from 'axios'

    // export de ce component vers la view Inscription
    export default {
        name: "Signup",
        props: { msg: String, },

        data () {
            return {
                // inputs formulaire
                username: "",
                email: "",   
                password: "",
                
                // gestion des erreurs de saisie du formulaire + apparition notif user
                error: "",
            }
        },

        methods: {
        
        // fonction eventListener submit sur le click => promise avec appel qui nécessite une attente (await)
            submit() {
                const dataPosted = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                
                console.log(dataPosted);
                // pour requete post, axios prend 3 arguments => axios.post('URL endpoint', data, axiosConfig ou headers)
                // adresse url refactoré avec axiosConfig.js
                axios.post('api/users/signup', dataPosted) // Ma route n'est pas reconnue => erreur 404 !!!
                .then(response => {
                    console.log(response);
                    // redirection vers route login
                    this.$router.push('/groupomania/login');
                })
                .catch((error) => {
                    console.log(error);
                    this.error = error.response.data.errors;
                    const errorArray = new Array(error.response.data);
                    console.log('Premier élément errorArray:',errorArray[0].errors[0].msg) //Champs Username requis
                })
            },
            
        // Fonction close alert
            closeNotification(){
                document.getElementsByClassName('alert')[0].style.display='none';
            }
        },
    }
</script>


<style lang="sass" scoped>
.signup
    // height: 125vh
    height: fit-content
    padding-top: 15vh
    background-image: url('../assets/icon-left-font-monochrome-white.svg') 
    background-repeat: no-repeat
    background-position: center
    background-position-y: 2vh
    background-color: #42b7b9
    padding-bottom: 15vh
    .container
        padding-top: 13vh
        background-image: url('../assets/myPics/social9.jpg')
        // background-repeat: no-repeat
    .fa-user
        // color: #42b7b9
        font-size: 11vh
        margin: 2vh
        color: royalblue
    h1, h2
        font-size: 2em
        color: white
        font-weight: 800
    ul
        margin-top: 1rem
        margin-bottom: 1rem
        list-style: none
        padding: 0
    form
        max-width: 100vh
        padding: 15px 30px 30px 30px
        margin: auto
        background-color: white
        box-shadow: 0px 15px 15px 0px 
        border-radius: 20px
        span 
            color: red
        label
            // color: #42b7b9
            font-weight: bold
            color: royalblue
            font-size: x-large
    .btn btn-primary
        opacity: 0.6
        transition: 0.3s
        &:hover
            opacity: 1
</style>

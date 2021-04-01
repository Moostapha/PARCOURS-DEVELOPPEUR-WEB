<template>
    <div class="login">
        <div class="container">
            
            <!-- MESSAGES USER -->

            <!-- ALERT SUCCES -->
            <!-- <div v-if="user" class="alert alert-success" role="alert">
                <strong>Connexion réussie  !</strong> Bienvenue dans votre social network 
                <button 
                    type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> -->
            
            <!-- MESSAGE ECHEC -->
            <!-- <div class="alert alert-danger" role="alert">
                <strong>Echec de la connexion !</strong> Une erreur est survenue.
                <button 
                    type="button" 
                    class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> -->
            
            <transition></transition>
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
            
            
            <h1>SOCIAL NETWORK</h1>
            <h2>{{ msg }}</h2>
            
            <ValidationObserver v-slot="{ handleSubmit}">

                <form @submit.prevent="handleSubmit(submit)" class="sm md lg xl"> <!-- Ajout de l'eventlistener (fonction submit ligne) avec .prevent-->
                    <i class="far fa-user"></i>
                    <!-- CHAMP EMAIL -->
                    <div class="form-group">
                        <label for="InputEmail">Adresse Email</label>
                        <!-- regex email à rajouter dans rules pour protection injections  -->
                        <validationProvider 
                            name="email" 
                            rules="email|required" 
                            v-slot="{ errors }">  
                            <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                            <input 
                                v-model="email"
                                type="email" autocomplete="current-email" required="required" class="form-control " 
                                id="InputEmail" aria-describedby="emailHelp" placeholder="email@adresse.com"
                            />
                            <span>{{ errors[0] }}</span>
                        </validationProvider>
                    </div>

                    <!-- CHAMP PASSWORD -->
                    <div class="form-group">
                        <label for="InputPassword">Mot de passe</label>
                        <!-- regex supp caractères spéciaux à rajouter dans rules pour protection injections  -->
                        <validationProvider 
                            name="password" 
                            rules="required|alpha_num" 
                            v-slot="{ errors }"
                        >
                            <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                            <input 
                                v-model="password"
                                type="password" autocomplete="current-password" required="required" class="form-control" id="InputPassword" 
                                placeholder="Chiffres et lettres uniquement, max 10 caractères"
                            />
                            <span>{{ errors[0] }}</span>
                        </validationProvider>
                    </div>

                    <!-- BOUTON CONNEXION  Mettre type="button" pour éviter "form not connected" -->
                    <div>
                        <button @click="submit" 
                            type="button" class="btn btn-primary">
                            Connexion
                        </button>
                    </div>
                </form>

            </ValidationObserver>
        </div>
    </div>
</template>


<script>

    // Librairie pour requetes vers (POST) et venant (GET) de l'API
    import axios from'axios'

    // export de ce component Login vers le component /view/Connexion
    export default {
        name: 'Login',
        props: {msg: String,},

        data () {
            return {
                // Inputs form login
                email:"",
                password:"",
                
                // Gestion des erreurs inputs forms par express-validator + apparition notif user
                error:"",
            }
        },
        

        methods: {
            
            // Fonction de soumission du formulaire
            submit() {
                
                // récupération des valeurs d'inputs (email | password)
                const dataPosted = {
                    email: this.email,
                    password: this.password,
                    
                }
                
                // pour requete post, axios prend 3 arguments => axios.post('URL endpoint', data, axiosConfig ou headers)
                // Nous postons ces datas vers le endpoint pertinent
                axios.post('api/users/login', dataPosted)
                .then(response => {
                    
                    //on vérifie les éléments de la réponse
                    console.log(response.data);
                    
                    // On récupere et on enregistre le token donné par la fonction login du backend (ctler/user.js)
                    localStorage.setItem('token', response.data.USER_AUTH_TOKEN);
                    
                    // récupération du userId côté client
                    localStorage.setItem('userId', response.data.userId);
                    
                    // récupération du username côté client
                    localStorage.setItem('username', response.data.username);
                    
                    // redirection vers route fil d'actualité
                    this.$router.push('/groupomania/publications');
                    
                    //
                    alert('Connexion réussie !!!!')
                    
                })
                .catch((error) => {
                    // récupération de la réponse du middleware validator.js validation des champs de saisie des formulaires
                    // this.error linked a error dans data et à v-if error dans render template
                    this.error = error.response.data.errors; //.errors at the end à cause du format réponse dans middleware express-validator
                })
            },
            
            // Fonction close alert
            closeNotification(){
                document.getElementsByClassName('alert')[0].style.display='none';
            }
            
        }
    }
</script>


<style lang="sass" scoped>

.login
    // height: 120vh 
    height: fit-content
    padding-top: 15vh
    background-image: url('../assets/icon-left-font-monochrome-white.svg')
    // background-image: url('../assets/myPics/social10.jpg')
    background-repeat: no-repeat
    background-position: center
    background-position-y: 2vh 
    background-color: #42b7b9
    padding-bottom: 15vh
    .container
        padding-top: 13vh
        background-image: url('../assets/myPics/social1.jpg')
        
    .fa-user
        font-weight: 1
        font-size: 11vh
        margin: 2vh
        // color: #42b7b9
        color: royalblue
    h1,h2
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
        label
            // color: #42b7b9
            font-weight: bold
            color: royalblue
            font-size: x-large
        span 
            color: red
</style>
<template>
    <div class="signup">
        <div class="container">

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
                username: "",
                email: "",   
                password: "", 
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
                axios.post('api/user/signup', dataPosted) // Ma route n'est pas reconnue => erreur 404 !!!
                .then(response => {
                    console.log(response);
                    // redirection vers route login
                    this.$router.push('/www.groupomania.fr/login');
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        },
    }
</script>


<style lang="sass" scoped>
.signup
    height: 110vh
    padding-top: 5vh
    background-image: url('../assets/icon-left-font-monochrome-white.svg') 
    background-repeat: no-repeat
    background-position: center
    background-position-y: 2vh
    background-color: #42b7b9
    .container
        padding-top: 13vh
    .fa-user
        
        font-size: 10vh
        margin: 2vh
    h1, h2
        font-size: 1.5em
        color: white
    form
        // position: relative
        max-width: 100vh
        padding: 15px 30px 30px 30px
        margin: auto
        background-color: white
        span 
            color: red
        label
            color: #42b7b9
            font-weight: bold
    .btn btn-primary
        opacity: 0.6
        transition: 0.3s
        &:hover
            opacity: 1
</style>

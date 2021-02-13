<template>
    <div class="login">
        <div class="container">
            
            <h1>SOCIAL NETWORK</h1>
            <h2>{{ msg }}</h2>
            
            <ValidationObserver v-slot="{ handleSubmit}">
                
                <form @submit.prevent="handleSubmit(submit)" class="sm md lg xl"> <!-- Ajout de l'eventlistener (fonction submit ligne) avec .prevent-->
                <i class="far fa-user"></i>
                    <!-- CHAMP EMAIL -->
                    <div class="form-group">
                        <label for="InputEmail">Adresse Email</label>
                        <!-- regex email à rajouter dans rules pour protection injections  -->
                        <validationProvider name="email" rules="email|required" v-slot="{ errors }">  
                            <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                            <input v-model="email"
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
                        <validationProvider name="password" rules="required|alpha_num" v-slot="{ errors }">
                            <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                            <input v-model="password"
                                type="password" autocomplete="current-password" required="required" class="form-control" id="InputPassword" 
                                placeholder="Chiffres et lettres uniquement, max 10 caractères"
                            />
                            <span>{{ errors[0] }}</span>
                        </validationProvider>
                    </div>

                    <!-- BOUTON CONNEXION  Mettre type="button" pour éviter "form not connected" -->
                    <div>
                        <button v-on:click="submit" 
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
                email:"",
                password:"",
            }
        },
        
        methods: {
            
            submit() {
                // récupération des valeurs d'inputs (email | password)
                const dataPosted = {
                    email: this.email,
                    password: this.password
                }
                
                // pour requete post, axios prend 3 arguments => axios.post('URL endpoint', data, axiosConfig ou headers)
                // Nous postons ces datas vers le endpoint pertinent
                axios.post('api/users/login', dataPosted)
                .then(response => {
                    
                    //on vérifie les éléments de la réponse
                    console.log(response);
                    
                    // On récupere et on enregistre le token donné par la fonction login du backend (ctler/user.js)
                    localStorage.setItem('token', response.data.AUTH_TOKEN);
                    
                    // récupération du userId côté client
                    localStorage.setItem('userId', response.data.userId);
                    console.log(response.data.userId);
                    
                    // récupération du username côté client
                    localStorage.setItem('username', response.data.username);
                    console.log(response.data.username);
                    
                    // redirection vers route fil d'actualité
                    this.$router.push('/groupomania/publications');
                    
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>


<style lang="sass" scoped>
.login
    height: 100vh 
    padding-top: 5vh
    background-image: url('../assets/icon-left-font-monochrome-white.svg')
    background-repeat: no-repeat
    background-position: center
    background-position-y: 2vh 
    background-color: #42b7b9
    .container
        padding-top: 13vh
    .fa-user
        font-weight: 1
        font-size: 10vh
        margin: 2vh
        color: #42b7b9
    h1,h2
        font-size: 1.5em
        color: white
    form
        max-width: 100vh 
        padding: 15px 30px 30px 30px
        margin: auto
        background-color: white
        label
            color: #42b7b9
            font-weight: bold
        span 
            color: red
// Interdiction caracteres spéciaux regex [^;|]+
</style>
























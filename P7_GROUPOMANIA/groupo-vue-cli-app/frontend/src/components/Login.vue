<template>
    <div class="login">
        <div class="container">

            <h1>SOCIAL NETWORK GROUPOMANIA</h1>
            <h2>{{ msg }}</h2>
            
            <ValidationObserver v-slot="{ handleSubmit}">
                <!-- <div class="container sm md lg xl"> -->
                <form @submit.prevent="handleSubmit(submit)" class="sm md lg xl"> <!-- Ajout de l'eventlistener (fonction submit ligne) avec .prevent-->

                    <!-- CHAMP EMAIL -->
                    <div class="form-group">
                        <label for="InputEmail">Adresse Email</label>
                        <!-- regex email à rajouter dans rules pour protection injections  -->
                        <validationProvider name="email" rules="email|required" v-slot="{ errors }">  
                            <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                            <input v-model="email"
                                type="email" required="required" class="form-control " id="InputEmail" aria-describedby="emailHelp" placeholder="email@adresse.com"
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
                                type="current-password" required="required" class="form-control" id="InputPassword" 
                                placeholder="Chiffres et lettres uniquement, max 10 caractères"
                            />
                            <span>{{ errors[0] }}</span>
                        </validationProvider>
                    </div>

                    <!-- BOUTON CONNEXION -->
                    <div>
                        <!-- Mettre type="button" pour éviter "form not connected" -->
                        <button v-on:click="submit" type="button" class="btn btn-primary">
                            Connexion
                        </button>
                    </div>
                </form>
                <!-- </div> -->
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
            
            const dataPosted = {
                email: this.email,
                password: this.password
            }
            
            // pour requete post, axios prend 3 arguments => axios.post('URL endpoint', data, axiosConfig ou headers)
            axios.post('api/user/login', dataPosted)
            .then(response => {
                //on vérifie les éléments de la réponse
                console.log(response);
                
                // On récupere et on enregistre le token donné par la fonction login du backend (ctler/user.js)
                localStorage.setItem('token', response.data.AUTH_TOKEN);
                
                // redirection vers route fil d'actualité
                this.$router.push('/www.groupomania.fr/posts');
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
    background-position-y: 60% // changement pour ne pas casser le form en responsive 768px breakpoint
    background-color: #42b7b9

h1,h2
    font-size: 1.5em
    color: white

form
    max-width: 100vh // changement pour ne pas casser le form en responsive 768px breakpoint
    padding: 15px 30px 30px 30px
    margin: auto
    background-color: white
    span 
        color: red

// Interdiction caracteres spéciaux regex [^;|]+
</style>





















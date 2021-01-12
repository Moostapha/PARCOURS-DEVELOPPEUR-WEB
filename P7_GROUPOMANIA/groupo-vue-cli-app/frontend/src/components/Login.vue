<template>
    <div class="login">
    <h1>SOCIAL NETWORK GROUPOMANIA</h1>
    <h2>{{ msg }}</h2>

    <form @submit.prevent="submit"> <!-- Ajout de l'eventlistener (fonction submit ligne) avec .prevent-->

        

        <div class="form-group">
            <label for="InputEmail">Adresse Email</label>
            <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
            <input v-model="email"
                type="email" required="required" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="email@adresse.com"
            />
        </div>

        <div class="form-group">
            <label for="InputPassword">Mot de passe</label>
            <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
            <input v-model="password"
                type="current-password" required="required" class="form-control" id="InputPassword" placeholder="Chiffres et lettres uniquement, max 10 caractères"
            />
        </div>

        <div>
            <!-- Mettre type="button" pour éviter "form not connected" -->
            <button v-on:click="submit" type="button" class="btn btn-primary">Connexion</button>
        </div>
    </form>
    </div>
</template>




<script>
    // Librairie pour requetes vers API
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

                // Gestion des erreurs CORS => Post venant du frontend bloqué sinon
                const axiosCors = {
                    headers: {
                    'content-type': 'application/json'
                    }
                }

                const dataPosted = {
                    email: this.email,
                    password: this.password
                }

                // pour requete post, axios prend 3 arguments => axios.post('URL endpoint', data, axiosConfig ou headers)
                axios.post('api/user/login',dataPosted, axiosCors)
                .then(response => {
                    console.log(response);
                    //this.login = response.data.user;
                     // redirection vers route accueil
                    //this.$router.push('/accueil');
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
    background-image: url('../assets/groupomania-monochrome-white-zeke.png')
    background-repeat: no-repeat
    background-position: center
    background-position-y: 85%
    background-color: #42b7b9

h1,h2
    font-size: 1.5em
    color: white

form
    
    width: 100vh
    padding: 15px 30px 30px 30px
    margin: auto
    background-color: white
</style>


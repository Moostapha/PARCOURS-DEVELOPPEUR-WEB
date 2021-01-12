<template>
<div class="signup">
    <h1>SOCIAL NETWORK GROUPOMANIA</h1>
    <h1>{{ msg }}</h1>

    <!-- Formulaire avec 3 champs : username | email | password -->

    <form @submit.prevent="submit">  <!-- Ajout de l'eventlistener(fonction submit ligne 60) avec .prevent pour empêcher comportement par défaut -->
        
        <div class="form-group">
            <label for="InputUsername">Username</label>
            <!-- 2 way binding avec v-model qui remplira data (objet signup ligne 55) avec input -->
            <input v-model="username"  
            type="text" required="required" class="form-control" id="InputUsername" aria-describedby="emailHelp" placeholder="Nom ou pseudo" method="post"/>
        </div>

        <div class="form-group">
            <label for="InputEmail">Adresse Email</label>
            <!-- 2 way binding avec v-model qui remplira data (objet signup ligne 55) avec input -->
            <input v-model="email" 
            type="email" required="required" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="email@adresse.com" method="post"/>
        </div>

        <div class="form-group">
            <label for="InputPassword">Mot de passe</label>
            <!-- 2 way binding avec v-model qui remplira data (objet signup ligne 55) avec input -->
            <input v-model="password" 
            type="current-password" required="required" class="form-control" id="InputPassword" placeholder="Chiffres et lettres uniquement, max 10 caractères" method="post"/>
        </div>
        
        <!-- Bouton de soumission du formulaire -->
        <div>
            <!-- Mettre type="button" pour éviter "form not connected" -->
            <button v-on:click="submit" type="button" class="btn btn-primary">Inscription</button>
        </div>
        
    </form>
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

                // Gestion des erreurs CORS => Post venant du frontend bloqué sinon
                const axiosCors = {
                    headers: {
                     // origine du soucis des endpoints qui ne marchait pas => config header de axios doit etre json et adresse du endpoint qui doit etre /user/signup
                    'content-type': 'application/json'
                    }
                }
            
                
                const dataPosted = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                
                console.log(dataPosted);
                // pour requete post, axios prend 3 arguments => axios.post('URL endpoint', data, axiosConfig ou headers)
                // adresse url refactoré avec axiosConfig.js
                axios.post('api/user/signup', dataPosted, axiosCors ) // Ma route n'est pas reconnue => erreur 404 !!!
                .then(response => {
                    console.log(response);
                    // redirection vers route login
                    this.$router.push('/login');
                })
                .catch((error) => {
                    console.log(error);
                })
                    
            }
        },
        mounted(){

        }
    }
</script>

<style lang="sass" scoped>
.signup
    height: 100vh
    padding-top: 5vh
    background-image: url('../assets/groupomania-monochrome-white-zeke.png') // prendre en compte le responsive => display none
    background-repeat: no-repeat
    background-position: center
    background-position-y: 85%
    background-color: #42b7b9
    
h1
    font-size: 1.5em
    color: white


form
    // position: relative
    width: 100vh
    padding: 15px 30px 30px 30px
    margin: auto
    background-color: white
    
.btn btn-primary
    opacity: 0.6
    transition: 0.3s
    &:hover
        opacity: 1

/** // $phone: 640px, 
// $tablet: 768px, 
// $desktop: 1024px !default



//@media screen and (max-width: taillepx) 


// @media screen and (">phone", "<tablet") {
// }

// @include media(">tablet", "<950px") {
// } **/

/** // mounted () {
        
//     axios retourne une promise
//     requete vers le API endpoint /signup de notre router user  post les données entrées dans les formulaires
//     axios.post('http://localhost:3000/api/signup') 
//     .then(response => {
//         console.log(response);
//         this.User = response.data.user;
//     })
//     .catch((error) => {
//         console.log(error);

//     })
// },

// Researchs1
// SignIn = () => {
//     console.log('login clicked')
//     let data = JSON.stringify({
//         password: this.state.password,
//         username: this.state.email
//     })

//     axios.post('url', data, {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }
//     )
// }

//research2
// axios({ 
//method: 'POST', 
// url: 'you http api here', 
// headers: {autorization: localStorage.token}, 
// data: { user: 'name' }
// }) **/
</style>























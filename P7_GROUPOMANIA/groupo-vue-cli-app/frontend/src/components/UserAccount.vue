<template>
    <main class = "useraccount">
        <div class="container">
            <div class="sm md lg xl">
                <div class="card">
                    <div class="card-body">
                        <h1>PROFIL </h1>
                        <div class="d-flex flex-column align-items-center text-center">
                            
                            <img src="../assets/userAccount.jpg" alt="Admin" class="rounded-circle" width="150">
                            <div class="mt-3">
                                <h4>John Doe</h4>
                                <p class="text-secondary mb-1">Membre du Social network</p>
                                <p class="text-muted font-size-sm">Changer votre photo</p>
                                
                                


                                <!-- Bouton déroulant les options de modification du compte -->
                                <!-- Mettre type="button" pour éviter "form not connected" -->
                                <div>
                                    <button v-on:click="show" type="button" class="btn btn-primary">Modifier votre compte</button> 
                                </div>
                                    
                                
                                <div class="space"></div>
                                  

                                <div v-if="isDisplay">
                                    <!-- <form > -->
                                        <button class="btn btn-primary form-control-file">Télécharger une image</button>
                                    <!-- </form> -->

                                    <div class="space"></div>   
                                    <!-- validation provider ici -->
                                    <!-- CHAMP UPDATE EMAIL -->
                                    <form @submit.prevent="submit">

                                        <!-- CHAMP UPDATE USERNAME -->
                                        <div class="form-group">
                                            <label for="InputPassword">Nouveau username</label>
                                            <!-- regex supp caractères spéciaux à rajouter dans rules pour protection injections  -->
                                            <validationProvider name="username" rules="required|alpha_num" v-slot="{ errors }">
                                                <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                                                <input v-model="updatedUsername"
                                                    type="current-password" required="required" class="form-control" id="InputPassword" 
                                                    placeholder="Chiffres et lettres uniquement, max 10 caractères"
                                                />
                                                <span>{{ errors[0] }}</span>
                                            </validationProvider>
                                        </div>
                                        

                                        <!-- CHAMP UPDATE PASSWORD -->
                                        <div class="form-group">
                                            <label for="InputPassword">Nouveau mot de passe</label>
                                            <!-- regex supp caractères spéciaux à rajouter dans rules pour protection injections  -->
                                            <validationProvider name="password" rules="required|alpha_num" v-slot="{ errors }">
                                                <!-- 2 way binding grâce à v-model qui remplira data (objet signup ligne 49) avec input -->
                                                <input v-model="updatedPassword"
                                                    type="current-password" required="required" class="form-control" id="InputPassword" 
                                                    placeholder="Chiffres et lettres uniquement, max 10 caractères"
                                                />
                                                <span>{{ errors[0] }}</span>
                                            </validationProvider>
                                        </div>

                                        <div class="space"></div>

                                        <!-- Bouton de validation Mettre type="button" pour éviter "form not connected" -->
                                        <div>
                                            <button v-on:click="submit" type="button" class="btn btn-primary">Changer de mot de passe</button>
                                        </div>

                                        <div class="space"></div>

                                        <!-- Bouton de validation Mettre type="button" pour éviter "form not connected" -->
                                        <div>
                                            <button v-on:click="submit" type="button" class="btn btn-primary">Supprimer votre compte</button>
                                        </div>
                                        
                                        
                                        
                                    </form>
                                    <!-- endtag validationProvider -->
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
    props: {msg: String},

    data (){
        return {
            
            updatedUsername:"",
            updatedPassword:"",
            isDisplay: false,
        }
    },
    
    methods: {

        // 1) Fonction eventlistener du btn "modifier votre compte" dont la fonction est show
        show() {
            this.isDisplay = true
        },
        
        hide(){
            this.isDisplay = false
        },

            
        submit() {
            const dataPosted = {
                updatedUsername: this.username,
                updatedPassword: this.password
            }
            
            axios.post('/api/user', dataPosted)
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            });

        },

    },   
}
</script>


<style lang="sass" scoped>
.useraccount
    display: flex
    flex-direction: column
    min-height: 100vh
    background-color: #42b7b9
    .container
        flex: 1
        padding: 22vh 15vh 0vh 15vh 
        background-image: url('../assets/icon-left-font-monochrome-white.svg')
        background-repeat: no-repeat
        background-position: center
        background-position-y: 2vh
        background-color: #42b7b9
        .card
            padding-top: 5vh
            span
                color: red
    
.space
    height: 3vh 
</style>
            



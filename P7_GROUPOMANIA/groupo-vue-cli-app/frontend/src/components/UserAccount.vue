<template>
    <div class = "useraccount">
        <div class="container">
            
            
            <div class="sm md lg xl">
                
                <div class="card">
                    <div class="card-body">
                        <h1>PROFIL </h1>
                        <div class="d-flex flex-column align-items-center text-center">
                            
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                            <div class="mt-3">
                                <h4>John Doe</h4>
                                <p class="text-secondary mb-1">Membre du Social network</p>
                                <p class="text-muted font-size-sm">Changer votre photo</p>

                                <form >
                                    <button class="btn btn-primary form-control-file">Choisir un fichier</button>
                                </form>

                                <div class="space"></div>   
                                <!-- validation provider ici -->
                                <!-- CHAMP UPDATE EMAIL -->
                                <form @submit.prevent="submit">
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

                                    <!-- Bouton de validation -->
                                    <div>
                                        <!-- Mettre type="button" pour éviter "form not connected" -->
                                        <button v-on:click="submit" type="button" class="btn btn-primary">Changer de mot de passe</button>
                                    </div>
                                    <div class="space"></div>

                                    <!-- Bouton de validation -->
                                    <div>
                                        <!-- Mettre type="button" pour éviter "form not connected" -->
                                        <button v-on:click="submit" type="button" class="btn btn-primary">Supprimer votre compte</button>
                                    </div>
                                </form>
                                <!-- endtag validationProvider -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    import axios from 'axios'

    export default {
    name: 'UserAccount',
    props: {msg: String},

    data (){
        return {
            //currentPassword:"",
            updatedPassword:"",
        }
    },
    methods: {
        submit() {
            const axiosCors ={
                headers: {
                    'content-type': 'application/json'
                }
            }
            const dataPosted = {
                //currentPassword: this.password
                updatedPassword: this.password
            }
            
            axios.post('/api/post', dataPosted, axiosCors)
            .then()
            .catch();

        }
    }
}
</script>

<style lang="sass" scoped>
.useraccount
    height: 100vh
    padding: 15vh 
    background-image: url('../assets/icon-left-font-monochrome-white.svg')
    background-repeat: no-repeat
    background-position: center
    background-position-y: 2vh
    background-color: #42b7b9
    h1
        color:
.space
    height: 3vh 
</style>
    

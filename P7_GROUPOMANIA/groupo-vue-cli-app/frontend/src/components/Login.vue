<template>
    <div class="login">
    <h1>SOCIAL NETWORK GROUPOMANIA</h1>
    <h1>{{ msg }}</h1>
    <form>
        <div class="form-group">
            <label for="InputEmail">Adresse Email</label>
            <input
                type="email"
                class="form-control"
                id="InputEmail"
                aria-describedby="emailHelp"
            />
        </div>
        <div class="form-group">
            <label for="InputPassword">Mot de passe</label>
            <input
                type="current-password"
                class="form-control"
                id="InputPassword"
            />
        </div>
        <div>
            <button type="submit" class="btn btn-primary">Connexion</button>
        </div>
    </form>
    </div>
</template>




<script>
    // export de ce component Login vers le component /view/Connexion
    export default {
        name: 'Login',
        props: {
        msg: String,
    }
}
</script>


<style lang="sass" scoped>
    .login
        height: 100vh
        margin-top: 5vh
        background-image: url('../assets/icon-above-font.png')
        background-repeat: no-repeat
        background-position: center


    h1
        font-size: 1.5em
        
    
    form
        //position: relative
        width: 500px
        padding: 15px 30px 30px 30px
        margin: auto
        
    
    
</style>
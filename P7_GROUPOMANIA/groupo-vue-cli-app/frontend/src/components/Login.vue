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
            <button type="submit" class="btn btn-primary">Inscription</button>
            <small>Vous possédez déjà un compte?  <a href="">cliquez ici pour vous connecter à votre compte</a></small>
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
    form
        width: 500px
        padding: 0px 30px 30px 30px
        
    
    
</style>
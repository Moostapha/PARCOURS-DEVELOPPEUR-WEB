<template>
<div class="signup">
    
    <h1>SOCIAL NETWORK GROUPOMANIA</h1>
    <h1>{{ msg }}</h1>
    <form>
        <div class="form-group">
            <label for="InputEmail1">Adresse Email</label>
            <input
                type="email"
                class="form-control"
                id="InputEmail1"
                aria-describedby="emailHelp"
            />
        </div>
        <div class="form-group">
            <label for="InputPassword1">Mot de passe</label>
            <input
                type="current-password"
                class="form-control"
                id="InputPassword1"
            />
        </div>
        <button type="submit" class="btn btn-primary">Inscription</button>
        
    </form>
</div>
</template>



<script>
    // export de ce component vers la view Inscription
    export default {
        name: "Signup",
        props: {
            msg: String,
        }
    };
</script>



<style lang="sass" scoped>
.signup
    height: 100vh
    margin-top: 5vh
    background-image: url('../assets/icon-groupomania.png')
    background-repeat: no-repeat
    background-position: center
    background-position-y: 75%
    
h1
    font-size: 1.5em
    
form
    //position: relative
    width: 100vh
    padding: 15px 30px 30px 30px
    margin: auto
</style>






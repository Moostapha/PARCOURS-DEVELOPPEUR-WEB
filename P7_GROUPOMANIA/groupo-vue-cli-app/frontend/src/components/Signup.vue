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
        <small>Déja inscrit?  <a href="">cliquez ici pour vous identifier</a></small>
    </form>
</div>
</template>


<script>
export default {
    // export de ce component vers la view Inscription
    name: "Signup",
    props: {
        msg: String,
    }
};
</script>


<style lang="sass" scoped>
    form
        width: 100px
</style>

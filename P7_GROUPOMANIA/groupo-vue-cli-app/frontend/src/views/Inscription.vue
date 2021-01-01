<template>
    <div class="inscriptionSignup">
    <Signup msg="Bienvenue !!! Veuillez créer votre compte en remplissant ce formulaire"/>
    </div>
</template>


<script>

    // Importation du component Signup
    import Signup from '../components/Signup'

    // export vers index.js + template du haut
    export default {
        name: 'Inscription',
        components: {
            Signup
        }
    }

</script>



<style>
    
</style>
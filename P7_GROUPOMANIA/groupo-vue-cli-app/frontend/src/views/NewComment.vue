<template>
    <div class="createComment">
        <CreateComment msg='Donner votre avis sur ce post'/>
    </div>
</template>


<script>
    // Importation du component 
    import CreateComment from '../components/CreateComment';
    // import AlertNotifValidator from '../components/AlertNotifValidator.vue';
    // export vers index.js + template du haut
    export default {
        name: 'NewComment',
        components: { CreateComment,},
    }
</script>
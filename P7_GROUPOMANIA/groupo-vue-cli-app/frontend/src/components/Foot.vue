<template>
    <footer>
        <!-- cette classe rend responsive via bootstrap -->
        <div class="container">
            <a href=""><i class="fab fa-linkedin-in">Linkedin</i></a>
            <a href=""><i class="fab fa-twitter">Twitter</i></a>
            <a href=""><i class="fab fa-facebook">Facebook</i></a>
            <a href=""><i class="fab fa-instagram-square">Instagram</i></a>
            <a href=""><i class="fas fa-envelope">contact@gmail.com</i></a>
            <!-- <a href=""><i class="fas fa-at">groupomania@gmail.com</i></a> -->
        </div>
    </footer>
</template>


<script>
export default {
    name: 'Foot'
}
</script>


<style lang="sass" scoped>
    footer
        display: flex
        justify-content: space-between
        .fab,.fas
            font-size: xx-large
            font-weight: 400
            margin: 2vh 
            padding: 2vh
            color: black
            transition: 1000ms
            text-decoration: none
            &:hover
                // color: #42b7b9
                color: royalblue
        
</style>
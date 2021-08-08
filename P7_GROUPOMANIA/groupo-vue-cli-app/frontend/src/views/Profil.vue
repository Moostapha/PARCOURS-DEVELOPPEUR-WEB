<template>
    <div>
        <UserAccount/>
    </div>
</template>

<script>
import UserAccount from '../components/UserAccount'
export default {
    name: 'Profil',
    components: {UserAccount},
    props: ['userID']
}
</script>

<style>

</style>

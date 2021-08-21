COMPONENT ALERT => NOTIFS USER CONNECTE, MESSAGES DE CREATION
SUPPRESSION POSTS COMMENTS

<template>
<div class ="alert" v-bind:class="alertType" role="alert">
    <strong> {{ alertMsg }} </strong>
    <button 
        @click="closeNotifConnexion"
        type="button" 
        class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
</template>


<script>
export default {
    name: 'Alert',
    
    props: {
        alertType: String,
        alertMsg: String
    },
    methods: {
        closeNotifConnexion(){  
        console.log('clicked');
        document.getElementsByClassName('alert')[0].style.display='none';
        },

        // alertFade(){
        //     const Closed =document.getElementsByClassName('alert')[0];
        //     setTimeout(
        //         () => {
        //             Closed.style.display = 'none'
        //         }, 4000
        //     )
        // }
        
        
    }
}
</script>










<template>
  
    <div id="app">
      <Nav/>
      <router-view />
      <Foot/>
    </div>
  
</template>

<script>
  //:user="user"
  // Client http axios
  // import axios from "axios";
  import Nav from './components/Nav'
  import Foot from './components/Foot'
  export default {
    name:'App',
    components: {
      Nav,
      Foot
    },
    
    // data() {
    //   return {
    //   user: "", 
    //   username: "", 
    //   userId: "",
    //   }
    // },
    
    // created() {
    //   axios.get('api/users/:userId')
    //   .then(response => {
    //     console.log(response.data);
    //     this.user = response.data.user;
    //     const username = localStorage.getItem("username");
    //     const userId = localStorage.getItem('userId');
    //     this.username = username;
    //     this.userId = userId;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   }) 
    // }
  }
</script>

<style lang="sass">
  #app 
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    // height: fit-content
</style>
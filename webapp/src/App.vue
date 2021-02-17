<template>
  <div id="app">
    <p>First Name: {{firstName}}</p>
    <p>Last Name: {{lastName}}</p>
    <Login></Login>
    <Calendar></Calendar>
  </div>
</template>



<script>
import Login from "./components/Login.vue"

export default {
  name: "App",
  components: {
    Login,
  },
    data: function(){
        return {
            firstName: '',
            lastName: ''
        }
    },
    created: async function(){
        const gResponse = await fetch("http://localhost:5000/api/user/profile");
        const gObject = await gResponse.json();
        this.firstName = gObject.firstname;
        this.lastName = gObject.lastname;
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

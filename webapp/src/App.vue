<template>
  <div id="app">
    <!-- client side greeting -->
    <p>{{greeting}}</p>
    <!-- server side greeting (api) -->
    <p>{{flaskGreeting}}</p>
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
            greeting: 'Hello, Vue!',
            flaskGreeting: ''
        }
    },
    created: async function(){
        const gResponse = await fetch("http://localhost:5000/api/greeting");
        const gObject = await gResponse.json();
        this.flaskGreeting = gObject.greeting;
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

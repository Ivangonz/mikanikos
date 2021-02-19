<template>
  <div id="admin">
    <div class="text-right top_div">
      <router-link 
       class="btn btn-default btn-primary"
       tag=button 
       :to="{ name: 'usereditcreate', params: { id: 0 }}">
       Create User</router-link>
        
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Roles</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in this.$store.state.admin.users" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.roles | roleNames }}</td>

          <td>
            <router-link :to="{ name: 'usereditcreate', params: { id: user.id }}">edit</router-link>
          </td>

          <td><a href="#" @click="deleteUser(user.id)">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {};
  },
  mounted: function() {
    this.$store.dispatch("getUsers");
    this.$store.dispatch("getRoles");
  },
  methods: {
    deleteUser(id) {
      let user ={
        id: id
      }
      this.$store.dispatch("deleteUser", user);
    }

  },
  filters: {
  roleNames: function (value) {
    let mymap = value.map((obj)=>{
        return obj.name;
    })
    mymap = mymap.join();
    return mymap;
  }
}
};
</script>

<style scoped>
.top_div {
  margin-top: 10px;
}
</style>

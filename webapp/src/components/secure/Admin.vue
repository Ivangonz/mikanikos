<template>
  <div id="admin">
    <ul class="nav nav-tabs">
        <router-link
        to="/admin/users"
        tag="li"
        active-class="active"
        
        ><a>Users</a></router-link>
        <router-link
        to="/admin/roles"
        tag="li"
        active-class="active"
        ><a>Roles</a></router-link>
    </ul>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
    };
  },
  mounted: function() {

  },
  methods: {},
};
</script>

<style scoped>

</style>

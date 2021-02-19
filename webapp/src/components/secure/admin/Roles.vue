<template>
  <div id="roles">
    <div class="text-right top_div">
      <router-link
        class="btn btn-default btn-primary"
        tag="button"
        :to="{ name: 'roleeditcreate', params: { id: 0 } }"
      >
        Create Role</router-link
      >
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Role Name</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in this.$store.state.admin.roles" :key="role.id">
          <td>{{ role.name }}</td>
          <td>
            <router-link
              :to="{ name: 'roleeditcreate', params: { id: role.id } }"
              >edit</router-link
            >
          </td>

          <td><a href="#" @click="deleteRole(role.id)">delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {};
  },
  mounted: function() {
    this.$store.dispatch("getRoles");
  },
  methods: {
    deleteRole(id) {
      let role = {
        id: id,
      };
      this.$store.dispatch("deleteRole", role);
    },
  },
};
</script>

<style scoped>
.top_div {
  margin-top: 10px;
}
</style>

<template>
  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-3 col-centered"></div>
    <div class="col-sm-7 col-md-6 col-lg-5 col-centered">
      <h2>User profile {{ this.$store.state.auth.firstName }}</h2>
      <form
        action=""
        method="POST"
        class="form"
        role="form"
        v-on:submit.prevent="update"
      >
        <div class="form-group  ">
          <label for="first_name" class="control-label">First name</label>
          <input
            v-model="input.firstname"
            class="form-control"
            id="first_name"
            name="first_name"
            required
            tabindex="10"
            type="text"
            value="Admin"
          />
        </div>
        <div class="form-group  ">
          <label for="last_name" class="control-label">Last name</label>
          <input
            v-model="input.lastname"
            class="form-control"
            id="last_name"
            name="last_name"
            required
            tabindex="20"
            type="text"
            value="Example"
          />
        </div>
        <input
          type="submit"
          name="submit"
          class="btn btn-default btn-primary"
          value="Update"
          tabindex="30"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      input: {
        firstname: this.$store.state.auth.firstName,
        lastname: this.$store.state.auth.lastName,
      },
      msg: "",
    };
  },
  methods: {
    update() {
      this.$store.dispatch("updateProfile", this.input);
    },
  }
};
</script>

<style scoped>
form {
  margin: auto;
}

h4 {
  color: red;
}
</style>

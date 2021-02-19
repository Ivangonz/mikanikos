<template>
  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-3 col-centered"></div>
    <div class="col-sm-7 col-md-6 col-lg-5 col-centered">
      <h2>User {{operationType}} </h2>
      <form
        action=""
        method="POST"
        class="form"
        role="form"
        v-on:submit.prevent="updateCreate"
      >
        <div class="form-group  ">
          <label for="first_name" class="control-label">First name</label>
          <input
            v-model="user.firstname"
            class="form-control"
            id="first_name"
            name="first_name"
            required
            tabindex="10"
            type="text"
          />
        </div>
        <div class="form-group  ">
          <label for="last_name" class="control-label">Last name</label>
          <input
            v-model="user.lastname"
            class="form-control"
            id="last_name"
            name="last_name"
            required
            tabindex="20"
            type="text"
          />
        </div>
        <div class="form-group  ">
          <label for="username" class="control-label">Username</label>
          <input
            v-model="user.username"
            class="form-control"
            id="username"
            name="username"
            required
            tabindex="20"
            type="text"
          />
        </div>
        <div class="form-group  ">
          <label for="email" class="control-label">Email</label>
          <input
            v-model="user.email"
            class="form-control"
            id="email"
            name="email"
            required
            tabindex="20"
            type="text"
          />
        </div>
        <div class="form-group  ">
          <label for="password" class="control-label">Password</label>
          <input
            v-model="user.password"
            class="form-control"
            id="password"
            name="password"
            tabindex="20"
            type="text"
          />
        </div>
        <div class="form-group  ">
          <!-- easter egg: click here for creating user quickly -->
          <label for="password" class="control-label" @click="debug">Roles</label>
          <select v-model="userRolesArray" multiple class="form-control">
            <option v-for="role in this.$store.state.admin.roles" :key="role.id">{{role.name}}</option>
          </select>
        </div>
        <input
          type="submit"
          name="submit"
          class="btn btn-default btn-primary"
          :value="operationType"
          tabindex="30"
        />
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: "UserEditCreate",
  data() {
    return {
      msg: "",
      user: {},
      submitPressed: false,
      userRolesArray: [],  // (the user's SELECTED roles NOT all the roles)
      operationType: ""  // Update or Create
    };
  },
  methods: {
    debug() {
      this.user = {
        firstname:'Susan',
        lastname: 'Matt',
        username: 'smatt',
        email: 'smatt@weber.edu',
        password: 'ssss',
        roles: []
      }
    },
    updateCreate() {
      this.submitPressed = true;
      this.user.role = []
      this.user.roles = this.$store.state.admin.roles.filter((role)=>{
        if ( this.userRolesArray.includes(role.name) ){
          return role;
        }
      })

      if(this.operationType == "Update"){
        this.$store.dispatch("updateUser", this.user);
      }else{
        this.$store.dispatch("createUser", this.user);
      }
      
    },
  },
  mounted: function() {
    if (this.$route.params.id != 0){
      this.operationType = 'Update'
      //loads the user that was passed in by the id (for update -- create doesn't run this)
      let userArray = this.$store.state.admin.users.filter((e) => {
        if (e.id == this.$route.params.id) {
          return e;
        }
      });
      this.user = userArray[0];

      //loads userRolesArray (the user's SELECTED roles NOT all the roles)
      this.userRolesArray = this.user.roles.map((role)=>{
          return role.name
      })
    } else {
      this.operationType = "Create"
      this.user = {
        firstname:'',
        lastname: '',
        username: '',
        email: '',
        password: '',
        roles: []
      }
    }

  },
  beforeRouteLeave(to, from, next) {
    if (this.submitPressed == false) {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
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

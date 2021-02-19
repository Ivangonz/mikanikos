<template>
  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-3 col-centered"></div>
    <div class="col-sm-7 col-md-6 col-lg-5 col-centered">
      <h2>Role {{operationType}} </h2>
      <form
        action=""
        method="POST"
        class="form"
        role="form"
        v-on:submit.prevent="updateCreate"
      >
        <div class="form-group  ">
          <label for="first_name" class="control-label">Role name</label>
          <input
            v-model="role.name"
            class="form-control"
            id="first_name"
            name="first_name"
            required
            tabindex="10"
            type="text"
            
          />
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
      role: {},
      submitPressed: false,
      operationType: ""  // Update or Create
    };
  },
  methods: {
    updateCreate() {
      this.submitPressed = true;
      if(this.operationType == "Update"){
        this.$store.dispatch("updateRole", this.role);
      }else{
        this.$store.dispatch("createRole", this.role);
      }
      
    },
  },
  mounted: function() {
    if (this.$route.params.id != 0){
      this.operationType = 'Update'
      //loads the role that was passed in by the id 
      let roleArray = this.$store.state.admin.roles.filter((e) => {
        if (e.id == this.$route.params.id) {
          return e;
        }
      });
      this.role = roleArray[0];
    } else {
      this.operationType = "Create"
      this.role = {
        name:''
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
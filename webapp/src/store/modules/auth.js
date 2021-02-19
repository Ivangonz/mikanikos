import Vue from 'vue'

const state = {
  token: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  roles: []

}

const mutations = {
  SET_TOKEN: function (state, tokenString) {
    state.token = tokenString
  },
  SET_ACCOUNT: function (state, resp) {
    state.username = resp.username;
    state.email = resp.email;
    state.firstName = resp.firstname;
    state.lastName = resp.lastname;
    //converting array of objects into array of role names
    state.roles = resp.roles.map((obj)=>{return obj.name})
  }

}

const actions = {
  login: (context, loginInfo) => {
    let headerObj = {
      headers: {
        "Content-Type": "text/plain",
        Authorization:
          "Basic " + btoa(loginInfo.username + ":" + loginInfo.password),
      },
    };
    Vue.http
      .get("api/token", headerObj)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.token) {
            context.dispatch("setToken", data.token);
          }
        }
      })
      .catch((err) => {
        if (err.body.error == "Unauthorized access") {
          let payload = {
            status: err,
            alertMsg: 'Unable to log in. Either the username or the password was incorrect. Please try again.'
          }
          context.commit('SET_ALERT',payload);
        } else {
          let payload = {
            status: err,
            alertMsg: 'Something went wrong'
          }
          context.commit('SET_ALERT',payload);
        }
      });
  },


  setToken: ({ commit }, tokenStr) => {
    commit('SET_TOKEN', tokenStr)
  },
  loadAccountData: ({ commit }) => {
    let headerObj = {
      headers: {
        "Content-Type": "text/plain",
        Authorization:
          "Basic " + btoa(state.token + ":" + "whatever"),
      },
    };
    // here we use vue-resource. below we use standard fetch
    // (IMO standard fetch is better)
    Vue.http
      .get("api/account", headerObj)
      .then((response) => response.json())
      .then((resp) => {
        if (resp) {
          commit('SET_ACCOUNT', resp)
        }
      })
      .catch((err) => {
        alert("In auth.js error thrown: " + err)
      });
  },
  updateProfile: ({ commit }, userObj) => {
      let url = Vue.prototype.$hostname + '/api/profile';
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(state.token + ":" + "whatever")
        },
        body: JSON.stringify(userObj),
      })
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          commit('SET_ACCOUNT',resp);
          resp.foo = "success";
          if(resp.error){
            let payload = {
              status: resp.error,
              alertMsg: 'Darn.  Something went wrong!'
            }
            commit('SET_ALERT',payload);
          }else{
            let payload = {
              status: 'success',
              alertMsg: 'Profile updated!',
              newRouteRequest: 'home'
            }
            commit('SET_ALERT',payload);
          }
          
        })
        .catch((err) => {
          alert("Error: " + err.message);
          let payload = {
            status: err,
            alertMsg: 'Something went wrong'
          }
          commit('SET_ALERT',payload);
        });
  },
}

const getters = {
  token: state => {
    return state.token
  },
  authenticated: state => {
    if (state.token == "") {
      return false;
    } else {
      return true;
    }
  }
}

export default {
  mutations, state, getters, actions
}

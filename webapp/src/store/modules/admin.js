import Vue from 'vue'

const state = {
  users: [],
  roles: []
}

const mutations = {
  SET_USERS: function (state, resp) {
    state.users = resp
  },
  SET_ROLES: function (state, resp) {
    state.roles = resp
  }

}

const actions = {
  getUsers: (context) => {
    let url = Vue.prototype.$hostname + '/api/admin/users';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(context.rootState.auth.token + ":" + "whatever")
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.error) {
          let payload = {
            status: resp.error,
            alertMsg: 'Darn.  Something went wrong while getting users!'
          }
          context.commit('SET_ALERT', payload);
        } else {
          context.commit('SET_USERS', resp);
        }

      })
      .catch((err) => {
        alert("Error: " + err.message);
        let payload = {
          status: err,
          alertMsg: 'Something went wrong while getting users'
        }
        context.commit('SET_ALERT', payload);
      });
  },
  //the below is just like the above only using vue resource instead of fetch
  // getUsers: (context) => {
  //     let headerObj = {
  //         headers: {
  //             "Content-Type": "text/plain",
  //             Authorization:
  //                 "Basic " + btoa(context.rootState.auth.token + ":" + "whatever"),
  //         },
  //     };
  //     Vue.http
  //         .get("api/admin/users", headerObj)
  //         .then((response) => response.json())
  //         .then((resp) => {
  //             if (resp) {
  //                 context.commit('SET_USERS', resp)
  //             }
  //         })
  //         .catch((err) => {
  //             alert("In admin.js error thrown: " + err)
  //         });
  // }
  getRoles: (context) => {
    let url = Vue.prototype.$hostname + '/api/admin/roles';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(context.rootState.auth.token + ":" + "whatever")
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.error) {
          let payload = {
            status: resp.error,
            alertMsg: 'Darn.  Something went wrong while getting roles!'
          }
          context.commit('SET_ALERT', payload);
        } else {
          context.commit('SET_ROLES', resp);
        }

      })
      .catch((err) => {
        alert("Error: " + err.message);
        let payload = {
          status: err,
          alertMsg: 'Something went wrong while getting roles'
        }
        context.commit('SET_ALERT', payload);
      });
  },
  updateUser: ({ commit, rootState }, userObj) => {
    let url = Vue.prototype.$hostname + '/api/admin/user/' + userObj.id;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(rootState.auth.token + ":" + "whatever")
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        // commit('SET_ACCOUNT',resp);
        resp.foo = "success";
        if (resp.error) {
          let payload = {
            status: resp.error,
            alertMsg: 'Darn.  Something went wrong updating a user!'
          }
          commit('SET_ALERT', payload);
        } else {
          let payload = {
            status: 'success',
            alertMsg: 'User updated!',
            newRouteRequest: 'admin'
          }
          commit('SET_ALERT', payload);
        }

      })
      .catch((err) => {
        alert("Error: " + err.message);
        let payload = {
          status: err,
          alertMsg: 'Something went wrong'
        }
        commit('SET_ALERT', payload);
      });
  }
  ,
  createUser: ({ commit, rootState }, userObj) => {
    let url = Vue.prototype.$hostname + '/api/admin/user';
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(rootState.auth.token + ":" + "whatever")
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.error) {
          let payload = {
            status: resp.error,
            alertMsg: 'Darn.  Something went wrong creating a user!'
          }
          commit('SET_ALERT', payload);
        } else {
          let payload = {
            status: 'success',
            alertMsg: 'User created!',
            newRouteRequest: 'admin'
          }
          commit('SET_ALERT', payload);
        }

      })
      .catch((err) => {
        alert("Error: " + err.message);
        let payload = {
          status: err,
          alertMsg: 'Something went wrong'
        }
        commit('SET_ALERT', payload);
      });
  },
  deleteUser: ({ commit, rootState }, userObj) => {
    let url = Vue.prototype.$hostname + '/api/admin/user/' + userObj.id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(rootState.auth.token + ":" + "whatever")
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.error) {
          let payload = {
            status: resp.error,
            alertMsg: 'Darn.  Something went wrong deleting a user!'
          }
          commit('SET_ALERT', payload);
        } else {

          let payload = {
            status: 'success',
            alertMsg: 'User deleted!',
          }
          commit('SET_ALERT', payload);
          // sync vuex state with db:
          let userArray = rootState.admin.users.filter((e) => {
            if (e.id != userObj.id) {
              return e;
            }
          });
          rootState.admin.users = userArray;
        }

      })
      .catch((err) => {
        alert("Error: " + err.message);
        let payload = {
          status: err,
          alertMsg: 'Something went wrong'
        }
        commit('SET_ALERT', payload);
      });
  },
  // ROLES ACTIONS -------------------------------------------------------------
  updateRole: ({ commit, rootState }, roleObj) => {
    let url = Vue.prototype.$hostname + '/api/admin/role/' + roleObj.id;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(rootState.auth.token + ":" + "whatever")
      },
      body: JSON.stringify(roleObj),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.error) {
          let payload = {
            status: resp.error,
            alertMsg: 'Darn.  Something went wrong updating a role!'
          }
          commit('SET_ALERT', payload);
        } else {
          let payload = {
            status: 'success',
            alertMsg: 'Role updated!',
            newRouteRequest: 'roles'
          }
          commit('SET_ALERT', payload);
        }

      })
      .catch((err) => {
        alert("Error: " + err.message);
        let payload = {
          status: err,
          alertMsg: 'Something went wrong'
        }
        commit('SET_ALERT', payload);
      });
  }
  ,
  createRole: ({ commit, rootState }, roleObj) => {
    let url = Vue.prototype.$hostname + '/api/admin/role';
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(rootState.auth.token + ":" + "whatever")
      },
      body: JSON.stringify(roleObj),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.error) {
          let payload = {
            status: resp.error,
            alertMsg: 'Darn.  Something went wrong creating a role!'
          }
          commit('SET_ALERT', payload);
        } else {
          let payload = {
            status: 'success',
            alertMsg: 'Role created!',
            newRouteRequest: 'roles'
          }
          commit('SET_ALERT', payload);
        }

      })
      .catch((err) => {
        alert("Error: " + err.message);
        let payload = {
          status: err,
          alertMsg: 'Something went wrong'
        }
        commit('SET_ALERT', payload);
      });
  },
  deleteRole: ({ commit, rootState }, roleObj) => {
    let url = Vue.prototype.$hostname + '/api/admin/role/' + roleObj.id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(rootState.auth.token + ":" + "whatever")
      },
      body: JSON.stringify(roleObj),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.error) {
          let payload = {
            status: resp.error,
            alertMsg: 'Darn.  Something went wrong deleting a role!'
          }
          commit('SET_ALERT', payload);
        } else {

          let payload = {
            status: 'success',
            alertMsg: 'Role deleted!',
          }
          commit('SET_ALERT', payload);
          // sync vuex state with db:
          let roleArray = rootState.admin.roles.filter((e) => {
            if (e.id != roleObj.id) {
              return e;
            }
          });
          rootState.admin.roles = roleArray;
        }

      })
      .catch((err) => {
        alert("Error: " + err.message);
        let payload = {
          status: err,
          alertMsg: 'Something went wrong'
        }
        commit('SET_ALERT', payload);
      });
  }
}

const getters = {

}

export default {
  mutations, state, getters, actions
}

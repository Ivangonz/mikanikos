import Vue from 'vue';
import Vuex from 'vuex';


import auth from './modules/auth.js'
import general from './modules/general.js'
import admin from './modules/admin.js'

Vue.use(Vuex);

export const store = new Vuex.Store({

  modules: {
    auth,
    general,
    admin
  }
})


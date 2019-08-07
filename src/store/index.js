import Vue from "vue";
import Vuex from "vuex";
import { SET_SHOPPING_LIST, SET_STORE_ID } from "./mutation-types";
export * from "./mutation-types";

Vue.use(Vuex);

const STORAGE_KEY = "groceryWise";
const prevState = window.localStorage.getItem(STORAGE_KEY);

const store = new Vuex.Store({
  state: prevState
    ? JSON.parse(prevState)
    : {
        shoppingList: [],
        storeIds: {
          countdown: "",
          newworld: "",
          paknsave: ""
        }
      },
  mutations: {
    [SET_SHOPPING_LIST]: (state, shoppingList) => {
      state.shoppingList = shoppingList;
    },
    [SET_STORE_ID](state, { key, value }) {
      state.storeIds[key] = value;
    }
  }
});

// Persist the state in local storage
store.subscribe((mutation, state) =>
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
);

export default store;

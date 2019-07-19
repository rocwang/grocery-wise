import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shoppingList: [],
    storeIds: {
      countdown: "",
      newworld: "",
      paknsave: ""
    }
  },
  mutations: {
    setShoppingList(state, shoppingList) {
      state.shoppingList = shoppingList;
    },
    setStoreId(state, { key, value }) {
      state.storeIds[key] = value;
    }
  },
  actions: {}
});

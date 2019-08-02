import Vue from "vue";
import Vuex from "vuex";
import { debounce } from "lodash-es";
import { SET_SHOPPING_LIST, SET_STORE_ID } from "./mutation-types";
export * from "./mutation-types";

Vue.use(Vuex);

const STORAGE_KEY = "groceryWise";
const prevState = window.localStorage.getItem(STORAGE_KEY);

function persistState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default new Vuex.Store({
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
    [SET_SHOPPING_LIST]: debounce(
      (state, shoppingList) => {
        state.shoppingList = shoppingList;

        persistState(state);
      },
      500,
      { trailing: true }
    ),
    [SET_STORE_ID](state, { key, value }) {
      state.storeIds[key] = value;

      persistState(state);
    }
  }
});

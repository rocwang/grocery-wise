<template>
  <div id="app" :class="$style.root">
    <UpdateNotification />
    <ShoppingList
      :class="$style.shoppingList"
      :isLoading="isLoading"
      :initShoppingList="shoppingList"
      @input="setShoppingList"
    />
    <Comparison
      :class="$style.comparison"
      :shoppingList="shoppingList"
      :storeIds="storeIds"
    >
      <StoreRow :storeIds="storeIds" @input="setStoreId" />
    </Comparison>
  </div>
</template>

<script>
import StoreRow from "./components/StoreRow";
import ShoppingList from "./components/ShoppingList";
import Comparison from "./components/Comparison";
import UpdateNotification from "./components/UpdateNotification";
import { mapState, mapMutations } from "vuex";
import { SET_SHOPPING_LIST, SET_STORE_ID } from "./store";

export default {
  name: "app",
  components: { ShoppingList, Comparison, StoreRow, UpdateNotification },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapState(["shoppingList", "storeIds"])
  },
  methods: {
    ...mapMutations({
      setShoppingList: SET_SHOPPING_LIST,
      setStoreId: SET_STORE_ID
    })
  }
};
</script>

<style module>
.root {
  display: grid;
  grid-template:
    "shoppingList" auto
    "comparison" auto
    / 1fr;
  grid-gap: 20px;
  justify-items: stretch;
  align-items: stretch;
}

@media (min-width: 1200px) {
  .root {
    grid-template:
      "shoppingList comparison" auto
      / 300px 1fr;
  }
}

.shoppingList {
  grid-area: shoppingList;
  height: 50vh;
}

@media (min-width: 1200px) {
  .shoppingList {
    position: sticky;
    top: 0;
    height: 100vh;
  }
}

.comparison {
  grid-area: comparison;
  align-self: start;
}
</style>

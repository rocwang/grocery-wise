<template>
  <div id="app" :class="$style.root">
    <ShoppingList
      @compare="setShoppingList"
      :class="$style.shoppingList"
      :isLoading="isLoading"
    />
    <StoreTable :class="$style.storeTable" />
    <Comparison :class="$style.comparison" :shoppingList="shoppingList" />
  </div>
</template>

<script>
import StoreTable from "./components/StoreTable";
import ShoppingList from "./components/ShoppingList";
import Comparison from "./components/Comparison";
import { mapState, mapMutations } from "vuex";

export default {
  name: "app",
  components: { ShoppingList, Comparison, StoreTable },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapState(["shoppingList"])
  },
  methods: {
    ...mapMutations(["setShoppingList"])
  }
};
</script>

<style module>
.root {
  display: grid;
  grid-template:
    "shoppingList storeTable" 150px
    "shoppingList comparison" 1fr
    / 300px 1fr;
  grid-gap: 20px;
  justify-items: stretch;
  align-items: stretch;
}

.shoppingList {
  grid-area: shoppingList;
}

.storeTable {
  grid-area: storeTable;
}

.comparison {
  grid-area: comparison;
  align-self: start;
}
</style>

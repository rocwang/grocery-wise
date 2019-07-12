<template>
  <div id="app" :class="$style.root">
    <ShoppingList
      @compare="compare"
      :class="$style.shoppingList"
      :isLoading="isLoading"
    />
    <Comparison :class="$style.comparison" :shoppingList="shoppingList" />
  </div>
</template>

<script>
import ShoppingList from "./components/ShoppingList";
import Comparison from "./components/Comparison";

export default {
  name: "app",
  components: { ShoppingList, Comparison },
  data() {
    return {
      isLoading: false,
      shoppingList: []
    };
  },
  methods: {
    compare(shoppingList) {
      this.shoppingList = shoppingList;
    }
  }
};
</script>

<style module>
.root {
  display: grid;
  grid-template:
    "shoppingList comparison" auto
    / 300px 1fr;
  grid-gap: 20px;
  justify-items: stretch;
  align-items: start;
}

.shoppingList {
  grid-area: shoppingList;
}

.comparison {
  grid-area: comparison;
}
</style>

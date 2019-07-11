<template>
  <div id="app" :class="$style.root">
    <ShoppingList
      @compare="compare"
      :class="$style.shoppingList"
      :isLoading="isLoading"
    />
    <Comparison :comparison="comparison" :class="$style.comparison" />
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
      comparison: [],
      isLoading: false
    };
  },
  methods: {
    compare(shoppingList) {
      this.comparison = [];
      this.isLoading = true;
      const items = shoppingList.map(async query => {
        try {
          const result = await fetch(
            `${process.env.VUE_APP_PRICE_API}?q=${encodeURIComponent(query)}`
          );
          const jsonResult = await result.json();

          return {
            name: query,
            stores: jsonResult
          };
        } catch (e) {
          // todo: notify the user about the error
          console.log(e);
          return null;
        }
      });

      items.forEach(async itemPromise => {
        const item = await itemPromise;
        if (item) {
          this.comparison.push(item);
        }
      });

      Promise.all(items).finally(() => (this.isLoading = false));
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
}

.shoppingList {
  grid-area: shoppingList;
}

.comparison {
  grid-area: comparison;
}
</style>

<template>
  <form :class="$style.root">
    <label for="shopping_list" :class="$style.title">Your Shopping List</label>

    <textarea
      id="shopping_list"
      :placeholder="placeholder"
      :class="$style.list"
      v-model="rawShoppingList"
      @input="input"
    ></textarea>
  </form>
</template>

<script>
import { debounce } from "lodash-es";

export default {
  name: "ShoppingList",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    initShoppingList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      rawShoppingList: this.initShoppingList
        .map(({ name, quantity }) => `${name} × ${quantity}`)
        .join("\n"),
      placeholder: "apple\nbanana\norange\ncoke 1.5l\nweet-bix"
    };
  },
  computed: {
    shoppingList() {
      return (
        this.rawShoppingList
          .split("\n")
          .map(item => item.trim())
          .filter(item => item !== "")
          // Parse out the name and quantity then put them into a object
          .map(item =>
            Object.fromEntries(
              item
                .split(/(?:\s+[xX]|[*×])\s*/, 2)
                .map((value, index) => [
                  ["name", "quantity"][index],
                  value.trim()
                ])
            )
          )
          // The quantity defaults to 1
          .map(obj => ({ ...obj, quantity: parseInt(obj.quantity) || 1 }))
      );
    }
  },
  methods: {
    input: debounce(
      function() {
        this.$emit("input", this.shoppingList);
      },
      500,
      { trailing: true }
    )
  }
};
</script>

<style module>
.root {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
}

.title {
  flex: 0 0 auto;
  text-align: center;
  padding-bottom: 15px;
}

.list {
  flex: 1 1 auto;
  border: 1px solid black;
  padding: 10px;
  line-height: 1.5;
  background: lightyellow;
  font-size: 1.4rem;
}
</style>

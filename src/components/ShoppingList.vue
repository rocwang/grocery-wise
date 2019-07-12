<template>
  <form :class="$style.root">
    <label for="shopping_list" :class="$style.title">Your Shopping List</label>

    <textarea
      id="shopping_list"
      :placeholder="placeholder"
      v-model="rawShoppingList"
      :class="$style.list"
    ></textarea>

    <button
      type="button"
      @click="compare"
      :disabled="isCompareButtonDisabled"
      :class="$style.button"
    >
      Compare!
    </button>
  </form>
</template>

<script>
export default {
  name: "ShoppingList",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const placeholder = "apple\nbanana\norange\ncoke 1.5l\nweet-bix";

    return {
      rawShoppingList: placeholder,
      placeholder
    };
  },
  computed: {
    shoppingList() {
      return this.rawShoppingList
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");
    },
    isCompareButtonDisabled() {
      return this.isLoading || this.shoppingList.length === 0;
    }
  },
  methods: {
    compare() {
      this.$emit("compare", this.shoppingList);
    }
  }
};
</script>

<style module>
.root {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  grid-template:
    "title" auto "list" 1fr "button" auto
    / 100%;
  grid-gap: 20px;
}

.title {
  grid-area: title;
  text-align: center;
}

.list {
  grid-area: list;
  border: 1px solid black;
  padding: 10px;
  line-height: 1.5;
  background: lightyellow;
  font-size: 1.4rem;
}

.button {
  grid-area: button;
  padding: 10px;
  background: black;
  color: white;
  font-size: 1.4rem;
}

.button:disabled {
  background: lightgray;
}
</style>

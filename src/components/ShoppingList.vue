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
      rawShoppingList: this.initShoppingList.join("\n"),
      placeholder: "apple\nbanana\norange\ncoke 1.5l\nweet-bix"
    };
  },
  computed: {
    shoppingList() {
      return this.rawShoppingList
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");
    }
  },
  methods: {
    input() {
      this.$emit("input", this.shoppingList);
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
    "title" auto
    "list" 1fr
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
</style>

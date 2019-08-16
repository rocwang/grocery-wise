<template>
  <tr :class="$style.root">
    <td :class="$style.cell" v-for="store in $options.stores" :key="store.key">
      <component
        :is="store.component"
        :id="store.key"
        :value="storeIds[store.key]"
        @input="input(store.key, $event)"
        :brand="store.key"
      />
    </td>
  </tr>
</template>

<script>
import StoreSelectCountdown from "./StoreSelectCountdown";
import StoreSelectFoodstuffs from "./StoreSelectFoodstuffs";

export default {
  name: "StoreRow",
  components: { StoreSelectCountdown, StoreSelectFoodstuffs },
  stores: [
    {
      key: "countdown",
      component: StoreSelectCountdown
    },
    {
      key: "newworld",
      component: StoreSelectFoodstuffs
    },
    {
      key: "paknsave",
      component: StoreSelectFoodstuffs
    }
  ],
  props: {
    storeIds: {
      type: Object,
      required: true
    }
  },
  methods: {
    input(key, value) {
      this.$emit("input", { key, value });
    }
  }
};
</script>

<style module>
.root {
}

.cell {
  position: sticky;
  top: 0;
  z-index: 20;
  font-weight: bold;
  background-color: var(--c-gray-d);
  border: 1px solid #000;
  padding: var(--cell-padding);
  text-align: center;
  line-height: 1.2;
}

.cell:nth-child(1),
.cell:nth-child(2),
.cell:nth-child(3) {
  width: calc(100% / 3);
}
</style>

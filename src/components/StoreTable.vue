<template>
  <table :class="$style.root">
    <tbody>
      <tr v-for="store in $options.stores" :key="store.key">
        <td :class="$style.brand">
          <label :for="store.key">{{ store.name }}</label>
        </td>
        <td :class="$style.store">
          <component
            :is="store.component"
            :id="store.key"
            :value="storeIds[store.key]"
            @input="input(store.key, $event)"
            :brand="store.key"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import StoreSelectCountdown from "./StoreSelectCountdown";
import StoreSelectFoodstuffs from "./StoreSelectFoodstuffs";

export default {
  name: "StoreTable",
  components: { StoreSelectCountdown, StoreSelectFoodstuffs },
  stores: [
    {
      key: "countdown",
      name: "Countdown",
      component: StoreSelectCountdown
    },
    {
      key: "newworld",
      name: "New World",
      component: StoreSelectFoodstuffs
    },
    {
      key: "paknsave",
      name: "Pak'n Save",
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
  table-layout: fixed;
}

.brand {
  width: 100px;
  text-align: center;
}

.store {
  width: calc(100% - 100px);
}
</style>

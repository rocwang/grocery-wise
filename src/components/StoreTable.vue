<template>
  <table :class="$style.root">
    <tbody>
      <tr>
        <td :class="$style.brand">
          <label for="countdown">Countdown</label>
        </td>
        <td :class="$style.store">
          <StoreSelectCountdown
            id="countdown"
            :value="storeIds.countdown"
            @input="input('countdown', $event)"
          />
        </td>
      </tr>
      <tr>
        <td :class="$style.brand">
          <label for="newworld">New World</label>
        </td>
        <td :class="$style.store">
          <StoreSelectFoodstuffs
            id="newworld"
            :value="storeIds.newworld"
            @input="input('newworld', $event)"
            brand="newworld"
          />
        </td>
      </tr>
      <tr>
        <td :class="$style.brand">
          <label for="paknsave">Pak'n Save</label>
        </td>
        <td :class="$style.store">
          <StoreSelectFoodstuffs
            id="paknsave"
            :value="storeIds.paknsave"
            @input="input('paknsave', $event)"
            brand="paknsave"
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

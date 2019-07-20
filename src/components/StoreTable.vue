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
            @input="setStoreId({ key: 'countdown', value: $event })"
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
            @input="setStoreId({ key: 'newworld', value: $event })"
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
            @input="setStoreId({ key: 'paknsave', value: $event })"
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
import { mapMutations } from "vuex";

export default {
  name: "StoreTable",
  components: { StoreSelectCountdown, StoreSelectFoodstuffs },
  methods: {
    ...mapMutations(["setStoreId"])
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

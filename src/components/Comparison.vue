<template>
  <table :class="$style.root">
    <thead>
      <tr>
        <th :class="$style.name">Name</th>
        <th :class="$style.store">Countdown</th>
        <th :class="$style.store">New World</th>
        <th :class="$style.store">Pak'nSave</th>
        <th :class="$style.action">Action</th>
      </tr>
    </thead>
    <tbody>
      <ComparisonRow
        v-for="(query, index) in shoppingList"
        :key="`${index}-${query}`"
        :query="query"
        @priceChange="handlePriceChange(index, $event)"
      />
    </tbody>
    <tfoot>
      <tr>
        <td>Total</td>
        <td v-for="(total, index) in totals" :key="index">
          {{ total | money }}
        </td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import ComparisonRow from "./ComparisonRow";
import { money } from "../filters";

export default {
  name: "Comparison",
  components: { ComparisonRow },
  props: {
    shoppingList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      prices: [[], [], []]
    };
  },
  computed: {
    totals() {
      return [0, 1, 2].map(storeIndex =>
        this.prices[storeIndex].reduce((sum, price) => sum + price, 0)
      );
    }
  },
  methods: {
    handlePriceChange(productIndex, pricesByStore) {
      pricesByStore.forEach((price, storeIndex) => {
        this.$set(this.prices[storeIndex], productIndex, price);
      });
    }
  },
  watch: {
    shoppingList() {
      this.prices = this.prices.map(pricesByStore =>
        pricesByStore.slice(0, this.shoppingList.length)
      );
    }
  },
  filters: { money }
};
</script>

<style module>
.root thead th,
.root tfoot td {
  position: sticky;

  font-weight: bold;
  background: lightgray;
  border: 1px solid #000;
  padding: 20px;
  text-align: center;
  line-height: 1.2;
}

.root thead th {
  top: 0;
}

.root tfoot td {
  bottom: 0;
}
</style>

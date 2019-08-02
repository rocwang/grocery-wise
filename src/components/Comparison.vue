<template>
  <table :class="$style.root">
    <thead>
      <tr>
        <th>Name</th>
        <th>Countdown</th>
        <th>New World</th>
        <th>Pak'nSave</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <ComparisonRow
        v-for="(query, index) in shoppingList"
        :key="`${index}-${query}`"
        :query="query"
        @priceChange="handlePriceChange(index, $event)"
        :storeIds="storeIds"
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
    },
    storeIds: {
      type: Object,
      required: true
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
.root {
  table-layout: fixed;
}

.root thead th,
.root tfoot td {
  font-weight: bold;
  background: lightgray;
  border: 1px solid #000;
  padding: 20px;
  text-align: center;
  line-height: 1.2;
}

.root th:nth-child(1) {
  width: 11%;
}

.root th:nth-child(2),
.root th:nth-child(3),
.root th:nth-child(4) {
  width: 26%;
}

.root th:nth-child(5) {
  width: 11%;
}

.root thead th {
  position: sticky;
  top: 0;
  z-index: 20;
}

.root tfoot td {
  position: sticky;
  bottom: 0;
  z-index: 10;
}
</style>

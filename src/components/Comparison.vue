<template>
  <table :class="$style.root">
    <thead>
      <slot />
    </thead>
    <ComparisonRow
      v-for="({ name, quantity }, index) in shoppingList"
      :key="`${index}-${name}`"
      :query="name"
      :quantity="quantity"
      :storeIds="storeIds"
      @lineTotalChange="handleLineTotalChange(index, $event)"
    />
    <tfoot v-if="isFooterVisible">
      <tr>
        <td
          v-for="(total, index) in totals"
          :key="index"
          :class="$style.totalCell"
        >
          {{ total.value | money }}<br />
          {{ total.saving }}
        </td>
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
      lineTotals: []
    };
  },
  computed: {
    totals() {
      return this.lineTotals
        .reduce(
          (totals, lineTotal) =>
            totals.map((total, index) => total + lineTotal[index]),
          [0, 0, 0]
        )
        .map((value, index, totals) => {
          const max = Math.max(...totals);
          return {
            value,
            saving:
              value === max
                ? "Most Expensive"
                : `Saving ${money(max - value)}, ${(
                    ((max - value) / max) *
                    100
                  ).toFixed(2)}%`
          };
        });
    },
    isFooterVisible() {
      return this.totals.some(total => total.value > 0);
    }
  },
  methods: {
    handleLineTotalChange(productIndex, lineTotalsByStore) {
      this.$set(this.lineTotals, productIndex, lineTotalsByStore);
    }
  },
  watch: {
    shoppingList() {
      this.lineTotals = this.lineTotals.slice(0, this.shoppingList.length);
    }
  },
  filters: { money }
};
</script>

<style module>
.root {
  table-layout: fixed;
  width: 100%;
  --cell-padding: 5px;
}

@media (min-width: 1200px) {
  .root {
    --cell-padding: 15px;
  }
}

.totalCell {
  position: sticky;
  bottom: 0;
  z-index: 10;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: var(--c-gray-d);
  border: 1px solid #000;
  padding: var(--cell-padding);
  text-align: center;
  line-height: 1.5;
}

@media (min-width: 1200px) {
  .totalCell {
    font-size: 1.4rem;
  }
}
</style>

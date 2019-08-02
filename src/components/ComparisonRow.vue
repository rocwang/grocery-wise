<template>
  <tr>
    <td :class="$style.cell">{{ query }}</td>
    <td
      v-for="(product, key) in selectedProducts"
      :key="key"
      :class="$style.cell"
    >
      <template v-if="product.id">
        <img :src="product.image" :alt="product.name" :class="$style.image" />
        <p>{{ product.name }}</p>
        <p>
          {{ product.price | money }}
          {{ product.unit }}
        </p>
      </template>
    </td>
    <td :class="$style.cell">
      <button type="button" :class="$style.button" @click="isMatching = true">
        Match Manually
      </button>
      <ModalManualMatch
        v-if="isMatching"
        :query="query"
        :stores="stores"
        v-model="selected"
        @close="isMatching = false"
      />
    </td>
  </tr>
</template>

<script>
import ModalManualMatch from "./ModalManualMatch";
import { money } from "../filters";
import { searchNewWorld, searchCountDown, searchPakNSave } from "../api";

export default {
  name: "ComparisonRow",
  components: { ModalManualMatch },
  props: {
    query: {
      type: String,
      required: true
    },
    storeIds: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isMatching: false,
      stores: [
        {
          name: "Countdown",
          products: []
        },
        {
          name: "New World",
          products: []
        },
        {
          name: "Pak'nSave",
          products: []
        }
      ],
      selected: [0, 0, 0]
    };
  },
  computed: {
    selectedProducts() {
      return [
        this.stores[0].products[this.selected[0]] || { price: 0 },
        this.stores[1].products[this.selected[1]] || { price: 0 },
        this.stores[2].products[this.selected[2]] || { price: 0 }
      ];
    }
  },
  watch: {
    query: {
      immediate: true,
      async handler(query) {
        try {
          const searchResults = await Promise.all([
            searchCountDown(query, this.storeIds.countdown),
            searchNewWorld(query, this.storeIds.newworld),
            searchPakNSave(query, this.storeIds.paknsave)
          ]);

          this.stores = [
            {
              name: "Countdown",
              products: searchResults[0]
            },
            {
              name: "New World",
              products: searchResults[1]
            },
            {
              name: "Pak'nSave",
              products: searchResults[2]
            }
          ];
        } catch (e) {
          // todo: notify the user about the error
          // eslint-disable-next-line no-console
          console.error(e);
          this.stores = null;
        }
      }
    },
    "storeIds.countdown": {
      immediate: false,
      async handler(storeIdAsKey) {
        this.stores[0].products = await searchCountDown(
          this.query,
          storeIdAsKey
        );
      }
    },
    "storeIds.newworld": {
      immediate: false,
      async handler(storeIdAsKey) {
        this.stores[1].products = await searchNewWorld(
          this.query,
          storeIdAsKey
        );
      }
    },
    "storeIds.paknsave": {
      immediate: false,
      async handler(storeIdAsKey) {
        this.stores[2].products = await searchPakNSave(
          this.query,
          storeIdAsKey
        );
      }
    },
    selectedProducts: {
      immediate: true,
      handler(selectedProducts) {
        this.$emit("priceChange", [
          selectedProducts[0].price,
          selectedProducts[1].price,
          selectedProducts[2].price
        ]);
      }
    }
  },
  filters: { money }
};
</script>

<style module>
.cell {
  border: 1px solid #000;
  padding: 20px;
  text-align: center;
  line-height: 1.2;
}

.image {
  margin-left: auto;
  margin-right: auto;
}

.button {
  padding: 10px;
  background: black;
  color: white;
  font-size: 1.4rem;
}
</style>

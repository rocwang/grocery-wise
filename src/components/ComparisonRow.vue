<template>
  <tbody>
    <tr>
      <td colspan="3" :class="[$style.queryCell, $style.cell]">
        {{ query }}
      </td>
    </tr>
    <tr>
      <td
        v-for="(product, key) in selectedProducts"
        :key="key"
        :class="$style.cell"
      >
        <template v-if="product.id">
          <button
            type="button"
            :class="$style.button"
            @click="isMatching = true"
          >
            <img
              :src="product.image"
              :alt="product.name"
              :class="$style.image"
            />
            <span :class="$style.text">{{ product.name }}</span>
            <span :class="$style.text">
              {{ product.price | money }}
              {{ product.unit }}
              ×
              {{ quantity }}
            </span>
          </button>

          <ModalManualMatch
            v-if="isMatching"
            :query="query"
            :stores="stores"
            v-model="selected"
            @close="isMatching = false"
          />
        </template>
      </td>
    </tr>
  </tbody>
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
    quantity: {
      type: Number,
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
      ].map(item => ({ ...item, lineTotal: item.price * this.quantity }));
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
        this.$emit("lineTotalChange", [
          selectedProducts[0].lineTotal,
          selectedProducts[1].lineTotal,
          selectedProducts[2].lineTotal
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

.queryCell {
  background-color: var(--c-gray-d);
}

.image {
  margin-left: auto;
  margin-right: auto;
}

.button {
  margin-left: auto;
  margin-right: auto;
  font-size: 1.4rem;
}

.text {
  display: block;
  line-height: 1.5;
}
</style>

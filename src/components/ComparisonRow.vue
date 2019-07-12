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
import { money, storeName } from "../filters";

export default {
  name: "ComparisonRow",
  components: { ModalManualMatch },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isMatching: false,
      stores: null,
      selected: [0, 0, 0]
    };
  },
  computed: {
    selectedProducts() {
      return this.stores
        ? [
            this.stores[0].products[this.selected[0]],
            this.stores[1].products[this.selected[1]],
            this.stores[2].products[this.selected[2]]
          ]
        : [{ price: 0 }, { price: 0 }, { price: 0 }];
    }
  },
  watch: {
    query: {
      immediate: true,
      async handler(query) {
        try {
          const result = await fetch(
            `${process.env.VUE_APP_PRICE_API}?q=${encodeURIComponent(query)}`
          );
          this.stores = await result.json();
        } catch (e) {
          // todo: notify the user about the error
          console.log(e);
          this.stores = null;
        }
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
  filters: { money, storeName }
};
</script>

<style module>
.cell {
  border: 1px solid #000;
  padding: 20px;
  text-align: center;
  line-height: 1.2;
}

.name {
  width: 11%;
}

.store {
  width: 26%;
}

.action {
  width: 11%;
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

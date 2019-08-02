<template>
  <Multiselect
    v-bind="$attrs"
    :value="selectedStore"
    @select="handleSelect"
    :options="stores"
    track-by="id"
    :custom-label="getCustomLabel"
    placeholder="Choose your store"
  />
</template>

<script>
import Multiselect from "vue-multiselect";
import { getFoodStuffsStoreList, setFoodStuffStore } from "../api";

export default {
  name: "StoreSelectFoodstuffs",
  inheritAttrs: false,
  components: { Multiselect },
  props: {
    brand: {
      type: String,
      required: true,
      validator: value => ["newworld", "paknsave"].includes(value)
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      stores: []
    };
  },
  computed: {
    selectedStore() {
      return this.stores.find(({ id }) => id === this.value);
    }
  },
  methods: {
    getCustomLabel: ({ name, address }) => `${name} - ${address}`,
    async handleSelect({ id }) {
      this.$emit("input", id);
      const store = await setFoodStuffStore(this.brand, id);
      this.$emit("input", store.id);
    }
  },
  async created() {
    this.stores = await getFoodStuffsStoreList(this.brand);
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" />

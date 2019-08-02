<template>
  <Multiselect
    v-bind="$attrs"
    :value="selectedStore"
    @select="handleSelect"
    :options="stores"
    track-by="id"
    label="name"
    placeholder="Choose your store"
  />
</template>

<script>
// use "src" to optimize bundle size:
import Multiselect from "vue-multiselect/src/Multiselect";
import { getCountdownStoreList, setCountdownStore } from "../api";

export default {
  name: "StoreSelectCountdown",
  inheritAttrs: false,
  components: { Multiselect },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      stores: [],
      csrfToken: ""
    };
  },
  computed: {
    selectedStore() {
      return this.stores.find(({ id }) => id === this.value);
    }
  },
  methods: {
    async handleSelect({ id }) {
      this.$emit("input", id);
      await setCountdownStore(id);
      this.$emit("input", id);
    }
  },
  async created() {
    this.stores = await getCountdownStoreList();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" />

<template>
  <Multiselect
    v-bind="$attrs"
    v-model="selected"
    @select="handleSelect"
    :options="stores"
    track-by="id"
    :custom-label="getCustomLabel"
    placeholder="Choose your store"
  />
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "StoreSelectFoodstuffs",
  inheritAttrs: false,
  components: { Multiselect },
  props: {
    brand: {
      type: String,
      required: true,
      validator: value => ["newworld", "paknsave"].includes(value)
    }
  },
  data() {
    return {
      selected: null,
      stores: []
    };
  },
  computed: {
    base() {
      return {
        newworld: process.env.VUE_APP_NEWWORLD_PROXY,
        paknsave: process.env.VUE_APP_PAKNSAVE_PROXY
      }[this.brand];
    }
  },
  methods: {
    getCustomLabel: ({ name, address }) => `${name} - ${address}`,
    async handleSelect(selectedStore) {
      const response = await fetch(
        `${this.base}/CommonApi/Store/ChangeStore?storeId=${selectedStore.id}`,
        {
          credentials: "include"
        }
      );
      const json = await response.json();
      this.selected = json.storeDetails;
      this.$emit("input", this.selected.id);
    }
  },
  async created() {
    const api = `${this.base}/CommonApi/Store/GetStoreList`;
    const response = await fetch(api);
    const json = await response.json();
    this.stores = json.stores;
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" />

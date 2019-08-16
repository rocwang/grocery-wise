<template>
  <Multiselect
    v-bind="$attrs"
    :value="selectedStore"
    @select="handleSelect"
    :options="stores"
    track-by="id"
    placeholder="Choose your store"
    label="name"
  >
    <template v-slot:singleLabel="{ option }">
      <IconCountdown :class="$style.icon" />
      <span>{{ option.name }}</span>
    </template>

    <template v-slot:option="{ option }">
      <IconCountdown :class="$style.icon" />
      <span>{{ option.name }}</span>
    </template>
  </Multiselect>
</template>

<script>
// use "src" to optimize bundle size:
import Multiselect from "vue-multiselect/src/Multiselect";
import IconCountdown from "./IconCountdown";
import { getCountdownStoreList, setCountdownStore } from "../api";

export default {
  name: "StoreSelectCountdown",
  inheritAttrs: false,
  components: { Multiselect, IconCountdown },
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
<style module>
.icon {
  height: 20px;
  display: inline-block;
  margin-right: 5px;
}
</style>

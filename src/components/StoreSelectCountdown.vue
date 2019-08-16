<template>
  <Multiselect
    v-bind="$attrs"
    :value="selectedStore"
    @select="handleSelect"
    :options="stores"
    track-by="id"
    placeholder="Choose your store"
    label="name"
    :class="$style.root"
  >
    <template v-slot:placeholder>
      <label :for="$attrs.id">Choose your store</label>
    </template>

    <template v-slot:singleLabel="{ option }">
      <IconCountdown :class="$style.icon" />
      <span :class="$style.label">{{ option.name }}</span>
    </template>

    <template v-slot:option="{ option }">
      <IconCountdown :class="[$style.icon, $style.optionIcon]" />
      <span :class="$style.label">{{ option.name }}</span>
    </template>
  </Multiselect>
</template>

<script>
// TODO: Merge this component into StoreSelectFoodstuffs.vue
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

<style module>
.icon {
  height: 16px;
  display: block;
}

.optionIcon {
  display: none;
}

.label {
  font-size: 1.2rem;
}

@media (min-width: 768px) {
  .icon {
    height: 20px;
    display: inline-block;
    margin-right: 5px;
  }

  .optionIcon {
    display: inline-block;
  }

  .label {
    font-size: 1.6rem;
  }
}

.root :global(.multiselect__placeholder) {
  color: var(--c-gray-a);
}
</style>

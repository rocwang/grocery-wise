<template>
  <Multiselect
    v-bind="$attrs"
    :value="selectedStore"
    @select="handleSelect"
    :options="stores"
    track-by="id"
    placeholder="Choose your store"
    label="label"
    :class="$style.root"
  >
    <template v-slot:placeholder>
      <label :for="$attrs.id">Choose your store</label>
    </template>

    <template v-slot:singleLabel="{ option }">
      <component :is="icon" :class="$style.icon" />
      <span :class="$style.label">{{ option.label }}</span>
    </template>

    <template v-slot:option="{ option }">
      <component :is="icon" :class="[$style.icon, $style.optionIcon]" />
      <span :class="$style.label">{{ option.label }}</span>
    </template>
  </Multiselect>
</template>

<script>
// use "src" to optimize bundle size:
import Multiselect from "vue-multiselect/src/Multiselect";
import IconNewworld from "./IconNewworld";
import IconPaknsave from "./IconPaknsave";
import { getFoodStuffsStoreList, setFoodStuffStore } from "../api";
import Comparison from "./Comparison";

export default {
  name: "StoreSelectFoodstuffs",
  inheritAttrs: false,
  components: { Comparison, Multiselect },
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
    },
    icon() {
      return this.brand === "newworld" ? IconNewworld : IconPaknsave;
    }
  },
  methods: {
    async handleSelect({ id }) {
      const store = await setFoodStuffStore(this.brand, id);
      this.$emit("input", store.id);
    }
  },
  async created() {
    this.stores = (await getFoodStuffsStoreList(this.brand))
      .map(item => ({
        ...item,
        label: item.name.replace(/^(?:new world|pak'nsave)\s+/i, "")
      }))
      .sort((storeA, storeB) => storeA.label.localeCompare(storeB.label));
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

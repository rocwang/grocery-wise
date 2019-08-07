<template>
  <Modal @close="close">
    <div :class="$style.root">
      <h2 :class="$style.query">{{ query }}</h2>

      <template v-for="(store, key) in stores">
        <p :class="$style.storeName" :key="`storeName-${key}`">
          {{ store.name | storeName }}
        </p>

        <Spinner
          :items="store.products"
          :key="`spinner-${key}`"
          :class="$style.spinner"
          v-model="newValue[key]"
        />
      </template>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import Spinner from "./Spinner";
import { storeName } from "../filters";

export default {
  name: "ModalManualMatch",
  components: { Modal, Spinner },
  props: {
    query: {
      type: String,
      required: true
    },
    stores: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      newValue: [...this.value]
    };
  },
  methods: {
    close() {
      this.$emit("input", this.newValue);
      this.$emit("close");
    }
  },
  filters: {
    storeName
  }
};
</script>

<style module>
.root {
  display: grid;
  grid-template:
    "query query query" auto
    "storeName1 storeName2 storeName3" auto
    "spinner1 spinner2 spinner3" minmax(0, 1fr)
    / 1fr 1fr 1fr;
  height: 100%;
}

.query {
  grid-area: query;
  text-align: center;
  font-weight: bold;
  line-height: 2;
}

.storeName {
  text-align: center;
}

.storeName:nth-of-type(1) {
  grid-area: storeName1;
}

.storeName:nth-of-type(2) {
  grid-area: storeName2;
}

.storeName:nth-of-type(3) {
  grid-area: storeName3;
}

.spinner:nth-of-type(1) {
  grid-area: spinner1;
}

.spinner:nth-of-type(2) {
  grid-area: spinner2;
}

.spinner:nth-of-type(3) {
  grid-area: spinner3;
}
</style>

<template>
  <Modal @close="close">
    <div :class="$style.root">
      <h2 :class="$style.name">{{ row.name }}</h2>

      <template v-for="(store, key) in row.stores">
        <p :class="$style.storeName" :key="`${key}-name`">
          {{ key | storeName }}
        </p>
        <ul :class="$style.list" :key="`${key}}-list`">
          <li v-for="item in store" :key="item.url" :class="$style.item">
            <img :src="item.image" :alt="item.name" :class="$style.image" />
            <p>{{ item.name }}</p>
            <p>
              {{ item.price | money }}
              {{ item.unit }}
            </p>
          </li>
        </ul>
      </template>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "ModalManualMatch",
  components: { Modal },
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit("close", this.row);
    }
  },
  filters: {
    money(value) {
      return new Intl.NumberFormat("en-NZ", {
        style: "currency",
        currency: "NZD",
        minimumFractionDigits: 2
      }).format(value);
    },
    storeName(value) {
      const map = {
        countdown: "Countdown",
        newWorld: "New World",
        pakNSave: "Pak'nSave"
      };

      return map[value] || value;
    }
  }
};
</script>

<style module>
.root {
  display: grid;
  grid-template:
    "name name name" auto
    "storeName1 storeName2 storeName3" auto
    "column1 column2 column3" 1fr
    / 1fr 1fr 1fr;
  height: 100%;
}

.name {
  grid-area: name;
  text-align: center;
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

.list {
  overflow: auto;
  scroll-snap-type: y mandatory;
}

.list:nth-of-type(1) {
  grid-area: column1;
}

.list:nth-of-type(2) {
  grid-area: column2;
}

.list:nth-of-type(3) {
  grid-area: column3;
}

.item {
  scroll-snap-align: start;
  border: 1px solid #000;
  padding: 20px;
  text-align: center;
  line-height: 1.2;
}

.image {
  margin-left: auto;
  margin-right: auto;
}
</style>

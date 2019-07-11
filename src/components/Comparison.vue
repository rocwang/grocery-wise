<template>
  <div :class="$style.root">
    <table v-if="editedComparison.length">
      <thead>
        <tr>
          <th :class="$style.name">Name</th>
          <th
            :class="$style.store"
            v-for="(item, key) in editedComparison[0].stores"
            :key="key"
          >
            {{ key | storeName }}
          </th>
          <th :class="$style.action">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in editedComparison" :key="item.name">
          <td>{{ item.name }}</td>
          <td v-for="(store, key) in item.stores" :key="key">
            <template v-if="store[0]">
              <img
                :src="store[0].image"
                :alt="store[0].name"
                :class="$style.image"
              />
              <p>{{ store[0].name }}</p>
              <p>
                {{ store[0].price | money }}
                {{ store[0].unit }}
              </p>
            </template>
          </td>
          <td>
            <button
              type="button"
              :class="$style.button"
              @click="editedRowIndex = index"
            >
              Match Manually
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{{ totalCountdown | money }}</td>
          <td>{{ totalNewWorld | money }}</td>
          <td>{{ totalPakNSave | money }}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    <ModalManualMatch
      v-if="editedRowIndex !== undefined"
      :row="editedComparison[editedRowIndex]"
      @close="updateComparison"
    />
  </div>
</template>

<script>
import ModalManualMatch from "./ModalManualMatch";
import { cloneDeep } from "lodash-es";

export default {
  name: "Comparison",
  components: { ModalManualMatch },
  props: {
    comparison: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editedComparison: [],
      editedRowIndex: undefined
    };
  },
  computed: {
    totalCountdown() {
      return this.calculateTotal("countdown");
    },
    totalNewWorld() {
      return this.calculateTotal("newWorld");
    },
    totalPakNSave() {
      return this.calculateTotal("pakNSave");
    }
  },
  watch: {
    comparison: {
      immediate: true,
      handler(comparison) {
        this.editedComparison = cloneDeep(comparison);
      }
    }
  },
  methods: {
    calculateTotal(key) {
      return this.editedComparison.reduce(
        (total, item) => total + item.stores[key][0].price,
        0
      );
    },
    updateComparison(row) {
      this.editedComparison[this.editedRowIndex] = row;
      this.editedRowIndex = undefined;
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
.root th,
.root td {
  border: 1px solid #000;
  padding: 20px;
  text-align: center;
  line-height: 1.2;
}

.root thead th {
  font-weight: bold;
  position: sticky;
  top: 0;
  background: lightgray;
}

.root tfoot td {
  position: sticky;
  bottom: 0;
  font-weight: bold;
  background: lightgray;
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

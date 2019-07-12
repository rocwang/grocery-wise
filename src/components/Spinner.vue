<template>
  <div :class="$style.root">
    <ul :class="$style.list" ref="list">
      <li
        v-for="item in items"
        :key="item.url"
        :class="$style.item"
        ref="items"
      >
        <img :src="item.image" :alt="item.name" :class="$style.image" />
        <p :class="$style.productName">{{ item.name }}</p>
        <p :class="$style.price">
          {{ item.price | money }}
          {{ item.unit }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { money } from "../filters";

export default {
  name: "spinner",
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  filters: {
    money
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: this.$refs.list,
      rootMargin: "0px",
      threshold: 0.5
    });
    this.$refs.items.forEach(item => this.observer.observe(item));
    this.visibleItemIndices = new Set();

    // Set scroll top
    this.$refs.list.scrollTop =
      (this.$refs.list.scrollHeight / (this.items.length + 4)) * this.value;
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    handleIntersection(entries) {
      entries.forEach(entry => {
        const index = this.$refs.items.indexOf(entry.target);
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          this.visibleItemIndices.add(index);
        } else {
          this.visibleItemIndices.delete(index);
        }
      });

      const indices = Array.from(this.visibleItemIndices.values()).sort(
        (a, b) => a - b
      );
      switch (indices.length) {
        case 3:
          if (indices[0] === 0) {
            this.$emit("input", indices[0]);
          } else {
            this.$emit("input", indices[2]);
          }
          break;
        case 4:
          if (indices[0] === 0) {
            this.$emit("input", indices[1]);
          } else {
            this.$emit("input", indices[2]);
          }
          break;
        case 5:
          this.$emit("input", indices[2]);
          break;
        default:
          this.$emit("input", indices[Math.ceil(indices.length / 2)]);
      }
    }
  }
};
</script>

<style module>
.root {
  position: relative;
}

.root::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}

.root::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}

.list {
  overflow: auto;
  scroll-snap-type: y mandatory;
  height: 100%;
}

.list::before,
.list::after {
  content: "";
  height: 40%;
  display: block;
}

.item {
  scroll-snap-align: center;
  padding: 20px;
  height: 20%;
  display: grid;
  grid-template:
    "image productName" auto
    "image price" auto
    / 100px 1fr;
  grid-gap: 10px;
  justify-items: stretch;
  align-items: center;
}

.image {
  margin-left: auto;
  margin-right: auto;
  grid-area: image;
}

.productName {
  grid-area: productName;
}

.price {
  grid-area: price;
}
</style>

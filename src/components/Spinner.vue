<template>
  <div :class="$style.root">
    <ul :class="$style.list" ref="list">
      <li v-for="item in items" :key="item.url" :class="$style.item">
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
    this.$refs.list.addEventListener("scroll", this.handleScroll, {
      passive: true
    });

    // Set scroll top
    this.$refs.list.scrollTop =
      (this.$refs.list.scrollHeight / (this.items.length + 4)) * this.value;
  },
  beforeDestroy() {
    this.$refs.list.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      const scrollTop = e.target.scrollTop;
      const itemHeight = e.target.clientHeight / 5;
      const itemIndex = Math.floor(scrollTop / itemHeight);

      this.$emit("input", itemIndex);
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

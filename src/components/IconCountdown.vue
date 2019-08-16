<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 506">
    <defs>
      <linearGradient
        :id="ids[0]"
        x1="83.631%"
        x2="20.409%"
        y1="54.061%"
        y2="42.638%"
      >
        <stop offset="0%" stop-color="#229B49" />
        <stop offset="12.09%" stop-color="#229B4A" />
        <stop offset="100%" stop-color="#A8CF43" />
      </linearGradient>
      <linearGradient
        :id="ids[1]"
        x1="50.007%"
        x2="50.007%"
        y1="-27.379%"
        y2="100.943%"
      >
        <stop offset="0%" stop-color="#30AD4A" />
        <stop offset="74.73%" stop-color="#A8CF43" />
        <stop offset="100%" stop-color="#A8CF43" />
      </linearGradient>
      <linearGradient
        :id="ids[3]"
        x1="49.997%"
        x2="49.997%"
        y1="-27.351%"
        y2="100.932%"
      >
        <stop offset="0%" stop-color="#30AD4A" />
        <stop offset="74.73%" stop-color="#A8CF43" />
        <stop offset="100%" stop-color="#A8CF43" />
      </linearGradient>
      <linearGradient
        :id="ids[4]"
        x1="50.017%"
        x2="50.017%"
        y1="-.8%"
        y2="102.736%"
      >
        <stop offset="0%" stop-color="#229B49" />
        <stop offset="18.68%" stop-color="#229B49" />
        <stop offset="78.02%" stop-color="#A8CF43" />
        <stop offset="100%" stop-color="#A8CF43" />
      </linearGradient>
      <linearGradient
        :id="ids[5]"
        x1="37.939%"
        x2="75.368%"
        y1="80.097%"
        y2="-37.076%"
      >
        <stop offset="0%" stop-color="#229B49" />
        <stop offset="5.495%" stop-color="#229B4A" />
        <stop offset="52.2%" stop-color="#A8CF43" />
        <stop offset="100%" stop-color="#A8CF43" />
      </linearGradient>
      <linearGradient
        :id="ids[6]"
        x1="-.929%"
        x2="88.117%"
        y1="84.979%"
        y2="18.69%"
      >
        <stop offset="0%" stop-color="#56B847" />
        <stop offset="100%" stop-color="#A8CF43" />
      </linearGradient>
    </defs>
    <g fill="none" fill-rule="nonzero">
      <path
        :fill="urlRefs[0]"
        d="M385.9 426.4c-12.6 0-24.6-1.5-35.7-4.4-18.5 25.4-42.4 47.5-70.1 62.5 24.5 13.3 51.9 21.2 81.2 21.2 112.1 0 188.5-116.6 197.5-215.8-3.5 13.1-26.6 136.5-172.9 136.5"
      />
      <path
        :fill="urlRefs[1]"
        d="M413.8 116.5c-54 0-80 31.3-80 31.3C389.6 153.4 458 192.7 458 274c0 79-51.8 114.9-94.1 126.9-4.1 7.3-8.9 14.6-13.9 21.4 10 3 23.4 4.4 35.9 4.4 146.2 0 169.3-123.7 172.8-136.8.6-6.7.9-13.2.9-19.7.1-111.1-84.8-153.7-145.8-153.7"
      />
      <path
        :fill="urlRefs[2]"
        d="M174.4 426.4c31.1 0 58.2-9.5 79.9-24.7-7.5 2.3-16.6 4.1-25.8 4.1-41.2 0-126.2-30.5-126.2-131.8 0-81.4 68.4-120.7 124.1-126.3 0 0-26-31.3-80-31.3C85.5 116.4.5 159 .5 270.3c0 6.5.3 13 .9 19.7 3.6 13.1 26.3 136.4 173 136.4"
      />
      <path
        :fill="urlRefs[3]"
        d="M229.5 407.9c9.2 0 17.4-1.4 24.7-6.2 10-7 18.8-15.1 26.4-24.2-5.2-6.5-29.1-38.8-29.1-82.1 0-40.5 21.8-57.8 28.9-62.4-14.9-11-31.7-14.3-41.2-14.3-15.4 0-56.9 10.5-66.8 58v.1c-.3 1.9-.6 3.8-1 5.7-1 7.9-1.5 16.7-1.5 26.3 0 38.1 17.3 74.2 30 95.1 10.9 2.7 21.2 4 29.6 4"
      />
      <path
        :fill="urlRefs[4]"
        d="M280.9 181.1c-67.7 0-99.9 49.8-108.5 95.5 9.8-47.5 51.2-56.8 63-57.4 14.6-.8 29 2.9 45 13.7 16.2 12.1 30.2 32.6 30.2 65.1 0 27.8-10.8 56.3-30 79.3-24 28.8-61 48.9-106.3 48.9C27.7 426.2 5 302.9 1.4 289.7c9 99.1 85.4 215.8 197.6 215.8 109.5 0 193.3-110.6 193.3-203.1-.1-64-36.6-121.3-111.4-121.3"
      />
      <path
        :fill="urlRefs[5]"
        d="M282.9 143.2s-23.4-22.5-25-53.1c-1.2-22.3 7.8-56.4 43.2-75.2C383.6-29.3 455.4 35 447 76.5c0 0-61.5-27.9-118.1 5.5-41.6 24.7-46 61.2-46 61.2"
      />
    </g>
  </svg>
</template>

<script>
import { uniqueId } from "lodash-es";

export default {
  name: "IconCountdown",
  data() {
    const ids = new Array(6).fill(null).map(() => uniqueId(this.$options.name));
    return {
      ids: ids,
      urlRefs: ids.map(id => `url(#${id})`)
    };
  }
};
</script>

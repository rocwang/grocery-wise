<template>
  <transition
    :enter-class="$style.enterAndLeaveTo"
    :leave-to-class="$style.enterAndLeaveTo"
    :enter-active-class="$style.active"
    :leave-active-class="$style.active"
  >
    <div :class="$style.root" @keyup.esc="$emit('close')">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: "Notification"
};
</script>

<style module>
.root {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  left: 0;
  height: auto;
  padding: 15px;
  color: var(--c-white);
  background-color: var(--c-blue);
  box-shadow: 2px 2px 4px 0 var(--c-blue);
}

.active {
  transition: transform 0.3s ease-out;
}

.enterAndLeaveTo {
  transform: translateY(-100%);
}
</style>

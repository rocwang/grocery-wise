<template>
  <transition name="modal-">
    <div class="modal" @click="close" @keyup.esc="$emit('close')">
      <div class="modal__content" ref="content">
        <button class="modal__close" @click="$emit('close')">
          <IconCross class="modal__close-icon" />
        </button>

        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import IconCross from "./IconCross";
import "event-propagation-path";

export default {
  name: "Modal",
  components: { IconCross },
  methods: {
    close(e) {
      if (!e.propagationPath().includes(this.$refs.content)) {
        this.$emit("close");
      }
    }
  },
  created() {
    this.originalOverflow = document.querySelector("body").style.overflow;
    document.querySelector("body").style.overflow = "hidden";
  },
  destroyed() {
    document.querySelector("body").style.overflow = this.originalOverflow;
  }
};
</script>

<style>
.modal {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 25, 25, 0.5);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.modal__content {
  flex: 0 0 auto;
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  padding: 50px 20px 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: transform 0.3s ease;
  position: relative;
}

.modal__close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
}

.modal__close-icon {
  width: 10px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal--enter-active,
.modal--leave-active {
  transition: opacity 0.3s ease;
}

.modal--enter,
.modal--leave-to {
  opacity: 0;
}

.modal--enter .modal__content,
.modal--leave-to .modal__content {
  transform: scale(1.1);
}
</style>

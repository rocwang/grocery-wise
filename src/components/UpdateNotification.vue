<template>
  <Notification v-if="isVisible" :class="$style.root">
    <p :class="$style.text">
      Update available
    </p>
    <div :class="$style.buttons">
      <Buttonizer modifier="secondary">
        <button @click="close" :class="$style.btn">
          Dismiss
        </button>
      </Buttonizer>
      <Buttonizer modifier="primary">
        <button @click="update" :class="$style.btn">
          Reload
        </button>
      </Buttonizer>
    </div>
  </Notification>
</template>

<script>
import Buttonizer from "../components/Buttonizer";
import Notification from "./Notification";
import { workBox } from "../workBox";

export default {
  name: "UpdateNotification",
  components: { Notification, Buttonizer },
  data() {
    return {
      isVisible: false
    };
  },
  created() {
    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    workBox.addEventListener("waiting", () => {
      // `event.wasWaitingBeforeRegister` will be false if this is
      // the first time the updated service worker is waiting.
      // When `event.wasWaitingBeforeRegister` is true, a previously
      // updated same service worker is still waiting.
      // You may want to customize the UI prompt accordingly.
      this.isVisible = true;
    });
  },
  methods: {
    close() {
      this.isVisible = false;
    },
    update() {
      // Assuming the user accepted the update, set up a listener
      // that will reload the page as soon as the previously waiting
      // service worker has taken control.
      workBox.addEventListener("controlling", () => {
        window.location.reload();
      });

      // Send a message telling the service worker to skip waiting.
      // This will trigger the `controlling` event handler above.
      // Note: for this to work, you have to add a message
      // listener in your service worker. See below.
      workBox.messageSW({ type: "SKIP_WAITING" });
    }
  }
};
</script>

<style module>
.root {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 1.6rem;
  flex: 1 1 auto;
}

.buttons {
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
}

.btn {
  margin-left: 10px;
}
</style>

<template>
  <Multiselect
    v-bind="$attrs"
    v-model="selected"
    @select="handleSelect"
    :options="stores"
    track-by="id"
    label="name"
    placeholder="Choose your store"
  />
</template>

<script>
import Multiselect from "vue-multiselect";
import jquery from "jquery/dist/jquery.slim.js";

export default {
  name: "StoreSelectCountdown",
  inheritAttrs: false,
  components: { Multiselect },
  data() {
    return {
      selected: null,
      stores: [],
      csrfToken: ""
    };
  },
  methods: {
    async handleSelect(selectedStore) {
      const formData = new FormData();
      formData.set("addressID", selectedStore.id);
      formData.set("__RequestVerificationToken", this.csrfToken);

      await fetch(
        `${
          process.env.VUE_APP_COUNTDOWN_PROXY
        }/shop/setdeliveryaddress?_mode=ajax`,
        {
          method: "POST",
          body: formData,
          credentials: "include"
        }
      );

      this.$emit("input", selectedStore.id);
    }
  },
  async created() {
    const ownerDoc = document.implementation.createHTMLDocument("virtual");

    // Get the CSRF token
    let response = await fetch(`${process.env.VUE_APP_COUNTDOWN_PROXY}/`, {
      credentials: "include"
    });
    const homepage = await response.text();
    this.csrfToken = jquery(homepage, ownerDoc)
      .find(
        '.select-delivery-method-form input[name="__RequestVerificationToken"]'
      )
      .val();

    // Set the delivery method to "pickup" in the current session
    const formData = new FormData();
    formData.set("deliveryMethod", "Pickup");
    formData.set("__RequestVerificationToken", this.csrfToken);
    response = await fetch(
      `${
        process.env.VUE_APP_COUNTDOWN_PROXY
      }/shop/setdeliverymethod?_mode=ajax`,
      {
        method: "POST",
        body: formData,
        credentials: "include"
      }
    );

    // Get the store list
    response = await fetch(
      `${process.env.VUE_APP_COUNTDOWN_PROXY}/shop/showaddresses`,
      {
        credentials: "include"
      }
    );
    const addressPage = await response.text();
    this.stores = jquery(addressPage, ownerDoc)
      .find(".manage-delivery-address-pickup-only")
      .first()
      .find("li")
      .map(function() {
        const $li = jquery(this);
        return {
          id: $li.children("input").val(),
          name: $li
            .children("label")
            .text()
            .trim()
        };
      })
      .toArray();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" />

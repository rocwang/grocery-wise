import jquery from "jquery/dist/jquery.slim.js";

export async function searchCountDown(query, key) {
  const response = await fetch(
    `${
      process.env.VUE_APP_COUNTDOWN_PROXY
    }/shop/searchproducts?search=${encodeURIComponent(query)}&_=${key}`,
    {
      credentials: "include"
    }
  );
  const html = await response.text();

  const ownerDoc = document.implementation.createHTMLDocument("virtual");
  return jquery(html, ownerDoc)
    .find(".gridProductStamp")
    .map(function() {
      const $item = jquery(this);

      return {
        id: $item.data("datalayer-id"),
        name: $item
          .find(".gridProductStamp-name")
          .text()
          .trim(),
        image:
          process.env.VUE_APP_COUNTDOWN_IMAGE_BASE +
          $item.find(".gridProductStamp-image").attr("src"),
        price: Number($item.data("datalayer-price")),
        unit: $item.find(".trolleyControls").data("unit")
      };
    })
    .toArray();
}

let countdownCsrfToken = "";

export async function getCountdownStoreList() {
  const ownerDoc = document.implementation.createHTMLDocument("virtual");

  // Get the CSRF token
  let response = await fetch(`${process.env.VUE_APP_COUNTDOWN_PROXY}/`, {
    credentials: "include"
  });
  const homepage = await response.text();
  countdownCsrfToken = jquery(homepage, ownerDoc)
    .find(
      '.select-delivery-method-form input[name="__RequestVerificationToken"]'
    )
    .val();

  // Set the delivery method to "pickup" in the current session
  const formData = new FormData();
  formData.set("deliveryMethod", "Pickup");
  formData.set("__RequestVerificationToken", countdownCsrfToken);
  response = await fetch(
    `${process.env.VUE_APP_COUNTDOWN_PROXY}/shop/setdeliverymethod?_mode=ajax`,
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

  return jquery(addressPage, ownerDoc)
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

export async function setCountdownStore(storeId) {
  const formData = new FormData();
  formData.set("addressID", storeId);
  formData.set("__RequestVerificationToken", countdownCsrfToken);

  await fetch(
    `${process.env.VUE_APP_COUNTDOWN_PROXY}/shop/setdeliveryaddress?_mode=ajax`,
    {
      method: "POST",
      body: formData,
      credentials: "include"
    }
  );
}

////////////////////////////////////////////////////////////////////////////////

const base = {
  newworld: process.env.VUE_APP_NEWWORLD_PROXY,
  paknsave: process.env.VUE_APP_PAKNSAVE_PROXY
};

export function searchPakNSave(query, key) {
  return searchFoodStuffs("paknsave", query, key);
}

export function searchNewWorld(query, key) {
  return searchFoodStuffs("newworld", query, key);
}

async function searchFoodStuffs(brand, query, key) {
  const url = `${base[brand]}/Search?q=${encodeURIComponent(query)}&_=${key}`;
  const response = await fetch(url, {
    credentials: "include"
  });
  const html = await response.text();

  const ownerDoc = document.implementation.createHTMLDocument("virtual");
  return jquery(html, ownerDoc)
    .find(".fs-product-card")
    .map(function() {
      const $item = jquery(this);
      const product = $item.find(".js-product-card-footer").data("options");

      return {
        id: product.productId,
        name: $item
          .find(".fs-product-card__description")
          .text()
          .replace(/[\r\n]+/g, " ")
          .trim(),
        image: $item
          .find(".fs-product-card__product-image")
          .css("background-image")
          .replace(/^url\("|"\)$/g, ""),
        price: Number(product.ProductDetails.PricePerItem),
        unit: product.ProductDetails.PriceMode
      };
    })
    .toArray();
}

export async function getFoodStuffsStoreList(brand) {
  const response = await fetch(`${base[brand]}/CommonApi/Store/GetStoreList`);
  const { stores } = await response.json();
  return stores;
}

export async function setFoodStuffStore(brand, storeId) {
  const response = await fetch(
    `${base[brand]}/CommonApi/Store/ChangeStore?storeId=${storeId}`,
    {
      credentials: "include"
    }
  );
  const { storeDetails } = await response.json();
  return storeDetails;
}

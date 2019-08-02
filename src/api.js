import $ from "cash-dom";

$.fn.extend({
  toArray() {
    const result = [];
    this.each(function() {
      result.push(this);
    });
    return result;
  }
});

function replaceTagSrc(html) {
  return html.replace(/\bsrc\b/g, "data-src");
}

export async function searchCountDown(query, key) {
  const response = await fetch(
    `${
      process.env.VUE_APP_COUNTDOWN_PROXY
    }/shop/searchproducts?search=${encodeURIComponent(query)}&_=${key}`,
    {
      credentials: "include"
    }
  );
  const html = replaceTagSrc(await response.text());

  return $(html)
    .find(".gridProductStamp")
    .map(function() {
      const $item = $(this);

      return {
        id: $item.data("datalayer-id"),
        name: $item
          .find(".gridProductStamp-name")
          .text()
          .trim(),
        image:
          process.env.VUE_APP_COUNTDOWN_IMAGE_BASE +
          $item.find(".gridProductStamp-image").attr("data-src"),
        price: Number($item.data("datalayer-price")),
        unit: $item.find(".trolleyControls").data("unit")
      };
    })
    .toArray();
}

let countdownCsrfToken = "";

export async function getCountdownStoreList() {
  // Get the CSRF token
  let response = await fetch(`${process.env.VUE_APP_COUNTDOWN_PROXY}/`, {
    credentials: "include"
  });
  const homepage = replaceTagSrc(await response.text());
  countdownCsrfToken = $(homepage)
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
  const addressPage = replaceTagSrc(await response.text());

  return $(addressPage)
    .find(".manage-delivery-address-pickup-only")
    .first()
    .find("li")
    .map(function() {
      const $li = $(this);
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
  const html = replaceTagSrc(await response.text());

  return $(html)
    .find(".fs-product-card")
    .map(function() {
      const $item = $(this);
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
          .prop("style")
          ["background-image"].replace(/^url\("|"\)$/g, ""),
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

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

export function searchPakNSave(query, key) {
  return searchFoodStuffs(
    `${process.env.VUE_APP_PAKNSAVE_PROXY}/Search?q=${encodeURIComponent(
      query
    )}&_=${key}`
  );
}

export function searchNewWorld(query, key) {
  return searchFoodStuffs(
    `${process.env.VUE_APP_NEWWORLD_PROXY}/Search?q=${encodeURIComponent(
      query
    )}&_=${key}`
  );
}

async function searchFoodStuffs(url) {
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

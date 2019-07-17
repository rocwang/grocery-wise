import jquery from "jquery";

async function searchCountDown(query) {
  const response = await fetch(
    `${
      process.env.VUE_APP_COUNTDOWN_PROXY
    }/shop/searchproducts?search=${encodeURIComponent(query)}`
  );
  const html = await response.text();
  const items = jquery(html).find(".gridProductStamp");
  const result = [];
  items.each(function() {
    const $item = jquery(this);

    result.push({
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
    });
  });

  return result;
}

function searchPakNSave(query) {
  return searchFoodStuffs(
    `${process.env.VUE_APP_PAKNSAVE_PROXY}/Search?q=${encodeURIComponent(
      query
    )}`
  );
}

function searchNewWorld(query) {
  return searchFoodStuffs(
    `${process.env.VUE_APP_NEWWORLD_PROXY}/Search?q=${encodeURIComponent(
      query
    )}`
  );
}

async function searchFoodStuffs(url) {
  const response = await fetch(url);
  const html = await response.text();
  const items = jquery(html).find(".fs-product-card");
  const result = [];
  items.each(function() {
    const $item = jquery(this);
    const product = $item.find(".js-product-card-footer").data("options");

    result.push({
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
    });
  });

  return result;
}

export async function search(query) {
  let result = null;

  try {
    const searchResults = await Promise.all([
      searchCountDown(query),
      searchNewWorld(query),
      searchPakNSave(query)
    ]);

    result = [
      {
        name: "Countdown",
        products: searchResults[0]
      },
      {
        name: "New World",
        products: searchResults[1]
      },
      {
        name: "Pak'nSave",
        products: searchResults[2]
      }
    ];
  } catch (e) {
    result = e.toString();
  }

  return result;
}

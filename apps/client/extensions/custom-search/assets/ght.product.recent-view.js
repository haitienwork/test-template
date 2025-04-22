const productCardTemplate = (
  product_card
) => `<div class="card-wrapper product-card-wrapper underline-links-hover">
  <div
    class="
      card card--standard
      card--media
    "
    style="--ratio-percent: 100%;"
  >
    <div class="card__inner color-scheme-2 gradient ratio" style="--ratio-percent: 100%;">
      <div class="card__media">
        <div class="media media--transparent media--hover-effect">
          <img
            srcset="
              ${product_card.featured_image} 165w,
              ${product_card.featured_image} 360w,
              ${product_card.featured_image} 533w,
              ${product_card.featured_image} 720w,
              ${product_card.featured_image} 940w,
              ${product_card.featured_image} 1066w,
              ${product_card.featured_image} 1600w
            "
            src="${product_card.featured_image}"
            sizes="(min-width: 1200px) 267px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
            alt="${product_card.featured_image.alt}"
            class="motion-reduce"
            loading="lazy"
            width="1600"
            height="1600"
          >
        </div>
      </div>
      <div class="card__content">
        <div class="card__information">
          <h3 class="card__heading">
            <a
              href="${product_card.url}"
              id="StandardCardNoMediaLink--${product_card.id}"
              class="full-unstyled-link"
              aria-labelledby="StandardCardNoMediaLink--${product_card.id} NoMediaStandardBadge--${product_card.id}"
            >
              ${product_card.title}
            </a>
          </h3>
        </div>
        <div class="card__badge bottom left"></div>
      </div>
    </div>
    <div class="card__content">
      <div class="card__information">
        <h3 class="card__heading h5" id="title--${product_card.id}">
          <a
            href="${product_card.url}"
            id="CardLink--${product_card.id}"
            class="full-unstyled-link"
            aria-labelledby="CardLink--${product_card.id} Badge--${product_card.id}"
          >
            ${product_card.title}
          </a>
        </h3>
        <div class="card-information">
          <span class="caption-large light"></span>
          <div class="price">
            <div class="price__container">
              <div class="price__regular">
                <span class="visually-hidden visually-hidden--inline">Regular price</span>
                <span class="price-item price-item--regular"> ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product_card.price)} </span>
              </div>
              <div class="price__sale">
                <span class="visually-hidden visually-hidden--inline">Regular price</span>
                <span> <s class="price-item price-item--regular"> </s> </span
                ><span class="visually-hidden visually-hidden--inline">Sale price</span>
                <span class="price-item price-item--sale price-item--last"> ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product_card.price)} </span>
              </div>
              <small class="unit-price caption hidden">
                <span class="visually-hidden">Unit price</span>
                <span class="price-item price-item--last">
                  <span></span>
                  <span aria-hidden="true">/</span>
                  <span class="visually-hidden">&nbsp;per&nbsp;</span>
                  <span> </span>
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>

      <div class="card__badge bottom left"></div>
    </div>
  </div>
</div>`;

async function renderRecentViewed() {
  const recentViewed = getRecentViewed();

  const allowClickToProduct = document
    .getElementById("ghtRecentViewed")
    .getAttribute("data-allow-click-to-product");

  const grid = document.getElementById("ghtGrid");
  grid.innerHTML = "";

  console.log("DEBUG: recentViewed", recentViewed);
  console.log("DEBUG: allowClickToProduct", allowClickToProduct);

  const maxProducts = grid.getAttribute("data-max-products");
  const productsHandle = recentViewed.slice(0, maxProducts).join(",");
  console.log(maxProducts, productsHandle.split(","));

  const productCards = await fetch(
    `http://localhost:8787/products?handles=${productsHandle}`
  );
  const products = await productCards.json();

  products.forEach((product) => {
    const productCard = productCardTemplate(product);
    grid.innerHTML += productCard;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    renderRecentViewed();
  }, 1000);
});

function renderRecentViewed() {
  const recentViewed = getRecentViewed();

  const allowClickToProduct = document.getElementById("ghtRecentViewed").getAttribute("data-allow-click-to-product");

  const grid = document.getElementById("ghtGrid");
  grid.innerHTML = "";

  console.log('DEBUG: recentViewed', recentViewed);
  console.log('DEBUG: allowClickToProduct', allowClickToProduct);

  recentViewed.forEach((product) => {
    const productCard = allowClickToProduct ? `<a href="/products/${product}">${product}</a>` : `<span>${product}</span>`;
    grid.innerHTML += productCard;
  });
  console.log('DEBUG: render recent viewed');
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    renderRecentViewed();
  }, 1000);
});

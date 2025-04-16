const searchOverlay = `<div class="search-overlay" id="search-overlay" style="z-index: 1000;">
  <div class="search-overlay-background" onclick="onClickOutsideSearchOverlay(event)"></div>
  <div class="search-container">
    <div class="search-input-wrapper">
      <span class="svg-wrapper search-icon" style="width: 26px; height: 26px;">
        <svg fill="none" class="icon icon-search" viewBox="0 0 18 19">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M11.03 11.68A5.784 5.784 0 1 1 2.85 3.5a5.784 5.784 0 0 1 8.18 8.18m.26 1.12a6.78 6.78 0 1 1 .72-.7l5.4 5.4a.5.5 0 1 1-.71.7z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
      <input
        type="text"
        class="search-input"
        id="search-input"
        placeholder="Search..."
        onkeyup="handleChangeSearchInput(event)"
      />
      <span class="close-search-icon" onclick="removeSearchOverlay()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z"
            fill="#5C5F62"
          ></path>
        </svg>
      </span>
    </div>
    <div id="search-results-container" class="search-results-container">
      <div id="search-results-title" class="search-results-title"></div>
      <div id="search-results-list" class="search-results-list"></div>
    </div>
  </div>
</div>`

// MOCK DATA
const TEMP_PRODUCTS = [
  {
    "image": "https://picsum.photos/200?random=1",
    "name": "The Complete Snowboard",
    "price": "100.000đ"
  },
  {
    "image": "https://picsum.photos/200?random=2",
    "name": "Urban Skater Deck",
    "price": "120.000đ"
  },
  {
    "image": "https://picsum.photos/200?random=3",
    "name": "Mountain Pro Board",
    "price": "150.000đ"
  },
  {
    "image": "https://picsum.photos/200?random=4",
    "name": "Classic Cruiser",
    "price": "90.000đ"
  },
  {
    "image": "https://picsum.photos/200?random=5",
    "name": "All-Terrain Snowboard",
    "price": "200.000đ"
  },
  {
    "image": "https://picsum.photos/200?random=6",
    "name": "Freestyle Board",
    "price": "130.000đ"
  },
  {
    "image": "https://picsum.photos/200?random=7",
    "name": "Backcountry Rider",
    "price": "170.000đ"
  },
  {
    "image": "https://picsum.photos/200?random=8",
    "name": "Lightweight Board",
    "price": "110.000đ"
  },
  {
    "image": "https://picsum.photos/200?random=9",
    "name": "Stunt Pro Deck",
    "price": "140.000đ"
  },
  {
    "image": "https://picsum.photos/200?random=10",
    "name": "Extreme Snowboard",
    "price": "180.000đ"
  }
]

const products = TEMP_PRODUCTS.map(product => ({
  name: product.name,
}));

// utils
const SELECTOR = {
  search_btn: ".header__search",
  search_overlay: "#search-overlay",
  search_container: "#search-results-container",
  title: "#search-results-title",
  list: "#search-results-list",
  suggestions_container: "#search-results-suggestions",
  suggestions_list: "#search-results-suggestions ul",
  input: "#search-input",
};

function selector(selector, parent = document) {
  return parent.querySelector(selector);
};

function debounce(callback, wait = 300) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
// utils end

// add search overlay
function addSearchOverlay() {
  document.body.insertAdjacentHTML('beforeend', searchOverlay);
}

// remove search overlay
function removeSearchOverlay() {
  const searchOverlay = document.getElementById('search-overlay');
  if (searchOverlay) {
    searchOverlay.remove();
  }
}

function onClickOutsideSearchOverlay(e) {
  removeSearchOverlay();
}

function addOverflowHidden() {
  const body = document.body;
  if (!body.classList.contains('overflow-hidden')) {
    setTimeout(() => {
      body.classList.add('overflow-hidden');
    }, 500);
  }
}

function getSuggestions(keyword) {
  const query = keyword.toLowerCase().trim();

  if (!query) return [];

  return products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
}

const elements = {
  suggestion_item: (keyword) => {
    return `
      <li class="suggestions-item">${keyword}</li>
    `;
  },
  product_item: (name, price) => {
    return `
      <li class="product-item">
        <img src="https://picsum.photos/200" alt="" />
        <p>${name}</p>
        <span>${price}</span>
      </li>
    `;
  }
}

const searchProducts = (keyword) => {
  return TEMP_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase().trim())
  );
}

const renderEmpty = () => {
  const container = selector(SELECTOR.search_container);
  const title = selector(SELECTOR.title, container);
  const list = selector(SELECTOR.list, container);

  title.innerHTML = "";
  list.innerHTML = "";
  container.style.display = "none";
}

const renderNotFound = (keyword) => {
  const container = selector(SELECTOR.search_container);
  const title = selector(SELECTOR.title, container);
  const list = selector(SELECTOR.list, container);
  title.style.display = "block";

  let titleText = `Sorry, nothing found for `;
  titleText += `<span>${keyword}</span>`;

  title.innerHTML = titleText;
  list.innerHTML = "";
  container.style.display = "block";
};

const hideNotFound = () => {
  const container = selector(SELECTOR.search_container);
  const title = selector(SELECTOR.title, container);

  title.style.display = "none";
  container.style.display = "block";
}

const handleChangeSearchInput = debounce((e) => {
  const keyword = e.target.value;
  if (!keyword) {
    renderEmpty();
    return;
  }
  // Step 1: Search products match with keyword
  const productFounds = searchProducts(keyword);
  // Step 2: Render Not found if no products found
  if (productFounds.length === 0) {
    renderNotFound(keyword);
    return
  }

  hideNotFound();

  const searchContainer = selector(SELECTOR.search_container);
  const searchResultsList = selector(SELECTOR.list, searchContainer);
  searchResultsList.innerHTML = "";

  // Step 3: Render suggestions if products found
  const suggestions = getSuggestions(keyword);
  const suggestionElement = document.createElement('div');
  suggestionElement.classList.add('search-results-suggestions');
  suggestionElement.id = 'search-results-suggestions';

  let html = '';
  // Append title
  html += `<p>Suggestions</p>`;
  // Append suggestions
  suggestions.forEach(suggestion => {
    html += elements.suggestion_item(suggestion.name);
  });
  suggestionElement.innerHTML = html;
  searchResultsList.appendChild(suggestionElement);

  // Step 4: Render results if products found
  const products = searchProducts(keyword);
  const productList = document.createElement('div');
  productList.id = 'search-results-results-list';
  productList.classList.add('search-results-results-list');
  html = `<div class="view-all-products">
      <p>Products</p>
      <a href="#">View All products</a>
    </div>`
  html += '<ul class="product-list">'
  products.forEach(product => {
    html += elements.product_item(product.name, product.price);
  });
  html += '</ul>';
  productList.innerHTML = html;
  searchResultsList.appendChild(productList);
}, 300);

// register event listeners
const registerEventListeners = () => {
  const searchBtn = selector(SELECTOR.search_btn);
  if (!searchBtn) return;

  searchBtn.addEventListener("click", addSearchOverlay);

  return () => {
    searchBtn.removeEventListener("click", addSearchOverlay);
  }
};

function init() {
  registerEventListeners();
}

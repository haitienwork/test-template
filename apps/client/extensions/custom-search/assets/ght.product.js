const RECENT_VIEWED_KEY = "ghtRecentViewed";
const MAX_RECENT_VIEWED = 15;

//* #region local storage utils
function setRecentViewed(items) {
  localStorage.setItem(RECENT_VIEWED_KEY, JSON.stringify(items));
}

function getRecentViewed() {
  const localRecentViewed = localStorage.getItem(RECENT_VIEWED_KEY);

  if (!localRecentViewed) return [];

  return JSON.parse(localRecentViewed);
}
// #endregion

//* Add a product to the recent viewed items
function addToRecentViewed(handle) {
  try {
    const recentViewed = getRecentViewed();

    if (recentViewed.includes(handle)) return;

    recentViewed.push(handle);

    if (recentViewed.length >= MAX_RECENT_VIEWED) {
      recentViewed.shift();
    }

    setRecentViewed(recentViewed);
  } catch (error) {
    //! Error while parsing the json.
    setRecentViewed([handle]);
  }
}

//* Each anchor with href clicked, add the product to the recent viewed items
function registerClickEventProduct() {
  const anchor = document.querySelectorAll('a[href^="/product"]');

  if (anchor) {
    anchor.forEach((a) => {
      a.addEventListener("click", function () {
        const url = new URL(a.href);
        const handle = url.pathname.split("/").pop();
        addToRecentViewed(handle);

        // TODO: Add tracking here
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //* Delay 1s for ensure the DOM is fully loaded even for dynamic content
  setTimeout(() => {
    registerClickEventProduct();
  }, 1000);
});

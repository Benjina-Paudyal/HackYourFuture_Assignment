// =============================================================================
// DATA & HELPERS
// =============================================================================

let currentListings = [];

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
 * Listing structure (each object in the listings array):
 *   type       {string}   – e.g. "House", "Apartment", "Shed", "Dorm", "Farm"
 *   facilities {string[]} – e.g. ["Parkering", "Have"]
 *   price      {number}   – 1–10000
 *   hasGarden  {boolean}
 *   size       {number}   – m², 12–1000
 *   img        {string}   – image URL
 *
 * Creates an array of random listing objects and assigns it to currentListings (global).
 * Returns the same array.
 */
function generateListings(numberOfListings) {
  const listings = [];
  const listingType = ["House", "Apartment", "Shed", "Dorm", "Farm"];
  const listingFacilities = [
    "Parkering",
    "Elevator",
    "Altan",
    "Have",
    "Husdyr",
  ];

  for (let i = 0; i < numberOfListings; i++) {
    const listing = {};
    const randomTypeIndex = randomIntFromInterval(0, listingType.length - 1);
    const numberOfFacilities = randomIntFromInterval(
      1,
      listingFacilities.length - 1,
    );
    const facilities = [];
    for (let j = 0; j < numberOfFacilities; j++) {
      const randomIndexFacilities = randomIntFromInterval(
        0,
        listingFacilities.length - 1,
      );
      const randomFacility = listingFacilities[randomIndexFacilities];
      if (!facilities.includes(randomFacility)) {
        facilities.push(randomFacility);
      }
    }
    listing.type = listingType[randomTypeIndex];
    listing.facilities = facilities;
    listing.price = randomIntFromInterval(1, 10000);
    listing.hasGarden = Boolean(randomIntFromInterval(0, 1));
    listing.size = randomIntFromInterval(12, 1000);
    listing.img = `https://loremflickr.com/200/200/${listing.type}`;
    listings.push(listing);
  }

  currentListings = listings;

  return listings;
}

// =============================================================================
// RENDER HELPERS (already implemented)
// =============================================================================

/**
 * Build one card element for a single listing.
 */
function renderListingCard(listing) {
  const card = document.createElement("div");
  card.className = "card";
  const badgeClass = function (f) {
    return f === "Have" ? " garden" : "";
  };
  const badgesHtml = listing.facilities
    .map(function (f) {
      return '<span class="badge' + badgeClass(f) + '">' + f + "</span>";
    })
    .join("");
  card.innerHTML =
    '<div class="card-image">' +
    (listing.img
      ? '<img src="' + listing.img + '" alt="" loading="lazy">'
      : listing.type) +
    "</div>" +
    '<div class="card-body">' +
    '<div class="card-type">' +
    listing.type +
    "</div>" +
    '<div class="card-price">' +
    listing.price.toLocaleString() +
    " kr</div>" +
    '<div class="card-meta">' +
    listing.size +
    " m²" +
    (listing.hasGarden ? " · Garden" : "") +
    "</div>" +
    '<div class="card-facilities">' +
    badgesHtml +
    "</div>" +
    "</div>";
  return card;
}

/**
 * Update count and empty state, clear #cards. Returns the container or null if no listings.
 */
function prepareListingsView(listings) {
  const container = document.getElementById("cards");
  const countEl = document.getElementById("count");
  const emptyEl = document.getElementById("empty");

  countEl.textContent =
    listings.length + " listing" + (listings.length !== 1 ? "s" : "");

  if (listings.length === 0) {
    container.innerHTML = "";

    if (emptyEl) {
      emptyEl.textContent = "No listings.";
      emptyEl.style.display = "block";
    }

    return null;
  }

  if (emptyEl) {
    emptyEl.style.display = "none";
  }

  container.innerHTML = "";

  return container;
}

/**
 * Display an array of numbers in a given element (e.g. #prices or #expensive-prices).
 * Clears the element and shows the numbers as comma-separated text.
 */
function renderNumbersInElement(numbers, elementId) {
  const el = document.getElementById(elementId);

  el.innerHTML = "";
  el.textContent = numbers.length === 0 ? "" : numbers.join(", ");
}

// =============================================================================
// ADVANCED FILTERS HELPERS
// =============================================================================

/**
 * Read Advanced filters form and return a filter object. Only includes set values.
 */
function getFilterFromForm() {
  const type = document.getElementById("advType").value || undefined;
  const minPriceRaw = document.getElementById("advMinPrice").value;
  const minPrice = minPriceRaw === "" ? undefined : parseInt(minPriceRaw, 10);
  const minSizeRaw = document.getElementById("advMinSize").value;
  const minSize = minSizeRaw === "" ? undefined : parseInt(minSizeRaw, 10);
  const hasGarden =
    document.getElementById("advHasGarden").checked || undefined;
  const facilityCheckboxes = document.querySelectorAll(
    'input[name="advFacility"]:checked',
  );
  const facilities = Array.from(facilityCheckboxes).map(function (cb) {
    return cb.value;
  });

  const filter = {};

  if (type) {
    filter.type = type;
  }

  if (minPrice != null && !isNaN(minPrice)) {
    filter.minPrice = minPrice;
  }

  if (minSize != null && !isNaN(minSize)) {
    filter.minSize = minSize;
  }

  if (hasGarden) {
    filter.hasGarden = true;
  }

  if (facilities.length > 0) {
    filter.facilities = facilities;
  }

  return filter;
}

function applyAdvancedFilters() {
  const filter = getFilterFromForm();
  const filtered = filterListings(currentListings, filter);

  renderListings(filtered);
}

// =============================================================================
// TASKS (implement the functions below – search for Task N)
// =============================================================================

/*
 * Task 1. Implement two things:
 *
 * 1. generateAndRenderListings: call generateListings(37) (it generates listings for further use), then
 *    call renderListings(currentListings).
 *
 * 2. renderListings: use prepareListingsView(listings) first; if it returns null, return.
 *    Otherwise use the returned container: call listings.forEach(function (listing) { ... })
 *    and append renderListingCard(listing) to the container.
 */
function generateAndRenderListings() {
  /*
   * Task 1.1: call generateListings(37) to generate the data, then call renderListings(currentListings) to render it
   */
}

function renderListings(listings) {
  const container = prepareListingsView(listings);

  if (!container) {
    return;
  }

  /*
   * Task 1.2: add listings.forEach(...) here and append renderListingCard(listing) to container
   */
}

/*
 * Task 2. Implement showPrices using map: create an array of prices from listings
 * (one price per listing), then call renderNumbersInElement(prices, "prices").
 */
function showPrices(listings) {
  /*
   * Task 2: use map to get an array of prices from listings, then renderNumbersInElement(prices, "prices")
   */
}

/*
 * Task 3. Implement three filter functions:
 *
 * 3a. showCheapListings: use filter to get listings that are "cheap" (you define the condition, e.g. price below a number).
 *     Result: array of **objects**. Call renderListings with that array.
 *
 * 3b. showExpensivePrices: use filter to get expensive listings, then use map to get an array of their prices (numbers).
 *     Result: array of **numbers**. Call renderNumbersInElement(prices, "expensive-prices").
 *
 * 3c. showListingsWithParking: use filter to get listings that have "Parkering" in facilities.
 *     Result: array of **objects**. Call renderListings with that array.
 */
function showCheapListings(listings) {
  /*
   * Task 3a: use filter on listings for cheap (e.g. by price), then renderListings(...)
   */
}

function showExpensivePrices(listings) {
  /*
   * Task 3b: use filter on listings for expensive, then map to prices, then renderNumbersInElement(prices, "expensive-prices")
   */
}

function showListingsWithParking(listings) {
  /*
   * Task 3c: use filter on listings for "Parkering" in facilities, then renderListings(...)
   */
}

/*
 * Task 4. Implement filterListings(listings, filter).
 *
 * The filter object (built from the Advanced filters form) can have these properties. Omit a property
 * if the user left the field empty or unchecked – in that case, do not filter by it.
 *
 *   filter.type       {string}   – listing.type must equal this (e.g. "Farm", "House").
 *   filter.minPrice   {number}   – listing.price must be >= filter.minPrice.
 *   filter.minSize    {number}   – listing.size must be >= filter.minSize (m²).
 *   filter.hasGarden  {boolean}  – if true, listing.hasGarden must be true.
 *   filter.facilities {string[]} – listing.facilities must include every string in this array
 *                                  (e.g. ["Parkering", "Have"] means the listing must have both).
 *
 * Return only listings that match every present filter property.
 */
function filterListings(listings, filter) {
  /*
   * Task 4: return listings that match every key in filter (see comment above for format)
   */
  return listings;
}

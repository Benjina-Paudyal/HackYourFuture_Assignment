# Listings demo – forEach, map, filter

Exercise for **trainees** (Week 1). Generate random listings, render them as cards, then use `.forEach()`, `.map()`, and `.filter()` to show prices and apply filters. All implemented code is at the top of `index.js`; your tasks are at the bottom.

## Files

| File           | Purpose                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **index.js**   | Main file. Implement the task functions (search for `Task`).                                                                                      |
| **index.html** | Page with Generate button, Show prices, filters, advanced filters form, and result areas. Buttons pass `currentListings` into the task functions. |
| **style.css**  | Styles for cards and layout.                                                                                                                      |

## Where to find tasks

Search for **`Task`** (e.g. Task 1.1, Task 2) in `index.js`. Each task has a comment with explicit instructions. More on these tasks: [Exercises](https://github.com/HackYourFuture-CPH/program/blob/main/courses/frontend/advanced-javascript/week1/session-materials/exercises.md).

## How the code works

### Main HTML elements

Each button is labeled with its task number in the UI.

| Element                             | Task | Action                                                                         | Output                |
| ----------------------------------- | ---- | ------------------------------------------------------------------------------ | --------------------- |
| **Generate listings (37) — Task 1** | 1    | `generateAndRenderListings()`                                                  | **#cards**            |
| **Show prices — Task 2**            | 2    | `showPrices(currentListings)`                                                  | **#prices**           |
| **Cheap listings — Task 3a**        | 3a   | `showCheapListings(currentListings)`                                           | **#cards**            |
| **Expensive prices — Task 3b**      | 3b   | `showExpensivePrices(currentListings)`                                         | **#expensive-prices** |
| **With parking — Task 3c**          | 3c   | `showListingsWithParking(currentListings)`                                     | **#cards**            |
| **Apply filters — Task 4**          | 4    | `applyAdvancedFilters()` (form: type, min price, min size, facilities, garden) | **#cards**            |

Other elements: **#count** (listing count), **#empty** (empty state message).

### Implemented functions (top of index.js)

- **generateListings(numberOfListings)** – builds random listings (see Data structures below), sets `currentListings` internally, returns the array.
- **renderListingCard(listing)** – builds one card DOM element.
- **prepareListingsView(listings)** – clears `#cards`, updates count/empty; returns container or `null`.
- **renderNumbersInElement(numbers, elementId)** – clears the element and shows the numbers as comma-separated text (use `"prices"` or `"expensive-prices"` for elementId).
- **getFilterFromForm()** – reads the advanced form into a filter object.
- **applyAdvancedFilters()** – gets filter, calls `filterListings(currentListings, filter)`, then `renderListings(filtered)`.

## Data structures

**Listing** (each object in the generated array):

| Property     | Type     | Description                                                 |
| ------------ | -------- | ----------------------------------------------------------- |
| `type`       | string   | e.g. `"House"`, `"Apartment"`, `"Shed"`, `"Dorm"`, `"Farm"` |
| `facilities` | string[] | e.g. `["Parkering", "Have"]`                                |
| `price`      | number   | 1–10000                                                     |
| `hasGarden`  | boolean  |                                                             |
| `size`       | number   | m², 12–1000                                                 |
| `img`        | string   | image URL                                                   |

**Filter** (object passed to `filterListings`; built from the Advanced filters form; only set fields are present):

| Property     | Type     | Meaning                                                       |
| ------------ | -------- | ------------------------------------------------------------- |
| `type`       | string   | `listing.type` must equal this.                               |
| `minPrice`   | number   | `listing.price` must be ≥ this.                               |
| `minSize`    | number   | `listing.size` must be ≥ this (m²).                           |
| `hasGarden`  | boolean  | If `true`, `listing.hasGarden` must be `true`.                |
| `facilities` | string[] | `listing.facilities` must include every string in this array. |

If a filter property is missing, do not filter by it. Return listings that match every present property.

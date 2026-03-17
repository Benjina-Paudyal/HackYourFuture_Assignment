// Exercise 1: Stock by Caffeine Level

import { teas } from "../data/teas.js";

function stockByCaffeine(teas) {
  return teas.reduce((acc, tea) => {
    if (!tea.inStock) return acc;

    const level = tea.caffeineLevel;

    if (!acc[level]) {
      acc[level] = 0;
    }

    acc[level] += tea.stockCount;

    return acc;
  }, {});
}

console.log(stockByCaffeine(teas));

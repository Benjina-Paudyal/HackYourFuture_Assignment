// Exercise 2 : Inventory report

import { teas } from "../data/teas.js";

function inventoryReport(teas) {
  const totalTeas = teas.length;
  const inStock = teas.filter(tea => tea.inStock).length;
  const outOfStock = totalTeas - inStock;
  const totalInventoryValue = Number(
    teas
      .reduce((total, tea) => total + tea.pricePerGram * tea.stockCount, 0)
      .toFixed(2),
  );
  const averagePrice = Number((totalInventoryValue / totalTeas).toFixed(2));

  return {
    totalTeas,
    inStock,
    outOfStock,
    totalInventoryValue,
    averagePrice,
  };
}

console.log(inventoryReport(teas));

// Exercise 3: Sequential Processing

import { teas } from "../data/teas.js";
import { validateOrder, calculateTotal, checkStock } from "./exercise2.js";

const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

function processOrder(order) {
  console.log("Processing order", order.id);

  validateOrder(order, (validation) => {
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");

    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");

      checkStock(order, (stock) => {
        if (!stock.inStock) {
          console.log("Stock shortages:", stock.shortages);
        } else {
          console.log("All items are in the stock");
        }

        console.log("Order processing completed");
      });
    });
  });
}

processOrder(order);

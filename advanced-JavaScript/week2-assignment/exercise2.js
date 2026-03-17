// Exercise 2: Order Processing System

import { teas } from "../data/teas.js";

const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

function validateOrder(order, callback) {
  setTimeout(() => {
    const errors = order.items
      .filter((item) => !teas.find((t) => t.id === item.teaId))
      .map((item) => `Tea Id ${item.teaId} does not exist.`);

    callback({ valid: errors.length === 0, errors });
  }, 200);
}

function calculateTotal(order, callback) {
  setTimeout(() => {
    const total = order.items.reduce((sum, item) => {
      const tea = teas.find((t) => t.id === item.teaId);
      return tea ? sum + tea.pricePerGram * item.grams : sum;
    }, 0);

    callback({ orderId: order.id, total });
  }, 300);
}

function checkStock(order, callback) {
  setTimeout(() => {
    const shortages = [];

    order.items.forEach((item) => {
      const tea = teas.find((t) => t.id === item.teaId);
      if (!tea) return;
      if (tea.stockCount < item.grams) {
        shortages.push(
          `Not enough ${tea.name}: requested ${item.grams}, in stock ${tea.stockCount}`,
        );
      }
    });
    callback({
      orderId: order.id,
      inStock: shortages.length === 0,
      shortages,
    });
  }, 400);
}

//test
validateOrder(order, (result) => {
  console.log("Validation result:", result);
});

calculateTotal(order, (result) => {
  console.log("Total price:", result);
});

checkStock(order, (result) => {
  console.log("Stock check:", result);
});

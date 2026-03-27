import { calculateOrderTotal } from "./exercise3.js";
import { checkOrderStock } from "./exercise4.js";

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function processOrder(items) {
  console.log("Processing order...\n");

  // Validate items exist
  console.log("1. Validating items...");
  const res = await fetch(`${API_BASE}/teas`);
  if (!res.ok) throw new Error("Failed to fetch teas.");
  const teas = await res.json();

  for (const item of items) {
    const exists = teas.find((t) => t.id === item.teaId);
    if (!exists) {
      throw new Error(`Tea with ID ${item.teaId} does not exist`);
    }
  }

  // Check stock
  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    console.log("Shortages:");
    stockResult.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
    throw new Error("Items out of stock");
  }

  // Calculate total
  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items);

  // Create order summary
  console.log("4. Creating summary...\n");
  return {
    items: items.length,
    total,
    status: "ready",
  };
}


// Test
const myOrder = [
  { teaId: 1, grams: 50 },
  { teaId: 5, grams: 100 },
];

processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });

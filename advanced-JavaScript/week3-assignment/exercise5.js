const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// exercise3
async function calculateOrderTotal(items) {
  const response = await fetch(`${API_BASE}/teas`);
  if (!response.ok) throw new Error("Failed to fetch teas.");

  const allTeas = await response.json();

  return items.reduce((sum, item) => {
    const tea = allTeas.find((t) => t.id === item.teaId);
    if (!tea) throw new Error(`Tea Id ${item.teaId} missing`);
    return sum + tea.pricePerGram * item.grams;
  }, 0);
}

// exercise4
async function checkOrderStock(items) {
  const response = await fetch(`${API_BASE}/inventory`);
  if (!response.ok) throw new Error("Could not fetch inventory.");

  const allInventory = await response.json();

  const shortages = items
    .map((item) => {
      const stockInfo = allInventory.find((i) => i.teaId === item.teaId);

      if (!stockInfo) {
        return {
          name: `Unknown Tea (Id: ${item.teaId})`,
          needed: item.grams,
          available: 0,
        };
      }

      if (stockInfo.stockCount < item.grams) {
        return {
          name: stockInfo.teaName,
          needed: item.grams,
          available: stockInfo.stockCount,
        };
      }

      return null;
    })
    .filter(Boolean);

  return {
    inStock: shortages.length === 0,
    shortages,
  };
}

// exercise5
async function processOrder(items) {
  console.log("Processing order...\n");

  // Step 1: Validate items exist
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

  // Step 2: Check stock
  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    console.log("Shortages:");
    stockResult.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
    throw new Error("Items out of stock");
  }

  // Step 3: Calculate total
  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items);

  // Step 4: Create order summary
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

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function checkOrderStock(items) {
  const response = await fetch(`${API_BASE}/inventory`);
  if (!response.ok) {
    throw new Error("Could not fetch inventory.");
  }

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
      } else if (stockInfo.stockCount < item.grams) {
        return {
          name: stockInfo.teaName,
          needed: item.grams,
          available: stockInfo.stockCount,
        };
      }
      // enough stock
      return null;
    })
    // remove null from the array
    .filter((s) => s !== null);

  return {
    inStock: shortages.length === 0,
    shortages,
  };
}


// Test
const largeOrder = [
  { teaId: 1, grams: 100 },
  { teaId: 2, grams: 500 },
  { teaId: 3, grams: 9999 },
];

checkOrderStock(largeOrder).then((result) => {
  if (result.inStock) {
    console.log("All items in stock!");
  } else {
    console.log("Shortages:");
    result.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
  }
});

// SUMMARY : Check every order item, keep only the ones with problems, and return them as shortages.
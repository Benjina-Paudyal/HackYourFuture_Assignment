const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function getTeaDetails(id) {
    // fetch in parallel
      const [teaResponse, inventoryResponse] = await Promise.all([
      fetch(`${API_BASE}/teas/${id}`),
      fetch(`${API_BASE}/inventory/${id}`),
    ]);

    if (!teaResponse.ok) throw new Error(`Tea ${id} not found`);
    if (!inventoryResponse.ok)  throw new Error(`Inventory for tea ${id} not found`);
    
    // parse JSON in parallel
    const [tea, inventory] = await Promise.all([
      teaResponse.json(),
      inventoryResponse.json(),
    ]);

    return {...tea, stock: inventory.stockCount };
  }


//Test
getTeaDetails(1).then((tea) => {
  console.log(`${tea.name} (${tea.origin})`);
  console.log(`Price: ${tea.pricePerGram} DKK/gram`);
  console.log(`Stock: ${tea.stock} grams`);
  console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
});

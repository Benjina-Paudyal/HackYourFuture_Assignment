const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function searchTeas(query) {
  try {
    const response = await fetch(`${API_BASE}/teas`);
    if (!response.ok) throw new Error("Faied to fetch teas.");

    const teas = await response.json();

    const filtered = teas.filter((tea) =>
      tea.name.toLowerCase().includes(query.toLowerCase()),
    );

    return filtered;
  } catch (error) {
    console.error("Error searching teas:", error);
    return [];
  }
}

// Test
searchTeas("pearl").then((teas) => {
  console.log("Search results for 'pearl':");
  teas.forEach((tea) => console.log(`- ${tea.name}`));
});

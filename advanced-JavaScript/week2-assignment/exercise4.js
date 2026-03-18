// Exercise 4: Inventory Aggregation from File

import { teas } from "../data/teas.js";
import fs from "fs";

function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    // Parse JSON file
    let updates;
    try {
      updates = JSON.parse(data);
    } catch (err) {
      callback(err, null);
      return;
    }

    //  Calculate net changes
    const netChange = updates.reduce((acc, update) => {
      acc[update.teaId] = (acc[update.teaId] || 0) + update.change;
      return acc;
    }, {});

    // Build the report
    const report = teas.map((tea) => {
      const change = netChange[tea.id] || 0;
      const now = tea.stockCount + change;
      return `- ${tea.name}: was ${tea.stockCount}, change ${change >= 0 ? "+" : ""}${change}, now ${now}${now < 0 ? " (NEGATIVE!)" : ""}`;
    });

    callback(null, report);
  });
}

// Run the report
generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }
  console.log(report);
});

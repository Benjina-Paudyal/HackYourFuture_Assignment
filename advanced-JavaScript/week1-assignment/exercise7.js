// Exercise 7 : Count by Type (Optional)

import { teas } from "../data/teas.js";

const countByType = teas.reduce((counts, tea) => {
  if (counts[tea.type]) {
    counts[tea.type] += 1;
  } else {
    counts[tea.type] = 1;
  }
  return counts;
}, {});

console.log(countByType);

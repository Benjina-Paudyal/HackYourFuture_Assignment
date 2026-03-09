import { teas } from "../data/teas.js";

// Exercise 1
const result = teas
  .filter((tea) => tea.caffeineLevel !== "none")
  .map((tea) => tea.name.toUpperCase());

console.log(result);

// Exercise 1 : Rewrite with array methods

import { teas } from "../data/teas.js";

const result = teas
  .filter(tea => tea.caffeineLevel !== "none")
  .map(tea => tea.name.toUpperCase());

console.log(result);

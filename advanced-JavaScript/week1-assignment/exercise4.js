// Exercise 4: Teas by Origin

import { teas } from "../data/teas.js";

function teasByOrigin(teas) {
  return teas.reduce((result, tea) => {
    if (result[tea.origin]) {
      result[tea.origin].push(tea.name);
    } else {
      result[tea.origin] = [tea.name];
    }
    return result;
  }, {});
}

console.log(teasByOrigin(teas));

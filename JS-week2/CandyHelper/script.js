// Store the price of the candy
const boughtCandyPrices = [];

function addCandy(candyType, weight) {
  let pricePerGram;

  if (candyType === "sweet") {
    pricePerGram = 0.5;
  } else if (candyType === "chocolate") {
    pricePerGram = 0.7;
  } else if (candyType === "toffee") {
    pricePerGram = 1.1;
  } else if (candyType === "chewing-gum") {
    pricePerGram = 0.03;
  } else {
    console.log("Unknown cnady, not available. Sorry :(");
    return;
  }

  // Calculate total price and add it to the price array
  const totalPrice = pricePerGram * weight;
  boughtCandyPrices.push(totalPrice);

  // Random amount to spend to buy candys
  const amountToSpend = Math.random() * 100;

  // To check if more candy can be bought?
  function canBuyMoreCandy() {
    let totalSpent = 0;

    for (let i = 0; i < boughtCandyPrices.length; i++) {
      totalSpent = totalSpent + boughtCandyPrices[i];
    }
  }

  return totalSpent < amountToSpend; // returning boolean value
}

addCandy("sweet", 20);
addCandy("chocolate", 30);
addCandy("tofee", 60);

if (canBuyMoreCandy()) {
  console.log("You can buy more, so please do!");
} else {
  console.log("Enough candy for you!");
}

const getHouseBtn = document.getElementById("getHouseBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const nameInput = document.getElementById("nameInput");
const result = document.getElementById("result");

const houses = [
  {
    name: "Gryffindor",
    color: "#FF2400",
    description: "Brave and daring, always ready to face challenges!",
  },
  {
    name: "Hufflepuff",
    color: "#a58d04ff",
    description: "Loyal and hardworking, kind to everyone around you.",
  },
  {
    name: "Ravenclaw",
    color: "#00008B",
    description: "Wise and creative, with a thirst for knowledge.",
  },

  {
    name: "Slytherin",
    color: "#006400",
    description: "Cunning and ambitious, always aiming high.",
  },
];

let lastHouseIndex = -1; // Initialized to -1 as no house has been picked yet

function giveHouse() {
  const name = nameInput.value.trim();

  if (name === "") {
    result.textContent = "Please enter your name.";
    result.style.color = "black";
    return;
  }

  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * houses.length);
  } while (randomNumber === lastHouseIndex);

  lastHouseIndex = randomNumber;
  const house = houses[randomNumber];

  result.textContent = `${name} belongs in ${house.name}! ${house.description}`;
  result.style.color = house.color;

  tryAgainBtn.style.display = "inline-block";
  getHouseBtn.disabled = true;
}

// Initial state
tryAgainBtn.style.display = "none";

getHouseBtn.addEventListener("click", giveHouse);
tryAgainBtn.addEventListener("click", giveHouse);

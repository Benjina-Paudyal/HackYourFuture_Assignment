
let firstWords = ["Easy", "Awesome", "Smart", "Good", "Bright", "Quick", "Cool", "Epic", "Alpha", "Crazy"];
let secondWords = ["Tech", "Noodle", "Unicorn", "Corp", "Monkey", "Systems", "Logic", "Hub", "Sloth", "World"];

const randomNumber1 = Math.floor(Math.random() * 10); 
const randomNumber2 = Math.floor(Math.random() * 10); 

let startupName = firstWords[randomNumber1] + " " + secondWords[randomNumber2];

console.log(`The startup: "${startupName}" contians ${startupName.length} characters`);
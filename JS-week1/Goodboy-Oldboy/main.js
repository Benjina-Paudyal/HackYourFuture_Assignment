let dogYearOfBirth = 2016;
let dogYearFuture = 2030;

// Conversion factor: 1 human year = 7 dog years, rough estimate just for fun 😄😊
let dogYear = 7; 

let shouldShowResultInDogYears = true; // true = dog years; false = human years

let ageInHumanYears = dogYearFuture - dogYearOfBirth;
let ageInDogYears = ageInHumanYears * dogYear;

if (shouldShowResultInDogYears) {
    console.log(`Your dog will be ${ageInDogYears} human years old in ${dogYearFuture}.`);
} else {
    console.log (`Your dog will be ${ageInHumanYears} dog years old in ${dogYearFuture}.`);
}
 // OPTION 1: VERY SIMPLE APPROACH

// Peter's house details
let peter = {
    width: 8,
    depth: 10,
    height: 10,
    garden: 100,
    paid_Price: 2_500_000
};
let peterVolume= peter.width * peter.depth * peter.height ;


// Julia's house details
let julia = {
    width: 5,
    depth: 11,
    height: 8,
    garden: 70,
    paid_Price: 1_000_000
};

let juliaVolume= julia.width * julia.depth * julia.height ;

//Estimated price
let peterEstimatedPrice = peterVolume * 2.5 * 1000 + peter.garden * 300;
let juliaEstimatedPrice = juliaVolume * 2.5 * 1000 + julia.garden * 300;

// check Peter
if (peter.paid_Price > peterEstimatedPrice) {
    console.log(`Peter is paying too much. The estimated price is ${peterEstimatedPrice}.`);
} else if (peter.paid_Price < peterEstimatedPrice) {
    console.log(`Peter is paying too little. The estimated price is ${peterEstimatedPrice}.`);
} else {
    console.log(`Peter is paying the correct price. The estimated price is ${peterEstimatedPrice}.`);
}

// check Julia
if (julia.paid_Price > juliaEstimatedPrice) {
    console.log(`Julia is paying too much. The estimated price is ${juliaEstimatedPrice}.`);
} else if (julia.paid_Price < juliaEstimatedPrice) {
    console.log(`Julia is paying too little. The estimated price is ${juliaEstimatedPrice}.`);
} else {
    console.log(`Julia is paying the correct price. The estimated price is ${juliaEstimatedPrice}.`);
}





// OPTION2 : BEST APPROACH : DRY

// Houses array
let houses = [
    {
        name: "Peter",
        width: 8,
        depth: 10,
        height: 10,
        garden: 100,
        paid_Price: 2_500_000
    },
    {
        name: "Julia",
        width: 5,
        depth: 11,
        height: 8,
        garden: 70,
        paid_Price: 1_000_000
    }
];

// Loop through each house
for (let i = 0; i < houses.length; i++) {
    let house = houses[i];
    let volume = house.width * house.depth * house.height;
    let estimatedPrice = volume * 2.5 * 1000 + house.garden * 300;

    if (house.paid_Price > estimatedPrice) {
        console.log(`${house.name} is paying too much.The estimated price is ${estimatedPrice}.`);
    } else if (house.paid_Price < estimatedPrice) {
        console.log(`${house.name} is paying too little.The estimated price is ${estimatedPrice}.`);
    } else {
        console.log(`${house.name} is paying the correct price.The estimated price is${estimatedPrice}.`);
    }
}

function clothesToWear(temperature) {
    if (temperature <= 0) {
        return 'thick winter jacket, woolen hats, gloves, scarf';
    } else if (temperature <= 10) {
        return 'jacket and warm clothes';
    } else if (temperature <= 20) {
        return 'light jacket or sweater or hoodies, pants';
    } else if ( temperature <= 30 ){
        return 'shorts, t-shirt';
    } else {
        return 'light cotton clothes, sunglasses, sunscreen, water'
    }
}

const clothes1 = clothesToWear(-10);
const clothes2 = clothesToWear(9);
const clothes3 = clothesToWear(15);
const clothes4 = clothesToWear(28);
const clothes5 = clothesToWear(35);

console.log(clothes1);
console.log(clothes2);
console.log(clothes3);
console.log(clothes4);
console.log(clothes5);



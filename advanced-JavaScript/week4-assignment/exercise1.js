import { teas } from "./data/teas.js"

export class Tea {
    constructor(name, type, origin, pricePerGram, organic) {
        if(!name || typeof name!== "string"){
            throw new Error("Name is required");
        }

        const allowedTypes = ["green", "black", "herbal", "oolong", "white"];
        if(!allowedTypes.includes(type)) {
            throw new Error(`Invalid type: ${type}`);
        }

        if(typeof pricePerGram !== "number" || pricePerGram <= 0) {
            throw new Error("pricePerGram must be a positive number");
        }

        this.name = name;
        this.type = type;
        this.origin = origin;
        this.pricePerGram = pricePerGram;
        this.organic = organic;
    }

    priceFor(grams) {
       return this.pricePerGram * grams; 
    }

    describe () {
        const price = (this.pricePerGram * 100).toFixed(2);
        const organicLabel = this.organic ? " [organic]" : "";
        return `${this.name} (${this.type}) from ${this.origin} - ${price} DKK/100g${organicLabel}`
    }

    static fromObject(obj) { // static: call it on the class itself, not on an instance
       return new Tea(
        obj.name,
        obj.type,
        obj.origin,
        obj.pricePerGram,
        obj.organic
       ); 
    }
}

// Test validation:
try {
  new Tea("", "green", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} 

try {
  new Tea("Test", "purple", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} 

// Test factory method:
const teaInstances = teas.map(Tea.fromObject);
console.log(teaInstances.length); 
console.log(teaInstances[0].describe());
console.log(teaInstances[1].describe());
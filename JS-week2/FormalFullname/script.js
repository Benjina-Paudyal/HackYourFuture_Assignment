function getFullName(firstName, surName, gender, useFormalName = false) {
  if (!firstName && !surName) return "Unknown name";

  let fullName = `${firstName} ${surName}`;

  if (useFormalName) {
    const title = gender === "female" ? "Lady" : "Lord";
    fullName = `${title} ${fullName}`;
  }
  return fullName;
}

const name1 = getFullName ('John', 'Doe', 'male', true); 
const name2 = getFullName ('Jane', 'Smith','female', true);
const name3 = getFullName ('Harry', 'Porter','male', false ); 
const name4 = getFullName ('', '','female',true,);
const name5 = getFullName ('Tom', 'Hanks', 'male'); 

console.log(name1); // Lord John Doe
console.log(name2); // Lady Jane Smith
console.log(name3); // Harry Porter
console.log(name4); // Unknown name
console.log(name5); // Tom Hanks
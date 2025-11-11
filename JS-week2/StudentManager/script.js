const class07Students = [];

function addStudentToClass(studentName) {
  // empty string is not allowed
  if (!studentName) {
    console.log("Please provide the name of the student.");
    return;
  }

  // Check if the student already exists
  if (class07Students.includes(studentName)) {
    console.log(`Student ${studentName} is already in the class.`);
    return;
  }

  // Always allow the Queen to be added
  if (studentName === "Queen") {
    class07Students.push(studentName);
    return;
  }

  // Limit the students number to 6
  if (class07Students.length >= 6) {
    console.log("Cannot add more students to this class.");
    return;
  }

  // Adding student
  class07Students.push(studentName);
}

function getNumberOfStudents() {
  return class07Students.length;
}

addStudentToClass(""); // Empty string not allowed
addStudentToClass("Abi");
addStudentToClass("Abir");
addStudentToClass("Ela");
addStudentToClass("Ela"); // Student with the name 'Ela' already exists
addStudentToClass("Hiwot");
addStudentToClass("Iris");
addStudentToClass("Iryna");
addStudentToClass("Jessie"); // Class is full
addStudentToClass("Queen"); // Queen always gets added

console.log(class07Students); // Expected output: ['Abi', 'Abir', 'Ela', 'Hiwot', 'Iris', 'Iryna', 'Queen']

const totalStudents = getNumberOfStudents();

console.log("Total students: ", totalStudents); // Expected output: 7

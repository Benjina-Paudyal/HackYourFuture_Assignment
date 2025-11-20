const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

function getTravelTime(travelInfo) {
  const speed = travelInfo.speed;
  const distance = travelInfo.destinationDistance;

  const totalHours = distance / speed;

  const hours = Math.floor(totalHours); // Math.floor: always goes down -> keeps the integer part
  const minutes = Math.round((totalHours - hours) * 60); // Math.round: looks at decimal -> 0.5 or higher rounds up

  return `${hours} hours and ${minutes} minutes`;
}

const travelTime = getTravelTime(travelInformation);
console.log(travelTime);

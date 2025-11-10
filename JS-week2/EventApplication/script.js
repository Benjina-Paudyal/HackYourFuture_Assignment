
function getEventWeekday(daysFromToday) {
    const days = ['Sunday', 'Mondayy', 'Tuesday', 'Wednesday' , 'Thursday' , 'Friday', 'Saturday'];
    const todayIndex = new Date().getDay();
    const eventIndex = ( todayIndex + daysFromToday ) % 7;

    return days[eventIndex];
}

const event1 = getEventWeekday(5);
const event2 = getEventWeekday(2);

console.log(event1); // Saturday
console.log(event2); // Wednesday
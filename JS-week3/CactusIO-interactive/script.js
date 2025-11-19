const activities = [];
const usageLimit = 60;

function addActivity(date, activity, duration) {
  activities.push({
    date: date,
    activity: activity,
    duration: duration,
  });
}

function showStatus() {
  if (activities.length === 0) {
    return `Add some activities before calling showStatus`;
  }

  const numberOfActivities = activities.length;

  let totalDuration = 0;
  for (let i = 0; i < activities.length; i++) {
    totalDuration = totalDuration + activities[i].duration;
  }

  if (totalDuration > usageLimit) {
    return `You have reached your limit, no more smartphoning for you!`;
  }

  return `You have added ${numberOfActivities} activities. They amount to ${totalDuration} min. of usage`;
}

console.log(activities);

addActivity("19/11-25", "Facebook", 15);
addActivity("19/11/25", "Instagram", 20);
console.log(showStatus()); // You have added 2 activities. They amount to 35 min. of usage

addActivity("19/11-25", "Youtube", 50);
console.log(showStatus()); // You have reached your limit, no more smartphoning for you!





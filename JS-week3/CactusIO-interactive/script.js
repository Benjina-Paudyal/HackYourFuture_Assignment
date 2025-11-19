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

/***************************************        Extra feature    ************************************/

const activities1 = [];

// Activity with automatic date

function addActivity1(activity, duration) {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // months : 0 -11
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}-${year}`;

  activities1.push({
    date: formattedDate,
    activity: activity,
    duration: duration,
  });
}

function showStatusToday() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const todayDate = `${day}/${month}-${year}`;

  const todaysActivities = [];

  for (let i = 0; i < activities1.length; i++) {
    if (activities1[i].date === todayDate) {
      todaysActivities.push(activities1[i]);
    }
  }

  if (todaysActivities.length === 0) {
    return `Add some activities for today before calling showStatus`;
  }

  let totalDuration = 0;
  for (let i = 0; i < todaysActivities.length; i++) {
    totalDuration = totalDuration + todaysActivities[i].duration;
  }

  if (totalDuration > usageLimit) {
    return "You have reached your limit, no more smartphoning for you!";
  }

  return `Today you have added ${todaysActivities.length} activities. They amount to ${totalDuration} min. of usage`;
}

// Activity you spent more time on

function mostTimeSpentActivity() {
  if (activities1.length === 0) {
    return "No activities yet.";
  }

  const totals = {};
  for (let i = 0; i < activities1.length; i++) {
    const act = activities1[i].activity;

    if (totals[act]) {  
      totals[act] = totals[act] + activities1[i].duration;
    } else {
      totals[act] = activities1[i].duration;
    }
  }

  let maximumActivity = null;
  let maximumTime = 0;

  for (const act in totals) {
    if (totals[act] > maximumTime) {
      maximumTime = totals[act];
      maximumActivity = act;
    }
  }
  return `You have spent the most time on ${maximumActivity}: ${maximumTime} min.`;
}

addActivity1("Instagram", 20);
addActivity1("Youtube", 50);
addActivity1("Facebook", 15);

console.log(activities1);

console.log(mostTimeSpentActivity());




// Rule of thumb:

// dot notation : when we know the property name literally. Eg: totals.act
// bracket notation : when the property name is stored in a variable. Eg: totals[act]
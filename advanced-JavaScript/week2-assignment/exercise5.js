// Exercise 5: Build runSequentially

function runSequentially(tasks, finalCallback) {
  let index = 0;

  function next() {
    if (index === tasks.length) {
      return finalCallback();
    }

    const currentTask = tasks[index];
    index++;
    currentTask(next);
  }

  next();
}

const tasks = [
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),
  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),
  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

runSequentially(tasks, () => {
  console.log("All tasks complete!");
});

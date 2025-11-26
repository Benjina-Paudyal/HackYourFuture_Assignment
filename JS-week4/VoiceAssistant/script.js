let savedName = "";
const todos = [];
let activeTimer = null;

// Helper function: Capitalize each word
function capitalizeName(name) {
  const words = name.split(" ");
  const result = [];

  for (let word of words) {
    const fixed = word.charAt(0).toUpperCase() + word.slice(1);
    result.push(fixed);
  }
  return result.join(" ");
}

// Helper function: Format list for todo output
function formatList(arr) {
  let text = "";

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      text += arr[i];
    } else if (i < arr.length - 1) {
      text += ", " + arr[i];
    } else {
      text += " and " + arr[i];
    }
  }

  return text;
}

// Helper function: Set a timer
function setTimer(amount, unit) {
  let ms;
  if (unit.startsWith("second")) ms = amount * 1000;
  else if (unit.startsWith("minute")) ms = amount * 60 * 1000;
  else return "Unit must be 'seconds' or 'minutes'";

  if (activeTimer) clearTimeout(activeTimer);

  activeTimer = setTimeout(() => {
    console.log("Timer done!");
    activeTimer = null;
  }, ms);

  return `Timer set for ${amount} ${unit}`;
}

// Main function
function getReply(command) {
  if (!command || typeof command !== "string")
    return "Could you please repeat it?";

  const original = command.trim();
  const cmd = original.toLowerCase();

  // Save name
  const prefix = "hello my name is ";
  if (cmd.startsWith(prefix)) {
    const name = original.slice(prefix.length).trim();
    savedName = capitalizeName(name);
    return `Nice to meet you ${savedName}`;
  }

  // What is my name?
  if (cmd === "what is my name" || cmd === "what is my name?") {
    return savedName
      ? `Your name is ${savedName}`
      : "I don't know your name yet.";
  }

  // Add to todo
  const addPrefix = "add ";
  const addSuffix = " to my todo";
  if (cmd.startsWith(addPrefix) && cmd.endsWith(addSuffix)) {
    const item = original
      .slice(addPrefix.length, original.length - addSuffix.length)
      .trim();
    todos.push(item);
    return `${item} added to your todo`;
  }

  // Remove from todo
  const removePrefix = "remove ";
  const removeSuffix = " from my todo";

  if (cmd.startsWith(removePrefix) && cmd.endsWith(removeSuffix)) {
    const item = original
      .slice(removePrefix.length, original.length - removeSuffix.length)
      .trim();

    let index = -1;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].toLowerCase() === item.toLowerCase()) {
        index = i;
        break;
      }
    }

    if (index > -1) {
      // indexOf returns -1 if the item does not exist
      const removed = todos.splice(index, 1)[0];
      return `Removed ${item} from your todo`;
    } else {
      return `${item} is not in your todo list`;
    }
  }

  // What is on my todo?
  if (cmd === "what is on my todo" || cmd === "what is on my todo?") {
    if (todos.length === 0) {
      return "You have 0 todos.";
    }

    const listText = formatList(todos);
    const countText = todos.length === 1 ? "1 todo" : `${todos.length} todos`;

    return `You have ${countText} - ${listText}`;
  }

  // What day is it today?
  if (cmd === "what day is it today" || cmd === "what day is it today?") {
    const date = new Date(); // current date and time
    const day = date.getDate(); // day of the month

    // debugging
    // console.log(date.getMonth()); // 0,1,2 ....

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day}. of ${month} ${year}`;
  }

  // Mathematics
  const mathPrefix = "what is ";

  if (cmd.startsWith(mathPrefix)) {
    const expression = original.slice(mathPrefix.length).trim();
    const parts = expression.split(" ");

    if (parts.length === 3) {
      const firstNumber = Number(parts[0]);
      const operand = parts[1];
      const secondNumber = Number(parts[2]);

      let result;

      if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return "I can only do mathematics on numbers.";
      }

      if (operand === "+") result = firstNumber + secondNumber;
      else if (operand === "-") result = firstNumber - secondNumber;
      else if (operand === "*") result = firstNumber * secondNumber;
      else if (operand === "/")
        result = secondNumber !== 0 ? firstNumber / secondNumber : "Infinity";
      else return "I can't do that calculation.";

      return String(result);
    } else {
      return "Please write math like: 'What is 3+3'";
    }
  }

  // Timer command
  const timerPrefix = "set a timer for ";
  if (cmd.startsWith(timerPrefix)) {
    const rest = original.slice(timerPrefix.length).trim();
    const parts = rest.split(" ");
    if (parts.length >= 2) {
      const amount = Number(parts[0]);
      const unit = parts[1].toLowerCase();
      if (isNaN(amount)) return "Please provide a number for the timer.";
      return setTimer(amount, unit);
    } else {
      return "Please write the timer like: 'Set a timer for 4 minutes'";
    }
  }

  // What time is it? (Extra)
  if (cmd === "what time is it" || cmd === "what time is it?") {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;

    return `The time is ${hour}:${minute}`;
  }

  // Default reply
  return "I don't understand that command yet";
}

// Example usage
console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("Remove fishing from my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("What day is it today?"));
console.log(getReply("What is 3 + 3"));
console.log(getReply("What is 4 * 12"));
console.log(getReply("Set a timer for 4 minutes"));
console.log(getReply("What time is it?"));

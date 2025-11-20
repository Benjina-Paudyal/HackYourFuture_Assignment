const notes = [];

// Create
function saveNote(content, id) {
  notes.push({ content: content, id: id });
}

// Get By Id
function getNote(id) {
  if (typeof id !== "number") {
    return "Error: id must be a number.";
  }

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      return notes[i];
    }
  }
  return `No note found with the given id: ${id}`;
}

// Get all
function logOutNotesFormatted() {
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    console.log(
      `The note with id : ${note.id}, has the following note text: ${note.content}`
    );
  }
}

// Search
function searchNotes(keyword) {
  const results = [];

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].content.toLowerCase().includes(keyword.toLowerCase())) {
      results.push(notes[i]);
    }
  }

  if (results.length === 0) {
    console.log(`No notes found containing "${keyword}"`);
  } else {
    for (let i = 0; i < results.length; i++) {
      console.log(`Found note with id ${results[i].id}: ${results[i].content}`);
    }
  }
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);
saveNote("Buy groceries for lunch and dinner", 3);
console.log(notes);

const note = getNote(2);
console.log(note);

logOutNotesFormatted();

searchNotes("groceries");

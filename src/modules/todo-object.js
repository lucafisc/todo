export const todoFactory = (title = "", date = "", flagged = false, description = "", tags = "",  project = "", data = "") => {
    return { title, date, flagged, description, tags,  project, data }
  }

export let todoStorage = [];

export const updateStorage = (newArray) => {
  todoStorage = newArray;
}

export const updateTodo = (index, input) => {
  console.log(todoStorage[index]);

  todoStorage[index] = input;
  console.log(todoStorage[index]);
}
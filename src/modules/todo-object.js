import { pubsub } from "./pubsub";

export const todoFactory = (title = "", date = "", flagged = false, description = "", tags = "",  project = "", data = "", type = "", status = "") => {
    return { title, date, flagged, description, tags,  project, data, type, status }
  }

export let todoStorage = [];

export const updateStorage = (newArray) => {
  todoStorage = newArray;
}

export const updateTodo = (index, input) => {
  todoStorage[index] = input;
  console.log(todoStorage);
}
import { pubsub } from "./pubsub";

export const todoFactory = (status = "", title = "", date = "", flagged = false, description = "", tags = "",  project = "", data = "") => {
    return { status, title, date, flagged, description, tags,  project, data }
  }

export let todoStorage = [];

export const updateStorage = (newArray) => {
  todoStorage = newArray;
}

export const updateTodo = (index, input) => {
  todoStorage[index] = input;
  pubsub.publish("change-in-todos", index);
}
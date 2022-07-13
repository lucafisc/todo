import { pubsub } from "./pubsub";

export const todoFactory = ({
  title = "",
  date = "",
  flagged = false,
  description = "",
  tags = [""],
  project = "inbox",
  data = "",
  type = "form",
  checked = false
}) => {
  return {
    title,
    date,
    flagged,
    description,
    tags,
    project,
    data,
    type,
    checked
  };
};

export let todoStorage = [];

export let tagStorage = [];

export const updateStorage = (newArray) => {
  todoStorage = newArray;
};

export const updateTodo = (index, input) => {
  todoStorage[index] = input;
};

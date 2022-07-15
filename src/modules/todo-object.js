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
  checked = false,
}) => ({
  title,
  date,
  flagged,
  description,
  tags,
  project,
  data,
  type,
  checked,
});

export let todoStorage = [];
export let tagStorage = [];
// eslint-disable-next-line prefer-const
export let projectStorage = [];

export const updateStorage = (key, newArray) => {
  switch (key) {
    case "todo":
      todoStorage = newArray;
      break;
    case "tag":
      tagStorage = newArray;
      break;
    case "project":
      projectStorage = newArray;
      break;
  }
};

export const updateTodo = (index, input) => {
  todoStorage[index] = input;
};

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
export const projectStorage = [];

export const updateStorage = (key, newArray) => {
  switch (key) {
    case "todo":
      todoStorage = newArray;
      break;
    case "tag":
      tagStorage = newArray;
      break;
  }
};

export const updateTodo = (index, input) => {
  todoStorage[index] = input;
};

import { pubsub } from "./pubsub";
import { getKey, getNoteInput } from "./data";
import { todoStorage } from "./todo-object.js";

export const newProject = () => {
  // create elements
  const container = document.createElement("div");
  const icon = document.createElement("i");
  const title = document.createElement("h4");
  const unchecked = document.createElement("h4");

  // add classes
  container.classList.add("menu-container");
  icon.classList.add("project-icon");
  title.classList.add("project-title");
  unchecked.classList.add("project-unchecked");

  container.append(icon, title, unchecked);
  return container;
};

export const newTagProject = (name) => {
  // create elements
  const container = document.createElement("div");
  const icon = document.createElement("i");
  const title = document.createElement("h4");

  // add classes
  container.classList.add("tag-project-container");
  icon.classList.add("tag-icon", "fa-solid", "fa-tag");
  title.classList.add("tag-title");

  title.textContent = name;
  container.onclick = (clicked) => {
    pubsub.publish("new-current-page", clicked.target);
    pubsub.publish("side-bar-tag-click", clicked.target);
  };
  container.append(icon, title);
  return container;
};

export const newTodoProject = (name) => {
  // create elements
  const container = document.createElement("div");
  const icon = document.createElement("i");
  const title = document.createElement("h4");
  const removeBtn = document.createElement("div");
  // add classes
  container.classList.add("todo-project-container");
  icon.classList.add("fa-circle", "fa-solid", "project-icon");
  title.classList.add("tag-title");
  removeBtn.classList.add("fa-solid", "fa-xmark", "sidebar-btn", "x-btn");

  title.textContent = name;
  container.onclick = (clicked) => {
    pubsub.publish("new-current-page", clicked.target);
    pubsub.publish("update-list", clicked.target);
  };

  container.append(icon, title, removeBtn);
  return container;
};

export const newSelectOption = (name, card) => {
  // eslint-disable-next-line prefer-const
  let option = document.createElement("option");
  option.classList.add("project-option");
  option.value = name;
  option.textContent = name;

  const key = getKey(card);

  const index = todoStorage.findIndex((i) => i.data === key);

  if (todoStorage[index].project === name) {
    option.selected = true;
  } else {
    option.selected = false;
  }

  return option;
};

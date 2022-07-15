import { v4 as uuidv4 } from "uuid";
import { pubsub } from "./pubsub";
import {
  todoFactory,
  todoStorage,
  updateStorage,
  updateTodo,
  tagStorage,
  projectStorage,
} from "./todo-object.js";

export const data = () => {
  // on load
  pubsub.subscribe("on-load", () => {
    retrieveFromLocalStorage("todo");
    retrieveFromLocalStorage("tag");
    retrieveFromLocalStorage("project");
    if (!projectStorage.includes("inbox")) {
      projectStorage.push("inbox");
    }
    pubsub.publish("update-list", getCurrentPage());
    pubsub.publish("update-projects-tags");
  });

  // update event
  pubsub.subscribe("update-todos", ([index, input, newNote]) => {
    if (index > -1) {
      updateTodo(index, input);
    } else if (newNote) {
      todoStorage.push(newNote);
    }
    pubsub.publish("local-store");
    pubsub.publish("update-list", getCurrentPage());
  });

  // local storate
  pubsub.subscribe("local-store", () => {
    localStorage.clear();
    addToLocalStorage(todoStorage, "todo");
    addToLocalStorage(tagStorage, "tag");
    addToLocalStorage(projectStorage, "project");
  });

  // new note event
  pubsub.subscribe("new-note-btn-click", (btn) => {
    const newNote = todoFactory({
      data: uuidv4(),
      project: getCurrentPage(),
    });
    pubsub.publish("update-todos", [undefined, undefined, newNote]);
  });

  // new project event
  pubsub.subscribe("confirm-new-project", (name) => {
    if (!projectStorage.includes(name)) {
      projectStorage.push(name);
    }

    pubsub.publish("update-projects-tags");
    pubsub.publish("local-store");
  });

  // update todo info event
  pubsub.subscribe("save-btn-click", (card) => {
    const key = getKey(card);
    const input = getNoteInput(card, key);
    const index = todoStorage.findIndex((i) => i.data === key);
    input.type = "todo";
    pubsub.publish("update-todos", [index, input, undefined]);
  });

  // check/uncheck event
  pubsub.subscribe("item-title-click", (card) => {
    const key = getKey(card);
    const input = getNoteInput(card, key);
    const index = todoStorage.findIndex((i) => i.data === key);
    input.checked === true ? (input.checked = false) : (input.checked = true);

    pubsub.publish("update-todos", [index, input, undefined]);
  });

  // trash button event
  pubsub.subscribe("trash-btn-click", (card) => {
    if (confirm("Are you sure you want to delete this note?")) {
      pubsub.publish("delete-note", card);
    }
  });

  // delete note event
  pubsub.subscribe("delete-note", (card) => {
    const key = getKey(card);
    const newArray = todoStorage.filter((item) => item.data !== key);
    updateStorage("todo", newArray);
    const rules = "todoStorage[i].project === page";
    pubsub.publish("update-list", getCurrentPage());
    pubsub.publish("local-store");
  });

  // item tag click event
  pubsub.subscribe("item-tag-click", (tag) => {
    const card = tag.parentNode.parentNode.parentNode.parentNode;
    if (
      card.classList.contains("todo") ||
      tag.classList.contains("input-tag")
    ) {
    } else {
      pubsub.publish("remove-tag", [card, tag]);
    }
  });

  // remove tag event
  pubsub.subscribe("remove-tag", ([card, tag]) => {
    const key = getKey(card);
    const index = todoStorage.findIndex((i) => i.data === key);
    const input = getNoteInput(card, key);
  });

  // create new tag
  pubsub.subscribe("new-tag", (tag) => {
    const tagName = tag.textContent;
    if (!tagStorage.includes(tagName)) {
      tagStorage.push(tagName);
    }
    const card = tag.parentNode.parentNode.parentNode.parentNode;
    const key = getKey(card);
    const index = todoStorage.findIndex((i) => i.data === key);
    todoStorage[index].tags.push(tag.textContent);
    pubsub.publish("update-projects-tags");
    pubsub.publish("local-store");
  });
};

function retrieveFromLocalStorage(key) {
  const stored = JSON.parse(window.localStorage.getItem(key));
  updateStorage(key, stored);
}

function addToLocalStorage(array, key) {
  localStorage.setItem(key, JSON.stringify(array));
}

function getItemByIndex(key) {
  const index = todoStorage.findIndex((i) => i.data === key);
  return todoStorage[index];
}

// get card key
export const getKey = (card) => card.getAttribute("data-id");

// get input values
export const getNoteInput = (card, key) => {
  const DomItems = getItems(card);
  // title
  const title = DomItems.inputTitle.textContent;
  // date
  const date = DomItems.inputDate.value;
  // flag
  let flagged;
  DomItems.inputFlag.classList.contains("flagged")
    ? (flagged = true)
    : (flagged = false);
  // description
  const description = DomItems.inputDescription.value;
  // tags
  const tags = [];
  for (let i = 0; i < DomItems.inputTags.length; i++) {
    const name = DomItems.inputTags[i].textContent;
    tags.push(name);
  }

  const project = DomItems.inputProject.value;
  const itemInArray = getItemByIndex(key);
  const { checked } = itemInArray;
  const data = key;

  return {
    title,
    date,
    flagged,
    description,
    tags,
    project,
    data,
    checked,
  };
};

function getItems(card) {
  const inputTitle = card.querySelector(".input-title");
  const inputDescription = card.querySelector(".input-description");
  const inputDate = card.querySelector(".input-date");
  const inputFlag = card.querySelector(".input-flag");
  const inputTags = card.querySelectorAll(".item-tag");
  const inputProject = card.querySelector(".input-project");
  return {
    inputTitle,
    inputDescription,
    inputDate,
    inputFlag,
    inputTags,
    inputProject,
  };
}

export const getCurrentPage = () => {
  const pageTitle = document.querySelector("#page-title");
  const page = pageTitle.getAttribute("data-page");
  console.log(page);
  return page;
};

export const isTagInUse = (tag) => {
  const card = tag.parentNode.parentNode.parentNode.parentNode;
  const key = getKey(card);
  const index = todoStorage.findIndex((i) => i.data === key);
  if (todoStorage[index].tags.includes(tag.textContent)) {
    return true;
  }

  return false;
};

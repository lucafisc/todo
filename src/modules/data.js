import { pubsub } from "./pubsub.js";
import {
  todoFactory,
  todoStorage,
  updateStorage,
  updateTodo,
} from "./todo-object.js";
import { v4 as uuidv4 } from "uuid";

export const data = () => {
  //on load
  pubsub.subscribe("on-load", () => {
    for (let i = 0; i < localStorage.length; i++) {
      let storedItem = JSON.parse(window.localStorage.getItem(i));
      todoStorage.push(storedItem);
    }
  });

  //update event
  pubsub.subscribe("update-todos", ([index, input, newNote]) => {
    if (index > -1) {
      updateTodo(index, input);
      console.log(todoStorage);
    } else if (newNote) {
      todoStorage.push(newNote);
      console.log("new note!");
    }
    
    pubsub.publish("local-store");
    pubsub.publish("dom-loop", (getCurrentPage()) );
  });

  //local storate
  pubsub.subscribe("local-store", () => {
    localStorage.clear();
    for (let i = 0; i < todoStorage.length; i++) {
      localStorage.setItem([i], JSON.stringify(todoStorage[i]));
    }
  });

  //new note event
  pubsub.subscribe("new-note-btn-click", (btn) => {
    let newNote = todoFactory({
      data: uuidv4(),
    });
    console.log(newNote);
    pubsub.publish("update-todos", [undefined, undefined, newNote]);
  });

  //update todo info event
  pubsub.subscribe("save-btn-click", (card) => {
    let key = getKey(card);
    let input = getNoteInput(card, key);
    let index = todoStorage.findIndex((i) => i.data === key);
    input.type = "todo";
    pubsub.publish("update-todos", [index, input, undefined]);
  });

  //check/uncheck event
  pubsub.subscribe("item-title-click", (card) => {
    let key = getKey(card);
    let input = getNoteInput(card, key);
    let index = todoStorage.findIndex((i) => i.data === key);
    console.log(input.checked);
    input.checked === true ? (input.checked = false) : (input.checked = true);
    console.log(input.checked);

    pubsub.publish("update-todos", [index, input, undefined]);
  });

  //trash button  event
  pubsub.subscribe("trash-btn-click", (card) => {
    console.log(card);
    if (confirm("Are you sure you want to delete this note?")) {
      pubsub.publish("delete-note", card);
    }
  });

  //delete note event
  pubsub.subscribe("delete-note", (card) => {
    let key = getKey(card);
    let newArray = todoStorage.filter(function (item) {
      return item.data !== key;
    });
    updateStorage(newArray);
    let rules = "todoStorage[i].project === page";
    pubsub.publish("dom-loop", (getCurrentPage()));
    pubsub.publish("local-store");
  });
};

function getItemByIndex(key) {
  let index = todoStorage.findIndex((i) => i.data === key);
  return todoStorage[index];
}

//get card key
function getKey(card) {
  return card.getAttribute("data-id");
}

//get input values
function getNoteInput(card, key) {
  let DomItems = getItems(card);

  //title
  let title = DomItems.inputTitle.textContent;
  //date
  let date = DomItems.inputDate.value;
  //flag
  let flagged;
  DomItems.inputFlag.classList.contains("flagged")
    ? (flagged = true)
    : (flagged = false);
  //description
  let description = DomItems.inputDescription.value;
  //tags
  let tags = [];
  for (let i = 0; i < DomItems.inputTags.length; i++) {
    let name = DomItems.inputTags[i].textContent;
    tags.push(name);
  }

  let project = DomItems.inputProject.value;

  let itemInArray = getItemByIndex(key);

  let checked = itemInArray.checked;
  let data = key;

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
}

function getItems(card) {
  let inputTitle = card.querySelector(".input-title");
  let inputDescription = card.querySelector(".input-description");
  let inputDate = card.querySelector(".input-date");
  let inputFlag = card.querySelector(".input-flag");
  let inputTags = card.querySelectorAll(".item-tag");
  let inputProject = card.querySelector(".input-project")
  return {
    inputTitle,
    inputDescription,
    inputDate,
    inputFlag,
    inputTags,
    inputProject
  };
}


function getCurrentPage() {
  let page = document.getElementById("header").getAttribute("data-page");
  // if (page === "undefined") {page = undefined}
  return page;
}
import { pubsub } from "./pubsub.js";
import { todoFactory, todoStorage, updateStorage, updateTodo } from "./todo-object.js";
import { v4 as uuidv4 } from "uuid";

export const data = () => {

  //new note event
  pubsub.subscribe("new-note-btn-click", (btn) => {
    let newNote = todoFactory(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      uuidv4()
    );
    pubsub.publish("todo-list-new", newNote);

  });

  //new todo event
  pubsub.subscribe("todo-list-new", (todo) => {
    todoStorage.push(todo);
  });

  //delete note event
  pubsub.subscribe("delete-note", (card) => {
    let key = getKey(card);
    let newArray = todoStorage.filter(function(item)
    {
     return item.data !== key;
    });
    updateStorage(newArray);
  });

  //update todo info event
  pubsub.subscribe("save-btn-click", (card) => {
    let key = getKey(card);
    let input = getNoteInput(card, key);
    let index = todoStorage.findIndex(i => i.data === key);
    updateTodo(index, input);
  });
};




function getKey(card) {
  return card.getAttribute("data-id");
}


//get input values
function getNoteInput(card, key) {
  let items = getItems(card);

  //title
  let title = items.inputTitle.textContent;
  //date
  let date = items.inputDate.value;
  //flag
  let flagged;
  items.inputFlag.classList.contains("flagged") ?   flagged = true : flagged = false;
  //description
  let description = items.inputDescription.value;
  //tags
  let tags = [];
  for (let i=0; i<items.inputTags.length; i++){
    let name = items.inputTags[i].textContent;
    tags.push(name);
  }
  let project;

  let data = key;

  return {
    title,
    date,
    flagged,
    description,
    tags,
    project,
    data
  }
}

function getItems(card) {
  let inputTitle = card.querySelector(".input-title");
  let inputDescription = card.querySelector(".input-description");
  let inputDate = card.querySelector(".input-date");
  let inputFlag = card.querySelector(".input-flag");
  let inputTags = card.querySelectorAll(".item-tag");
  return {
    inputTitle,
    inputDescription,
    inputDate,
    inputFlag,
    inputTags
  };
}
import { pubsub } from "./pubsub.js";
import {
  todoFactory,
  todoStorage,
  updateStorage,
  updateTodo,
} from "./todo-object.js";
import { v4 as uuidv4 } from "uuid";
import { el } from "date-fns/locale";

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
      uuidv4(),
      "form",
      "unchecked"
    );
    pubsub.publish("update-todos", [undefined, undefined, newNote]);
  });

  //update event
  pubsub.subscribe("update-todos", ([index, input, newNote]) => {
    if (index > -1) {
      updateTodo(index, input);
    } else if (newNote){
      todoStorage.push(newNote);
      console.log("new note!")
    }
    pubsub.publish("dom-loop");
  });

  //update todo info event
  pubsub.subscribe("save-btn-click", (card) => {
      let key = getKey(card);
      let input = getNoteInput(card, key);
      let index = todoStorage.findIndex(i => i.data === key);
     input.type = "todo";
      pubsub.publish("update-todos", [index, input, undefined]);
    });

  //check/uncheck event
  pubsub.subscribe("item-title-click", (card) => {

  });

  //delete note event
  pubsub.subscribe("delete-note", (card) => {
    //   let key = getKey(card);
    //   let newArray = todoStorage.filter(function(item)
    //   {
    //    return item.data !== key;
    //   });
    //   updateStorage(newArray);
    // });
  });


};

//get card key
function getKey(card) {
  return card.getAttribute("data-id");
}

//get input values
function getNoteInput(card, key) {
  let items = getItems(card);
  //status
  let status = "";
  //title
  let title = items.inputTitle.textContent;
  //date
  let date = items.inputDate.value;
  //flag
  let flagged;
  items.inputFlag.classList.contains("flagged")
    ? (flagged = true)
    : (flagged = false);
  //description
  let description = items.inputDescription.value;
  //tags
  let tags = [];
  for (let i = 0; i < items.inputTags.length; i++) {
    let name = items.inputTags[i].textContent;
    tags.push(name);
  }
  let project;

  let data = key;

  return {
    status,
    title,
    date,
    flagged,
    description,
    tags,
    project,
    data
  };
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
    inputTags,
  };
}

export const getTodoInfo = (card) => {
  let key = getKey(card);
  let index = todoStorage.findIndex((i) => i.data === key);
  return todoStorage[index];
};

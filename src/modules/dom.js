import { pubsub } from "./pubsub.js";
import { newNote, newInputTag } from "./newNote.js";
import { todoStorage } from "./todo-object.js";
import { doc } from "prettier";
import {parseISO, isToday } from "date-fns";
import { getCurrentPage } from "./data.js"



export const domControl = () => {
  const list = document.getElementById("list");

  //dom loop on load and retrieve localStorage
  pubsub.subscribe("on-load", () => {
    console.log("onload")
    let page = "inbox";
    for (let i = 0; i < localStorage.length; i++) {
      let storedItem = JSON.parse(window.localStorage.getItem(i));
      if (storedItem.project === page) {
        list.prepend(newNote(storedItem));
      }
    }
  });

  pubsub.subscribe("on-load", () => {
  let inboxProject = document.querySelector("#inbox");
  inboxProject.classList.add("current-project");  
    console.log(inboxProject)
});

  //dom loop
  pubsub.subscribe("dom-loop", (page) => {
    removeAllCards(list);
    for (let i = 0; i < todoStorage.length; i++) {
      if (todoStorage[i].project === page) {
        list.prepend(newNote(todoStorage[i]));
      }
    }
  });

  //dom loop flagged
  pubsub.subscribe("important-project-btn-click", (btn) => {
    removeAllCards(list);
    for (let i = 0; i < todoStorage.length; i++) {
      if (todoStorage[i].flagged === true) {
        list.prepend(newNote(todoStorage[i]));
      }}
    }
  )

  //dom loop today
  pubsub.subscribe("today-project-btn-click", (btn) => {
    removeAllCards(list);
    for (let i = 0; i < todoStorage.length; i++) {
      let date = parseISO(todoStorage[i].date);
      if (isToday(date)) {
        list.prepend(newNote(todoStorage[i]));
      }
       
    }
    }
  )

    //current page event
    pubsub.subscribe("new-current-page", (container) => {
      let pages = document.querySelectorAll(".menu-container");
      for (let i=0; i<pages.length; i++) {
        pages[i].classList.remove("current-project");
      }
      container.classList.add("current-project");
    })

  //item title click event
  pubsub.subscribe("item-title-click", (card) => {
    card.classList.toggle("checked");
    card.classList.toggle("unchecked");
  });

  //save click event
  pubsub.subscribe("save-btn-click", (card) => {
    changeColor(card);
  });

  //edit click event
  pubsub.subscribe("edit-btn-click", (card) => {
    changeColor(card);
  });

  //input flag click event
  pubsub.subscribe("input-flag-click", (btn) => {
    btn.classList.toggle("flagged");
  });

  //input description keydown event
  pubsub.subscribe("input-description-keydown", (textarea) => {
    updateTextareaHeight(textarea);
  });

  //input tag keydown event
  pubsub.subscribe("input-tag-keydown", ([key, tag]) => {
    if (key === "Enter" || key === "Tab" || key === " ") {
      pubsub.publish("new-tag", [key, tag]);
    }
  });

  //new tag
  pubsub.subscribe("new-tag", ([key, tag]) => {
    if (tag.textContent === "") {
      console.log("returned");
      return;
    } else {
      tag.contentEditable = false;
      tag.classList.remove("input-tag");
      tag.classList.add("item-tag");
      tag.id = "item-tag";
      let newInput = newInputTag("input");
      let tagContainer = tag.parentNode;
      tagContainer.append(newInput);
      newInput.focus();
    }
  });

  //remove tag event
  pubsub.subscribe("remove-tag", ([card, tag]) => {
    tag.remove();
  });

  //item container click event
  pubsub.subscribe("item-container-click", (header) => {
    if (header.parentNode.classList.contains("form")) {
      return;
    } else {
      let section = header.nextElementSibling;
      if (section.scrollHeight <= 25) {
        return;
      } else if (section.style.maxHeight) {
        section.style.maxHeight = null;
      } else {
        section.style.maxHeight = "500px"; // section.scrollHeight +
      }
    }
  });
};

function removeAllCards(list) {
  let cards = list.querySelectorAll('[data-name="card"]');
  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }
}

function updateTextareaHeight(textarea) {
  let content = textarea.value;
  let numberOfLines = (content.match(/\n/g) || []).length;
  let newHeight = 45 + numberOfLines * 22.5 + 2;
  textarea.style.height = newHeight + "px";
}

function changeColor(card) {
  card.classList.toggle("form");
  card.classList.toggle("todo");
}

//event listeners
const newNoteBtn = document.querySelector("#new-note");
newNoteBtn.onclick = (clicked) => {
  pubsub.publish("new-note-btn-click", clicked.target);
};

const newProjectBtn = document.querySelector("#new-project");
newProjectBtn.onclick = (clicked) => {
  pubsub.publish("new-project-btn-click", clicked.target);
}

const inboxProjectBtn = document.querySelector("#inbox");
inboxProjectBtn.onclick = (clicked) => {
  pubsub.publish("new-current-page", clicked.target);
  pubsub.publish("dom-loop", getCurrentPage());

}

const todayProjectBtn = document.querySelector("#today");
todayProjectBtn.onclick = (clicked) => {
  pubsub.publish("new-current-page", clicked.target);
  pubsub.publish("today-project-btn-click", clicked.target);
}

const importantProjectBtn = document.querySelector("#important");
importantProjectBtn.onclick = (clicked) => {
  pubsub.publish("new-current-page", clicked.target);
  pubsub.publish("important-project-btn-click", clicked.target);
}



// function getNoteInput(btn) {
//   let card = btn.parentNode.parentNode.parentNode;
//   let items = getItems(card);

//   //title
//   items.itemTitle.textContent = items.inputTitle.textContent;
//   //description
//   items.itemDescription.textContent = items.inputDescription.value;
//   //date
//   let newDate = items.inputDate.value;

// }

// function getItems(card) {
//   let itemTitle = card.querySelector(".item-title");
//   let inputTitle = card.querySelector(".input-title");
//   let itemDescription = card.querySelector(".item-description");
//   let inputDescription = card.querySelector(".input-description");
//   let itemDate = card.querySelector(".item-date");
//   let inputDate = card.querySelector(".input-date");
//   return {
//     itemTitle,
//     inputTitle,
//     itemDescription,
//     inputDescription,
//     itemDate,
//     inputDate,
//   };
// }
//set theme
//   const themeMenu = document.getElementById("set-theme");
//   themeMenu.addEventListener("click", () => {
//     if (themeMenu !== event.target) {
//       return;
//     }
//     themeMenu.classList.toggle("choose-color");
//   });
//   const changeTheme = pubsub.subscribe("theme", (event) => {
//     let newColor = event.target.style.color;
//   });

// MMM d
// format(new Date(), "MMM d");

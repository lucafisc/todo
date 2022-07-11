import { pubsub } from "./pubsub.js";
import { newNote } from "./newNote.js";
import { newInputTag } from "./newNote.js"
import { todoStorage } from "./todo-object.js";
import { getTodoInfo } from "./data.js";
import { format, parseISO, isToday, isTomorrow } from "date-fns";

export const domControl = () => {
  const list = document.getElementById("list");
  let count = 0
  //dom loop
  pubsub.subscribe("dom-loop", () => {
    removeAllCards(list);
    for (let i=0; i<todoStorage.length; i++) {
      list.prepend(newNote(todoStorage[i]))
    }
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

  //trash click event
  pubsub.subscribe("trash-btn-click", (card) => {
    if(confirm("Are you sure you want to delete this note?")) {
        pubsub.publish("delete-note", card);
    }
  })

  //delete event
  pubsub.subscribe("delete-note", (card) => {
    card.classList.add("disappear");
    card.onanimationend = function() {
    card.remove();
    };
  })

  //input flag click event
  pubsub.subscribe("input-flag-click", (btn) => {
    btn.classList.toggle("flagged")
  });

  //input description keydown event
  pubsub.subscribe("input-description-keydown", (textarea) => {
    updateTextareaHeight(textarea);
})

  //item tag click event
  pubsub.subscribe("item-tag-click", (tag) => {
   let card = tag.parentNode.parentNode.parentNode;
   if (card.classList.contains("todo")) {
    return
   } else {
    tag.remove();
   }
  })

  //input tag keydown event
  pubsub.subscribe("input-tag-keydown", ([key, tag,]) => {

    if (key === "Enter" || key === "Tab" || key === " ") {
        pubsub.publish("new-tag", [key,tag]);
    }

  });

  //new tag
  pubsub.subscribe("new-tag", ([key,tag]) => {
    if (tag.textContent === "") {
        return
    }
    else {
    tag.contentEditable = false;
    tag.classList.remove("input-tag");
    tag.classList.add("item-tag");
    tag.id = "item-tag";
    let newInput = newInputTag()
    tag.parentNode.append(newInput);
    newInput.focus();}
  })



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
  let cards = list.querySelectorAll("#todo-card");
  for (let i=0; i<cards.length; i++) {

    cards[i].remove();
    console.log("removed!")
  
  }
  console.log(cards.length);

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
function formatDate(newDate) {
if (newDate) {
  newDate = parseISO(newDate);
  items.itemDate.classList.remove("hidden");
  if (isToday(newDate)) {
    items.itemDate.textContent = "Today";
  } else if (isTomorrow(newDate)) {
    items.itemDate.textContent = "Tomorrow";
  } else {
    items.itemDate.textContent = format(new Date(newDate), "MMM d");
  }
} else {
  items.itemDate.classList.add("hidden");
}
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
//     console.log(newColor);
//   });

// MMM d
// format(new Date(), "MMM d");

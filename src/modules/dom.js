import { pubsub } from "./pubsub.js";
import { newNote } from "./newNote.js";
import { newInputTag } from "./newNote.js"
import { todoStorage } from "./todo-object.js";

export const domControl = () => {
  const list = document.getElementById("list");
  let count = 0

  //dom loop on load
  pubsub.subscribe("on-load", () => {
    let page = "inbox";
for (let i=0; i<localStorage.length; i++) {
  let storedItem = JSON.parse(window.localStorage.getItem(i))
  if (storedItem.project === page){
  list.prepend(newNote(storedItem))};
}
   
  });


  //dom loop
  pubsub.subscribe("dom-loop", (page) => {
    removeAllCards(list);
    for (let i=0; i<todoStorage.length; i++) {
      console.log(todoStorage[i].project);
      console.log(page);
      if (todoStorage[i].project === page){
      list.prepend(newNote(todoStorage[i]))}
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
    let tagContainer = tag.parentNode;
    tagContainer.append(newInput);
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
  let cards = list.querySelectorAll('[data-name="card"]');
  for (let i=0; i<cards.length; i++) {
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
function formatDate(newDate) {

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

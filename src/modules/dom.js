import { pubsub } from "./pubsub.js";
import { newNote } from "./newNote.js";
import { doc } from "prettier";
import { format, parseISO, isToday, isTomorrow } from "date-fns";

export const domControl = () => {
  //item title click event
  pubsub.subscribe("item-title-click", (data) => {
    let card = data.parentNode.parentNode;
    card.classList.toggle("checked");
    card.classList.toggle("unchecked");
  });

  //save click event
  pubsub.subscribe("save-btn-click", (btn) => {
    changeColor(btn);
    getNoteInput(btn);
  });

  //edit click event
  pubsub.subscribe("edit-btn-click", (btn) => {
    changeColor(btn);
  });

  //trash click event
  pubsub.subscribe("trash-btn-click", (btn) => {
    if(confirm("Are you sure you want to delete this note?")) {
        let card = btn.parentNode.parentNode.parentNode;
        card.classList.add("disappear");
        card.onanimationend = function() {
            card.remove();
        };

    }
  })

  //new note button event
  pubsub.subscribe("new-note-btn-click", (btn) => {
    // btn.classList.add("hidden");
    const list = document.getElementById("list");
    list.insertBefore(newNote(), btn);
  });

  //item container click event
  pubsub.subscribe("item-container-click", (header) => {
    console.log(header);
    if (header.parentNode.classList.contains("form")) {
      return;
    } else {
      let section = header.nextElementSibling;
      if (section.scrollHeight <= 25) {
        return;
      } else if (section.style.maxHeight) {
        section.style.maxHeight = null;
      } else {
        section.style.maxHeight = section.scrollHeight + "px";
      }
    }
  });
};

function changeColor(btn) {
  let card = btn.parentNode.parentNode.parentNode;
  card.classList.toggle("form");
  card.classList.toggle("todo");
  if (!card.classList.contains("checked")) {
    card.classList.add("unchecked");
  }
}

function getNoteInput(btn) {
  let card = btn.parentNode.parentNode.parentNode;
  let items = getItems(card);

  //title
  items.itemTitle.textContent = items.inputTitle.textContent;
  //description
  items.itemDescription.textContent = items.inputDescription.textContent;
  //date
  let newDate = items.inputDate.value;
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

function getItems(card) {
  let itemTitle = card.querySelector(".item-title");
  let inputTitle = card.querySelector(".input-title");
  let itemDescription = card.querySelector(".item-description");
  let inputDescription = card.querySelector(".input-description");
  let itemDate = card.querySelector(".item-date");
  let inputDate = card.querySelector(".input-date");
  return {
    itemTitle,
    inputTitle,
    itemDescription,
    inputDescription,
    itemDate,
    inputDate,
  };
}
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

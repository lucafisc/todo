import { pubsub } from "./pubsub.js";
import { newNote } from "./newNote.js";
import { doc } from "prettier";

export const domControl = () => {

  //item title click event
pubsub.subscribe("item-title-click", (data) => {
    let card = data.parentNode.parentNode;
    card.classList.toggle("checked");
    card.classList.toggle("unchecked");
  });

  //save click event
pubsub.subscribe("save-btn-click", (btn) => {
    setNote(btn);
 })

   //edit click event
pubsub.subscribe("edit-btn-click", (btn) => {
    setNote(btn);
 })


 //new note button event
 pubsub.subscribe("new-note-btn-click", (btn) => {
    const list = document.getElementById("list");
    list.append(newNote());
 })


};

function setNote(btn) {
    let card = btn.parentNode.parentNode.parentNode;
    card.classList.toggle("form");
    card.classList.toggle("todo");
    if (!card.classList.contains("checked")) {
        card.classList.add("unchecked");
    }
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
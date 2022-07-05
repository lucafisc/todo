import { pubsub } from "./pubsub.js";

export const domControl = () => {

   const checkUncheck = pubsub.subscribe("check", (data) => {
    let card = data.parentNode.parentNode;
    card.classList.toggle("checked");
    card.classList.toggle("unchecked");
})

const themeMenu = document.getElementById("set-theme");
themeMenu.addEventListener("click", () => {
    if (themeMenu !== event.target) { return}
    themeMenu.classList.toggle("choose-color")
})

const changeTheme = pubsub.subscribe("theme", (event) => {
    let newColor = event.target.style.color;
    console.log(newColor);
})

  };



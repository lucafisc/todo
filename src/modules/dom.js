import { pubsub } from "./pubsub.js";

export const domControl = () => {

   const checkUncheck = pubsub.subscribe("check", (data) => {
    newFunction(data);
})

  };


function newFunction(data) {
    let card = data.parentNode.parentNode;
    card.classList.toggle("checked");
    card.classList.toggle("unchecked");
}


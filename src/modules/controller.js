import { pubsub } from "./pubsub.js";

export const controller = (() => {
  const itemTitle = document.querySelectorAll("#item-title");
  for (const item of itemTitle) {
    item.addEventListener("click", (event) => {
        pubsub.publish("check", event.target);
    });
  }
})();







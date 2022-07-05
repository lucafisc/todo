import { pubsub } from "./pubsub.js";

export const controller = (() => {
  const itemTitle = document.querySelectorAll("#item-title");
  for (const item of itemTitle) {
    item.addEventListener("click", () => {
        pubsub.publish("check", "a");
    });
  }
})();







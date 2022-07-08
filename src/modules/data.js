import { pubsub } from "./pubsub.js";
import { todoFactory } from "./todo-object.js"
import { v4 as uuidv4 } from 'uuid';

export const data = () => {

pubsub.subscribe("new-note-btn-click", (btn) => {
let myNote = todoFactory(undefined, undefined, undefined, undefined, undefined,  undefined, uuidv4());
console.log(myNote.data);
  });

}
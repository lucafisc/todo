import { pubsub } from "./pubsub.js";

export const controller = () => {

    //list controller
    const list = document.getElementById("list");
    list.addEventListener("click", (event) => {
        let clicked = event.target;

        //list events:
        //item title click
        if (clicked.id === "item-title"){
            pubsub.publish("item-title-click", clicked);
        }

        //save button click
        else if (clicked.id === "save"){
            pubsub.publish("save-btn-click", clicked);
        }

        //edit button click
        else if (clicked.id === "edit"){
            pubsub.publish("edit-btn-click", clicked);
        }

        //new note button click
        else if (clicked.id === "new-note") {
            pubsub.publish("new-note-btn-click", clicked);
        }

    })


  
};









// const themes = document.querySelectorAll(".theme");
// for (const theme of themes) {
//     theme.addEventListener("click", (event) => {
//         pubsub.publish("theme", event);
//     })
// }
import { pubsub } from "./pubsub.js";

export const controller = () => {

    //on load
    window.onload = function() {
        pubsub.publish("on-load");
    }

    //click events on list
    const list = document.getElementById("list");
    list.addEventListener("click", (event) => {
        let clicked = event.target;

        //list events:
        //item title click
        if (clicked.id === "item-title"){
            let card = clicked.parentNode.parentNode.parentNode;
            pubsub.publish("item-title-click", card);
        }

        //save button click
        else if (clicked.id === "save"){
            let card = clicked.parentNode.parentNode.parentNode;
            pubsub.publish("save-btn-click", card);
        }

        //edit button click
        else if (clicked.id === "edit"){
            let card = clicked.parentNode.parentNode.parentNode;
            pubsub.publish("edit-btn-click", card);
        }

        //trash button click
        else if (clicked.id === "trash"){
            let card = clicked.parentNode.parentNode.parentNode;
            pubsub.publish("trash-btn-click", clicked);
        }

        //new note button click
        else if (clicked.id === "new-note") {
            pubsub.publish("new-note-btn-click", clicked);
        }

        //item container click
        else if (clicked.id === "item-container") {
            pubsub.publish("item-container-click", clicked);
        }

        //input flag click
        else if (clicked.id === "input-flag") {
            pubsub.publish("input-flag-click", clicked);
        }

        //tag click
        else if (clicked.id === "item-tag") {
            pubsub.publish("item-tag-click", clicked)
        }

    })

    //keydown event on list
    list.addEventListener("keydown", (event => {
        let clicked = event.target;
        let key = event.key;

        // input tag keydown
        if (clicked.id === "input-tag") {
            if (!key.match(/[a-zA-Z0-9,]/) || key === "Enter") {
                event.preventDefault();}
            pubsub.publish("input-tag-keydown", [key, clicked])
        }

        if (clicked.id === "input-description") {
            pubsub.publish("input-description-keydown", clicked)
        }
    }))

  
};









// const themes = document.querySelectorAll(".theme");
// for (const theme of themes) {
//     theme.addEventListener("click", (event) => {
//         pubsub.publish("theme", event);
//     })
// }
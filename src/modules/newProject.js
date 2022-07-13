import { pubsub } from "./pubsub.js";

export const newProject = () => {
    //create elements
    const container = document.createElement("div");
    const icon = document.createElement("i");
    const title = document.createElement("h4");
    const unchecked = document.createElement("h4");

    //add classes
    container.classList.add("menu-container");
    icon.classList.add("project-icon");
    title.classList.add("project-title");
    unchecked.classList.add("project-unchecked");

    container.append(icon, title, unchecked)
    return container;
  };
  

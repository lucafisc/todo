import { el } from "date-fns/locale";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import { pubsub } from "./pubsub";

export const newNote = (props) => {
  // create elements
  const container = document.createElement("section");
  const itemContainer = document.createElement("div");
  const itemTitle = document.createElement("h2");
  const inputTitle = document.createElement("span");
  const btnContainer = document.createElement("div");
  const itemFlag = document.createElement("div");
  const itemDate = document.createElement("div");
  const inputFlag = document.createElement("div");
  const inputDate = document.createElement("input");
  const editBtn = document.createElement("button");
  const trashBtn = document.createElement("button");
  const saveBtn = document.createElement("button");
  const itemDetails = document.createElement("div");
  const itemDescription = document.createElement("span");
  const inputDescription = document.createElement("textarea");
  const tagContainer = document.createElement("div");
  const inputTag = newInputTag("input");
  const toolbar = document.createElement("div");
  const projectContainer = document.createElement("div");
  const itemProject = document.createElement("div");
  const inputProject = document.createElement("select");

  // add classes
  if (props.type === "form") {
    container.classList.add("form");
  } else {
    container.classList.add("todo");
  }

  if (props.checked === true) {
    container.classList.remove("unchecked");
    container.classList.add("checked");
  } else {
    container.classList.remove("checked");
    container.classList.add("unchecked");
  }
  itemContainer.classList.add("item-container");
  itemTitle.classList.add("item-title");
  inputTitle.classList.add("input-title");
  btnContainer.classList.add("btn-container");
  itemFlag.classList.add("item-flag");
  itemDate.classList.add("item-date");
  inputFlag.classList.add("input-flag");
  inputDate.classList.add("input-date");
  itemDetails.classList.add("item-details");
  itemDescription.classList.add("item-description");
  inputDescription.classList.add("input-description");
  tagContainer.classList.add("tag-container");
  editBtn.classList.add("edit");
  saveBtn.classList.add("save");
  trashBtn.classList.add("trash");
  inputProject.classList.add("input-project");
  itemProject.classList.add("item-project");
  projectContainer.classList.add("project-container");
  toolbar.classList.add("toolbar");

  // add ids
  itemContainer.id = "item-container";
  itemTitle.id = "item-title";
  inputFlag.id = "input-flag";
  editBtn.id = "edit";
  saveBtn.id = "save";
  trashBtn.id = "trash";
  inputDescription.id = "input-description";

  // add properties
  inputTitle.contentEditable = true;
  inputDescription.contentEditable = true;
  inputDate.type = "date";
  itemTitle.textContent = props.title;
  inputTitle.textContent = props.title;
  itemDescription.textContent = props.description;
  inputDescription.textContent = props.description;
  itemProject.textContent = props.project;
  inputProject.value = props.project;

  // format date
  if (props.date) {
    const newDate = parseISO(props.date);
    inputDate.value = props.date;
    itemDate.classList.remove("hidden");
    if (isToday(newDate)) {
      itemDate.textContent = "Today";
    } else if (isTomorrow(newDate)) {
      itemDate.textContent = "Tomorrow";
    } else {
      itemDate.textContent = format(new Date(newDate), "MMM d");
    }
  } else {
    itemDate.classList.add("hidden");
  }

  if (props.flagged) {
    inputFlag.classList.add("flagged");
  }

  if (props.tags) {
    for (let i = 0; i < props.tags.length; i++) {
      if (props.tags[i] !== "") {
        const tag = newInputTag("item");
        tag.textContent = props.tags[i];
        tag.contentEditable = false;

        tagContainer.append(tag);
      }
    }
  }

  // add event listeners

  // item title click
  itemTitle.onclick = (clicked) => {
    const card = clicked.target.parentNode.parentNode;
    pubsub.publish("item-title-click", card);
  };

  // save button click
  saveBtn.onclick = (clicked) => {
    const card = clicked.target.parentNode.parentNode.parentNode;
    pubsub.publish("save-btn-click", card);
  };

  // edit button click
  editBtn.onclick = (clicked) => {
    const card = clicked.target.parentNode.parentNode.parentNode;
    pubsub.publish("edit-btn-click", card);
  };

  // trash button click
  trashBtn.onclick = (clicked) => {
    const card = clicked.target.parentNode.parentNode.parentNode;
    pubsub.publish("trash-btn-click", card);
  };

  // input flag click
  inputFlag.onclick = (clicked) => {
    pubsub.publish("input-flag-click", clicked.target);
  };

  // item container click
  itemContainer.onclick = (clicked) => {
    pubsub.publish("item-container-click", clicked.target);
  };

  // input description keydown
  inputDescription.addEventListener("keydown", (event) => {
    pubsub.publish("input-description-keydown", event.target);
  });

  // append elements
  btnContainer.append(
    itemDate,
    inputDate,
    inputFlag,
    editBtn,
    saveBtn,
    trashBtn
  );

  projectContainer.append(inputProject, itemProject);
  itemContainer.append(itemTitle, inputTitle, btnContainer);
  tagContainer.append(inputTag);
  toolbar.append(tagContainer, projectContainer);
  itemDetails.append(itemDescription, inputDescription, toolbar);
  container.append(itemContainer, itemDetails);

  container.setAttribute("data-id", props.data);
  container.setAttribute("data-name", "card");

  return container;
};

export const newInputTag = (type) => {
  const inputTag = document.createElement("span");
  if (type === "input") {
    inputTag.classList.add("input-tag");
    inputTag.contentEditable = true;
    inputTag.addEventListener("keydown", (event) => {
      const clicked = event.target;
      const { key } = event;
      if (!key.match(/[a-zA-Z0-9,]/) || key === "Enter") {
        event.preventDefault();
      }
      pubsub.publish("input-tag-keydown", [key, clicked]);
    });
  } else {
    inputTag.classList.add("item-tag");
    inputTag.contentEditable = true;
    inputTag.onclick = (clicked) => {
      pubsub.publish("item-tag-click", clicked.target);
    };
  }

  inputTag.id = "input-tag";
  return inputTag;
};

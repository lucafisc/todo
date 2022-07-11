import { el } from "date-fns/locale";

export const newNote = (props) => {
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
  const inputTag = newInputTag();


  if (props.type === "form") {
    container.classList.add("form");
  } else {
    container.classList.add("todo");
  }

  if (props.status === "checked") {
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

  itemContainer.id = "item-container";
  itemTitle.id = "item-title";
  inputFlag.id = "input-flag";
  editBtn.id = "edit";
  saveBtn.id = "save";
  trashBtn.id = "trash";
  inputDescription.id = "input-description";

  inputTitle.contentEditable = true;
  inputDescription.contentEditable = true;
  inputDate.type = "date";

  itemTitle.textContent = props.title;
  inputTitle.textContent = props.title;
  itemDescription.textContent = props.description;
  inputDescription.textContent = props.description;

  btnContainer.append(
    itemDate,
    // itemFlag,
    inputDate,
    inputFlag,
    editBtn,
    saveBtn,
    trashBtn
  );
  itemContainer.append(itemTitle, inputTitle, btnContainer);
  tagContainer.append(inputTag);
  itemDetails.append(itemDescription, inputDescription, tagContainer);
  container.append(itemContainer, itemDetails);

  container.id = "todo-card";
  container.setAttribute("data-id", props.data);

  return container;
};

export const newInputTag = () => {
  const inputTag = document.createElement("span");
  inputTag.classList.add("input-tag");
  inputTag.id = "input-tag";
  inputTag.contentEditable = true;
  return inputTag;
};

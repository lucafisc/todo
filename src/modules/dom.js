import { doc } from 'prettier';
import { parseISO, isToday } from 'date-fns';
import { pubsub } from './pubsub.js';
import { newNote, newInputTag } from './newNote.js';
import { tagStorage, todoStorage } from './todo-object.js';
import { getCurrentPage, isTagInUse } from './data.js';
import { newTagProject } from './newProject.js';

export default const domControl = () => {
  const list = document.getElementById('list');

  // list loop page/project
  pubsub.subscribe('update-list', (page) => {
    const rule = '[data-name="card"]';
    removeAllCards(list, rule);

    for (let i = 0; i < todoStorage.length; i++) {
      if (todoStorage[i].project === page) {
        list.prepend(newNote(todoStorage[i]));
      }
    }
  });

  // list loop flagged
  pubsub.subscribe('important-project-btn-click', (btn) => {
    const rule = '[data-name="card"]';
    removeAllCards(list, rule);

    for (let i = 0; i < todoStorage.length; i++) {
      if (todoStorage[i].flagged === true) {
        list.prepend(newNote(todoStorage[i]));
      }
    }
  });

  // list loop today
  pubsub.subscribe('today-project-btn-click', (btn) => {
    const rule = '[data-name="card"]';
    removeAllCards(list, rule);
    for (let i = 0; i < todoStorage.length; i++) {
      const date = parseISO(todoStorage[i].date);
      if (isToday(date)) {
        list.prepend(newNote(todoStorage[i]));
      }
    }
  });

  // list loop tag
  pubsub.subscribe('side-bar-tag-click', (container) => {
    const rule = '[data-name="card"]';
    removeAllCards(list, rule);
    const title = container.getElementsByTagName('h4')[0];
    const tag = title.textContent;

    for (let i = 0; i < todoStorage.length; i++) {
      if (todoStorage[i].tags.includes(tag)) {
        list.prepend(newNote(todoStorage[i]));
      }
    }
  });

  // tag list loop
  pubsub.subscribe('update-tags', () => {
    const tagsList = document.querySelector('#tags-list');
    const rule = '.tag-project-container';
    removeAllCards(tagsList, rule);
    for (let i = 0; i < tagStorage.length; i++) {
      const name = tagStorage[i];
      tagsList.append(newTagProject(name));
    }
  });

  // current page event
  pubsub.subscribe('new-current-page', (container) => {
    const pageTitle = document.querySelector('#page-title');
    const title = container.getElementsByTagName('h4')[0];
    pageTitle.textContent = title.textContent;
    pageTitle.setAttribute('data-page', pageTitle.textContent.toLowerCase());

    const pages = document.querySelectorAll('.menu-container, .tag-project-container, .project-title-container');
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove('current-project');
    }
    container.classList.add('current-project');
  });

  // item title click event
  pubsub.subscribe('item-title-click', (card) => {
    card.classList.toggle('checked');
    card.classList.toggle('unchecked');
  });

  // save click event
  pubsub.subscribe('save-btn-click', (card) => {
    changeColor(card);
  });

  // edit click event
  pubsub.subscribe('edit-btn-click', (card) => {
    changeColor(card);
  });

  // input flag click event
  pubsub.subscribe('input-flag-click', (btn) => {
    btn.classList.toggle('flagged');
  });

  // input description keydown event
  pubsub.subscribe('input-description-keydown', (textarea) => {
    updateTextareaHeight(textarea);
  });

  // input tag keydown event
  pubsub.subscribe('input-tag-keydown', ([key, tag]) => {
    if (key === 'Enter' || key === 'Tab' || key === ' ') {
      if (tag.textContent === '' || isTagInUse(tag)) {

      } else {
        pubsub.publish('new-tag', tag);
      }
    }
  });

  // new tag
  pubsub.subscribe('new-tag', (tag) => {
    tag.contentEditable = false;
    tag.classList.remove('input-tag');
    tag.classList.add('item-tag');
    tag.id = 'item-tag';
    const newInput = newInputTag('input');
    const tagContainer = tag.parentNode;
    tagContainer.append(newInput);
    newInput.focus();
  });

  // remove tag event
  pubsub.subscribe('remove-tag', ([card, tag]) => {
    tag.remove();
  });

  // item container click event
  pubsub.subscribe('item-container-click', (header) => {
    if (header.parentNode.classList.contains('form')) {

    } else {
      const section = header.nextElementSibling;
      if (section.scrollHeight <= 25) {

      } else if (section.style.maxHeight) {
        section.style.maxHeight = null;
      } else {
        section.style.maxHeight = '500px'; // section.scrollHeight +
      }
    }
  });
};

function removeAllCards(list, rule) {
  const cards = list.querySelectorAll(rule);
  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }
}

function updateTextareaHeight(textarea) {
  const content = textarea.value;
  const numberOfLines = (content.match(/\n/g) || []).length;
  const newHeight = 45 + numberOfLines * 22.5 + 2;
  textarea.style.height = `${newHeight}px`;
}

function changeColor(card) {
  card.classList.toggle('form');
  card.classList.toggle('todo');
}

// event listeners
const newNoteBtn = document.querySelector('#new-note');
newNoteBtn.onclick = (clicked) => {
  pubsub.publish('new-note-btn-click', clicked.target);
};

const inboxProjectBtn = document.querySelector('#inbox');
inboxProjectBtn.onclick = (clicked) => {
  pubsub.publish('new-current-page', clicked.target);
  pubsub.publish('update-list', getCurrentPage());
};

const todayProjectBtn = document.querySelector('#today');
todayProjectBtn.onclick = (clicked) => {
  clicked.stopPropagation();
  pubsub.publish('new-current-page', clicked.target);
  pubsub.publish('today-project-btn-click', clicked.target);
};

const importantProjectBtn = document.querySelector('#important');
importantProjectBtn.onclick = (clicked) => {
  pubsub.publish('new-current-page', clicked.target);
  pubsub.publish('important-project-btn-click', clicked.target);
};

const newProjectBtn = document.querySelector('#new-project-btn');
newProjectBtn.onclick = (clicked) => {
  pubsub.publish('new-project', clicked.target);
};

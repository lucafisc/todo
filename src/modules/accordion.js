export const accordion = (() => {
  const headers = document.querySelectorAll(".accordion");
  for (const header of headers) {
    header.addEventListener("click", (event) => {
        if (event.target.id === "item-title") {
            return
        }
      let section = header.nextElementSibling;
      if (section.style.maxHeight) {
        section.style.maxHeight = null;
      } else {
        section.style.maxHeight = section.scrollHeight + "px";
      }
    });
  }
})();

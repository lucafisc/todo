import "./styles/main.css";
import "./styles/nav.css";
import "./styles/list-items.css";
import "./styles/form.css";
import "./styles/projects.css";
import { pubsub } from "./modules/pubsub";
import { domControl } from "./modules/dom";
import { data } from "./modules/data";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";

// on load
window.onload = function () {
  data();
  domControl();
  pubsub.publish("on-load");
};

const colorControl = (() => {
  const root = document.documentElement;
  let mainColorHSL = getComputedStyle(root)
    .getPropertyValue("--main-color")
    .match(/(\d+)/gm);
  mainColorHSL = mainColorHSL.map(Number);
  const secondaryColorHSL = `hsl(${mainColorHSL[0] - 10}deg,${
    mainColorHSL[1] - 20
  }%,${mainColorHSL[2] + 25}%)`;
  const iconColor = `hsl(${mainColorHSL[0] - 15}deg,${mainColorHSL[1]}%,${
    mainColorHSL[2]
  }%)`;
  const flagColor = `hsl(${mainColorHSL[0] - 30}deg,${mainColorHSL[1] + 20}%,${
    mainColorHSL[2]
  }%)`;
  const oppositeColorHSL = `hsl(${mainColorHSL[0] + 180}deg,${
    mainColorHSL[1] + 10
  }%,${mainColorHSL[2] + 10}%)`;
  const oppositeColorHSLLighter = `hsl(${mainColorHSL[0] + 180}deg,${
    mainColorHSL[1] + 10
  }%,${mainColorHSL[2] + 20}%)`;

  root.style.setProperty("--secondary-color", secondaryColorHSL);
  root.style.setProperty("--icon-color", iconColor);
  root.style.setProperty("--flag-color", flagColor);
  root.style.setProperty("--opposite-color", oppositeColorHSL);
  root.style.setProperty("--opposite-color-lighter", oppositeColorHSLLighter);
})();

import "./styles/main.css";
import "./styles/nav.css";
import "./styles/list-items.css";
import "./styles/form.css";
import { accordion } from "./modules/accordion.js";
import { controller } from "./modules/controller.js";
import { domControl } from "./modules/dom.js";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";

domControl();


const colorControl = (() => {
    let root = document.documentElement;
    let mainColorHSL = getComputedStyle(root).getPropertyValue("--main-color").match(/(\d+)/gm);
    mainColorHSL = mainColorHSL.map(Number);
    let secondaryColorHSL = "hsl(" + (mainColorHSL[0] - 10) + "deg," + (mainColorHSL[1] - 20) + "%," + ( mainColorHSL[2] + 25) + "%)";
    let iconColor = "hsl(" + (mainColorHSL[0] - 15) + "deg," + (mainColorHSL[1]) + "%," + ( mainColorHSL[2]) + "%)";
    let flagColor = "hsl(" + (mainColorHSL[0] - 30) + "deg," + (mainColorHSL[1] + 20) + "%," + ( mainColorHSL[2]) + "%)";
    let oppositeColorHSL = "hsl(" + (mainColorHSL[0] + 180) + "deg," + (mainColorHSL[1] + 10) + "%," + ( mainColorHSL[2] + 10) + "%)";
    let oppositeColorHSLLighter = "hsl(" + (mainColorHSL[0] + 180) + "deg," + (mainColorHSL[1] + 10) + "%," + ( mainColorHSL[2] + 20) + "%)";

    root.style.setProperty('--secondary-color', secondaryColorHSL);
    root.style.setProperty('--icon-color', iconColor);
    root.style.setProperty('--flag-color', flagColor);
    root.style.setProperty('--opposite-color', oppositeColorHSL);
    root.style.setProperty('--opposite-color-lighter', oppositeColorHSLLighter);
  })();



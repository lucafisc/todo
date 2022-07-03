import "./styles/main.css";




const colorControl = (() => {
    let root = document.documentElement;
    let mainColorHSL = getComputedStyle(root).getPropertyValue("--main-color").match(/(\d+)/gm);
    mainColorHSL = mainColorHSL.map(Number);
    let secondaryColorHSL = "hsl(" + (mainColorHSL[0] + 1) + "," + (mainColorHSL[1] + 1) + "%," + ( mainColorHSL[2] - 5) + "%)";
    let oppositeColorHSL = "hsl(" + (mainColorHSL[0] + 180) + "," + (mainColorHSL[1] + 10) + "%," + ( mainColorHSL[2] + 10) + "%)";
    console.log(secondaryColorHSL);
    root.style.setProperty('--secondary-color', secondaryColorHSL);
    root.style.setProperty('--opposite-color', oppositeColorHSL);

  })();


//   hsl(171, 90%, 28%);

--opposite-color
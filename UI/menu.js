import { tileSize } from "../app.js"

const buttons = []

function drawMenu(ctx, width) {
  const mountainButton = document.getElementById("mountainButton")
  if(mountainButton){
    mountainButton.remove()
  }
  const riverButton = document.getElementById("riverButton")
  if(riverButton){
    riverButton.remove()
  }
  const spawnButton = document.getElementById("spawnButton")
  if(spawnButton){
    spawnButton.remove()
  }
  createButton(width, "mountainButton", './src/images/mountain.png');
  createButton(width, "riverButton");
}

function createButton(width, type, icon) {
  const buttonSize = tileSize * 2
  let newButton = document.createElement("button");
  document.body.appendChild(newButton);
  newButton.id = type;
  newButton.classList.add("buttonsTile");
  newButton.style.backgroundImage = `url(${icon})`
  newButton.style.left = `${width + buttons.length * buttonSize}px`;
  newButton.style.top = `0px`;
  newButton.style.margin = "10px";
  newButton.style.width = `${buttonSize}px`;
  newButton.style.height = `${buttonSize}px`;

  buttons.push(newButton)

  // let riverButton = document.createElement("button");
  // document.body.appendChild(riverButton);
  // riverButton.id = "riverButton";
  // riverButton.style.backgroundColor = "rgba(100, 100, 255, 0.9)";
  // riverButton.style.backgroundSize = "cover";
  // riverButton.style.backgroundRepeat = "no-repeat";
  // riverButton.style.position = "fixed";
  // riverButton.style.left = `${width + buttonSize}px`;
  // riverButton.style.top = `0px`;
  // riverButton.style.margin = "10px";
  // riverButton.style.width = `${buttonSize}px`;
  // riverButton.style.height = `${buttonSize}px`;

  // let spawnButton = document.createElement("button");
  // document.body.appendChild(spawnButton);
  // spawnButton.id = "spawnButton";
  // spawnButton.style.backgroundImage = "url('./src/images/spider.png')";
  // spawnButton.style.backgroundColor = "transparent";
  // spawnButton.style.backgroundSize = "cover";
  // spawnButton.style.backgroundRepeat = "no-repeat";
  // spawnButton.style.position = "fixed";
  // spawnButton.style.left = `${width}px`;
  // spawnButton.style.top = `${buttonSize}px`;
  // spawnButton.style.margin = "10px";
  // spawnButton.style.width = `${buttonSize}px`;
  // spawnButton.style.height = `${buttonSize}px`;
}



export { drawMenu };

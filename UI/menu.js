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
  createButton(width);
}

function createButton(width) {
  const buttonSize = width/5
  let mountainButton = document.createElement("button");
  document.body.appendChild(mountainButton);
  mountainButton.id = "mountainButton";
  mountainButton.style.backgroundImage = "url('./src/images/mountain.png')";
  mountainButton.style.backgroundSize = "cover";
  mountainButton.style.backgroundRepeat = "no-repeat";
  mountainButton.style.backgroundColor = "transparent";
  mountainButton.style.position = "fixed";
  mountainButton.style.left = `${width}px`;
  mountainButton.style.top = `0px`;
  mountainButton.style.margin = "10px";
  mountainButton.style.width = `${buttonSize}px`;
  mountainButton.style.height = `${buttonSize}px`;

  let riverButton = document.createElement("button");
  document.body.appendChild(riverButton);
  riverButton.id = "riverButton";
  riverButton.style.backgroundColor = "rgba(100, 100, 255, 0.9)";
  riverButton.style.backgroundSize = "cover";
  riverButton.style.backgroundRepeat = "no-repeat";
  riverButton.style.position = "fixed";
  riverButton.style.left = `${width + buttonSize}px`;
  riverButton.style.top = `0px`;
  riverButton.style.margin = "10px";
  riverButton.style.width = `${buttonSize}px`;
  riverButton.style.height = `${buttonSize}px`;

  let spawnButton = document.createElement("button");
  document.body.appendChild(spawnButton);
  spawnButton.id = "spawnButton";
  spawnButton.style.backgroundImage = "url('./src/images/spider.png')";
  spawnButton.style.backgroundColor = "transparent";
  spawnButton.style.backgroundSize = "cover";
  spawnButton.style.backgroundRepeat = "no-repeat";
  spawnButton.style.position = "fixed";
  spawnButton.style.left = `${width}px`;
  spawnButton.style.top = `${buttonSize}px`;
  spawnButton.style.margin = "10px";
  spawnButton.style.width = `${buttonSize}px`;
  spawnButton.style.height = `${buttonSize}px`;
}



export { drawMenu };

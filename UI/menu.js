function drawMenu(ctx, width) {
  ctx.save();
  ctx.strokeStyle = "rgba(100, 100, 255, 0.9)";
  ctx.lineWidth = 15;
  ctx.strokeRect(
    innerWidth / 2 - width / 2 - ctx.lineWidth / 2,
    0,
    canvasScreen.width + ctx.lineWidth,
    innerHeight + ctx.lineWidth
  );
  ctx.stroke();
  ctx.restore();

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
  mountainButton.style.left = `${innerWidth / 2 - width / 2}px`;
  mountainButton.style.top = `${width}px`;
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
  riverButton.style.left = `${innerWidth / 2 - width / 2 + buttonSize}px`;
  riverButton.style.top = `${width}px`;
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
  spawnButton.style.left = `${innerWidth / 2 - width / 2}px`;
  spawnButton.style.top = `${width + buttonSize}px`;
  spawnButton.style.margin = "10px";
  spawnButton.style.width = `${buttonSize}px`;
  spawnButton.style.height = `${buttonSize}px`;
}



export { drawMenu };

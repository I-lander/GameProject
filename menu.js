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
  mountainButton.style.width = `${width / 5}px`;
  mountainButton.style.height = `${width / 5}px`;

  let riverButton = document.createElement("button");
  document.body.appendChild(riverButton);
  riverButton.id = "riverButton";
  riverButton.style.backgroundColor = "rgba(100, 100, 255, 0.9)";
  riverButton.style.backgroundSize = "cover";
  riverButton.style.backgroundRepeat = "no-repeat";
  riverButton.style.position = "fixed";
  riverButton.style.left = `${innerWidth / 2 - width / 2 + width / 5}px`;
  riverButton.style.top = `${width}px`;
  riverButton.style.margin = "10px";
  riverButton.style.width = `${width / 5}px`;
  riverButton.style.height = `${width / 5}px`;
}



export { drawMenu };

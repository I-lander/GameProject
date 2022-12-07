import { tileMap, pixelUnit, gameScreen } from "../app.js";
import { mapSizeX, mapSizeY } from "../level/map.js";
import { createActionButton } from "./actionButtons.js";

const screenRatio = 2 / 3;
let marginTop = 0;
let marginLeft = 0;

function screenInit(canvasScreen, canvasMenu) {
  const screenWidth = innerWidth;
  const screenHeight = innerHeight;
  canvasScreen.width = innerWidth;
  tileMap.tileSize = (canvasScreen.width * screenRatio) / mapSizeX;
  let tileSize = tileMap.tileSize;
  canvasScreen.height = mapSizeY * tileSize;

  if (canvasScreen.height > screenHeight) {
    canvasScreen.height = screenHeight;
    tileMap.tileSize = canvasScreen.height / mapSizeY;
    tileSize = tileMap.tileSize;
    canvasScreen.width = mapSizeX * tileSize + (mapSizeX * tileSize) / 2;
    marginLeft = (screenWidth - canvasScreen.width) / 2;
  }
  marginTop = screenHeight / 2 - canvasScreen.height / 2;

  canvasScreen.style.marginTop = `${marginTop}px`;
  canvasScreen.style.marginLeft = `${marginLeft}px`;

  const gameScreen = {
    width: mapSizeX * tileSize,
    height: mapSizeY * tileSize,
  };

  const sideScreen = {
    width: canvasScreen.width - gameScreen.width,
    height: canvasScreen.height,
  };

  const levelUpScreen = document.getElementById("levelUpScreen");
  levelUpScreen.style.height = `${gameScreen.height}px`;
  levelUpScreen.style.width = `${gameScreen.width + sideScreen.width}px`;
  levelUpScreen.style.top = `${marginTop}px`;
  levelUpScreen.style.left = `${marginLeft}px`;

  const pixelUnit = tileSize / 32;

  const actionButtons = document.getElementById("actionButtons");
  actionButtons.style.height = `${tileSize}px`;
  actionButtons.style.width = `${tileSize * 3}px`;
  actionButtons.style.top = `${tileSize + marginTop}px`;
  actionButtons.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 3.5 - 2 * pixelUnit)
  }px`;

  const pause = document.getElementById("pause");
  pause.style.height = `${tileSize}px`;
  pause.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 3.5 - 2 * pixelUnit)
  }px`;

  const play = document.getElementById("play");
  play.style.height = `${tileSize}px`;
  play.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 2.5 - 2 * pixelUnit)
  }px`;

  const fastForward = document.getElementById("fastForward");
  fastForward.style.height = `${tileSize}px`;
  fastForward.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 1.5 - 2 * pixelUnit)
  }px`;

  const actionStatus = document.getElementById("actionStatus");
  actionStatus.style.top = `${tileSize * 2 + marginTop}px`;
  actionStatus.style.left = `${
    marginLeft + canvasScreen.width - tileSize * 3.5
  }px`;
  actionStatus.style.width = `${tileSize * 3}px`;

  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.style.left = `${gameScreen.width + marginLeft}px`;
  buttonContainer.style.width = `${sideScreen.width}px`;
  buttonContainer.style.top = `${tileSize * 3 + marginTop}px`;

  const mainMenu = document.getElementById("mainMenu");
  const mainMenuP = mainMenu.querySelector("p");
  mainMenuP.style.fontSize = `${14 * pixelUnit}px`;
  mainMenuP.style.lineHeight = `${24 * pixelUnit}px`;

  const mainMenuImg = mainMenu.querySelector("img");
  mainMenuImg.style.height = `${tileSize * 5}px`;
  mainMenuImg.style.top = `${marginTop + tileSize * 2}px`;
  mainMenuImg.style.left = `${marginLeft + canvasScreen.width/2 - tileSize * 2.5}px`;

  createActionButton(pixelUnit);

  const startBtn = document.getElementById("startBtn");
  startBtn.style.height = `${tileSize*2}px`;
  startBtn.style.width = `${tileSize * 6}px`;
  startBtn.style.fontSize = `${tileSize*0.65}px`;

  startBtn.style.top = `${marginTop + tileSize * 8}px`;
  startBtn.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;

  const startBtnAsGod = document.getElementById("startBtnAsGod");
  startBtnAsGod.style.height = `${tileSize}px`;
  startBtnAsGod.style.width = `${tileSize * 6}px`;
  startBtnAsGod.style.fontSize = `${tileSize*0.65}px`;

  startBtnAsGod.style.top = `${marginTop + tileSize * 10.5}px`;
  startBtnAsGod.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;
}

function drawSideScreenBackground(ctx, gameScreen, sideScreen) {
  ctx.save();
  ctx.fillStyle = "rgba(50,50,50, 1)";
  ctx.fillRect(gameScreen.width, 0, sideScreen.width, sideScreen.height);
  ctx.restore();
}

const stars = [];
const maxStarts = 100;

function drawBackGameBackground(ctx, gameScreen) {
  ctx.save();
  ctx.fillStyle = "rgba(10, 10, 10, 1)";
  ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);
  ctx.restore();
  if (stars.length < maxStarts) {
    for (let i = 0; i < maxStarts; i++) {
      generateStars();
    }
  }
  drawStars(ctx);
}

function generateStars() {
  const xStar = Math.random() * gameScreen.width;
  const yStar = Math.random() * gameScreen.height;
  const starSize = Math.random() * 4 * pixelUnit;
  const brightness = Math.random() - 0.3;

  stars.push({
    xStar: xStar,
    yStar: yStar,
    starSize: starSize,
    brightness: brightness,
  });
}

function drawStars(ctx) {
  for (let star = 0; star < stars.length; star++) {
    ctx.save();
    ctx.fillStyle = `rgba(250, 250, 250, ${stars[star].brightness})`;
    ctx.fillRect(
      stars[star].xStar,
      stars[star].yStar,
      stars[star].starSize,
      stars[star].starSize
    );
    ctx.restore();
  }
}

export {
  screenInit,
  drawSideScreenBackground,
  drawBackGameBackground,
  marginTop,
  marginLeft,
};

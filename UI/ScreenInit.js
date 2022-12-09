import {
  tileMap,
  pixelUnit,
  gameScreen,
  ctxmainMenuCanvas,
  mainMenuCanvas,
} from "../app.js";
import { mapSizeX, mapSizeY } from "../level/map.js";

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
  mainMenuImg.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 2.5
  }px`;

  const startBtn = document.getElementById("startBtn");
  startBtn.style.height = `${tileSize * 2}px`;
  startBtn.style.width = `${tileSize * 6}px`;
  startBtn.style.fontSize = `${tileSize * 0.65}px`;

  startBtn.style.top = `${marginTop + tileSize * 8}px`;
  startBtn.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;

  const startBtnAsGod = document.getElementById("startBtnAsGod");
  startBtnAsGod.style.height = `${tileSize}px`;
  startBtnAsGod.style.width = `${tileSize * 6}px`;
  startBtnAsGod.style.fontSize = `${tileSize * 0.55}px`;

  startBtnAsGod.style.top = `${marginTop + tileSize * 10.5}px`;
  startBtnAsGod.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;

  mainMenuCanvas.width = gameScreen.width + sideScreen.width;
  mainMenuCanvas.height = gameScreen.height;
  mainMenuCanvas.style.top = `${marginTop}px`;
  mainMenuCanvas.style.left = `${marginLeft}px`;
}

function drawSideScreenBackground(ctx, screen, sideScreen) {
  ctx.save();
  ctx.fillStyle = "rgba(50,50,50, 1)";
  ctx.fillRect(screen.width, 0, sideScreen.width, sideScreen.height);
  ctx.restore();
}

const stars = [];

function drawBackGameBackground(ctx, screen, isMainMenu = false) {
  const maxStars = screen.width/2;

  const mainMenuStars = [];
  let starsArray;
  starsArray = isMainMenu ? mainMenuStars : stars;
  ctx.save();
  ctx.fillStyle = "rgba(10, 10, 10, 1)";
  ctx.fillRect(0, 0, screen.width, screen.height);
  ctx.restore();
  if (stars.length < maxStars) {
    for (let i = 0; i < maxStars; i++) {
      generateStars(starsArray);
    }
  }
  drawStars(ctx, starsArray);
}

function generateStars(starsArray) {
  const xStar = Math.random() * screen.width;
  const yStar = Math.random() * screen.height;
  const starSize = Math.random() * 4 * pixelUnit;
  const brightness = Math.random() - 0.3;

  starsArray.push({
    xStar: xStar,
    yStar: yStar,
    starSize: starSize,
    brightness: brightness,
  });
}

function drawStars(ctx, starsArray) {
  for (let star = 0; star < starsArray.length; star++) {
    ctx.save();
    ctx.fillStyle = `rgba(250, 250, 250, ${starsArray[star].brightness})`;
    ctx.fillRect(
      starsArray[star].xStar,
      starsArray[star].yStar,
      starsArray[star].starSize,
      starsArray[star].starSize
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

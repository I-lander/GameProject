import {
  isPause,
  tileSize,
  pixelUnit,
  musicMuteFunction,
  soundMuteFunction,
  soundMute,
  musicMute,
  updatePause,
  selectedBtn,
  ctxmainMenuCanvas,
  mainMenu,
  mainMenuCanvas,
} from "../app.js";
import { ASSETS } from "../core/loadAssets.js";
import { playSound } from "../core/utils.js";
import { updateStatusText } from "./actionButtons.js";
import { resetCardContainer } from "./card-creation.js";
import { marginTop, marginLeft, drawBackGameBackground } from "./ScreenInit.js";

export function handlePauseMenu() {
  const pauseMenu = document.getElementById("pauseMenu");
  if (isPause) {
    pauseMenu.classList.remove("disable");
    const soundsOption = document.getElementById("soundsOption");
    soundsOption.classList.remove("disable")
    resetButton(pauseMenu);
    resumeButton();
    musicMuteElement();
    soundMuteElement();
  }
}

export function resetButton(pauseMenu) {
  const resetButton = document.getElementById("resetButtonPauseMenu");
  resetButton.style.height = `${tileSize}px`;
  resetButton.style.width = `${tileSize * 6}px`;
  resetButton.style.top = `${marginTop + tileSize * 7.5}px`;
  resetButton.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;
  resetButton.style.fontSize = `${tileSize * 0.55}px`;
  resetButton.style.padding = `${9.5 * pixelUnit}px`;
  resetButton.onclick = () => {
    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.innerHTML = "";
    resetCardContainer();
    musicMuteElementMain(tileSize, pixelUnit);
    soundMuteElementMain(tileSize, pixelUnit);
    buttonContainer.style.height = "0px";
    const cardDescription = document.getElementById("cardDescription");
    cardDescription.style.height = "0px";
    const actionButtons = document.getElementById("actionButtons");
    actionButtons.classList.add("disable");
    const soulResource = document.getElementById("soulResource");
    soulResource.classList.add("disable");
    const levelText = document.getElementById("levelText");
    levelText.classList.add("disable");
    drawBackGameBackground(ctxmainMenuCanvas, mainMenuCanvas, true);
    setTimeout(() => {
      pauseMenu.classList.add("disable");
      mainMenu.classList.remove("disable");
      mainMenuCanvas.classList.remove("disable");
    }, 100);
    playSound("clic");
  };
}

function resumeButton() {
  const resumeButton = document.getElementById("resumeButton");
  resumeButton.style.height = `${tileSize}px`;
  resumeButton.style.width = `${tileSize * 6}px`;
  resumeButton.style.top = `${marginTop + tileSize * 6}px`;
  resumeButton.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;
  resumeButton.style.fontSize = `${tileSize * 0.55}px`;
  resumeButton.style.padding = `${9.5 * pixelUnit}px`;
  resumeButton.onclick = () => {
    pauseMenu.classList.add("disable");
    !selectedBtn ? updatePause(false) : null;
    updateStatusText(pixelUnit);
    const soundsOption = document.getElementById("soundsOption");
    soundsOption.classList.add("disable")
    playSound("clic");
  };
}

function musicMuteElement() {
  const musicMuteElement = document.getElementById("musicMute");
  musicMuteElement.style.left = `${marginLeft + tileSize * 7.5}px`;
  musicMuteElement.style.top = `${marginTop + tileSize * 9.5}px`;
  musicMuteElement.style.fontSize = `${tileSize * 0.55}px`;
  musicMuteElement.style.width = `${tileSize * 5}px`;
  musicMuteElement.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;

  const musicMuteButton = document.getElementById("musicMuteButton");
  musicMuteButton.style.height = `${tileSize}px`;
  musicMuteButton.style.width = `${tileSize}px`;

  let musicMuteButtonImg = !musicMute ? ASSETS["music"] : ASSETS["musicMute"];
  musicMuteButton.appendChild(musicMuteButtonImg);
  musicMuteButtonImg.style.height = `${tileSize}px`;
  musicMuteButtonImg.style.width = `${tileSize}px`;
  musicMuteButton.style.position = "absolute"
  musicMuteButton.style.right = `0px`;

  musicMuteButton.onclick = () => {
    musicMuteFunction();
    console.log(musicMute);
    musicMuteButtonImg.remove();
    musicMuteButtonImg = !musicMute ? ASSETS["music"] : ASSETS["musicMute"]
    musicMuteButton.appendChild(musicMuteButtonImg);
    musicMuteButtonImg.style.height = `${tileSize}px`;
    musicMuteButtonImg.style.width = `${tileSize}px`;
    playSound("clic");
  };
}

function soundMuteElement() {
  const soundMuteElement = document.getElementById("soundMute");
  soundMuteElement.style.top = `${marginTop + tileSize * 11}px`;
  soundMuteElement.style.fontSize = `${tileSize * 0.55}px`;
  soundMuteElement.style.width = `${tileSize * 5}px`;
  soundMuteElement.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;

  const soundMuteButton = document.getElementById("soundMuteButton");
  soundMuteButton.style.height = `${tileSize}px`;
  soundMuteButton.style.width = `${tileSize}px`;
  soundMuteButton.style.position = "absolute"
  soundMuteButton.style.right = `0px`;
  let soundMuteButtonImg = !soundMute ? ASSETS["sound"] : ASSETS["soundMute"];
  soundMuteButton.appendChild(soundMuteButtonImg);
  soundMuteButtonImg.style.height = `${tileSize}px`;
  soundMuteButtonImg.style.width = `${tileSize}px`;
  soundMuteButton.onclick = () => {
    soundMuteFunction();
    soundMuteButtonImg.remove();
    soundMuteButtonImg = !soundMute ? ASSETS["sound"] : ASSETS["soundMute"];
    soundMuteButton.appendChild(soundMuteButtonImg);
    soundMuteButtonImg.style.height = `${tileSize}px`;
    soundMuteButtonImg.style.width = `${tileSize}px`;
    playSound("clic");
  };
}


export function musicMuteElementMain(tileSize, pixelUnit) {
  const musicMuteElement = document.getElementById("musicMute");
  musicMuteElement.style.left = `${marginLeft + tileSize * 6.5}px`;
  musicMuteElement.style.top = `${marginTop + tileSize * 11.5}px`;
  musicMuteElement.style.fontSize = `${tileSize * 0.55}px`;
  musicMuteElement.style.width = `${tileSize * 5}px`;
  musicMuteElement.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;

  const musicMuteButton = document.getElementById("musicMuteButton");
  musicMuteButton.style.height = `${tileSize}px`;
  musicMuteButton.style.width = `${tileSize}px`;

  let musicMuteButtonImg = !musicMute ? ASSETS["music"] : ASSETS["musicMute"];
  musicMuteButton.appendChild(musicMuteButtonImg);
  musicMuteButtonImg.style.height = `${tileSize}px`;
  musicMuteButtonImg.style.width = `${tileSize}px`;
  musicMuteButtonImg.style.position = "absolute"
  musicMuteButtonImg.style.top = "0px"
  musicMuteButtonImg.style.left = "0px"
  musicMuteButton.style.position = "absolute"
  musicMuteButton.style.right = `0px`;

  musicMuteButton.onclick = () => {
    musicMuteFunction();
    musicMuteButtonImg.remove();
    musicMuteButtonImg = !musicMute ? ASSETS["music"] : ASSETS["musicMute"]
    console.log(musicMuteButtonImg);
    musicMuteButton.appendChild(musicMuteButtonImg);
    musicMuteButtonImg.style.height = `${tileSize}px`;
    musicMuteButtonImg.style.width = `${tileSize}px`;
    musicMuteButtonImg.style.position = "absolute"
    musicMuteButtonImg.style.top = "0px"
    musicMuteButtonImg.style.left = "0px"
    playSound("clic");
  };
}

export function soundMuteElementMain(tileSize, pixelUnit) {
  const soundMuteElement = document.getElementById("soundMute");
  soundMuteElement.style.top = `${marginTop + tileSize * 13}px`;
  soundMuteElement.style.fontSize = `${tileSize * 0.55}px`;
  soundMuteElement.style.width = `${tileSize * 5}px`;
  soundMuteElement.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;

  const soundMuteButton = document.getElementById("soundMuteButton");
  soundMuteButton.style.height = `${tileSize}px`;
  soundMuteButton.style.width = `${tileSize}px`;
  soundMuteButton.style.position = "absolute"
  soundMuteButton.style.right = `0px`;
  let soundMuteButtonImg = !soundMute ? ASSETS["sound"] : ASSETS["soundMute"];

  soundMuteButton.appendChild(soundMuteButtonImg);
  soundMuteButtonImg.style.height = `${tileSize}px`;
  soundMuteButtonImg.style.width = `${tileSize}px`;
  soundMuteButtonImg.style.position = "absolute"
  soundMuteButtonImg.style.top = "0px"
  soundMuteButtonImg.style.left = "0px"
  soundMuteButton.onclick = () => {
    soundMuteFunction();
    soundMuteButtonImg.remove();
    soundMuteButtonImg = !soundMute ? ASSETS["sound"] : ASSETS["soundMute"];
    soundMuteButton.appendChild(soundMuteButtonImg);
    soundMuteButtonImg.style.height = `${tileSize}px`;
    soundMuteButtonImg.style.width = `${tileSize}px`;
    soundMuteButtonImg.style.position = "absolute"
    soundMuteButtonImg.style.top = "0px"
    soundMuteButtonImg.style.left = "0px"
    playSound("clic");
  };
}
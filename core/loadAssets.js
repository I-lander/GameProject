import { screenInit } from "../UI/ScreenInit.js";

const SOUNDS = [
  "mainLoop",
  "addTileSound",
  "clic",
  "damage",
  "godDamage",
  "resourcePoping",
  "shoot",
  "thunderStrike",
  "bombSound",
];

const IMAGES = [
  "bullet",
  "cardLevelUp",
  "mountain",
  "temple",
  "tree",
  "tower",
  "desert",
  "lava",
  "river",
  "star",
  "bomb",
  "thunder",
  "sound",
  "soundMute",
  "music",
  "musicMute",
  "menuButtonStart",
  "menuButtonStartAsGod",
  "addTile",
  "statsBtn",
  "descriptionBtn",
  "cooldownIcon",
  "forceIcon",
  "rangeIcon",
  "speedIcon",
  "godTile",
];

export const ASSETS = [];

export let ASSETS_COUNT = SOUNDS.length + IMAGES.length;

function loadingCallback(canvasScreen) {
  if (--ASSETS_COUNT === 0) {
    screenInit(canvasScreen);
  }
}

export function loadAssets(canvasScreen) {
  for (let i = 0; i < SOUNDS.length; i++) {
    let sound = SOUNDS[i];
    const ext = sound === "mainLoop" ? "mp3" : "wav";
    ASSETS[sound] = new Audio(`./src/sounds/${sound}.${ext}`);
    ASSETS[sound].load();
    ASSETS[sound].addEventListener(
      "canplaythrough",
      loadingCallback(canvasScreen),
      false
    );
  }

  for (let i = 0; i < IMAGES.length; i++) {
    let image = IMAGES[i];
    ASSETS[image] = new Image();
    ASSETS[image].src = `./src/images/${image}.png`;
    ASSETS[image].addEventListener("load", loadingCallback(canvasScreen));
  }
}

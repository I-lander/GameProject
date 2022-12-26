import { TileMap } from "./level/tileMap.js";
import { Particle } from "./player/visualEffects.js";
import { spawnMonsters } from "./player/NPCs/spawn.js";
import { drawCards } from "./UI/card-creation.js";
import { resetTileCards } from "./core/constants/tiles.js";
import {
  drawSideScreenBackground,
  drawBackGameBackground,
} from "./UI/ScreenInit.js";
import { Monster } from "./player/NPCs/monster.js";
import { drawLifeBar } from "./player/utils.js";
import { mapSizeX, mapSizeY } from "./level/map.js";
import { levelUpScreen } from "./core/levelUp/levelUp.js";
import { createActionButton, updateStatusText } from "./UI/actionButtons.js";
import { handleClick, thunders } from "./core/handleClick.js";
import { gameOverScreen } from "./UI/gameOverScreen.js";
import { resetBonus } from "./core/levelUp/bonus.js";
import { ASSETS, loadAssets } from "./core/loadAssets.js";
import { renderCardDescription } from "./UI/card-description.js";
import { playSound } from "./core/utils.js";

// Declare & export the variable used to pause the game
// Declare & export the function that update pause status

let isPause = true;
function inversePause() {
  isPause = !isPause;
  updateStatusText(pixelUnit);
}

function updatePause(bool) {
  isPause = bool;
}

export { isPause, inversePause, updatePause };

// Declare & export arrays used to store game elements

let monsters;
let damageTexts;
let lowResources = [];
let particles = [];

export { monsters, particles, damageTexts, lowResources };

export function emptyLowResourcesArray() {
  lowResources = [];
  const previousText = document.getElementById("lowResource");
  previousText ? previousText.remove() : null;
}

// Declare & export the canvas variables used to draw on.

const canvasScreen = document.getElementById("canvasScreen");
const ctxScreen = canvasScreen.getContext("2d");

const mainMenuCanvas = document.getElementById("mainMenuCanvas");
const ctxmainMenuCanvas = canvasScreen.getContext("2d");

ctxScreen.imageSmoothingEnabled = false;

export { ctxScreen, canvasScreen, mainMenuCanvas, ctxmainMenuCanvas };
// Create and initialize the game screen and map

const tileMap = new TileMap();

let musicMute = false;
let soundMute = false;

function musicMuteFunction() {
  musicMute = !musicMute;
}
function soundMuteFunction() {
  soundMute = !soundMute;
}

export { musicMuteFunction, soundMuteFunction, musicMute, soundMute };

loadAssets(canvasScreen);

const beforeInit = document.getElementById("beforeInit");
beforeInit.classList.add("disable");

// Declare & export the variable use to uniformization of any sprite
// The tileSize is use to calibrate screen size and elements size

const tileSize = tileMap.tileSize;
document.documentElement.style.setProperty("--tileSize", tileSize + "px");
const pixelUnit = tileSize / 32;
const gameScreen = {
  width: mapSizeX * tileSize,
  height: mapSizeY * tileSize,
};

const sideScreen = {
  width: canvasScreen.width - gameScreen.width,
  height: canvasScreen.height,
};

export { tileMap, tileSize, pixelUnit, gameScreen, sideScreen };

// As this method need the tileSize variable it must be execute after its declaration

drawBackGameBackground(ctxmainMenuCanvas, mainMenuCanvas, true);

// Declare the variable containing the main menu is order to hide it

export const mainMenu = document.getElementById("mainMenu");

// Handle click on start game button

document.getElementById("startBtn").addEventListener("click", () => {
  playSound("clic");
  startGame();
});

export let isGod = false;

export function initIsGod () {
  isGod = false;
}

document.getElementById("startBtnAsGod").addEventListener("click", () => {
  isGod = true;
  playSound("clic");
  startGame();
});

// Method used to initialize the variable to start the game with clean values

function init() {
  resetBonus();
  resetTileCards();
  tileMap.init();
  levelUp = true;
  monsters = [];
  damageTexts = [];
  particles = [];
}

// Method used to start the game after clicking on the start game button

export function startGame() {
  init();
  isPause = false;
  const soundsOption = document.getElementById("soundsOption");
  soundsOption.classList.add("disable");
  const soulResource = document.getElementById("soulResource");
  soulResource.classList.remove("disable");
  const levelText = document.getElementById("levelText");
  levelText.classList.remove("disable");
  const hpLvl = document.getElementById("hpLvl");
  hpLvl.classList.remove("disable");
  drawCards();
  renderCardDescription();
  createActionButton(pixelUnit);
  mainMenu.classList.add("disable");
  mainMenuCanvas.classList.add("disable");
  animate();
}

// Declare elements used to maintain stable speed for the animation

let lastFrameTimeMs = 0; // The last time the loop was run
let lastTextFrameTimeMs = 0;
let lastFrameBeforePause = 0;
let maxFPS = 90; // The maximum FPS we want to allow
let deltaFactor = 10;
let delta = 0;
let pauseDelta = 0;
let levelUp = true;

function inverseLeveUp() {
  levelUp = !levelUp;
  updateStatusText(pixelUnit);
}

let selectedBtn;

function updateSelectedBtn(btn) {
  selectedBtn = btn;
}

export { delta, pauseDelta, inverseLeveUp };

const mainLoop = ASSETS["mainLoop"];
let musicPause = false;

// Game Loop method use to create the animation

function animate(timestamp) {
  if (musicPause) {
    mainLoop.pause();
  } else {
    !musicMute ? mainLoop.play() : mainLoop.pause();
  }
  if (isPause) {
    pauseDelta = timestamp - lastFrameBeforePause;
    lastFrameTimeMs = timestamp;

    const Textdelta = (timestamp - lastTextFrameTimeMs) / deltaFactor;

    lowResources.forEach((lowResource, index) => {
      lowResource.update(Textdelta);
      if (lowResource.opacity <= 0) {
        lowResources.splice(index, 1);
        const previousText = document.getElementById("lowResource");
        previousText ? previousText.remove() : null;
      }
    });
    lastTextFrameTimeMs = timestamp;

    requestAnimationFrame(animate);
    return;
  }
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    requestAnimationFrame(animate);
    return;
  }

  delta = (timestamp - lastFrameTimeMs) / deltaFactor; // get the delta time since last frame

  lastFrameTimeMs = timestamp;
  lastFrameBeforePause = timestamp;
  ctxScreen.clearRect(0, 0, canvasScreen.width, canvasScreen.height);

  drawBackGameBackground(ctxScreen, gameScreen);

  tileMap.draw(ctxScreen); // draw the map
  const mainPlayer = tileMap.players[0];
  isGod ? (mainPlayer.stats.soulResource = 99999999) : null;
  isGod ? (mainPlayer.maxHp = 9999) : null;
  isGod ? (mainPlayer.stats.hp = 9999) : null;
  spawnMonsters(); // method that handle any spawning monsters
  if (levelUp) {
    isPause = true;
    updateStatusText(pixelUnit);
    levelUpScreen(levelUp);
  }

  // Delete particles when too small

  particles.forEach((particle, index) => {
    particle.update(ctxScreen);
    if (particle.radius < 0) {
      particles.splice(index, 1);
    }
  });

  for (let i = 0; i < tileMap.spawnPoints.length; i++) {
    const spawnPoint = tileMap.spawnPoints[i];
    spawnPoint.update(ctxScreen);
  }
  // Loop on all monsters to update / draw it

  monsters.forEach((monster, index) => {
    drawLifeBar(ctxScreen, monster);

    monster.update(ctxScreen);
    
    if (!monster.path || monster.path.length === 0) {
      monsters.push(
        new Monster(
          monster.x - tileSize / 2,
          monster.y - tileSize / 2,
          tileSize,
          "bombMonster",
          "air"
        )
      );
      monsters.splice(index, 1);
    }

    // Touch player

    const distance = Math.hypot(
      mainPlayer.x - monster.x,
      mainPlayer.y - monster.y
    );
    if (distance - monster.hitBox < 1) {
      mainPlayer.takingDamage(monster.stats.force);
      monster.stats.hp = 0;
    }

    // Handle the death for monsters when hp === 0

    if (monster.stats.hp <= 0) {
      for (let i = 0; i < 20; i++) {
        particles.push(
          new Particle(monster.x, monster.y, Math.random() * 2 * pixelUnit, {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
          })
        );
      }

      // Remove the monster from the array
      monsters = monsters.filter((item) => {
        return item !== monster;
      });
    }
  });

  // Loop on the damage text array to delete when needed

  damageTexts.forEach((damageText, damageTextIndex) => {
    damageText.draw(ctxScreen);
    if (damageText.hue <= 0) {
      damageTexts.splice(damageTextIndex, 1);
    }
  });

  for (let i = 0; i < tileMap.stars.length; i++) {
    const star = tileMap.stars[i];
    star.update(ctxScreen);
  }

  for (let i = 0; i < tileMap.villages.length; i++) {
    const village = tileMap.villages[i];
    village.update(ctxScreen);
  }

  for (let i = 0; i < tileMap.trees.length; i++) {
    const tree = tileMap.trees[i];
    tree.update(ctxScreen);
  }

  for (let i = 0; i < thunders.length; i++) {
    const thunder = thunders[i];
    thunder.update(ctxScreen);
    if (thunder.radius >= thunder.maxRadius) {
      thunders.splice(i, 1);
    }
  }

  for (let i = 0; i < tileMap.towers.length; i++) {
    const tower = tileMap.towers[i];
    tower.update(ctxScreen);

    tower.projectiles.forEach((projectile, projectileIndex) => {
      monsters.forEach((monster, index) => {
        const distance = Math.hypot(
          projectile.x - monster.x,
          projectile.y - monster.y
        );
        if (distance - monster.hitBox - projectile.radius < 1) {
          tower.projectiles.splice(projectileIndex, 1);
          !monster.isTakingDame ? monster.takingDamage(projectile.force) : null;
          return;
        }
      });
      projectile.update(ctxScreen);
      if (
        projectile.x + projectile.radius < 1 ||
        projectile.y + projectile.radius < 1 ||
        projectile.x - projectile.radius > gameScreen.width ||
        projectile.y - projectile.radius > gameScreen.height
      ) {
        setTimeout(() => {
          tower.projectiles.splice(projectileIndex, 1);
        });
      }
    });
  }

  drawSideScreenBackground(ctxScreen, gameScreen, sideScreen);

  tileMap.players.forEach((player, index) => {
    player.draw(ctxScreen);
    // Condition of death GAME OVER
    if (mainPlayer.stats.hp <= 0) {
      isPause = true;
      init();
      setTimeout(() => {
        gameOverScreen(mainPlayer.level);
      }, 300);
    }
    // Loop on any player's projectiles & monsters to check if it touch an monster
    player.projectiles.forEach((projectile, projectileIndex) => {
      monsters.forEach((monster, index) => {
        const distance = Math.hypot(
          projectile.x - monster.x,
          projectile.y - monster.y
        );
        if (distance - monster.hitBox - projectile.radius < 1) {
          player.projectiles.splice(projectileIndex, 1);
          !monster.isTakingDame ? monster.takingDamage(projectile.force) : null;
          return;
        }
      });
      projectile.update(ctxScreen);
      if (
        projectile.x + projectile.radius < 1 ||
        projectile.y + projectile.radius < 1 ||
        projectile.x - projectile.radius > gameScreen.width ||
        projectile.y - projectile.radius > gameScreen.height
      ) {
        setTimeout(() => {
          player.projectiles.splice(projectileIndex, 1);
        });
      }
    });
  });

  pauseDelta = 0;
  requestAnimationFrame(animate);
}

// Declare & export the button pressed in order to delete it after it was used
// Declare & export function to update this button

export { selectedBtn, updateSelectedBtn };

canvasScreen.addEventListener("click", (event) => {
  handleClick(event);
});

function cleanMap() {
  for (let row = 0; row < mapSizeY; row++) {
    for (let column = 0; column < mapSizeX; column++) {
      let tile = tileMap.map[row][column];
      if (tile === "green") {
        tileMap.map[row][column] = "0";
      }
    }
  }
}

export { cleanMap };

window.addEventListener("blur", () => {
  mainLoop.pause();
  musicPause = true;
  isPause = true;
  updateStatusText(pixelUnit);
});

window.addEventListener("focus", (event) => {
  musicPause = false;
});

import { TileMap } from "./level/tileMap.js";
import { Particle } from "./player/visualEffects.js";
import { spawnMonsters } from "./player/NPCs/spawn.js";
import { drawMenu } from "./UI/menu.js";
import { marginLeft, marginTop } from "./UI/ScreenInit.js";
import { screenInit, drawSideScreenBackground } from "./UI/ScreenInit.js";
import { Monster } from "./player/NPCs/monster.js";
import { drawLifeBar, DrawDamage } from "./player/utils.js";
import { mapSizeX, mapSizeY } from "./level/map.js";

// Declare & export the variable used to pause the game
// Declare & export the function that update pause status

let isPause = true;
function inversePause() {
  isPause = !isPause;
}

export { isPause, inversePause };

// Declare & export arrays used to store game elements

let monsters;
let damageTexts;
let particles;

export { monsters, damageTexts };

// Declare & export the canvas variables used to draw on.

const canvasScreen = document.getElementById("canvasScreen");
const ctxScreen = canvasScreen.getContext("2d");
ctxScreen.imageSmoothingEnabled = false;

export { ctxScreen, canvasScreen };

// Create and initialize the game screen and map

const tileMap = new TileMap();
screenInit(canvasScreen);

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
drawMenu();

// Declare the variable containing the main menu is order to hide it

const mainMenu = document.getElementById("mainMenu");

// Handle click on start game button

document.getElementById("startBtn").addEventListener("click", () => {
  startGame();
});

// Method used to initialize the variable to start the game with clean values

function init() {
  tileMap.init();
  monsters = [];
  damageTexts = [];
  particles = [];
}

// Method used to start the game after clicking on the start game button

function startGame() {
  init();
  isPause = false;
  mainMenu.classList.add("disable");
  animate();
}

// Declare elements used to maintain stable speed for the animation

let lastFrameTimeMs = 0; // The last time the loop was run
let maxFPS = 90; // The maximum FPS we want to allow
let speedFactor = 10;
let delta = 0;
export { delta };

// Game Loop method use to create the animation

function animate(timestamp) {
  if (isPause) {
    lastFrameTimeMs = timestamp;
    requestAnimationFrame(animate);
    return;
  }
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    requestAnimationFrame(animate);
    return;
  }

  delta = (timestamp - lastFrameTimeMs) / speedFactor; // get the delta time since last frame

  lastFrameTimeMs = timestamp;
  ctxScreen.clearRect(0, 0, canvasScreen.width, canvasScreen.height);

  drawSideScreenBackground(ctxScreen, gameScreen, sideScreen);

  tileMap.draw(ctxScreen); // draw the map
  const mainPlayer = tileMap.players[0]; // create a variable to make the player easiest to use
  spawnMonsters(); // method that handle any spawning monsters

  tileMap.players.forEach((player, index) => {
    player.draw(ctxScreen);

    // Condition of death GAME OVER

    if (mainPlayer.stats.hp <= 0) {
      mainMenu.classList.remove("disable");
      isPause = true;
      init();
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
          monster.stats.hp -= projectile.force; // the monster lose as hp as the projectile force
          const damageText = new DrawDamage(monster, monster.stats.force);
          damageTexts.push(damageText);
          mainPlayer.stats.exp++; // earn experience
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

  // Delete particles when too small

  particles.forEach((particle, index) => {
    particle.update(ctxScreen);
    if (particle.radius < 0) {
      particles.splice(index, 1);
    }
  });

  // Loop on all monsters to update / draw it

  monsters.forEach((monster, index) => {
    drawLifeBar(ctxScreen, monster);

    // Initialize collision

    monster.collideWith = null;
    monster.collide = false;

    // When a monster has no possibility to move, it go straight to the center
    // It must detect collision in order to smash and kill element to make the path creation possible again

    if (monster.path.length === 0) {
      tileMap.mountains.forEach((mountain) => {
        if (monster.isCollideWith(mountain)) {
          monster.collide = true;
          monster.collideWith = mountain;
        }
      });
    } else {
    }

    monster.update(ctxScreen);

    // Touch player

    const distance = Math.hypot(
      mainPlayer.x - monster.x,
      mainPlayer.y - monster.y
    );
    if (distance - monster.hitBox < 1) {
      mainPlayer.stats.hp -= monster.stats.force; // Player lose as hp as the monster force
      const damageText = new DrawDamage(mainPlayer, monster.stats.force);
      damageTexts.push(damageText);
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
    if (damageText.entity.y - damageText.y > tileSize / 2) {
      damageTexts.splice(damageTextIndex, 1);
    }
  });

  // Loop on the montains array to delete element when its hp === 0

  for (let i = 0; i < tileMap.mountains.length; i++) {
    const mountain = tileMap.mountains[i];
    drawLifeBar(ctxScreen, mountain);
    if (mountain.stats.hp <= 0) {
      tileMap.map[mountain.position.y][mountain.position.x] = "0";
      tileMap.mountains.splice(i, 1);
      monsters.forEach((monster) => {
        monster.findingPath();
      });
    }
  }

  for (let i = 0; i < tileMap.villages.length; i++) {
    const village = tileMap.villages[i];
    village.update(ctxScreen);
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
          monster.stats.hp -= projectile.force; // the monster lose as hp as the projectile force
          const damageText = new DrawDamage(monster, monster.stats.force);
          damageTexts.push(damageText);
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

  requestAnimationFrame(animate);
}

// Declare & export the button pressed in order to delete it after it was used
// Declare & export function to update this button

let pressedBtn;

function updatePressedBtn(btn) {
  pressedBtn = btn;
}

export { pressedBtn, updatePressedBtn };

canvasScreen.addEventListener("click", (event) => {
  const xZero = marginLeft;
  const yZero = marginTop;
  const x = event.x - xZero;
  const y = event.y - yZero;
  const clickPositionInGrid = tileMap.getPosition(x, y);
  if (
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] === "green" &&
    (tileMap.selectedBtn === "mountain" || "river" || "village" || "tower")
  ) {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] =
      tileMap.selectedBtn;
    cleanMap();
    tileMap.selectedBtn = "";
    // pressedBtn.remove();
    pressedBtn = null;
    monsters.forEach((monster) => {
      monster.findingPath();
    });
    inversePause();
  }

  if (tileMap.selectedBtn === "spider") {
    monsters.push(
      new Monster(
        event.x - xZero - tileSize / 2,
        y - tileSize / 2,
        "ground",
        tileSize,
        "./src/images/spider.png"
      )
    );
    tileMap.selectedBtn = "";
    inversePause();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    isPause = !isPause;
  }
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

import { TileMap } from "./level/tileMap.js";
import { Particle } from "./player/visualEffects.js";
import findPath from "./player/NPCs/findPath.js";
import { spawnEnemies } from "./player/NPCs/spawn.js";
import { drawMenu } from "./UI/menu.js";
import { marginLeft, marginTop } from "./UI/ScreenInit.js";
import { screenInit } from "./UI/ScreenInit.js";
import { Monster } from "./player/NPCs/monster.js";
import { drawLifeBar, DrawDamage } from "./player/utils.js";
import { mapSizeX, mapSizeY } from "./level/map.js";

const canvasScreen = document.getElementById("canvasScreen");
const ctxScreen = canvasScreen.getContext("2d");
ctxScreen.imageSmoothingEnabled = false;

const canvasMenu = document.getElementById("canvasMenu");
const ctxMenu = canvasMenu.getContext("2d");
ctxMenu.imageSmoothingEnabled = false;

export { ctxScreen, canvasScreen, ctxMenu, canvasMenu };

const tileMap = new TileMap();

screenInit(canvasScreen, canvasMenu);

const tileSize = tileMap.tileSize;
document.documentElement.style.setProperty("--tileSize", tileSize + "px");
const pixelUnit = tileSize / 32;

drawMenu(ctxMenu, canvasScreen.width);

export { tileMap, tileSize, pixelUnit };

const mainMenu = document.getElementById("mainMenu");

let isPause = true;

export { isPause };

document.getElementById("startBtn").addEventListener("click", () => {
  startGame();
});

function startGame() {
  init();
  setTimeout(() => {
    isPause = false;
  }, 300);
  mainMenu.classList.add("disable");
  animate();
}

let monsters;
let damageTexts;

export { monsters, damageTexts };

let particles;

let animationId;
let lastFrameTimeMs = 0; // The last time the loop was run
let maxFPS = 90; // The maximum FPS we want to allow
let delta = 0;
export { delta };

let speedFactor = 10;

function animate(timestamp) {
  if (isPause) {
    lastFrameTimeMs = timestamp;
    requestAnimationFrame(animate);
    return;
  }
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    animationId = requestAnimationFrame(animate);
    return;
  }

  delta = (timestamp - lastFrameTimeMs) / speedFactor; // get the delta time since last frame

  lastFrameTimeMs = timestamp;
  ctxScreen.clearRect(0, 0, canvasScreen.width, canvasScreen.height);

  tileMap.draw(ctxScreen);
  const mainPlayer = tileMap.players[0];
  spawnEnemies();

  tileMap.players.forEach((player, index) => {
    player.draw(ctxScreen);
    if (mainPlayer.stats.hp <= 0) {
      mainMenu.classList.remove("disable");
      isPause = true;
      init();
    }

    // Kill monster
    player.projectiles.forEach((projectile, projectileIndex) => {
      monsters.forEach((monster, index) => {
        const distance = Math.hypot(
          projectile.x - monster.x,
          projectile.y - monster.y
        );
        if (distance - monster.hitBox - projectile.radius < 1) {
          player.projectiles.splice(projectileIndex, 1);
          monster.isAttack = true;
          monster.damage = projectile.force;
          monster.stats.hp -= projectile.force;
          const damageText = new DrawDamage(monster, monster.stats.force);
          damageTexts.push(damageText);
          mainPlayer.stats.exp++;
        }
      });
    });
    //

    // Detect projectile out of screen
    player.projectiles.forEach((projectile, index) => {
      projectile.update(ctxScreen);
      if (
        projectile.x + projectile.radius < 1 ||
        projectile.y + projectile.radius < 1 ||
        projectile.x - projectile.radius > canvasScreen.width ||
        projectile.y - projectile.radius > canvasScreen.height
      ) {
        setTimeout(() => {
          player.projectiles.splice(index, 1);
        });
      }
    });
    //
  });

  particles.forEach((particle, index) => {
    particle.update(ctxScreen);
    if (particle.radius < 0) {
      particles.splice(index, 1);
    }
  });

  monsters.forEach((monster, index) => {
    drawLifeBar(ctxScreen, monster);
    const startVec = {
      x: Math.floor(monster.x / tileSize),
      y: Math.floor(monster.y / tileSize),
    };
    let targetVec = tileMap.getPosition(mainPlayer.x, mainPlayer.y);
    monster.path = findPath(startVec, targetVec, monster.type);
    monster.collideWith = null;
    monster.collide = false;

    if (monster.path.length === 1) {
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
      mainPlayer.stats.hp -= monster.stats.force;
      const damageText = new DrawDamage(mainPlayer, monster.stats.force);
      damageTexts.push(damageText);
      monster.stats.hp = 0;
    }
    if (monster.stats.hp <= 0) {
      for (let i = 0; i < 20; i++) {
        particles.push(
          new Particle(monster.x, monster.y, Math.random() * 2 * pixelUnit, {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
          })
        );
      }
      // remove the monster from the array
      monsters = monsters.filter((item) => {
        return item !== monster;
      });
    }
  });

  damageTexts.forEach((damageText, damageTextIndex) => {
    damageText.draw(ctxScreen);
    if (damageText.entity.y - damageText.y > tileSize / 2) {
      damageTexts.splice(damageTextIndex, 1);
    }
  });

  for (let i = 0; i < tileMap.mountains.length; i++) {
    const mountain = tileMap.mountains[i];
    drawLifeBar(ctxScreen, mountain);
    if (mountain.stats.hp <= 0) {
      tileMap.map[mountain.position.y][mountain.position.x] = "0";
      tileMap.mountains.splice(i, 1);
    }
  }

  animationId = requestAnimationFrame(animate);
}

function init() {
  tileMap.init();
  monsters = [];
  damageTexts = [];
  particles = [];
}

let pressedBtn;
function updatepressedBtn(btn) {
  pressedBtn = btn;
}

export { pressedBtn, updatepressedBtn };

canvasScreen.addEventListener("click", (event) => {
  const xZero = marginLeft;
  const yZero = marginTop;
  const x = event.x - xZero;
  const y = event.y - yZero;
  const clickPositionInGrid = tileMap.getPosition(x, y);
  if (
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] === "green" &&
    (tileMap.selectedBtn === "4" || tileMap.selectedBtn === "5")
  ) {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] =
      tileMap.selectedBtn;
    cleanMap();
    tileMap.selectedBtn = "";
    pressedBtn.remove();
    pressedBtn = null;
  }

  if (tileMap.selectedBtn === "spawn") {
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

function inversePause() {
  isPause = !isPause;
}

export { cleanMap, inversePause };

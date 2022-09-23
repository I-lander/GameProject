import { TileMap } from "./level/tileMap.js";
import { Particle } from "./player/visualEffects.js";
import findPath from "./player/NPCs/findPath.js";
import { spawnEnemies } from "./player/NPCs/spawn.js";
import { drawMenu } from "./UI/menu.js";
import { Enemy } from "./player/NPCs/enemy.js";
import { drawLifeBar, DrawDamage } from "./player/utils.js";

const canvasScreen = document.getElementById("canvasScreen");
const ctxScreen = canvasScreen.getContext("2d");
ctxScreen.imageSmoothingEnabled = false;

const canvasMenu = document.getElementById("canvasMenu");
const ctxMenu = canvasMenu.getContext("2d");
ctxMenu.imageSmoothingEnabled = false;

const tileMap = new TileMap();

canvasScreen.width = innerWidth;
canvasScreen.height = innerHeight;

canvasMenu.width = innerWidth;
canvasMenu.height = innerHeight;

tileMap.setCanvasSize(canvasScreen);
const tileSize = tileMap.tileSize;
const pixelUnit = tileSize / 32;

drawMenu(ctxMenu, canvasScreen.width);

const xCenter = canvasScreen.width / 2;
const yCenter = canvasScreen.height / 2;
export { tileMap, tileSize, pixelUnit, xCenter, yCenter };

let scoreValue = 0;
const finalScore = document.getElementById("finalScore");
const mainMenu = document.getElementById("mainMenu");

let onGame = false;

export { onGame };

let spawEnemiesInterval;
let autoFireInterval;
document.getElementById("startBtn").addEventListener("click", () => {
  startGame();
});

function startGame() {
  init();
  setTimeout(() => {
    onGame = true;
  }, 300);
  mainMenu.classList.add("disable");
  animate();
}

let enemies;
let damageTexts;

export { enemies, damageTexts };

let particles;

let animationId;
let lastFrameTimeMs = 0; // The last time the loop was run
let maxFPS = 90; // The maximum FPS we want to allow
let delta = 0;
export { delta };

let speedFactor = 10;

function animate(timestamp) {
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    animationId = requestAnimationFrame(animate);
    return;
  }
  delta = (timestamp - lastFrameTimeMs) / speedFactor; // get the delta time since last frame
  lastFrameTimeMs = timestamp;

  ctxScreen.clearRect(0, 0, canvasScreen.width, canvasScreen.height);

  tileMap.draw(ctxScreen);
  tileMap.players.forEach((player, index) => {
    player.draw(ctxScreen);

    // Kill enemy
    player.projectiles.forEach((projectile, projectileIndex) => {
      enemies.forEach((enemy, index) => {
        const distance = Math.hypot(
          projectile.x - enemy.x,
          projectile.y - enemy.y
        );
        if (distance - enemy.hitBox - projectile.radius < 1) {
          setTimeout(() => {
            player.projectiles.splice(projectileIndex, 1);
          });
          enemy.isAttack = true;
          enemy.damage = projectile.force;
          enemy.stats.hp -= projectile.force;
          const damageText = new DrawDamage(enemy);
          damageTexts.push(damageText);
          if (enemy.stats.hp <= 0) {
            for (let i = 0; i < 20; i++) {
              particles.push(
                new Particle(enemy.x, enemy.y, Math.random() * 2 * pixelUnit, {
                  x: Math.random() - 0.5,
                  y: Math.random() - 0.5,
                })
              );
            }
            setTimeout(() => {
              enemies.splice(index, 1);
            });
            scoreValue += 1;
          }
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

  enemies.forEach((enemy, index) => {
    
    drawLifeBar(ctxScreen, enemy);

    const startVec = {
      x: Math.floor(enemy.x / tileSize),
      y: Math.floor(enemy.y / tileSize),
    };
    let targetVec = tileMap.getPosition(xCenter, yCenter);

    enemy.path = findPath(startVec, targetVec, enemy.type);
    enemy.collideWith = null;
    enemy.collide = false;

    if (enemy.path.length === 1) {
      tileMap.mountains.forEach((mountain) => {
        if (enemy.isCollideWith(mountain)) {
          enemy.collide = true;
          enemy.collideWith = mountain;
        }
      });
    } else {
    }

    enemy.update(ctxScreen);

    // Game over
    const distance = Math.hypot(xCenter - enemy.x, yCenter - enemy.y);
    if (distance - enemy.hitBox < 1) {
      cancelAnimationFrame(animationId);
      mainMenu.classList.remove("disable");
      finalScore.innerText = scoreValue;
      onGame = false;
      clearInterval(spawEnemiesInterval);
    }
  });

  damageTexts.forEach((text, textIndex) => {
    text.draw(ctxScreen);
    if (text.entity.y - text.y > tileSize / 2) {
      damageTexts.splice(textIndex, 1);
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
  spawEnemiesInterval = setInterval(spawnEnemies, 1000);
  tileMap.init();
  scoreValue = 0;
  enemies = [];
  damageTexts = [];
  particles = [];
}

let selectedBtn = "";
export { selectedBtn };

const mountainButton = document.getElementById("mountainButton");
mountainButton.onclick = function () {
  if (onGame) {
    cleanMap();
    selectedBtn = "4";
  }
};
const riverButton = document.getElementById("riverButton");
riverButton.onclick = function () {
  if (onGame) {
    cleanMap();
    selectedBtn = "5";
  }
};

const spawnButton = document.getElementById("spawnButton");
spawnButton.onclick = function () {
  if (onGame) {
    selectedBtn = "spawn";
  }
};

canvasScreen.addEventListener("click", (event) => {
  const xZero = innerWidth / 2 - canvasScreen.width / 2;
  const yZero = event.y;
  const x = event.x - xZero;
  const y = yZero;
  const clickPositionInGrid = tileMap.getPosition(x, y);
  if (
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] === "green" &&
    selectedBtn
  ) {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] = selectedBtn;
    cleanMap();
    selectedBtn = "";
  }

  if (selectedBtn === "spawn") {
    enemies.push(
      new Enemy(
        event.x - xZero - tileSize / 2,
        event.y - tileSize / 2,
        "ground",
        tileSize,
        "./src/images/spider.png"
      )
    );
    selectedBtn = "";
  }
});

function cleanMap() {
  for (let row = 0; row < tileMap.map.length; row++) {
    for (let column = 0; column < tileMap.map[row].length; column++) {
      let tile = tileMap.map[row][column];
      if (tile === "green") {
        tileMap.map[row][column] = "0";
      }
    }
  }
}

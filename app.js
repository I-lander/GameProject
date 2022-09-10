import { TileMap } from "./src/tileMap.js";
import { Particle } from "./src/visualEffects.js";
import findPath from "./findPath.js";
import { spawnEnemies } from "./spawn.js";
import { drawMenu } from "./menu.js";

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

export { tileMap, tileSize, pixelUnit };
drawMenu(ctxMenu, canvasScreen.width);

const xCenter = canvasScreen.width / 2;
const yCenter = canvasScreen.height / 2;
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
export { enemies };

let particles;

let animationId;
let lastFrameTimeMs = 0; // The last time the loop was run
let maxFPS = 90; // The maximum FPS we want to allow
let delta = 0;
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
    player.autoFire(enemies);

    // Kill enemy
    player.projectiles.forEach((projectile, projectileIndex) => {
      enemies.forEach((enemy, index) => {
        const distance = Math.hypot(
          projectile.x - enemy.x,
          projectile.y - enemy.y
        );
        if (distance - enemy.hitBox - projectile.radius < 1) {
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
            player.projectiles.splice(projectileIndex, 1);
          });
          scoreValue += 1;
        }
      });
    });
    //

    // Detect projectile out of screen
    player.projectiles.forEach((projectile, index) => {
      projectile.update(ctxScreen, delta);
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
    particle.update(ctxScreen, delta);
    if (particle.radius < 0) {
      particles.splice(index, 1);
    }
  });

  // Game over
  enemies.forEach((enemy, index) => {
    const startVec = {
      x: Math.floor(enemy.x / tileSize),
      y: Math.floor(enemy.y / tileSize),
    };
    const targetVec = tileMap.getPosition(xCenter, yCenter);
    enemy.path = findPath(startVec, targetVec, enemy.type);
    enemy.moveAlong(ctxScreen, enemy.path);
    enemy.update(ctxScreen, delta);

    const distance = Math.hypot(xCenter - enemy.x, yCenter - enemy.y);
    if (distance - enemy.hitBox < 1) {
      cancelAnimationFrame(animationId);
      mainMenu.classList.remove("disable");
      finalScore.innerText = scoreValue;
      onGame = false;
      clearInterval(spawEnemiesInterval);
    }
  });
  animationId = requestAnimationFrame(animate);
}

function init() {
  spawEnemiesInterval = setInterval(spawnEnemies, 1000);
  tileMap.init();
  scoreValue = 0;
  enemies = [];
  particles = [];
}

let selectedBtn;
const mountainButton = document.getElementById("mountainButton")
mountainButton.onclick = function (){
  selectedBtn = "4"
}
const riverButton = document.getElementById("riverButton")
riverButton.onclick = function (){
  selectedBtn = "5"
}

canvasScreen.addEventListener("click", (event) => {
  const xZero = innerWidth / 2 - canvasScreen.width / 2;
  const yZero = event.y;
  const x = event.x - xZero;
  const y = yZero;
  const clickPositionInGrid = tileMap.getPosition(x, y);
  if (tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] === "0") {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] = selectedBtn;
  }
});

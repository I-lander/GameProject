import { TileMap } from "./src/tileMap.js";
import { Particle } from "./src/visualEffects.js";
import findPath from "./findPath.js";
import { spawnEnemies } from "./spawn.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const tileMap = new TileMap();

canvas.width = innerWidth;
canvas.height = innerHeight;

tileMap.setCanvasSize(canvas);
const tileSize = tileMap.tileSize;
console.log(tileSize);
const pixelUnit = tileSize / 32;

export { tileMap, tileSize, pixelUnit };

const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;
let scoreValue = 0;
const scoreElement = document.getElementById("score");
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
  scoreElement.classList.remove("disable");
  scoreElement.innerText = scoreValue;

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

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tileMap.draw(ctx);
  tileMap.players.forEach((player, index) => {
    player.draw(ctx);
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

    // Update Score text
    scoreElement.innerText = scoreValue;
    //

    // Detect projectile out of screen
    player.projectiles.forEach((projectile, index) => {
      projectile.update(ctx, delta);
      if (
        projectile.x + projectile.radius < 1 ||
        projectile.y + projectile.radius < 1 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y - projectile.radius > canvas.height
      ) {
        setTimeout(() => {
          player.projectiles.splice(index, 1);
        });
      }
    });
    //
  });

  particles.forEach((particle, index) => {
    particle.update(ctx, delta);
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
    enemy.moveAlong(ctx, enemy.path);
    enemy.update(ctx, delta);

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

window.addEventListener("click", (event) => {
  if (onGame && event.x < canvas.width && event.y < canvas.height) {
    const clickPositionInGrid = tileMap.getPosition(event.x, event.y);
    if (tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] === "0") {
      tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] = "4";
    }
    // spawnEnemies()
  }
});

import { TileMap } from "./tileMap.js";
import { Enemy } from "./enemy.js";
import { Particle } from "./visualEffects.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const tileMap = new TileMap();

canvas.width = innerWidth;
canvas.height = innerHeight;
tileMap.setCanvasSize(canvas);

const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;
let scoreValue = 0;
const scoreElement = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const mainMenu = document.getElementById("mainMenu");
let onGame = false;
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
let particles;

function spawnEnemies() {
  const radius = Math.random() * (30 - 4) + 4;
  let x, y;
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
    y = Math.random() * canvas.height;
  } else {
    x = Math.random() * canvas.width;
    y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
  }
  const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  const angle = Math.atan2(yCenter - y, xCenter - x);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  if (onGame) {
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }
}

let animationId;
let previousDelta = 0;
let fpsLimit = 90;

function animate(currentDelta) {
  animationId = requestAnimationFrame(animate);

  // Handle frame rate
  const delta = currentDelta - previousDelta;

  if (delta < 1000 / fpsLimit) {
    return;
  }
  //
  
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
        if (distance - enemy.radius - projectile.radius < 1) {
          for (let i = 0; i < enemy.radius * 2; i++) {
            particles.push(
              new Particle(enemy.x, enemy.y, Math.random() * 3, enemy.color, {
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
      projectile.update(ctx);
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
    particle.update();
    if (particle.radius < 0) {
      particles.splice(index, 1);
    }
  });

  // Game over
  enemies.forEach((enemy, index) => {
    enemy.update();
    const distance = Math.hypot(xCenter - enemy.x, yCenter - enemy.y);
    if (distance - enemy.radius - 15 < 1) {
      cancelAnimationFrame(animationId);
      mainMenu.classList.remove("disable");
      finalScore.innerText = scoreValue;
      onGame = false;
      clearInterval(spawEnemiesInterval);
    }
  });

  previousDelta = currentDelta;
}

window.addEventListener("click", (event) => {
  if (onGame) {
    const clickPositionInGrid = tileMap.detectTileClick(event.x, event.y);
    if (tileMap.map[clickPositionInGrid.x][clickPositionInGrid.y] === 0) {
      tileMap.map[clickPositionInGrid.x][clickPositionInGrid.y] = 2;
    } else {
      tileMap.map[clickPositionInGrid.x][clickPositionInGrid.y] = 0;
    }
    // tileMap.players = [];

    // tileMap.draw(ctx);
  }
});

function init() {
  spawEnemiesInterval = setInterval(spawnEnemies, 250);
  tileMap.init();
  // tileMap.draw(ctx);

  scoreValue = 0;
  enemies = [];
  particles = [];
}

import TileMap from "./tileMap.js";
import Player from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap();

canvas.width = innerWidth;
canvas.height = innerHeight;
tileMap.setCanvasSize(canvas)

const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;
let scoreValue = 0;
const scoreElement = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const mainMenu = document.getElementById("mainMenu");
let onGame = false;
let spawEnemiesInterval;
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

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = 5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;
  }
}

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = 5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;
    this.radius -= 0.1;
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

let player;
let projectiles;
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
function animate() {
  // tileMap.draw()
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  projectiles.forEach((projectile, index) => {
    projectile.update();
    if (
      projectile.x + projectile.radius < 1 ||
      projectile.y + projectile.radius < 1 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      });
    }
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
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (distance - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
      mainMenu.classList.remove("disable");
      finalScore.innerText = scoreValue;
      onGame = false;
      clearInterval(spawEnemiesInterval);
    }

    // Kill enemy
    projectiles.forEach((projectile, projectileIndex) => {
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
          projectiles.splice(projectileIndex, 1);
        });
        scoreValue += 1;
        scoreElement.innerText = scoreValue;
      }
    });
  });
}

window.addEventListener("click", (event) => {
  const angle = Math.atan2(event.y - yCenter, event.x - xCenter);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  const color = "hsl(0, 100%, 100%)";
  if (onGame) {
    projectiles.push(new Projectile(xCenter, yCenter, 5, color, velocity));
  }
});

function init() {
  spawEnemiesInterval = setInterval(spawnEnemies, 1000);

  player = new Player(xCenter, yCenter, 15, "hsl(0, 100%, 100%)");
  scoreValue = 0;
  projectiles = [];
  enemies = [];
  particles = [];
}

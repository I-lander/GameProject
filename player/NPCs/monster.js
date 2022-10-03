import { pixelUnit, delta, tileMap, tileSize, damageTexts } from "../../app.js";
import { DrawDamage } from "../utils.js";
export class Monster {
  constructor(x, y, type, radius, image = null, speed) {
    this.x = x + tileSize / 2;
    this.y = y + tileSize / 2;
    this.radius = radius;
    this.type = type;
    this.velocity = { x: 0, y: 0 };
    this.speed = speed ?? 0.4;
    this.collide = false;
    this.collideWith = null;
    this.isAttack = false;

    this.maxHp = 3;
    this.stats = {
      hp: this.maxHp,
      force: 1,
      attackRate: 1,
    };

    this.lastAttack = 0;

    this.distance = 0;
    this.position = tileMap.getPosition(this.x, this.y);
    this.path = [];

    this.moveToTarget = {};
    this.isImage = image ? true : false;

    this.hitBox = tileSize / 3;

    this.img = new Image();
    this.img.src = image;
    this.spriteSize = 32;
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = this.horizontalFrame * this.verticalFrame;
    this.frameRate = 10;
    this.lastFrame = 0;
  }

  draw(ctx, timestamp) {
    const horizontalFrame = this.img.naturalWidth / 32;
    const verticalFrame = this.img.naturalHeight / 32;

    ctx.drawImage(
      this.img,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius,
      this.radius
    );

    if (timestamp >= this.lastFrame + 1000 / this.frameRate) {
      this.frameX = this.frameX < horizontalFrame - 1 ? this.frameX + 1 : 0;
      this.lastFrame = timestamp;
    }
  }

  isCollideWith(element) {
    const self = {
      x: this.x - this.radius / 2,
      y: this.y - this.radius / 2,
      width: tileSize,
      height: tileSize,
    };
    const obstacle = {
      x: element.x,
      y: element.y,
      width: tileSize,
      height: tileSize,
    };

    if (
      self.x <= obstacle.x + obstacle.width &&
      self.x + self.height >= obstacle.x &&
      self.y <= obstacle.y + obstacle.height &&
      self.y + self.width >= obstacle.y
    ) {
      return true;
    }
  }

  moveAlong() {
    if (!this.path || this.path.length <= 0) {
      return;
    }

    this.moveTo(this.path.shift());
  }

  moveTo(target) {
    this.moveToTarget = target;
  }

  update(ctx) {
    this.moveAlong();
    let timestamp = Date.now();

    this.draw(ctx, timestamp);

    let dx = 0;
    let dy = 0;
    if (this.moveToTarget && !this.collide) {
      dx = this.moveToTarget.x - this.x;
      dy = this.moveToTarget.y - this.y;
      if (Math.abs(dx) < 1) {
        dx = 0;
      }
      if (Math.abs(dy) < 1) {
        dy = 0;
      }

      const angle = Math.atan2(dy, dx);
      this.velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      this.x += this.velocity.x * pixelUnit * delta * this.speed;
      this.y += this.velocity.y * pixelUnit * delta * this.speed;

      if (dx === 0 && dy === 0) {
        if (this.path && this.path.length > 0) {
          this.moveTo(this.path.shift());
          return;
        }
        this.moveToTarget = undefined;
      }
    }

    if (
      timestamp >= this.lastAttack + 1000 / this.stats.attackRate &&
      this.collide
    ) {
      this.attack(this.collideWith, ctx);
      this.lastAttack = timestamp;
    }
  }

  attack(collideWith, ctx) {
    const target = tileMap.mountains.find(
      (mountain) => mountain.x === collideWith.x && mountain.y === collideWith.y
    );

    target.isAttack = true;
    target.stats.hp -= this.stats.force;

    const damageText = new DrawDamage(target, this.stats.force);
    damageTexts.push(damageText);

    if (target.stats.hp <= 0) {
      this.collide = false;
      this.collideWith = null;
    }
  }
}

import {
  pixelUnit,
  delta,
  tileMap,
  tileSize,
  damageTexts,
  pauseDelta,
} from "../../app.js";
import { DrawDamage } from "../utils.js";
import findPath from "./findPath.js";

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

    this.isTakingDamage = false;
    this.damageFrameCount = 0;

    this.startVec = {
      // Declare the start point for pathfinding
      x: Math.floor(this.x / tileSize),
      y: Math.floor(this.y / tileSize),
    };
    this.targetVec = tileMap.getPosition(
      tileMap.players[0].x,
      tileMap.players[0].y
    ); // Declare the target point for pathfinding
    this.path = findPath(this.startVec, this.targetVec, this.type); // Create the path

    this.maxHp = 6;
    this.stats = {
      hp: this.maxHp,
      force: 1,
      attackRate: 1,
    };

    this.lastAttack = 0;
    this.lastLavaDamage = 0;

    this.distance = 0;
    this.position = tileMap.getPosition(this.x, this.y);

    this.moveToTarget = this.path.shift();

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

  findingPath() {
    this.startVec = {
      // Declare the start point for pathfinding
      x: Math.floor(this.x / tileSize),
      y: Math.floor(this.y / tileSize),
    };
    this.targetVec = tileMap.getPosition(
      tileMap.players[0].x,
      tileMap.players[0].y
    );
    this.path = findPath(this.startVec, this.targetVec, this.type); // Create the path
    this.moveToTarget = this.path.shift();
  }

  draw(ctx, timestamp) {
    const horizontalFrame = this.img.naturalWidth / 32;
    this.frameY = this.isTakingDamage ? 1 : 0;

    ctx.save();

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
    ctx.restore();
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
    let timestamp = Date.now();

    if (this.isTakingDamage) {
      this.damageFrameCount++;
    }
    if (this.damageFrameCount === 10) {
      this.isTakingDamage = false;
      this.damageFrameCount = 0;
    }

    this.position = tileMap.getPosition(this.x, this.y);

    if (
      timestamp >= this.lastLavaDamage + 1000 &&
      tileMap.map[this.position.y][this.position.x] === "lava"
    ) {
      !this.isTakingDamage ? this.takingDamage(1) : null;
      this.lastLavaDamage = timestamp;
    }

    this.draw(ctx, timestamp);

    let dx = 0;
    let dy = 0;
    if (this.moveToTarget && !this.collide) {
      dx = this.moveToTarget.x - this.x;
      dy = this.moveToTarget.y - this.y;
      if (Math.abs(dx) < 1 * pixelUnit) {
        dx = 0;
      }
      if (Math.abs(dy) < 1 * pixelUnit) {
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

  takingDamage(damage) {
    this.stats.hp -= damage;
    this.isTakingDamage = true;
    const damageText = new DrawDamage(this, damage);
    damageTexts.push(damageText);
  }
}

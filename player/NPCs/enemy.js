import { pixelUnit, tileMap, tileSize } from "../../app.js";
export class Enemy {
  constructor(x, y, type, radius, image = null, speed) {
    this.x = x + tileSize / 2;
    this.y = y + tileSize / 2;
    this.radius = radius;
    this.type = type;
    this.velocity = { x: 0, y: 0 };
    this.speed = speed ?? 0.4;
    this.collide = false;
    this.collideWith = null;
    this.attackRate = 1;
    this.lastAttack = 0;

    this.distance = 0;
    this.position = tileMap.getPosition(this.x, this.y);
    this.path = [];

    this.moveToTarget = {};
    this.isImage = image ? true : false;

    this.hitBox = tileSize / 3;

    this.img = new Image();
    this.img.src = image;
    this.frame = 0;
  }

  draw(ctx) {
    if (this.frame < 15) {
      ctx.drawImage(
        this.img,
        0 * 32,
        0 * 32,
        32,
        32,
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        this.radius
      );
      this.frame++;
    }

    if (this.frame >= 15) {
      ctx.drawImage(
        this.img,
        1 * 32,
        0 * 32,
        32,
        32,
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        this.radius
      );
      this.frame++;
    }
    if (this.frame >= 30) {
      this.frame = 0;
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
      x: element.x * tileSize,
      y: element.y * tileSize,
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

  update(ctx, delta) {
    this.moveAlong()
    let timestamp = Date.now();

    this.draw(ctx);

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

    if (timestamp < this.lastAttack + 1000 / this.attackRate) {
      return;
    }
    if (this.collide) {
      this.attack(this.collideWith, ctx);
    }
    this.lastAttack = timestamp;
  }

  attack(collideWith, ctx) {
    const target = tileMap.mountains.find(
      (mountain) =>
        mountain.position.x === collideWith.x &&
        mountain.position.y === collideWith.y
    );
    ctx.font = "6px dogicapixel";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("1", target.x*tileSize, target.y*tileSize);
 
    target.isAttack = true
    target.hp -= 1;
    if(target.hp <= 0){
      this.collide = false
      this.collideWith = null
    }

  }
}

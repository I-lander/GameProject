import { tileSize, tileMap, pixelUnit, pauseDelta, delta, gameScreen } from "../../app.js";

export class Village {
  constructor(x, y, image) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.image = image;
    this.position = { x: x, y: y };
    this.maxHp = 5;
    this.stats = {
      hp: this.maxHp,
      soulLoad: 0,
      maxSoul: 100,
      loadSpeed: 20,
      soulBonus: 3,
    };
    this.isAttack = false;
    this.lastUpdate = 0;
    this.isSoulGenerated = false;
    this.soulsToFeed = [];
  }

  update(ctx) {
    let timestamp = Date.now();
    this.drawLoadingCircle(ctx);
    if (timestamp >= this.lastUpdate + 1000 / this.stats.loadSpeed + pauseDelta) {
      this.stats.soulLoad++;
      this.lastUpdate = timestamp;
    }
    if (this.stats.soulLoad > this.stats.maxSoul) {
      this.stats.soulLoad = 0;
    }
  }

  drawLoadingCircle(ctx) {
    let x = this.x + tileSize / 2;
    let y = this.y;
    const barRatio = this.stats.soulLoad / this.stats.maxSoul;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.translate(x, y);
    ctx.rotate(Math.PI * 1.5);
    ctx.translate(-x, -y);
    ctx.arc(x, y, 5 * pixelUnit, 0, Math.PI * 2 * barRatio);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
    if (barRatio >= 1 && !this.isSoulGenerated) {
      this.isSoulGenerated = true;
      const soulToFeed = new SoulToFeed(x, y);
      this.soulsToFeed.push(soulToFeed);
    }
    for (let i = 0; i < this.soulsToFeed.length; i++) {
      this.soulsToFeed[i].update(ctx);
      if (this.soulsToFeed[i].x >= this.soulsToFeed[i].targetX) {
        this.soulsToFeed.splice(i, 1);
        tileMap.players[0].stats.soulRessource += this.stats.soulBonus;
        this.isSoulGenerated = false;
      }
    }
  }
}

class SoulToFeed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetX = gameScreen.width + tileSize * 9.75;
    this.targetY = tileSize * 1.75;
    this.velocity;
    this.speed = 3;
  }

  update(ctx) {
    this.draw(ctx);
    const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    this.velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    };
    this.x += this.velocity.x * pixelUnit * delta * this.speed;
    this.y += this.velocity.y * pixelUnit * delta * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5 * pixelUnit, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

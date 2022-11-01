import { tileSize, tileMap } from '../../app.js';

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
  }

  update(ctx) {
    let timestamp = Date.now();
    this.drawLoadingBar(ctx);
    if (timestamp >= this.lastUpdate + 1000 / this.stats.loadSpeed) {
      this.stats.soulLoad++;
      this.lastUpdate = timestamp;
    }
    if (this.stats.soulLoad > this.stats.maxSoul) {
      this.stats.soulLoad = 0;
      tileMap.players[0].stats.soulRessource += this.stats.soulBonus;
    }
  }

  drawLoadingBar(ctx) {
    let x = this.x;
    let y = this.y;
    const barRatio = this.stats.soulLoad / this.stats.maxSoul;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(
      x + (tileSize * 0.4) / 2,
      y - tileSize * 0.1,
      tileSize * 0.6,
      tileSize * 0.1
    );
    ctx.fillStyle = 'rgba(39, 161, 245, 0.9)';
    ctx.fillRect(
      x + (tileSize * 0.4) / 2,
      y - tileSize * 0.1,
      tileSize * barRatio * 0.6,
      tileSize * 0.1
    );
    ctx.strokeStyle = 'white';
    ctx.strokeRect(
      x + (tileSize * 0.4) / 2,
      y - tileSize * 0.1,
      tileSize * 0.6,
      tileSize * 0.1
    );
    ctx.restore();
  }
}

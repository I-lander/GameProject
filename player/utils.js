import { tileSize, pixelUnit, delta } from "../app.js";

function drawLifeBar(ctx, entity) {
  let x = entity.x;
  let y = entity.y;
  if(entity.type){
    x -= entity.radius / 2
    y -= entity.radius / 2
  }
  if (entity.isAttack && entity.stats.hp > 0) {
    const barRatio = entity.stats.hp / entity.maxHp;
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(
      x + (tileSize * 0.4) / 2,
      y - tileSize * 0.1,
      tileSize * 0.6,
      tileSize * 0.1
    );
    ctx.fillStyle = "rgba(0, 175, 0, 0.9)";
    ctx.fillRect(
      x + (tileSize * 0.4) / 2,
      y - tileSize * 0.1,
      tileSize * barRatio * 0.6,
      tileSize * 0.1
    );
    ctx.strokeStyle = "white";
    ctx.strokeRect(
      x + (tileSize * 0.4) / 2,
      y - tileSize * 0.1,
      tileSize * 0.6,
      tileSize * 0.1
    );
    ctx.restore();
  }
}

class DrawDamage {
  constructor(entity, damage) {
    this.entity = entity;
    this.y = entity.y;
    this.damage = damage
  }

  draw(ctx) {
    let x = this.entity.x
    if(this.entity.type){
      x -= this.entity.radius / 2
    }
      ctx.font = `${tileSize/3}px dogicapixel`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        this.damage,
        x  + tileSize / 2,
        this.y 
      );

      this.y -= 0.5 * pixelUnit * delta;
  }
}

export { drawLifeBar, DrawDamage };

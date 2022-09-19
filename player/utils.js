import {tileSize} from "../app.js"

function drawLifeBar(ctx, entity) {
  if (entity.isAttack) {
    const barRatio = entity.hp / entity.maxHp;
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(
      entity.x * tileSize + (tileSize * 0.4) / 2,
      entity.y * tileSize - tileSize * 0.1,
      tileSize * 0.6,
      tileSize * 0.1
    );
    ctx.fillStyle = "rgba(0, 255, 0, 0.9)";
    ctx.fillRect(
      entity.x * tileSize + (tileSize * 0.4) / 2,
      entity.y * tileSize - tileSize * 0.1,
      tileSize * barRatio * 0.6,
      tileSize * 0.1
    );
    ctx.strokeStyle = "white";
    ctx.strokeRect(
      entity.x * tileSize + (tileSize * 0.4) / 2,
      entity.y * tileSize - tileSize * 0.1,
      tileSize * 0.6,
      tileSize * 0.1
    );
    ctx.restore();
  }
}

export {drawLifeBar}
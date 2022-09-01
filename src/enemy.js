import { map } from "./constants.js";
import { tileMap } from "../app.js";

export class Enemy {
  constructor(x, y, radius, image = null, color, velocity) {
    this.x = x - tileMap.tileSize / 2;
    this.y = y + tileMap.tileSize / 2;
    this.radius = radius;
    this.color = color;
    this.velocity = { x: 0, y: 0 };
    this.distance = 0;
    this.position = tileMap.getPosition(this.x, this.y);
    this.path = [];
    this.path = this.pathFinding(this.position);
    this.isImage = image ? true : false;

    this.img = new Image();
    this.img.src = image;
    this.frame = 0;
  }

  draw(ctx) {
    if (this.frame < 30) {
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

    if (this.frame >= 30) {
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
    if (this.frame >= 90) {
      this.frame = 0;
    }
  }

  update(ctx) {
    this.draw(ctx);
    let path = this.moveInPath(this.path);
    if (path.direction === "DOWN" && this.x >= (path.position.x*tileMap.tileSize)+tileMap.tileSize/2) {
        this.velocity = { x: 0, y: 1 };
    }
    if (path.direction === "RIGHT" && this.y > (path.position.y*tileMap.tileSize)+tileMap.tileSize/2) {
      this.velocity = { x: 1, y: 0 };
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

  }

  pathFinding(position) {
    let neighbors = tileMap.getNeighbors(position);
    if (
      !this.path.some(
        (path) =>
          path.position.x === position.x && path.position.y === position.y
      )
    ) {
      this.path.push({ position: position, direction: "START" });
    }

    if (
      neighbors.up.value === 9 &&
      !this.path.some(
        (path) =>
          path.position.x === neighbors.up.position.x &&
          path.position.y === neighbors.up.position.y
      )
    ) {
      this.path.push({ position: neighbors.up.position, direction: "UP" });
      this.pathFinding(neighbors.up.position);
    }

    if (
      neighbors.down.value === 9 &&
      !this.path.some(
        (path) =>
          path.position.x === neighbors.down.position.x &&
          path.position.y === neighbors.down.position.y
      )
    ) {
      this.path.push({ position: neighbors.down.position, direction: "DOWN" });
      this.pathFinding(neighbors.down.position);
    }
    if (
      neighbors.right.value === 9 &&
      !this.path.some(
        (path) =>
          path.position.x === neighbors.right.position.x &&
          path.position.y === neighbors.right.position.y
      )
    ) {
      this.path.push({
        position: neighbors.right.position,
        direction: "RIGHT",
      });
      this.pathFinding(neighbors.right.position);
    }
    if (
      neighbors.left.value === 9 &&
      !this.path.some(
        (path) =>
          path.position.x === neighbors.left.position.x &&
          path.position.y === neighbors.left.position.y
      )
    ) {
      this.path.push({ position: neighbors.left.position, direction: "LEFT" });
      this.pathFinding(neighbors.left.position);
    }
    this.path[this.path.length - 1].direction = "END";
    return this.path;
  }

  moveInPath(path) {
    let currentTile = tileMap.getPosition(this.x, this.y);
    for (let [i, item] of path.entries()) {
      if (
        currentTile.x === item.position.x &&
        currentTile.y === item.position.y
      ) {
        return path[i + 1];
      }
    }
  }
}

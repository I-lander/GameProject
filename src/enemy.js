import { map } from "./constants.js";
import { tileMap } from "../app.js";

export class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x - tileMap.tileSize / 2;
    this.y = y + tileMap.tileSize / 2;
    this.radius = radius;
    this.color = color;
    this.velocity = { x: 0, y: 0 };
    this.distance = 0;
    this.position = tileMap.getPosition(this.x, this.y);
    this.path = [];
    this.path = this.pathFinding(this.position);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx) {
    this.draw(ctx);
    let direction = this.moveInPath(this.path);
    if (direction === "DOWN" || this.direction === "END") {
      this.velocity = { x: 0, y: 1 };
    }
    if (direction === "RIGHT") {
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
        return path[i + 1].direction;
      }
    }
  }
}

import { Player } from "../player/player.js";
import { map } from "./map.js";
import { getRiverLastTile } from "../player/NPCs/spawn.js";
import { Mountain } from "./element/mountain.js";
import { enemies, selectedBtn } from "../app.js";

export class TileMap {
  constructor() {
    this.tileSize = 0;
    this.mapOrigin = { x: 0, y: 0 };
    this.players = [];
    this.playersInGrid = [];

    this.road = new Image();
    this.road.src = "./src/images/road.png";

    this.mountain = new Image();
    this.mountain.src = "./src/images/mountain.png";
    this.mountains = [];

    this.map = map;
  }

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === "0") {
          ctx.save();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 0.1;
          ctx.strokeRect(
            this.tileSize * column,
            this.tileSize * row,
            this.tileSize,
            this.tileSize
          );
          ctx.restore();
        }
        if (tile === "1") {
          if (
            !this.playersInGrid.some(
              (player) => player.x === column && player.y === row
            )
          ) {
            let player = new Player(
              this.tileSize * column + this.tileSize / 2,
              this.tileSize * row + this.tileSize / 2,
              this.tileSize,
              "./src/images/god.png",
              null
            );
            this.players.push(player);
            this.playersInGrid.push({ x: column, y: row });
          }
        }
        if (tile === "4") {
          ctx.drawImage(
            this.mountain,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          if (
            !this.mountains.some(
              (mountain) =>
                mountain.position.x === column && mountain.position.y === row
            )
          ) {
            let mountain = new Mountain(column, row);
            this.mountains.push(mountain);
          }
        }
        if (tile === "5") {
          ctx.save();
          ctx.fillStyle = "rgba(100, 100, 255, 0.9)";
          ctx.fillRect(
            this.tileSize * column,
            this.tileSize * row,
            this.tileSize,
            this.tileSize
          );
          ctx.restore();
        }
        if (tile === "green") {
          ctx.save();
          ctx.fillStyle = "rgba(100, 255, 100, 0.3)";
          ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
          ctx.lineWidth = 0.5;
          ctx.fillRect(
            this.tileSize * column,
            this.tileSize * row,
            this.tileSize,
            this.tileSize
          );
          ctx.strokeRect(
            this.tileSize * column,
            this.tileSize * row,
            this.tileSize,
            this.tileSize
          );
          ctx.restore();
        }
      }
    }
    selectedBtn != "" ? this.possibilityForClick(selectedBtn) : null;
  }

  init() {
    this.players = [];
    this.map = map;
  }

  setCanvasSize(canvas) {
    if (canvas.width < canvas.height) {
      this.tileSize = canvas.width / this.map.length;
      canvas.width = this.map[0].length * this.tileSize;
      canvas.height = this.map.length * this.tileSize;
    } else {
      canvas.height = canvas.height / 2;
      this.tileSize = canvas.height / this.map.length;
      canvas.width = this.map[0].length * this.tileSize;
      canvas.style.left = `${innerWidth / 2 - canvas.width / 2}px`;
      this.mapOrigin.x = innerWidth / 2 - canvas.width / 2;
    }
  }

  getPosition(x, y) {
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    let position = {};
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        if (
          x >= row * this.tileSize &&
          x < row * this.tileSize + this.tileSize
        ) {
          if (
            y >= column * this.tileSize &&
            y < column * this.tileSize + this.tileSize
          ) {
            position.x = row;
            position.y = column;
          }
        }
      }
    }
    return position;
  }

  getNeighbors(position) {
    let neighbors = [];

    // UP
    neighbors.push({
      position: { x: position.x, y: position.y - 1 },
      tileValue: position.y - 1 >= 0 ? map[position.y - 1][position.x] : "99",
    });

    // DOWN
    neighbors.push({
      position: { x: position.x, y: position.y + 1 },
      tileValue: map[position.y + 1][position.x],
    });

    // LEFT
    neighbors.push({
      position: { x: position.x - 1, y: position.y },
      tileValue: map[position.y][position.x - 1],
    });

    // RIGHT
    neighbors.push({
      position: { x: position.x + 1, y: position.y },
      tileValue: map[position.y][position.x + 1],
    });
    return neighbors;
  }

  possibilityForClick(selectedBtn) {
    let enemyTiles = [];

    for (let i = 0; i < enemies.length; i++) {
      enemyTiles.push(this.getPosition(enemies[i].x, enemies[i].y));
    }
    if (selectedBtn === "4") {
      for (let row = 0; row < this.map.length; row++) {
        for (let column = 0; column < this.map[row].length; column++) {
          let tileCoordinate = { x: column, y: row };

          if (
            enemyTiles.some(
              (e) => e.x === tileCoordinate.x && e.y === tileCoordinate.y
            )
          ) {
            this.map[row][column] = "enemy";
          }
          let tile = this.map[row][column];
          if (tile === "0") {
            this.map[row][column] = "green";
          }
          if (
            enemyTiles.some(
              (e) => e.x === tileCoordinate.x && e.y === tileCoordinate.y
            )
          ) {
            this.map[row][column] = "0";
          }
        }
      }
    }
    if (selectedBtn === "5") {
      const excludeValue = ["5", "1"];
      const riverLastTile = getRiverLastTile();
      let neighbors = this.getNeighbors(riverLastTile);

      // UP
      if (
        neighbors[0].tileValue === "0" &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[0].position)[0].tileValue === value
        ) &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[0].position)[2].tileValue === value
        ) &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[0].position)[3].tileValue === value
        )
      ) {
        this.map[neighbors[0].position.y][neighbors[0].position.x] = "green";
      }

      // DOWN
      if (
        neighbors[1].tileValue === "0" &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[1].position)[1].tileValue === value
        ) &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[1].position)[2].tileValue === value
        ) &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[1].position)[3].tileValue === value
        )
      ) {
        this.map[neighbors[1].position.y][neighbors[1].position.x] = "green";
      }

      // LEFT
      if (
        neighbors[2].tileValue === "0" &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[2].position)[0].tileValue === value
        ) &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[2].position)[1].tileValue === value
        ) &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[2].position)[2].tileValue === value
        )
      ) {
        this.map[neighbors[2].position.y][neighbors[2].position.x] = "green";
      }

      // RIGHT
      if (
        neighbors[3].tileValue === "0" &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[3].position)[0].tileValue === value
        ) &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[3].position)[1].tileValue === value
        ) &&
        !excludeValue.some(
          (value) =>
            this.getNeighbors(neighbors[3].position)[3].tileValue === value
        )
      ) {
        this.map[neighbors[3].position.y][neighbors[3].position.x] = "green";
      }
    }
  }
}

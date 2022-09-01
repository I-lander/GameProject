import { Player } from "./player.js";
import { map } from "./constants.js";

export class TileMap {
  constructor() {
    this.tileSize = 0;
    this.players = [];

    this.road = new Image();
    this.road.src = "./src/images/road.png";

    this.map = map;
    this.activeTiles = [];
  }

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 0) {
        }
        if (tile === 9) {
          ctx.fillStyle = "yellow";
          ctx.fillRect(
            this.tileSize * column,
            this.tileSize * row,
            this.tileSize,
            this.tileSize
          );
          ctx.fill();
          this.drawRoad(ctx, row, column);
        }

        if (tile === 1) {
          let currentTile = { row: row, column: column };
          if (
            !this.activeTiles.some(
              (tile) => tile.row === row && tile.column === column
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
            this.activeTiles.push(currentTile);
            map[row][column] = 9;
          }
        }
        if (tile === 2) {
          let currentTile = { row: row, column: column };
          if (
            !this.activeTiles.some(
              (tile) => tile.row === row && tile.column === column
            )
          ) {
            let player = new Player(
              this.tileSize * column + this.tileSize / 2,
              this.tileSize * row + this.tileSize / 2,
              this.tileSize,
              "./mouth.png",
              null
            );
            this.players.push(player);
            this.activeTiles.push(currentTile);
          }
        }
      }
    }
  }

  drawRoad(ctx, row, column) {
    ctx.imageSmoothingEnabled = false;

    let position = { x: column, y: row };
    let neighbors = this.getNeighbors(position);
    if ((neighbors.up.value === 9 || neighbors.up.value === 99) && neighbors.down.value === 9) {
      ctx.drawImage(
        this.road,
        0,
        32,
        32,
        32,
        column * this.tileSize,
        row * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    }
    if (neighbors.up.value === 9 && neighbors.down.value === 0 && neighbors.right.value === 9 ) {
      ctx.drawImage(
        this.road,
        0,
        32*2,
        32,
        32,
        column * this.tileSize,
        row * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    }
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
      this.tileSize = canvas.height / this.map.length;
      canvas.height = this.map.length * this.tileSize;
      canvas.width = this.map[0].length * this.tileSize;
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
    let neighbors = {
      up: { position: { x: 0, y: 0 }, value: 0 },
      down: 0,
      left: 0,
      right: 0,
    };

    neighbors.up = {
      position: { x: position.x, y: position.y - 1 },
      value: position.y - 1 >= 0 ? map[position.y - 1][position.x] : 99,
    };

    neighbors.down = {
      position: { x: position.x, y: position.y + 1 },
      value: map[position.y + 1][position.x],
    };
    if (position.x > 0) {
      neighbors.left = {
        position: { x: position.x - 1, y: position.y },
        value: map[position.y][position.x - 1],
      };
    }
    neighbors.right = {
      position: { x: position.x + 1, y: position.y },
      value: map[position.y][position.x + 1],
    };
    return neighbors;
  }
}
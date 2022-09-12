import { Player } from "./player.js";
import { map } from "./map.js";
import { riverLastTile } from "../spawn.js";

export class TileMap {
  constructor() {
    this.tileSize = 0;
    this.mapOrigin = { x: 0, y: 0 };
    this.players = [];

    this.road = new Image();
    this.road.src = "./src/images/road.png";

    this.mountain = new Image();
    this.mountain.src = "./src/images/mountain.png";

    this.map = map;
  }

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === "0") {
        }
        if (tile === "9") {
          ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
          ctx.fillRect(
            this.tileSize * column,
            this.tileSize * row,
            this.tileSize,
            this.tileSize
          );
          ctx.fill();
          this.drawRoad(ctx, row, column);
        }

        if (tile === "1") {
          let player = new Player(
            this.tileSize * column + this.tileSize / 2,
            this.tileSize * row + this.tileSize / 2,
            this.tileSize,
            "./src/images/god.png",
            null
          );
          this.players.push(player);
          map[row][column] = "1x";
        }
        if (tile === "2") {
          let player = new Player(
            this.tileSize * column + this.tileSize / 2,
            this.tileSize * row + this.tileSize / 2,
            this.tileSize,
            "./mouth.png",
            null
          );
          this.players.push(player);
          map[row][column] = "2x";
        }
        if (tile === "4") {
          ctx.drawImage(
            this.mountain,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
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
          ctx.fillRect(
            this.tileSize * column,
            this.tileSize * row,
            this.tileSize,
            this.tileSize
          );
          ctx.restore();
        }
      }
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
    let neighbors = {
      up: { position: { x: 0, y: 0 }, tileValue: 0 },
      down: 0,
      left: 0,
      right: 0,
    };

    neighbors.up = {
      position: { x: position.x, y: position.y - 1 },
      tileValue: position.y - 1 >= 0 ? map[position.y - 1][position.x] : "99",
    };

    neighbors.down = {
      position: { x: position.x, y: position.y + 1 },
      tileValue: map[position.y + 1][position.x],
    };
    if (position.x > 0) {
      neighbors.left = {
        position: { x: position.x - 1, y: position.y },
        tileValue: map[position.y][position.x - 1],
      };
    }
    neighbors.right = {
      position: { x: position.x + 1, y: position.y },
      tileValue: map[position.y][position.x + 1],
    };
    return neighbors;
  }

  possibilityForClick(ctx, selectedBtn) {
    if (selectedBtn === "5") {
      const riv = riverLastTile()
      console.log(riv);
      const playerPos = riv
      let neighbors = this.getNeighbors(playerPos);

      if (
        neighbors.up.tileValue === "0" &&
        this.getNeighbors(neighbors.up.position).up.tileValue === "0"
      ) {
        this.map[neighbors.up.position.y][neighbors.up.position.x] = "green"
      }
      if (
        neighbors.down.tileValue === "0" &&
        this.getNeighbors(neighbors.down.position).down.tileValue === "0"
      ) {
        this.map[neighbors.down.position.y][neighbors.down.position.x] = "green"
      }
      if (
        neighbors.left.tileValue === "0" &&
        this.getNeighbors(neighbors.left.position).left.tileValue === "0"
      ) {
        this.map[neighbors.left.position.y][neighbors.left.position.x] = "green"
      }
      if (
        neighbors.right.tileValue === "0" &&
        this.getNeighbors(neighbors.right.position).right.tileValue === "0"
      ) {
        this.map[neighbors.right.position.y][neighbors.right.position.x] = "green"
      }


    }
  }
}

import { Player } from "./player.js";

export class TileMap {
  constructor() {
    this.tileSize = 0;
    this.players = [];

    this.godImage = new Image();
    this.godImage.src = "./god.png";

    this.map = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
  }

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 0) {
        }

        if (tile === 1) {
          this.players.push(
            new Player(
              this.tileSize * row + this.tileSize / 2,
              this.tileSize * column + this.tileSize / 2,
              this.tileSize,
              "./god.png",null
            )
          );
        }
        if (tile === 2) {
          this.players.push(
            new Player(
              this.tileSize * row + this.tileSize / 2,
              this.tileSize * column + this.tileSize / 2,
              7,
              '',
              "hsl(0, 100%, 100%)"
            )
          );
        }
      }
    }
  }

  init() {
    this.players = [];
    this.map = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
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

  detectTileClick(x, y) {
    let position = {};
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        if (
          x > row * this.tileSize &&
          x < row * this.tileSize + this.tileSize
        ) {
          if (
            y > column * this.tileSize &&
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
}

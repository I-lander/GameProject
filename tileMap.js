import { Player } from "./player.js";

const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

const margin = 3;

export class TileMap {
  player = 1;
  empty = 0;

  tileSize = 0;

  map = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  draw() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 0) {
          ctx.fillStyle = "hsl(0, 0%, 10%)";
          ctx.fillRect(
            this.tileSize * row,
            this.tileSize * column,
            this.tileSize - margin,
            this.tileSize - margin
          );
        }
        if (tile === 2) {
          ctx.fillStyle = "hsl(100, 100%, 10%)";
          ctx.fillRect(
            this.tileSize * row,
            this.tileSize * column,
            this.tileSize - margin,
            this.tileSize - margin
          );
        }
      }
    }
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

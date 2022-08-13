import { Player } from "./player.js";

const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

const margin = 3;

export class TileMap {
  tileSize = 0;
  players = [];

  map = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  draw() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];

        if (tile === 1) {
          let radius = 15;
          this.players.push(
            new Player(
              this.tileSize * row + this.tileSize / 2,
              this.tileSize * column + this.tileSize / 2,
              radius,
              "hsl(0, 100%, 100%)"
            )
          );
        }
        if (tile === 2) {
          let radius = 7;
          this.players.push(
            new Player(
              this.tileSize * row + this.tileSize / 2,
              this.tileSize * column + this.tileSize / 2,
              radius,
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

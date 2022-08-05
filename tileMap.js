import Player from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export default class TileMap {
  player = 1;
  empty = 0;

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
        if(tile===1){
        }
      }
    }
  }

  setCanvasSize(canvas) {
    const tileSize = canvas.width / this.map.length;
    canvas.width = this.map[0].length * tileSize;
    canvas.height = this.map.length * tileSize;
  }
}

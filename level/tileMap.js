import { Player } from "../player/player.js";
import { map, mapSizeX, mapSizeY } from "./map.js";
import { getRiverLastTile } from "../player/NPCs/spawn.js";
import { Mountain } from "./element/mountain.js";
import { drawRiver } from "./element/river.js";
import { monsters, pixelUnit } from "../app.js";

const canvasScreen = document.getElementById("canvasScreen");
const ctxScreen = canvasScreen.getContext("2d");
ctxScreen.imageSmoothingEnabled = false;
export class TileMap {
  constructor() {
    this.tileSize = 0;
    this.mapOrigin = { x: 0, y: 0 };
    this.selectedBtn = "";
    this.players = [];

    this.greenTile = new Image();
    this.greenTile.src = "./src/images/greenTile.png";

    this.mountain = new Image();
    this.mountain.src = "./src/images/mountain.png";
    this.mountains = [];

    this.map = map;
  }

  draw(ctx) {
    for (let row = 0; row < mapSizeY; row++) {
      for (let column = 0; column < mapSizeX; column++) {
        let tile = this.map[row][column];
        if (tile === "0") {
          ctx.save();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
          ctx.lineWidth = 1 * pixelUnit;
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
            !this.players.some(
              (player) =>
                player.position.x === column && player.position.y === row
            )
          ) {
            let player = new Player(
              this.tileSize * column + this.tileSize / 2,
              this.tileSize * row + this.tileSize / 2,
              { x: column, y: row },
              this.tileSize,
              "./src/images/god.png",
              null
            );
            this.players.push(player);
          }
        }
        if (tile === "mountain") {
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

        if (tile === "river") {
          drawRiver(column, row);
        }
        if (tile === "green") {
          ctx.drawImage(
            this.greenTile,
            this.tileSize * column,
            this.tileSize * row,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }

    this.selectedBtn != "" ? this.possibilityForClick() : null;
  }

  init() {
    this.players = [];
    this.mountains = [];
    this.map = map;
  }

  getPosition(x, y) {
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    let position = {};
    for (let row = 0; row < mapSizeX; row++) {
      for (let column = 0; column < mapSizeY; column++) {
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

  possibilityForClick() {
    let monsterTiles = [];

    for (let i = 0; i < monsters.length; i++) {
      if (monsters[i].type === "ground") {
        monsterTiles.push(this.getPosition(monsters[i].x, monsters[i].y));
      }
    }
    if (this.selectedBtn === "mountain") {
      for (let row = 0; row < mapSizeY; row++) {
        for (let column = 0; column < mapSizeX; column++) {
          let tileCoordinate = { x: column, y: row };
          if (
            monsterTiles.some(
              (e) => e.x === tileCoordinate.x && e.y === tileCoordinate.y
            )
          ) {
            this.map[row][column] = "monster";
          }
          let tile = this.map[row][column];
          if (tile === "0") {
            this.map[row][column] = "green";
          }
          if (
            monsterTiles.some(
              (e) => e.x === tileCoordinate.x && e.y === tileCoordinate.y
            )
          ) {
            this.map[row][column] = "0";
          }
        }
      }
    }
    if (this.selectedBtn === "river") {
      const excludeValue = ["river", "1"];
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

const MONTERS_STATS = [
  {
    name: "worm",
    type: "ground",
    level: 1,
    hp: 6,
    force: 1,
    speed: 0.8,
  },
  {
    name: "spider",
    type: "ground",
    level: 3,
    hp: 10,
    force: 1,
    speed: 1.2,
  },
  {
    name: "fly",
    type: "air",
    level: 5,
    hp: 12,
    force: 4,
    speed: 1.5,
  },
  {
    name: "slime",
    type: "ground",
    level: 7,
    hp: 50,
    force: 3,
    speed: 0.7,
  },
  {
    name: "bat",
    type: "air",
    level: 7,
    hp: 23,
    force: 3,
    speed: 1.9,
  },
  {
    name: "skull",
    type: "ground",
    level: 9,
    hp: 82,
    force: 10,
    speed: 0.8,
  },
  {
    name: "ghost",
    type: "air",
    level: 12,
    hp: 100,
    force: 20,
    speed: 1.8,
  },
  {
    name: "bombMonster",
    type: "bomb",
    level: 9999,
    hp: 150,
    force: 1,
    speed: 2.5,
  },
];

const MONSTERS_LIST = [
  "worm",
  "slime",
  "bat",
  "skull",
  "spider",
  "fly",
  "ghost",
  "bombMonster",
];

export {
  MONSTERS_LIST,
  MONTERS_STATS,
};

const CARD_ELEMENTS = [
  {
    type: "spawnPoints",
    value: -10,
    title: "Spawn",
    maximumDefault : 999,
    maximum: 999,
    description:
      "Generate a spawning point.</br>Monster will start to pop from it.</br>Posing this tile will generate 10 manas.",
  },
  {
    type: "mountain",
    value: 5,
    title: "Mountain",
    maximumDefault : 4,
    maximum: 99,
    description:
      "A natural obstacle that will block path for any attacking monsters.",
  },
  {
    type: "thunder",
    value: 50,
    title: "Thunder",
    maximumDefault : 4,
    maximum: 99,
    description:
      "Create a lightning that strike monsters and deals 10 damages to all monsters in its area.",
  },
  {
    type: "river",
    value: 50,
    title: "River",
    maximumDefault : 4,
    maximum: 99,
    description: "The ground monster walking in it is drowned.",
  },
  {
    type: "village",
    value: 20,
    title: "Village",
    maximumDefault : 4,
    maximum: 99,
    description: "Generate 5 mana every 5 seconds.",
  },
  {
    type: "tower",
    value: 30,
    title: "Tower",
    maximumDefault : 4,
    maximum: 99,
    description: "A tower that will shoot on monsters.",
  },
  {
    type: "bomb",
    value: 20,
    title: "Bomb",
    maximumDefault : 4,
    maximum: 99,
    description: "Destroy an element on the grid.",
  },
  {
    type: "lava",
    value: 30,
    title: "Lava",
    maximumDefault : 4,
    maximum: 99,
    description: "Any monster that pass through it take damage.",
  },
  {
    type: "desert",
    value: 30,
    title: "Desert",
    maximumDefault : 4,
    maximum: 99,
    description: "Any monster that pass through it are slowed down.",
  },
  {
    type: "tree",
    value: 100,
    title: "Tree",
    maximumDefault : 4,
    maximum: 99,
    description: "Heal 1 HP every 5 seconds.",
  },
  {
    type: "star",
    value: 20,
    title: "Star",
    maximumDefault : 4,
    maximum: 99,
    description: "Force monster to follow their path.",
  },
];

function resetTileCards () {
for(let card of CARD_ELEMENTS){
  card.maximum = card.maximumDefault
}
}

// Elements that ground monster must dodge

const SOLID_ELEMENTS = [
  "mountain",
  "river",
  "tower",
  "village",
  "desert",
  "tree",
  "lava",
  "star",
];

const FRANCHISSABLE_ELEMENTS = ["lava", "river", "desert", "star"];

export { CARD_ELEMENTS, SOLID_ELEMENTS, FRANCHISSABLE_ELEMENTS, resetTileCards };

const BONUS = {
  TOWER_FORCE: 0,
  TOWER_ATTACK_RATE: 0,
  TOWER_RANGE: 0,
  GOD_FORCE: 0,
  GOD_ATTACK_RATE: 0,
  GOD_RANGE: 0,
  LAVA_FORCE: 0,
  STAR_RANGE: 0,
};

export function resetBonus() {
  for (let bonus in BONUS) {
    BONUS.bonus = 0;
  }
}

export { BONUS };


const CARD_FOR_LEVEL_UP = [
  class PlaceSpawnPoint {
    id = "PlaceSpawnPoint";
    tile = "spawnTile";
    bonus = "bonusBlank";
    isBonus = true
    description =
      "Place an spawn point anywhere in the screen border.</br>Gain 3 soul resources.";
    function = () => {
      updateSelectedBtn({ type: "spawnPoints", value: 0 });
      possibilityForClick();
      tileMap.draw(ctxScreen);
      tileMap.players[0].draw(ctxScreen);
      inversePause();
      tileMap.players[0].stats.soulResource += 3;
    };
  },
  class GainResources {
    id = "GainResources";
    tile = "tileBlank";
    bonus = "bonusUp";
    isBonus = true
    description = "Gain 100 soul resources.</br>Lose 10 PV.";
    function = () => {
      tileMap.players[0].stats.soulResource += 100;
      tileMap.players[0].stats.hp -= 10;
    };
  },
  class GainLife {
    id = "GainLife";
    tile = "healthCross";
    bonus = "bonusUp";
    isBonus = true
    description = "Gain 10 HP.</br>Lose 100 soul resources .";
    function = () => {
      tileMap.players[0].stats.soulResource -= 100;
      tileMap.players[0].stats.hp += 10;
    };
  },
  class TowerForceUpgrade {
    id = "TowerForceUpgrade";
    tile = "tower";
    bonus = "forceUp";
    isBonus = true
    description = "All towers gain + 1 attack.";
    function = () => {
      BONUS.TOWER_FORCE += 1;
    };
  },
  class TowerForceDowngrade {
    id = "TowerForceDowngrade";
    tile = "tower";
    bonus = "forceDown";
    isBonus = false
    description = "All towers lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.TOWER_FORCE -= 1;
      BONUS.TOWER_FORCE < -2 ? (BONUS.TOWER_FORCE = -2) : null;
    };
  },
  class GodForceUpgrade {
    id = "GodForceUpgrade";
    tile = "godTile";
    bonus = "forceUp";
    isBonus = true
    description = "God gains + 1 attack.";
    function = () => {
      BONUS.GOD_FORCE += 1;
    };
  },
  class GodForceDowngrade {
    id = "GodForceDowngrade";
    tile = "godTile";
    bonus = "forceDown";
    isBonus = false
    description = "God lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.GOD_FORCE -= 1;
      BONUS.GOD_FORCE < -2 ? (BONUS.GOD_FORCE = -2) : null;
    };
  },
  class LavaForceUpgrade {
    id = "LavaForceUpgrade";
    tile = "lava";
    bonus = "forceUp";
    isBonus = true
    description = `Lava gains + 1 attack.`;
    function = () => {
      BONUS.LAVA_FORCE += 1;
    };
  },
  class LavaForceDowngrade {
    id = "LavaForceDowngrade";
    tile = "lava";
    bonus = "forceDown";
    isBonus = false
    description = "Lava lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.LAVA_FORCE -= 1;
      BONUS.LAVA_FORCE < -2 ? (BONUS.LAVA_FORCE = -2) : null;
    };
  },
  class TowerSpeedUpgrade {
    id = "TowerSpeedUpgrade";
    tile = "tower";
    bonus = "cooldownUp";
    isBonus = true
    description = `All towers gain + 1 speed.</br> Maximum speed :  7 bonus</br></br>Current speed : ${
      BONUS.TOWER_ATTACK_RATE / 100
    }`;
    function = () => {
      BONUS.TOWER_ATTACK_RATE < 700 ? (BONUS.TOWER_ATTACK_RATE += 100) : null;
    };
  },
  class TowerSpeedDowngrade {
    id = "TowerSpeedDowngrade";
    tile = "tower";
    bonus = "cooldownDown";
    isBonus = false
    description = `Towers lose + 1 speed.</br> Minimum speed bonus : -7</br></br>Current speed : ${
      BONUS.TOWER_ATTACK_RATE / 100
    }`;
    function = () => {
      BONUS.TOWER_ATTACK_RATE -= 100;
      BONUS.TOWER_ATTACK_RATE < -700 ? (BONUS.TOWER_ATTACK_RATE = -700) : null;
    };
  },
  class GodSpeedUpgrade {
    id = "GodSpeedUpgrade";
    tile = "godTile";
    bonus = "cooldownUp";
    isBonus = true
    description = `God gains + 1 speed.</br> Maximum speed bonus : 7</br></br>Current speed : ${
      BONUS.GOD_ATTACK_RATE / 100
    }`;
    function = () => {
      BONUS.GOD_ATTACK_RATE < 700 ? (BONUS.TOWER_ATTACK_RATE += 100) : null;
    };
  },
  class GodSpeedDowngrade {
    id = "GodSpeedDowngrade";
    tile = "godTile";
    bonus = "cooldownDown";
    isBonus = false
    description = `God lose + 1 speed.</br> Minimum speed bonus : -7</br></br>Current speed : ${
      BONUS.GOD_ATTACK_RATE / 100
    }`;
    function = () => {
      BONUS.GOD_ATTACK_RATE -= 100;
      BONUS.GOD_ATTACK_RATE < -700 ? (BONUS.TOWER_ATTACK_RATE = -700) : null;
    };
  },
  class GodRangeDowngrade {
    id = "GodRangeDowngrade";
    tile = "godTile";
    bonus = "rangeDown";
    isBonus = false
    description = `God range is shortened.`;
    function = () => {
      BONUS.GOD_RANGE -= 0.5 * tileSize;
      BONUS.GOD_RANGE < -2 * tileSize
        ? (BONUS.GOD_RANGE = -2 * tileSize)
        : null;
    };
  },
  class GodRangeUpgrade {
    id = "GodRangeUpgrade";
    tile = "godTile";
    bonus = "rangeUp";
    isBonus = true
    description = `God range is expended.`;
    function = () => {
      BONUS.GOD_RANGE += 0.5 * tileSize;
      BONUS.GOD_RANGE > 2 * tileSize ? (BONUS.GOD_RANGE = 2 * tileSize) : null;
    };
  },
  class TowerRangeDowngrade {
    id = "TowerRangeDowngrade";
    tile = "tower";
    bonus = "rangeDown";
    isBonus = false
    description = `Tower range is shortened.`;
    function = () => {
      BONUS.TOWER_RANGE -= 0.5 * tileSize;
      BONUS.TOWER_RANGE < -2 * tileSize
        ? (BONUS.TOWER_RANGE = -2 * tileSize)
        : null;
    };
  },
  class TowerRangeUpgrade {
    id = "TowerRangeUpgrade";
    tile = "tower";
    bonus = "rangeUp";
    isBonus = true
    description = `Tower range is expended.`;
    function = () => {
      BONUS.TOWER_RANGE += 0.5 * tileSize;
      BONUS.TOWER_RANGE > 2 * tileSize
        ? (BONUS.TOWER_RANGE = 2 * tileSize)
        : null;
    };
  },
  class StarRangeUpgrade {
    id = "StarRangeUpgrade";
    tile = "star";
    bonus = "rangeUp";
    isBonus = true
    description = `Star range is expended.`;
    function = () => {
      BONUS.STAR_RANGE += 0.5 * tileSize;
      BONUS.STAR_RANGE > 2 * tileSize
        ? (BONUS.STAR_RANGE = 2 * tileSize)
        : null;
    };
  },
  class StarRangeDowngrade {
    id = "StarRangeDowngrade";
    tile = "star";
    bonus = "rangeDown";
    isBonus = false
    description = `Star range is shortened.`;
    function = () => {
      BONUS.STAR_RANGE -= 0.5 * tileSize;
      BONUS.STAR_RANGE < -2 * tileSize
        ? (BONUS.STAR_RANGE = -2 * tileSize)
        : null;
    };
  },
];

export class TileMap {
  constructor() {
    this.tileSize = 0;
    this.mapOrigin = { x: 0, y: 0 };
    this.players = [];

    this.greenTile = new Image();
    this.greenTile.src = "../assets/src/images/greenTile.png";

    this.greenTileFull = new Image();
    this.greenTileFull.src = "../assets/src/images/greenTileFull.png";

    this.mountain = new Image();
    this.mountain.src = "../assets/src/images/mountain.png";
    this.mountains = [];

    this.village = new Image();
    this.village.src = "../assets/src/images/village.png";
    this.villages = [];

    this.tree = new Image();
    this.tree.src = "../assets/src/images/tree.png";
    this.trees = [];

    this.tower = new Image();
    this.tower.src = "../assets/src/images/tower.png";
    this.towers = [];

    this.lava = new Image();
    this.lava.src = "../assets/src/images/lava.png";
    this.lavas = [];

    this.river = new Image();
    this.river.src = "../assets/src/images/river.png";
    this.rivers = [];

    this.desert = new Image();
    this.desert.src = "../assets/src/images/desert.png";
    this.deserts = [];

    this.star = new Image();
    this.star.src = "../assets/src/images/star.png";
    this.stars = [];

    this.elements = [];

    this.spawnPoints = [];

    this.map = map;
  }

  draw(ctx) {
    for (let row = 0; row < mapSizeY; row++) {
      for (let column = 0; column < mapSizeX; column++) {
        let tile = this.map[row][column];
        if (tile === "bomb") {
          this.map[row][column] = "0";
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
              "../assets/src/images/god.png"
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
          if (selectedBtn && selectedBtn.type === "bomb") {
            ctx.drawImage(
              this.greenTileFull,
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
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

        if (tile === "village") {
          ctx.drawImage(
            this.village,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          if (selectedBtn && selectedBtn.type === "bomb") {
            ctx.drawImage(
              this.greenTileFull,
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
          if (
            !this.villages.some(
              (village) =>
                village.position.x === column && village.position.y === row
            )
          ) {
            let village = new Village(column, row);
            this.villages.push(village);
          }
        }

        if (tile === "tree") {
          ctx.drawImage(
            this.tree,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          if (selectedBtn && selectedBtn.type === "bomb") {
            ctx.drawImage(
              this.greenTileFull,
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
          if (
            !this.trees.some(
              (tree) => tree.position.x === column && tree.position.y === row
            )
          ) {
            let tree = new Tree(column, row);
            this.trees.push(tree);
          }
        }

        if (tile === "tower") {
          ctx.drawImage(
            this.tower,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          if (selectedBtn && selectedBtn.type === "bomb") {
            ctx.drawImage(
              this.greenTileFull,
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
          if (
            !this.towers.some(
              (tower) => tower.position.x === column && tower.position.y === row
            )
          ) {
            let tower = new Tower(column, row);
            this.towers.push(tower);
          }
        }

        if (tile === "lava") {
          ctx.drawImage(
            this.lava,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          if (selectedBtn && selectedBtn.type === "bomb") {
            ctx.drawImage(
              this.greenTileFull,
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
          if (
            !this.lavas.some(
              (lava) => lava.column === column && lava.row === row
            )
          ) {
            let lava = { column: column, row: row };
            this.lavas.push(lava);
          }
        }
        if (tile === "desert") {
          ctx.drawImage(
            this.desert,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          if (selectedBtn && selectedBtn.type === "bomb") {
            ctx.drawImage(
              this.greenTileFull,
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
          if (
            !this.deserts.some(
              (desert) => desert.column === column && desert.row === row
            )
          ) {
            let desert = { column: column, row: row };
            this.deserts.push(desert);
          }
        }

        if (tile === "river") {
          ctx.drawImage(
            this.river,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          if (selectedBtn && selectedBtn.type === "bomb") {
            ctx.drawImage(
              this.greenTileFull,
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
          if (
            !this.rivers.some(
              (river) => river.column === column && river.row === row
            )
          ) {
            let river = { column: column, row: row };
            this.rivers.push(river);
          }
        }

        if (tile === "star") {
          ctx.drawImage(
            this.star,
            this.tileSize * column,
            this.tileSize * row,
            this.tileSize,
            this.tileSize
          );
          if (selectedBtn && selectedBtn.type === "bomb") {
            ctx.drawImage(
              this.greenTileFull,
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
          if (
            !this.stars.some(
              (star) => star.position.x === column && star.position.y === row
            )
          ) {
            let star = new Star(column, row, this.star);
            this.stars.push(star);
          }
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

        if (tile === "spawnPoints") {
          if (
            !this.spawnPoints.some(
              (spawnPoint) =>
                spawnPoint.position.x === column &&
                spawnPoint.position.y === row
            )
          ) {
            let spawnPoint = new SpawnPoint(column, row);
            this.spawnPoints.push(spawnPoint);
          }
        }        
      }
    }

    this.deletableElements = [
      this.mountains,
      this.villages,
      this.trees,
      this.towers,
      this.stars,
    ];

    this.elements = [
      { type: "mountain", element: this.mountains },
      { type: "village", element: this.villages },
      { type: "tree", element: this.trees },
      { type: "tower", element: this.towers },
      { type: "star", element: this.stars },
      { type: "river", element: this.rivers },
      { type: "desert", element: this.deserts },
      { type: "lava", element: this.lavas },
    ];
  }

  init() {
    this.players = [];
    this.mountains = [];
    this.villages = [];
    this.towers = [];
    this.trees = [];
    this.spawnPoints = [];
    this.stars = [];
    createMap();
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
}



const choices = 2;

function levelUpScreen() {
  let buttons = [];
  let cards = [];

  tileMap.players[0].level++;
  const levelUpScreen = document.getElementById("levelUpScreen");
  const levelNumber = document.getElementById("levelNumber");

  levelNumber.innerText = "Level : " + tileMap.players[0].level;
  levelNumber.style.position = "absolute";
  levelNumber.style.width = `${gameScreen.width}px`;
  levelNumber.style.margin = `${tileSize / 2}px`;
  levelNumber.style.textAlign = "center";
  levelNumber.style.fontSize = `${10 * pixelUnit}px`;

  const isBonus = Math.random() < 0.5 ? true : false;

  levelUpScreen.classList.remove("disable");
  for (let card = 0; card < choices; card++) {
    drawCards(levelUpScreen, cards, buttons, isBonus);
  }
}

function drawCards(levelUpScreen, cards, buttons, isBonus) {
  const buttonSize = { width: 256 * pixelUnit, height: 384 * pixelUnit };
  const Xpos =
    tileSize * 2 +
    buttonSize.width * buttons.length +
    buttons.length * tileSize;
  const Ypos = tileSize * 2;

  let cardForSelectionArray = [];

  CARD_FOR_LEVEL_UP.forEach((card) => {
    cardForSelectionArray.push(new card());
  });

  const cardForSelection = cardForSelectionArray.filter((card) => {
    return card.isBonus === isBonus;
  });
  let card =
    cardForSelection[Math.floor(Math.random() * cardForSelection.length)];
    // cardForSelection[0];

  while (cards.some((existingCard) => existingCard.id === card.id)) {
    card =
      cardForSelection[Math.floor(Math.random() * cardForSelection.length)];
  }
  cards.push(card);

  const cardImg = ASSETS["cardLevelUp"].cloneNode()
  const newButton = document.createElement("button");
  levelUpScreen.appendChild(newButton);
  newButton.appendChild(cardImg);
  cardImg.style.width = "100%"
  cardImg.style.height = "100%"
  cardImg.style.left = "0px"
  cardImg.style.top = "0px"
  newButton.id = `cardLevelUp_${buttons.length}`;
  newButton.style.width = `${buttonSize.width}px`;
  newButton.style.height = `${buttonSize.height}px`;


  newButton.style.left = `${Xpos}px`;
  newButton.style.top = `${Ypos}px`;
  newButton.style.width = `${buttonSize.width}px`;
  newButton.style.height = `${buttonSize.height}px`;

  const cardTile = document.createElement("img");
  const tile = (buttonSize.width * 2) / 3;
  newButton.append(cardTile);
  cardTile.src = `../assets/src/images/${card.tile}.png`;
  cardTile.style.width = `${tile}px`;
  cardTile.style.height = `${tile}px`;
  cardTile.style.top = `${0 * pixelUnit}px`;
  cardTile.style.left = `${0 * pixelUnit}px`;

  const cardBonus = document.createElement("img");
  newButton.append(cardBonus);
  const bonus = tile / 2;
  cardBonus.src = `../assets/src/images/${card.bonus}.png`;
  cardBonus.style.width = `${bonus}px`;
  cardBonus.style.height = `${bonus}px`;
  cardBonus.style.top = `${tile / 2}px`;
  cardBonus.style.left = `${tile}px`;

  const cardDescription = document.createElement("p");
  newButton.append(cardDescription);
  const buttonUnit = tile / 32;
  cardDescription.innerHTML = card.description;
  cardDescription.style.width = `${buttonSize.width - 16 * buttonUnit}px`;
  cardDescription.style.top = `${tile + 4 * buttonUnit}px`;
  cardDescription.style.left = `${buttonUnit * 8}px`;
  cardDescription.style.textAlign = "center";
  cardDescription.style.fontSize = `${9 * pixelUnit}px`;
  cardDescription.style.lineHeight = `${tileSize / 2}px`;

  newButton.onclick = () => {
    card.function();
    card.id === "PlaceSpawnPoint" || card.id === "Spawn"
      ? null
      : generateSpawn();
    levelUpScreen.classList.add("disable");
    const clicAudio = ASSETS["clic"];
    clicAudio.play();
    inverseLeveUp();
    inversePause();
  };

  buttons.push(newButton);
}


export const thunders = [];

export function handleClick(event) {
  if (selectedBtn) {
    CARD_ELEMENTS.some((card) => card.type === selectedBtn.type);
  }
  const cardSelected = selectedBtn
    ? CARD_ELEMENTS.find((card) => {
        return card.type === selectedBtn.type;
      })
    : null;

  const xZero = marginLeft;
  const yZero = marginTop;
  const x = event.x - xZero;
  const y = event.y - yZero;
  const clickPositionInGrid = tileMap.getPosition(x, y);
  if (
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] === "green" &&
    CARD_ELEMENTS.some((card) => card.type === selectedBtn.type) &&
    selectedBtn.value <= tileMap.players[0].stats.soulResource &&
    tileMap.players[0].stats.soulResource >= 0
    // &&
    // getNumberOfElement(cardSelected) < cardSelected.maximum
  ) {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] =
      selectedBtn.type;
    tileMap.players[0].stats.soulResource -= parseInt(selectedBtn.value);

    cleanMap();
    updateSelectedBtn(undefined);
    renderCardDescription(selectedBtn);
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.remove();
    }
    monsters.forEach((monster) => {
      monster.findingPath();
    });
    const addTileAudio = ASSETS["addTile"];
    addTileAudio.volume = 0.5;
    addTileAudio.play();
    inversePause();
    for (let button of cardButtons) {
      button.disabled === true ? (button.disabled = false) : null;
    }
  }
  if (
    selectedBtn &&
    selectedBtn.type === "thunder" &&
    selectedBtn.value <= tileMap.players[0].stats.soulResource &&
    tileMap.players[0].stats.soulResource >= 0
  ) {
    const thunder = new Thunder(x, y);
    thunders.push(thunder);
    const thunderStrike = ASSETS["thunderStrike"].cloneNode();
    thunderStrike.volume = 0.2;
    thunderStrike.play();
    tileMap.players[0].stats.soulResource -= parseInt(selectedBtn.value);
    updateSelectedBtn(undefined);
    renderCardDescription(selectedBtn);
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.remove();
    }
    inversePause();
    for (let button of cardButtons) {
      button.disabled === true ? (button.disabled = false) : null;
    }
  }

  if (
    selectedBtn &&
    selectedBtn.type === "bomb" &&
    SOLID_ELEMENTS.includes(
      tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x]
    ) &&
    selectedBtn.value <= tileMap.players[0].stats.soulResource &&
    tileMap.players[0].stats.soulResource >= 0
  ) {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] =
      selectedBtn.type;
    bombMecanics(clickPositionInGrid);
    updateSelectedBtn(undefined);
    renderCardDescription(selectedBtn);
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.remove();
    }
    inversePause();
    for (let button of cardButtons) {
      button.disabled === true ? (button.disabled = false) : null;
    }
    for (let i = 0; i < 40; i++) {
      particles.push(
        new Particle(x, y, Math.random() * 2 * pixelUnit, {
          x: Math.random() - 0.5,
          y: Math.random() - 0.5,
        })
      );
    }
  }
}


const SOUNDS = [
  "mainLoop",
  "addTile",
  "clic",
  "damage",
  "godDamage",
  "resourcePoping",
  "shoot",
  "thunderStrike",
];

const IMAGES = [
  "bullet",
  "cardLevelUp",
  "mountain",
  "village",
  "tree",
  "tower",
  "desert",
  "lava",
  "river",
  "star",
  "bomb",
  "thunder",
];

export const ASSETS = [];

export let ASSETS_COUNT = SOUNDS.length + IMAGES.length;

function loadingCallback(canvasScreen) {
  if (--ASSETS_COUNT === 0) {
    screenInit(canvasScreen);
  }
}

export function loadAssets(canvasScreen) {
  for (let i = 0; i < SOUNDS.length; i++) {
    let sound = SOUNDS[i];
    const ext = sound === "mainLoop" ? "mp3" : "wav";
    ASSETS[sound] = new Audio(`../assets/src/sounds/${sound}.${ext}`);
    ASSETS[sound].load();
    ASSETS[sound].addEventListener(
      "canplaythrough",
      loadingCallback(canvasScreen),
      false
    );
  }

  for (let i = 0; i < IMAGES.length; i++) {
    let image = IMAGES[i];
    ASSETS[image] = new Image();
    ASSETS[image].src = `../assets/src/images/${image}.png`;
    ASSETS[image].addEventListener("load", loadingCallback(canvasScreen));
  }
}


function possibilityForClick() {
  let monsterTiles = [];
  for (let i = 0; i < monsters.length; i++) {
    const monster = monsters[i];
    if (tileMap.map[monster.position.y][monster.position.x] !== "0") {
      continue;
    }
    if (
      monsters[i].stats.type === "ground"
      // tileMap.map[monster.position.y][monster.position.x] === 0
    ) {
      monsterTiles.push(monster.position);
    }
  }
  if (SOLID_ELEMENTS.includes(selectedBtn.type)) {
    for (let row = 0; row < mapSizeY; row++) {
      for (let column = 0; column < mapSizeX; column++) {
        let tileCoordinate = {
          x: column,
          y: row,
          value: tileMap.map[row][column],
        };
        if (
          monsterTiles.some(
            (e) => e.x === tileCoordinate.x && e.y === tileCoordinate.y
          )
        ) {
          tileMap.map[row][column] = "monster";
        }
        let tile = tileMap.map[row][column];
        if (
          tile === "0" &&
          !(
            row === 0 ||
            row === mapSizeY - 1 ||
            column === 0 ||
            column === mapSizeX - 1
          )
        ) {
          tileMap.map[row][column] = "green";
        }
        if (
          monsterTiles.some(
            (e) => e.x === tileCoordinate.x && e.y === tileCoordinate.y
          )
        ) {
          tileMap.map[row][column] = "0";
        }
      }
    }
  }
  if (selectedBtn.type === "spawnPoints") {
    for (let row = 0; row < mapSizeY; row++) {
      for (let column = 0; column < mapSizeX; column++) {
        let tile = tileMap.map[row][column];
        if (
          tile !== "spawnPoints" &&
          tile !== "mountain" &&
          tile !== "tower" &&
          tile !== "village" &&
          tile !== "star" &&
          tile !== "tree" &&
          (row === 0 ||
            row === mapSizeY - 1 ||
            column === 0 ||
            column === mapSizeX - 1)
        ) {
          tileMap.map[row][column] = "green";
        }
      }
    }
  }
}

export let speedFactor = 1;

export function updateSpeedFactore(newValue) {
  speedFactor = newValue;
}

export function calculateInterval(
  timestamp,
  valueToCompare,
  interval,
  delta = 0
) {
  return timestamp >= valueToCompare + interval / speedFactor + delta;
}

export { possibilityForClick };

export function getNumberOfElement(element) {
  const array = tileMap.elements.find((e) => {
    return e.type === element.type;
  });
  if (array) {
    return array.element.length;
  }
  return 99;
}

export function updateNumberOfElement() {
  for (let element of tileMap.elements) {
    let text = document.getElementById(`${element.type + "Number"}`);
    text.innerText = element.element.length;
  }
}

function isCardAuthorized(element) {
  return tileMap.elements.some(
    (e) => e.type === element.type && e.element.length < element.maximum
  );
}

export function renderScreenOnce() {
  ctxScreen.clearRect(0, 0, canvasScreen.width, canvasScreen.height);
  drawBackGameBackground(ctxScreen, gameScreen);
  drawSideScreenBackground(ctxScreen, gameScreen, sideScreen);
  tileMap.players[0].draw(ctxScreen);
  for (let i = 0; i < tileMap.spawnPoints.length; i++) {
    const spawnPoint = tileMap.spawnPoints[i];
    spawnPoint.update(ctxScreen);
  }
  for (let i = 0; i < monsters.length; i++) {
    const monster = monsters[i];
    monster.draw(ctxScreen);
  }
  cleanMap();
  possibilityForClick();

  tileMap.draw(ctxScreen);
}
function bombMecanics(bombPos) {
  for (let i = 0; i < tileMap.deletableElements.length; i++) {
    deleteFromElementArray(tileMap.deletableElements[i], bombPos);
  }
}

function deleteFromElementArray(elementArray, bombPos) {
  for (let i = 0; i < elementArray.length; i++) {
    const element = elementArray[i];
    if (element.type === "star") {
      for (let i = 0; i < monsters.length; i++) {
        let monster = monsters[i];
        monster.findingPath();
      }
    }
    if (element.position.x === bombPos.x && element.position.y === bombPos.y) {

      elementArray.splice(i, 1);
    }
  }
}

export { bombMecanics, deleteFromElementArray };
export class Mountain {
  constructor(x, y, image) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.image = image;
    this.position = { x: x, y: y };
  }
}

export class Star {
  constructor(x, y, image) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.position = { x, y };
    this.position = { x: x, y: y };
    this.type = "star";
    this.stats = {
      range: tileSize * 2.5,
    };
    this.starImage = image;
  }

  update(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 1 * pixelUnit;
    ctx.arc(
      this.x + tileSize / 2,
      this.y + tileSize / 2,
      this.stats.range + BONUS.STAR_RANGE,
      0,
      Math.PI * 2,
      false
    );
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();
  }
}

export class Tower {
  constructor(x, y, image) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.image = image;
    this.position = { x: x, y: y };
    this.maxHp = 5;
    this.stats = {
      hp: this.maxHp,
      loadSpeed: 10,
      force: 3,
      range: tileSize * 2.5,
    };
    this.projectiles = [];
    this.lastAttack = 0;
    this.localPauseDelta = 0;

    this.bullet = ASSETS["bullet"].cloneNode()

    this.shootAudio = ASSETS["shoot"].cloneNode();

  }

  update(ctx) {
    let timestamp = Date.now();
    ctx.beginPath();
    ctx.lineWidth = 1 * pixelUnit;
    ctx.arc(
      this.x + tileSize / 2,
      this.y + tileSize / 2,
      this.stats.range + BONUS.TOWER_RANGE,
      0,
      Math.PI * 2,
      false
    );
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();
    this.autoFire(timestamp, monsters);
  }

  autoFire(timestamp, monsters) {
    if (pauseDelta > 0) {
      this.localPauseDelta = pauseDelta;
    }
    monsters.forEach((monster, index) => {
      monster.distance = Math.hypot(
        this.x + tileSize / 2 - monster.x,
        this.y + tileSize / 2 - monster.y
      );
      if (
        monster.distance < this.stats.range + BONUS.TOWER_RANGE - monster.hitBox &&
        calculateInterval(
          timestamp,
          this.lastAttack,
          1000 - BONUS.TOWER_ATTACK_RATE,
          this.localPauseDelta
        )
      ) {
        const angle = Math.atan2(
          monster.y - this.y - tileSize / 2,
          monster.x - this.x - tileSize / 2
        );
        const velocity = {
          x: Math.cos(angle) * 5,
          y: Math.sin(angle) * 5,
          angle: angle,
        };

        if (this.projectiles.length < 1) {
          this.shootAudio.play();
          this.projectiles.push(
            new Projectile(
              this.x + tileSize / 2,
              this.y + tileSize / 2,
              "white",
              velocity,
              this.stats.force + BONUS.TOWER_FORCE,
              this.bullet
            )
          );
        }
        this.lastAttack = timestamp;

        this.localPauseDelta = 0;
      }
    });
  }
}

export class Tree {
  constructor(x, y, image) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.image = image;
    this.position = { x: x, y: y };
    this.stats = {
      healthLoad: 0,
      maxHealth: 100,
      loadSpeed: 20,
      healthBonus: 1,
    };
    this.isAttack = false;
    this.lastUpdate = 0;
    this.healthsToFeed = [];

    this.crossHealth = new Image();
    this.crossHealth.src = "../assets/src/images/healthCross.png";
  }

  update(ctx) {
    let timestamp = Date.now();
    this.drawLoadingHealth(ctx);
    if (
      calculateInterval(timestamp, this.lastUpdate, 1000 / this.stats.loadSpeed)
    ) {
      this.stats.healthLoad++;
      this.lastUpdate = timestamp;
    }
    if (this.stats.healthLoad > this.stats.maxHealth) {
      this.stats.healthLoad = 0;
      if (tileMap.players[0].stats.hp < tileMap.players[0].maxHp) {
        tileMap.players[0].stats.hp += this.stats.healthBonus;
      }
      const health = new HealthToFeed(this.x, this.y);
      this.healthsToFeed.push(health);
    }

    for (let i = 0; i < this.healthsToFeed.length; i++) {
      this.healthsToFeed[i].update(ctx);
      if (this.healthsToFeed[i].x >= this.healthsToFeed[i].targetX) {
        this.healthsToFeed.splice(i, 1);
        tileMap.players[0].stats.healthResource += this.stats.healthBonus;
        this.ishealthGenerated = false;
      }
    }
  }

  drawLoadingHealth(ctx) {
    const crossXPos = this.x + tileSize / 4;
    const crossYPos = this.y - tileSize / 4;
    const spriteSize = 16;
    const ratio = this.stats.healthLoad / this.stats.maxHealth;
    ctx.drawImage(
      this.crossHealth,
      0,
      spriteSize * ratio - spriteSize,
      spriteSize,
      spriteSize,
      crossXPos,
      crossYPos,
      tileSize / 2,
      tileSize / 2
    );
  }
}

class HealthToFeed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetX = gameScreen.width;
    this.targetY = tileSize;
    this.velocity;
    this.speed = 3;
    this.crossHealth = new Image();
    this.crossHealth.src = "../assets/src/images/healthCross.png";
  }

  update(ctx) {
    this.draw(ctx);
    const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    this.velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    };
    this.x += this.velocity.x * pixelUnit * delta * this.speed;
    this.y += this.velocity.y * pixelUnit * delta * this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.crossHealth, this.x, this.y, tileSize / 2, tileSize / 2);
  }
}

export class Village {
  constructor(x, y, image) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.image = image;
    this.position = { x: x, y: y };
    this.maxHp = 5;
    this.stats = {
      hp: this.maxHp,
      manaLoad: 0,
      maxMana: 100,
      manaBonus: 5,
    };
    this.isAttack = false;
    this.lastUpdate = 0;
    this.ismanaGenerated = false;
    this.manasToFeed = [];
    this.resourcePopingAudio = ASSETS["resourcePoping"]
  }

  update(ctx) {
    let timestamp = Date.now();
    this.drawLoadingCircle(ctx,timestamp);
    if (
      calculateInterval(timestamp, this.lastUpdate, 50)
    ) {
      this.stats.manaLoad++;
      this.lastUpdate = timestamp;
    }
    if (this.stats.manaLoad > this.stats.maxMana) {
      this.stats.manaLoad = 0;
    }
  }

  drawLoadingCircle(ctx,timestamp) {
    let x = this.x + tileSize / 2;
    let y = this.y;
    const barRatio = this.stats.manaLoad / this.stats.maxMana;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.translate(x, y);
    ctx.rotate(Math.PI * 1.5);
    ctx.translate(-x, -y);
    ctx.arc(x, y, 5 * pixelUnit, 0, Math.PI * 2 * barRatio);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
    if (barRatio >= 1 && !this.ismanaGenerated) {
      this.ismanaGenerated = true;
      const localResourcePopingAudio = this.resourcePopingAudio.cloneNode()
      localResourcePopingAudio.volume = .5
      localResourcePopingAudio.play()
      const mana = new ManaToFeed(x, y);
      this.manasToFeed.push(mana);
    }
    for (let i = 0; i < this.manasToFeed.length; i++) {
      this.manasToFeed[i].update(ctx);
      if (this.manasToFeed[i].x >= this.manasToFeed[i].targetX) {
        this.manasToFeed.splice(i, 1);
        tileMap.players[0].stats.soulResource += this.stats.manaBonus;
        this.ismanaGenerated = false;
      }
    }
  }
}

class ManaToFeed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetX = gameScreen.width;
    this.targetY = tileSize * 1.75;
    this.velocity;
    this.speed = 3;
  }

  update(ctx) {
    this.draw(ctx);
    const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    this.velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    };
    this.x += this.velocity.x * pixelUnit * delta * this.speed;
    this.y += this.velocity.y * pixelUnit * delta * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5 * pixelUnit, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
  }
}

let map = [];
const mapSizeX = 21;
const mapSizeY = 15;

function createMap() {
  map = [];
  const mapCenterX = Math.floor(mapSizeX / 2);
  const mapCenterY = Math.floor(mapSizeY / 2);
  for (let i = 0; i < mapSizeY; i++) {
    map.push([]);
  }
  for (let row = 0; row < mapSizeY; row++) {
    for (let column = 0; column < mapSizeX; column++) {
      map[row].push("0");
    }
  }
  map[mapCenterY][mapCenterX] = "1";
}

export { createMap, map, mapSizeX, mapSizeY };


export class SpawnPoint {
  constructor(x, y) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.position = { x: x, y: y };
    this.lastGroundSpawn = 0;
    this.level = 1;
    this.monstersCount = 0;
    this.MaxmonstersCount = 1;

    this.img = new Image();
    this.img.src = "../assets/src/images/spawnPoints.png";
    this.spriteSize = 32;
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = this.horizontalFrame * this.verticalFrame;
    this.frameRate = 10;
    this.lastFrame = 0;
    this.isSpawning = false;
  }
  update(ctx) {
    let timestamp = Date.now();

    const horizontalFrame = this.img.naturalWidth / 32;
    ctx.save();
    ctx.drawImage(
      this.img,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.x,
      this.y,
      tileSize,
      tileSize
    );

    this.isSpawning && !isPause ? this.drawSpawnAnimation(timestamp) : null;

    ctx.restore();
  }

  drawSpawnAnimation(timestamp) {
    const horizontalFrame = this.img.naturalWidth / 32;

    if (calculateInterval(timestamp, this.lastFrame, 1000 / this.frameRate)) {
      if (this.frameX < horizontalFrame - 1) {
        this.frameX += 1;
      } else {
        this.frameX = 0;
        this.isSpawning = false;
      }
      this.lastFrame = timestamp;
    }
  }
}


const toKey = (x, y) => `${x}x${y}`;

const findPath = (start, target, type) => {
  const queue = [];
  const parentForKey = {};
  const startKey = toKey(start.x, start.y);
  const targetKey = toKey(target.x, target.y);

  parentForKey[startKey] = {
    key: "",
    position: { x: -1, y: -1 },
  };

  queue.push(start);

  while (queue.length > 0) {
    const { x, y } = queue.shift();
    const currentKey = toKey(x, y);
    if (currentKey === targetKey) {
      break;
    }
    const neighbors = [
      { x, y: y - 1 }, // top
      { x: x + 1, y }, // right
      { x, y: y + 1 }, // bottom
      { x: x - 1, y }, // left
    ];
    for (let i = 0; i < neighbors.length; ++i) {
      const neighbor = neighbors[i];

      if (neighbor.x <= 0) {
        neighbor.x = 0;
      }
      if (neighbor.y <= 0) {
        neighbor.y = 0;
      }
      if (neighbor.x > mapSizeX - 1) {
        neighbor.x = mapSizeX - 2;
      }
      if (neighbor.y > mapSizeY - 1) {
        neighbor.y = mapSizeY - 2;
      }
      const tile = map[neighbor.y][neighbor.x];
      if (!tile) {
        continue;
      }
      if (
        (type === "ground" &&
          SOLID_ELEMENTS.includes(tile) &&
          !FRANCHISSABLE_ELEMENTS.includes(tile)) 
      ) {
        continue;
      }
      if (type === "air" && tile === "mountain") {
        continue;
      }
      if (type === "bomb" && tile === "player") {
        continue;
      }

      const key = toKey(neighbor.x, neighbor.y);

      if (key in parentForKey) {
        continue;
      }

      parentForKey[key] = {
        key: currentKey,
        position: { x, y },
      };

      queue.push(neighbor);
    }
  }
  const lastPos = {
    x: target.x * tileSize + tileSize / 2,
    y: target.y * tileSize + tileSize / 2,
  };
  const path = [lastPos];

  let currentKey = targetKey;

  if (!parentForKey[targetKey]) {
    return;
  }

  parentForKey[targetKey].position = {
    x: target.x,
    y: target.y,
  };
  let currentPos = parentForKey[targetKey].position;

  while (currentKey !== startKey) {
    const pos = { x: currentPos.x * tileSize, y: currentPos.y * tileSize };

    pos.x += tileSize * 0.5;
    pos.y += tileSize * 0.5;

    path.push(pos);

    const key = parentForKey[currentKey].key;
    const position = parentForKey[currentKey].position;
    currentKey = key;
    currentPos = position;
  }
  path.reverse();
  return path;
};

export default findPath;

const bombArray = [];

export class Monster {
  constructor(x, y, radius, name, type) {
    this.x = x + tileSize / 2;
    this.y = y + tileSize / 2;
    this.radius = radius;
    this.name = name;
    this.type = type;
    this.velocity = { x: 0, y: 0 };
    this.stats = this.getMonsterStats();
    this.speed = this.stats.speed * 0.4;

    this.maxHp = this.stats.hp;

    this.visitedStars = [];

    this.isTakingDamage = false;
    this.damageFrameCount = 0;

    this.startVec = tileMap.getPosition(this.x, this.y);
    this.defaultTargetVec = tileMap.getPosition(
      tileMap.players[0].x,
      tileMap.players[0].y
    );
    this.targetVec = this.defaultTargetVec;
    this.isBombTarget = false;
    this.toDelete;
    this.ArrayToDelete;

    this.lastTargetVec = this.targetVec;
    this.path = findPath(this.startVec, this.targetVec, this.stats.type); // Create the path

    this.lastLavaDamage = 0;

    this.distance = 0;
    this.position = tileMap.getPosition(this.x, this.y);

    this.moveToTarget = this.path ? this.path.shift() : null;

    this.hitBox = tileSize / 3;

    this.img = new Image();
    this.img.src = `../assets/src/images/${name}.png`;
    this.spriteSize = 32;
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = this.horizontalFrame * this.verticalFrame;
    this.frameRate = 10;
    this.lastFrame = 0;

    this.localPauseDelta = 0;

    this.damageAudio = ASSETS["damage"].cloneNode();
  }

  getMonsterStats() {
    const stats = MONTERS_STATS.find((monster) => {
      return monster.name === this.name;
    });
    const statsToReturn = { ...stats };
    return statsToReturn;
  }

  findingPath(forceUpdate = true) {
    if (
      !forceUpdate &&
      this.lastTargetVec.x === this.targetVec.x &&
      this.lastTargetVec.y === this.targetVec.y
    ) {
      return;
    }
    this.startVec = tileMap.getPosition(this.x, this.y);

    if (
      this.startVec.x === this.targetVec.x &&
      this.startVec.y === this.targetVec.y
    ) {
      return;
    }
    this.path = findPath(this.startVec, this.targetVec, this.stats.type);
    this.moveToTarget = this.path ? this.path.shift() : null;
  }

  draw(ctx, timestamp) {
    const horizontalFrame = this.img.naturalWidth / 32;
    this.frameY = this.isTakingDamage ? 1 : 0;

    ctx.save();

    ctx.drawImage(
      this.img,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius,
      this.radius
    );

    if (!isPause) {
      if (calculateInterval(timestamp, this.lastFrame, 1000 / this.frameRate)) {
        this.frameX = this.frameX < horizontalFrame - 1 ? this.frameX + 1 : 0;
        this.lastFrame = timestamp;
      }
    }
    ctx.restore();
  }

  moveAlong() {
    if (!this.path || this.path.length <= 0) {
      return;
    }

    this.moveTo(this.path.shift());
  }

  moveTo(target) {
    this.moveToTarget = target;
  }

  bombMonsterMecs() {
    if (!this.isBombTarget) {
      this.ArrayToDelete =
        tileMap.deletableElements[
          Math.floor(Math.random() * tileMap.deletableElements.length)
        ];
      this.toDelete =
        this.ArrayToDelete[
          Math.floor(Math.random() * this.ArrayToDelete.length)
        ];
      if (this.toDelete) {
        this.targetVec = tileMap.getPosition(this.toDelete.x, this.toDelete.y);
        this.isBombTarget = true;
        this.findingPath();
      } else {
        return;
      }
    }
    const minDistance = 2 * pixelUnit;
    let distance = Math.hypot(
      this.toDelete.x - this.x + tileSize / 2,
      this.toDelete.y - this.y + tileSize / 2
    );
    if (distance <= minDistance) {
      this.stats.hp = 0;
      deleteFromElementArray(this.ArrayToDelete, this.targetVec);
      tileMap.map[this.targetVec.y][this.targetVec.x] = "bomb";
    }
  }

  update(ctx) {
    let timestamp = Date.now();

    if (pauseDelta > 0) {
      this.localPauseDelta = pauseDelta;
    }

    this.name !== "bombMonster" ? this.starMecanics() : null;
    this.name === "bombMonster" ? this.bombMonsterMecs() : null;
    if (this.isTakingDamage) {
      this.damageFrameCount++;
    }
    if (this.damageFrameCount === 10) {
      this.isTakingDamage = false;
      this.damageFrameCount = 0;
    }

    this.position = tileMap.getPosition(this.x, this.y);
    let currentTile = tileMap.map[this.position.y][this.position.x];

    if (
      calculateInterval(
        timestamp,
        this.lastLavaDamage,
        1000,
        this.localPauseDelta
      ) &&
      currentTile === "lava"
    ) {
      !this.isTakingDamage ? this.takingDamage(3 + BONUS.LAVA_FORCE) : null;
      this.lastLavaDamage = timestamp;
      this.localPauseDelta = 0;
    }

    currentTile === "river" && this.type === "ground"
      ? (this.stats.hp = 0)
      : null;

    this.draw(ctx, timestamp);

    let dx = 0;
    let dy = 0;
    if (this.moveToTarget) {
      dx = this.moveToTarget.x - this.x;
      dy = this.moveToTarget.y - this.y;
      if (Math.abs(dx) < 2 * pixelUnit) {
        dx = 0;
      }
      if (Math.abs(dy) < 2 * pixelUnit) {
        dy = 0;
      }

      const angle = Math.atan2(dy, dx);
      this.velocity = {
        x: dx === 0 ? 0 : Math.cos(angle),
        y: dy === 0 ? 0 : Math.sin(angle),
      };
      let slowDownFactor = currentTile === "desert" ? 0.5 : 1;

      this.x +=
        this.velocity.x *
        pixelUnit *
        delta *
        this.speed *
        slowDownFactor *
        speedFactor;
      this.y +=
        this.velocity.y *
        pixelUnit *
        delta *
        this.speed *
        slowDownFactor *
        speedFactor;

      if (dx === 0 && dy === 0) {
        if (this.path && this.path.length > 0) {
          this.moveTo(this.path.shift());
          return;
        }
        this.moveToTarget = undefined;
      }
    }

    this.lastTargetVec = this.targetVec;
  }

  takingDamage(damage) {
    this.stats.hp -= damage;
    this.isTakingDamage = true;
    const damageText = new DrawDamage(this, damage);
    damageTexts.push(damageText);
    this.damageAudio.play();
  }

  starMecanics() {
    const minDistance = 5 * pixelUnit;
    for (let i = 0; i < tileMap.stars.length; i++) {
      let star = tileMap.stars[i];
      let distance = Math.hypot(
        star.x - this.x + tileSize / 2,
        star.y - this.y + tileSize / 2
      );
      if (
        distance - star.stats.range - BONUS.STAR_RANGE <= 0 &&
        distance > minDistance &&
        !this.visitedStars.some(
          (visitedStar) => visitedStar.x === star.x && visitedStar.y === star.y
        )
      ) {
        this.targetVec = star.position;
        this.findingPath(false);
        this.visitedStars.push(star);
      }
      if (distance <= minDistance) {
        this.targetVec = this.defaultTargetVec;
        this.findingPath(false);
      }
    }
    if (
      !tileMap.stars.some(
        (star) =>
          star.position.x === this.targetVec.x &&
          star.position.y === this.targetVec.y
      )
    ) {
      this.targetVec = this.defaultTargetVec;
      this.findingPath(false);
    }
  }
}

const playerPos = {
  x: Math.floor(mapSizeX / 2),
  y: Math.floor(mapSizeY / 2),
};

let path = [];
let spawnGroundRate = 0.2;

let localPauseDelta = 0;

function monsterSelection() {
  const array = MONTERS_STATS.filter((monster) => {
    return monster.level <= tileMap.players[0].level;
  });
  return array;
}
function spawnMonsters() {
  const timestamp = Date.now();
  let highestLevelSpawn
  if(tileMap.spawnPoints.length>0)
{
   highestLevelSpawn = tileMap.spawnPoints.reduce((max, spawnPoint) =>
    max.MaxmonstersCount > spawnPoint.MaxmonstersCount ? max : spawnPoint
  );
}
  if (pauseDelta > 0) {
    localPauseDelta = pauseDelta;
  }
  for (let i = 0; i < tileMap.spawnPoints.length; i++) {
    const spawnPoint = tileMap.spawnPoints[i];
    if (
      highestLevelSpawn && highestLevelSpawn.monstersCount === highestLevelSpawn.MaxmonstersCount
    ) {
      if (monsters.length === 0 && particles.length === 0) {
        inverseLeveUp();
        tileMap.spawnPoints.forEach((spawnPoint) => {
          spawnPoint.monstersCount = 0;
          spawnPoint.MaxmonstersCount++;
        });
      }
      return;
    }

    if (
      !isPause &&
      calculateInterval(
        timestamp,
        spawnPoint.lastGroundSpawn,
        1000 / spawnGroundRate,
        localPauseDelta
      )
    ) {
      const monsterSelectionArray = monsterSelection();
      const monsterSelected =
        monsterSelectionArray[
          Math.floor(Math.random() * monsterSelectionArray.length)
        ];
      const groundSpawnPosition = getGroundSpawnPosition(spawnPoint);
      spawnPoint.isSpawning = true;
      setTimeout(() => {
        monsters.push(
          new Monster(
            groundSpawnPosition.x,
            groundSpawnPosition.y,
            tileSize,
            monsterSelected.name,
            monsterSelected.type
          )
        );
        spawnPoint.monstersCount++;
      }, 200);

      spawnPoint.lastGroundSpawn = timestamp;

      localPauseDelta = 0;
    }
  }

  path = [];
  return;
}

export function getGroundSpawnPosition(spawnPoint) {
  const position = { x: spawnPoint.x, y: spawnPoint.y };
  return position;
}

export function generateSpawn() {
  let x, y;
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 : mapSizeX - 1;
    y = Math.floor(Math.random() * mapSizeY);
  } else {
    x = Math.floor(Math.random() * mapSizeX);
    y = Math.random() < 0.5 ? 0 : mapSizeY - 1;
  }
  while (
    tileMap.spawnPoints.some(
      (spawnPoint) => spawnPoint.position.x === x && spawnPoint.position.y === y
    )
  ) {
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 : mapSizeX - 1;
      y = Math.floor(Math.random() * mapSizeY);
    } else {
      x = Math.floor(Math.random() * mapSizeX);
      y = Math.random() < 0.5 ? 0 : mapSizeY - 1;
    }
  }
  tileMap.map[y][x] = "spawnPoints";
  tileMap.players[0].stats.soulResource += 10;
}

export { spawnMonsters };

class Player {
  constructor(x, y, position, radius, image) {
    this.x = x;
    this.y = y;
    this.position = position;
    this.radius = radius;
    this.projectiles = [];
    this.projectileVelocity = {};

    this.maxHp = 30;
    this.stats = {
      hp: this.maxHp,
      exp: 0,
      force: 3,
      range: tileSize * 3.5,
      soulResource: 30,
    };
    this.level = 0;
    this.lastAttack = 0;
    this.isAttacking = false;

    this.isTakingDamage = false;
    this.damageFrameCount = 0;

    this.img = new Image();
    this.img.src = image;
    this.spriteSize = 32;
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = this.horizontalFrame * this.verticalFrame;
    this.frameRate = 40;
    this.lastFrame = 0;

    this.bullet = ASSETS["bullet"].cloneNode();

    this.localPauseDelta = 0;

    this.shootAudio = ASSETS["shoot"].cloneNode();
    this.damageAudio = ASSETS["godDamage"];
  }

  draw(ctx) {
    let timestamp = Date.now();

    if (this.stats.hp > this.maxHp) {
      this.stats.hp = this.maxHp;
    }

    if (this.stats.hp < 0) {
      this.stats.hp = 0;
    }

    if (this.stats.soulResource < 0) {
      this.stats.soulResource = 0;
    }

    this.frameY = this.isTakingDamage ? 1 : 0;

    ctx.drawImage(
      this.img,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius,
      this.radius
    );
    
    if (!isPause) {
      if (this.isTakingDamage) {
        this.damageFrameCount++;
      }
      if (this.damageFrameCount === 10) {
        this.isTakingDamage = false;
        this.damageFrameCount = 0;
      }
      this.isAttacking ? this.shootAnimation(timestamp) : null;
      ctx.beginPath();
      ctx.lineWidth = 1 * pixelUnit;
      ctx.arc(
        this.x,
        this.y,
        this.stats.range + BONUS.GOD_RANGE,
        0,
        Math.PI * 2,
        false
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.stroke();

      this.autoFire(timestamp, monsters);
      if (this.stats.exp >= this.stats.nextLvl) {
        this.stats.exp = 0;
        this.stats.nextLvl = Math.round(this.stats.nextLvl * 150) / 100;
      }
    }
    this.drawPlayerLife(ctx);
    this.drawLevel();
    this.drawsoulResource();
  }

  autoFire(timestamp, monsters) {
    if (pauseDelta > 0) {
      this.localPauseDelta = pauseDelta;
    }
    monsters.forEach((monster, index) => {
      monster.distance = Math.hypot(this.x - monster.x, this.y - monster.y);
      if (
        monster.distance <
          this.stats.range + BONUS.GOD_RANGE - monster.hitBox &&
        calculateInterval(
          timestamp,
          this.lastAttack,
          1000 - BONUS.GOD_ATTACK_RATE,
          this.localPauseDelta
        )
      ) {
        const angle = Math.atan2(monster.y - this.y, monster.x - this.x);
        this.projectileVelocity = {
          x: Math.cos(angle) * 5,
          y: Math.sin(angle) * 5,
          angle: angle,
        };
        this.isAttacking = true;
        this.lastAttack = timestamp;

        this.localPauseDelta = 0;
      }
    });
  }

  shoot() {
    this.shootAudio.play();
    this.projectiles.push(
      new Projectile(
        this.x,
        this.y,
        "white",
        this.projectileVelocity,
        this.stats.force + BONUS.GOD_FORCE,
        this.bullet
      )
    );
  }

  takingDamage(damage) {
    this.stats.hp -= damage;
    this.isTakingDamage = true;
    const damageText = new DrawDamage(this, damage);
    damageTexts.push(damageText);
    this.damageAudio.play();
  }

  shootAnimation(timestamp) {
    const horizontalFrame = this.img.naturalWidth / 32;

    if (calculateInterval(timestamp, this.lastFrame, 1000 / this.frameRate)) {
      if (this.frameX < horizontalFrame - 1) {
        this.frameX += 1;
      } else {
        this.frameX = 0;
        this.shoot();
        this.isAttacking = false;
      }
      this.lastFrame = timestamp;
    }
  }

  drawPlayerLife(ctx) {
    const barRatio = this.stats.hp / this.maxHp;

    const barWidth = tileSize * 9.5;
    const barHeight = tileSize / 3;
    let barX = gameScreen.width + (sideScreen.width - barWidth) / 2;
    let barY = tileSize / 2;

    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = "rgba(0, 175, 0, 0.9)";
    ctx.fillRect(barX, barY, barWidth * barRatio, barHeight);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1 * pixelUnit;
    ctx.strokeRect(
      barX,
      barY - 1 * pixelUnit,
      barWidth,
      barHeight + 2 * pixelUnit
    );
    ctx.restore();
  }

  drawsoulResource() {
    const soulResource = document.getElementById("soulResource");
    soulResource.innerHTML = `${this.stats.soulResource}`;
    soulResource.style.left = `${
      marginLeft + gameScreen.width + tileSize / 2
    }px`;
    soulResource.style.top = `${marginTop + tileSize * 1.3}px`;
    soulResource.style.fontSize = `${tileSize / 2}px`;
  }

  drawLevel() {
    const levelText = document.getElementById("levelText");
    levelText.innerHTML = `LVL: ${this.level}`;
    levelText.style.left = `${marginLeft + gameScreen.width + tileSize / 2}px`;
    levelText.style.top = `${marginTop + tileSize * 2}px`;
    levelText.style.fontSize = `${tileSize / 2}px`;
  }
}

export { Player };

class Projectile {
  constructor(x, y, color, velocity, force, sprite) {
    this.x = x;
    this.y = y;
    this.radius = 6 * pixelUnit;
    this.color = color;
    this.velocity = velocity;
    this.speed = 1.2;
    this.force = force;
    this.sprite = sprite;
    this.spriteSize = tileSize;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.velocity.angle);
    ctx.translate(-this.x, -this.y);
    ctx.drawImage(
      this.sprite,
      this.x - tileSize / 2,
      this.y - tileSize / 2,
      this.spriteSize,
      this.spriteSize
    );
    ctx.restore();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x * pixelUnit * delta * this.speed * speedFactor;
    this.y += this.velocity.y * pixelUnit * delta * this.speed * speedFactor;
  }
}

export { Projectile };

class Thunder {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.minSegmentHeight = 5;
    this.groundHeight = this.y;
    this.color = "hsl(180, 80%, 100%)";
    this.roughness = 2;
    this.maxDifference = this.y / 5;
    this.lightningArray = [];
    this.maxRadius = tileSize * 2;
    this.radius = 0;
    this.damage = 100;
  }

  update(ctx) {
    ctx.strokeStyle = this.color;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1 * pixelUnit;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.stroke();
    ctx.restore();

    this.radius += 6 * pixelUnit;

    monsters.forEach((monster, index) => {
      monster.distance = Math.hypot(this.x - monster.x, this.y - monster.y);
      if (monster.distance < this.radius - monster.hitBox) {
        hitMonsters(monster, this.damage);
      }
    });

    var lightning = this.createLightning();
    this.lightningArray.push(lightning);

    ctx.beginPath();
    for (var i = 0; i < lightning.length; i++) {
      ctx.lineTo(lightning[i].x, lightning[i].y);
    }
    ctx.stroke();
  }

  createLightning() {
    var segmentHeight = tileSize;
    var lightning = [];
    lightning.push({ x: this.x + (Math.random() - 0.5) * tileSize * 2, y: 0 });
    lightning.push({
      x: this.x,
      y: this.y,
    });
    var currDiff = this.maxDifference;
    while (segmentHeight > this.minSegmentHeight) {
      var newSegments = [];
      for (var i = 0; i < lightning.length - 1; i++) {
        var start = lightning[i];
        var end = lightning[i + 1];
        var midX = (start.x + end.x) / 2;
        var newX = midX + (Math.random() * 2 - 1) * currDiff;
        newSegments.push(start, { x: newX, y: (start.y + end.y) / 2 });
      }

      newSegments.push(lightning.pop());
      lightning = newSegments;

      currDiff /= this.roughness;
      segmentHeight /= 2;
    }
    return lightning;
  }
}

function drawLifeBar(ctx, entity) {
  let x = entity.x - tileSize / 2;
  let y = entity.y - tileSize / 2;
  if (entity.stats.hp < entity.maxHp) {
    let barRatio = entity.stats.hp / entity.maxHp;
    barRatio < 0 ? barRatio = 0 : barRatio
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(
      x + (tileSize * 0.4) / 2,
      y - tileSize * 0.1,
      tileSize * 0.6,
      tileSize * 0.1
    );
    ctx.fillStyle = "rgba(0, 175, 0, 0.9)";
    ctx.fillRect(
      x + (tileSize * 0.4) / 2,
      y - tileSize * 0.1,
      tileSize * barRatio * 0.6,
      tileSize * 0.1
    );
    ctx.restore();
  }
}

class DrawDamage {
  constructor(entity, damage) {
    this.entity = entity;
    this.y = entity.y - tileSize/2;
    this.yGap = 0
    this.damage = damage;
    this.hue = 1;
  }

  draw(ctx) {
    ctx.save()
    let x = this.entity.x;
    x -= this.entity.radius / 2;
    ctx.font = `${tileSize / 3}px dogicapixel`;
    ctx.fillStyle = `hsla(1, 100%, 100%, ${this.hue})`;
    ctx.textAlign = "center";
    ctx.fillText(this.damage, x + tileSize / 2, this.y);

    this.yGap -= 0.5 * pixelUnit * delta;
    this.y = this.entity.y - tileSize/2 + this.yGap
    this.hue -= 0.05;
    ctx.restore()
  }
}

function hitMonsters(monster, damage) {
  monster.stats.hp -= damage;
  const damageText = new DrawDamage(monster, damage);
  damageTexts.push(damageText);
}

class Particle {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "";
    this.velocity = velocity;
    this.speed = 3;
  }

  draw(ctx) {
    this.color = "white";
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.radius, this.radius);
    ctx.restore();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x * pixelUnit * this.speed * delta;
    this.y += this.velocity.y * pixelUnit * this.speed * delta;
    this.radius -= 0.05 * pixelUnit * delta;
  }
}

export function createActionButton(pixelUnit) {
  const actionStatus = window.document.getElementById("actionStatus");
  actionStatus.classList.remove("disable")
  actionStatus.innerHTML = `<span style=font-size:${5 * pixelUnit}px>x</span>1`;
  actionStatus.style.fontSize = `${8 * pixelUnit}px`;

  const pauseButton = document.getElementById("pause");
  pauseButton.onclick = function () {
    if (!selectedBtn) {
      inversePause();
    }
    updateStatusText(pixelUnit);
  };

  const playButton = document.getElementById("play");
  playButton.onclick = function () {
    if (isPause && !selectedBtn) {
      inversePause();
    }
    if (!selectedBtn) {
      updateSpeedFactore(1);
      updateStatusText(pixelUnit);
    }
  };

  const fastForwardButton = document.getElementById("fastForward");
  fastForwardButton.onclick = function () {
    if (isPause && !selectedBtn) {
      inversePause();
    }
    if (!selectedBtn) {
      updateSpeedFactore(2);
      updateStatusText(pixelUnit);
    }
  };

  const actionButtons = document.getElementById("actionButtons");
  actionButtons.classList.remove("disable")
  actionButtons.style.height = `${tileSize}px`;
  actionButtons.style.width = `${tileSize * 3}px`;
  actionButtons.style.top = `${tileSize + marginTop}px`;
  actionButtons.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 3.5 - 2 * pixelUnit)
  }px`;

  const pause = document.getElementById("pause");
  pause.style.width = `${tileSize}px`;
  pause.style.height = `${tileSize}px`;
  pause.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 3.5 - 2 * pixelUnit)
  }px`;

  const play = document.getElementById("play");
  play.style.width = `${tileSize}px`;
  play.style.height = `${tileSize}px`;
  play.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 2.5 - 2 * pixelUnit)
  }px`;

  const fastForward = document.getElementById("fastForward");
  fastForward.style.width = `${tileSize}px`;
  fastForward.style.height = `${tileSize}px`;
  fastForward.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 1.5 - 2 * pixelUnit)
  }px`;

  actionStatus.style.top = `${tileSize * 2 + marginTop}px`;
  actionStatus.style.left = `${
    marginLeft + canvasScreen.width - tileSize * 3.5
  }px`;
  actionStatus.style.width = `${tileSize * 3}px`;
}

export function updateStatusText(pixelUnit) {
  const actionStatus = window.document.getElementById("actionStatus");
  speedFactor === 1
    ? (actionStatus.innerHTML = `<span style=font-size:${
        5 * pixelUnit
      }px>x</span>1`)
    : null;
  speedFactor === 2
    ? (actionStatus.innerHTML = `<span style=font-size:${
        5 * pixelUnit
      }px>x</span>2`)
    : null;
  isPause ? (actionStatus.innerText = "pause") : null;
}


export const cardButtons = [];
const maxCardPerLign = 5;
let line = 0;

const cardDeck = [
  "mountain",
  "village",
  "tree",
  "tower",
  "desert",
  "lava",
  "river",
  "star",
  "bomb",
  "thunder",
];

function drawCardsDeck() {
  for (let card = 0; card < cardDeck.length; card++) {
    createCard(cardDeck[card]);
  }
}
function createCard(type) {
  const cardSelected = CARD_ELEMENTS.find((card) => {
    return card.type === type;
  });
  const buttonSize = 64 * pixelUnit;
  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.style.height = `${buttonSize * 2}px`;
  let Xpos = (cardButtons.length % maxCardPerLign) * buttonSize;
  line = (cardButtons.length % maxCardPerLign) * buttonSize ? line : line + 1;
  let Ypos = buttonSize * (line - 1);

  let newButton = document.createElement("button");
  buttonContainer.appendChild(newButton);
  newButton.id = `${type + cardButtons.length}`;
  newButton.classList.add("buttonsTile");
  newButton.style.position = "absolute";
  newButton.style.left = `${Xpos}px`;
  newButton.style.top = `${Ypos}px`;

  const btnImage = new Image();
  btnImage.src = `../assets/src/images/${type}.png`;
  newButton.appendChild(btnImage);
  btnImage.style.position = "absolute";
  btnImage.style.width = `${32 * pixelUnit}px`;
  btnImage.style.height = `${32 * pixelUnit}px`;
  btnImage.style.left = `${16 * pixelUnit}px`;
  btnImage.style.top = `${16 * pixelUnit}px`;

  newButton.style.backgroundColor = "transparent";
  newButton.style.border = "none";
  newButton.style.width = `${buttonSize}px`;
  newButton.style.height = `${buttonSize}px`;

  let cardValueText = document.createElement("p");
  buttonContainer.appendChild(cardValueText);

  cardValueText.innerText = `${cardSelected.value}`;
  cardValueText.style.position = "absolute";
  cardValueText.style.left = `${Xpos}px`;
  cardValueText.style.top = `${Ypos + 7 * pixelUnit}px`;
  cardValueText.style.width = `${buttonSize}px`;
  cardValueText.style.textAlign = "center";
  cardValueText.style.fontSize = `${5 * pixelUnit}px`;
  cardValueText.style.userSelect = "none";
  cardValueText.style.fontWeight = "bold";

  let cardTitleText = document.createElement("p");
  buttonContainer.appendChild(cardTitleText);

  cardTitleText.innerText = `${cardSelected.title}`;
  cardTitleText.style.position = "absolute";
  cardTitleText.style.left = `${Xpos + 16 * pixelUnit}px`;
  cardTitleText.style.top = `${Ypos + 54 * pixelUnit}px`;
  cardTitleText.style.width = `${32 * pixelUnit}px`;
  cardTitleText.style.height = `${10 * pixelUnit}px`;
  cardTitleText.style.textAlign = "center";
  cardTitleText.style.verticalAlign = "middle";
  cardTitleText.style.fontSize = `${4 * pixelUnit}px`;
  cardTitleText.style.display = "table-cell";
  cardTitleText.style.userSelect = "none";
  cardTitleText.style.fontWeight = "bold";

  cardButtons.push(newButton);

  newButton.onclick = function () {
    const closeBtn = document.getElementById("closeButton");
    if (selectedBtn && selectedBtn.type === "spawnPoints") {
      return;
    }
    for (let button of cardButtons) {
      button.disabled === true ? (button.disabled = false) : null;
    }

    updateSelectedBtn({ type: cardSelected.type, value: cardSelected.value });
    renderCardDescription({
      type: cardSelected.type,
      value: cardSelected.value,
    });
    renderScreenOnce();
    updatePause(true);
    updateStatusText(pixelUnit);
    createCloseButton(newButton);
    newButton.disabled = true;
    closeBtn ? closeBtn.remove() : null;
  };
}

function createCloseButton(newButton) {
  const closeButtonSize = 32 * pixelUnit;

  let closeButton = document.createElement("button");
  newButton.appendChild(closeButton);
  closeButton.id = "closeButton";
  closeButton.classList.add("buttonsTile");
  closeButton.style.position = "absolute";
  closeButton.style.left = `${16 * pixelUnit}px`;
  closeButton.style.top = `${16 * pixelUnit}px`;
  closeButton.style.backgroundColor = "rgba(50,50,50,0.6)";
  closeButton.style.backgroundImage = `url(../assets/src/images/closeButton.png)`;
  closeButton.style.border = "none";

  closeButton.style.width = `${closeButtonSize}px`;
  closeButton.style.height = `${closeButtonSize}px`;
  closeButton.onclick = function () {
    updateSelectedBtn(undefined);
    renderCardDescription(undefined);
    closeButton.remove();
    cleanMap();
    setTimeout(() => {
      updatePause(false);
      for (let button of cardButtons) {
        button.disabled === true ? (button.disabled = false) : null;
      }
    }, 100);
  };
}

export { drawCards, createCard };

function renderCardDescription(selectedCard) {
  const cardSelected = selectedCard
    ? CARD_ELEMENTS.find((card) => {
        return card.type === selectedCard.type;
      })
    : null;
  const cardDescription = document.getElementById("cardDescription");

  cardDescription.style.left = `${gameScreen.width + marginLeft}px`;
  cardDescription.style.width = `${sideScreen.width}px`;
  cardDescription.style.height = `${tileSize * 7}px`;
  cardDescription.style.bottom = `${marginTop}px`;

  if (!selectedBtn || !selectedBtn.type) {
    cardDescription.innerHTML = "";
    return;
  }

  const ValueColor =
  selectedBtn.value <= tileMap.players[0].stats.soulResource ? "black" : "red";

  cardDescription.innerHTML = `<span id="cardValue" style="color:${ValueColor}">${cardSelected.value}</span>
  <h1>${cardSelected.title}</h1>
  <p>Cost: ${cardSelected.value}</br>Description: ${cardSelected.description}</p>`;

  cardDescription.appendChild(ASSETS[cardSelected.type])
  const numberVsMax = document.createElement("p");
  cardDescription.appendChild(numberVsMax);

  const cardValue = document.getElementById("cardValue")
  cardValue.style.position = "absolute"
  cardValue.style.fontSize = `${20 * pixelUnit}px`;
  cardValue.style.marginTop = `${3 * pixelUnit}px`;
  cardValue.style.width = `${tileSize*2}px`
  cardValue.style.height = `${tileSize}px`
  cardValue.style.display = "flex";
  cardValue.style.alignItems = "center";
  cardValue.style.justifyContent = "center";


  const NumberColor =
    getNumberOfElement(cardSelected) < cardSelected.maximum ? "black" : "red";

  numberVsMax.innerHTML = `<span style="color:${NumberColor}">${getNumberOfElement(
    cardSelected
  )}</span>/${cardSelected.maximum}`;
  numberVsMax.style.position = "absolute";
  numberVsMax.style.fontSize = `${16 * pixelUnit}px`;
  numberVsMax.style.height = `${tileSize}px`;
  numberVsMax.style.right = `${tileSize + 3 * pixelUnit}px`;
  numberVsMax.style.top = `${0}px`;
  numberVsMax.style.display = "flex";
  numberVsMax.style.alignItems = "center";

  const h1Tag = cardDescription.querySelector("h1");
  if (h1Tag) {
    h1Tag.style.color = "rgba(50,50,50, 1)";
    h1Tag.style.lineHeight = `${tileSize * 1.25}px`;
    h1Tag.style.fontSize = `${24 * pixelUnit}px`;
    h1Tag.style.paddingLeft = `${tileSize*2}px`;
    h1Tag.style.backgroundColor = "white";
    h1Tag.style.height = `${tileSize}px`;
  }
  const pTag = cardDescription.querySelector("p");
  if (pTag) {
    pTag.style.color = "white";
    pTag.style.margin = `${tileSize / 2}px`;
    pTag.style.lineHeight = `${tileSize / 2}px`;
    pTag.style.fontSize = `${10 * pixelUnit}px`;
  }
  const imgTag = cardDescription.querySelector("img");
  if (imgTag) {
    imgTag.style.position = "absolute";
    imgTag.style.right = `0px`;
    imgTag.style.top = `0px`;
    imgTag.style.width = `${tileSize}px`;
  }
}

export { renderCardDescription };

export function gameOverScreen(level) {
  const gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.classList.remove("disable");

  const gameOverScreenText = document.createElement("p");
  gameOverScreen.appendChild(gameOverScreenText);
  gameOverScreenText.id = "gameOverScreenText";
  gameOverScreenText.innerText = `Level Reached : ${level}`;
  gameOverScreenText.style.fontSize = `${tileSize * 1.5}px`;
  gameOverScreenText.style.display = "flex";

  const resetButton = document.getElementById("resetButton");
  resetButton.style.height = `${tileSize}px`;
  resetButton.style.width = `${tileSize * 6}px`;

  resetButton.style.top = `${marginTop + tileSize * 9}px`;
  resetButton.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;
  resetButton.style.fontSize = `${tileSize * 0.55}px`;
  resetButton.style.padding = `${9.5 * pixelUnit}px`;

  resetButton.onclick = () => {
    const clicAudio = ASSETS["clic"];
    clicAudio.play();
    startGame();
    setTimeout(() => {
      gameOverScreen.classList.add("disable");
      gameOverScreenText.remove();
    }, 100);
  };
}

const screenRatio = 2 / 3;
let marginTop = 0;
let marginLeft = 0;

function screenInit(canvasScreen) {
  const screenWidth = innerWidth;
  const screenHeight = innerHeight;
  canvasScreen.width = innerWidth;
  tileMap.tileSize = (canvasScreen.width * screenRatio) / mapSizeX;
  let tileSize = tileMap.tileSize;
  canvasScreen.height = mapSizeY * tileSize;

  if (canvasScreen.height > screenHeight) {
    canvasScreen.height = screenHeight;
    tileMap.tileSize = canvasScreen.height / mapSizeY;
    tileSize = tileMap.tileSize;
    canvasScreen.width = mapSizeX * tileSize + (mapSizeX * tileSize) / 2;
    marginLeft = (screenWidth - canvasScreen.width) / 2;
  }
  marginTop = screenHeight / 2 - canvasScreen.height / 2;

  canvasScreen.style.marginTop = `${marginTop}px`;
  canvasScreen.style.marginLeft = `${marginLeft}px`;

  const gameScreen = {
    width: mapSizeX * tileSize,
    height: mapSizeY * tileSize,
  };

  const sideScreen = {
    width: canvasScreen.width - gameScreen.width,
    height: canvasScreen.height,
  };

  const levelUpScreen = document.getElementById("levelUpScreen");
  levelUpScreen.style.height = `${gameScreen.height}px`;
  levelUpScreen.style.width = `${gameScreen.width + sideScreen.width}px`;
  levelUpScreen.style.top = `${marginTop}px`;
  levelUpScreen.style.left = `${marginLeft}px`;

  const pixelUnit = tileSize / 32;

  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.style.left = `${gameScreen.width + marginLeft}px`;
  buttonContainer.style.width = `${sideScreen.width}px`;
  buttonContainer.style.top = `${tileSize * 3 + marginTop}px`;

  const mainMenu = document.getElementById("mainMenu");
  const mainMenuP = mainMenu.querySelector("p");
  mainMenuP.style.fontSize = `${14 * pixelUnit}px`;
  mainMenuP.style.lineHeight = `${24 * pixelUnit}px`;

  const mainMenuImg = mainMenu.querySelector("img");
  mainMenuImg.style.height = `${tileSize * 5}px`;
  mainMenuImg.style.top = `${marginTop + tileSize * 2}px`;
  mainMenuImg.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 2.5
  }px`;

  const startBtn = document.getElementById("startBtn");
  startBtn.style.height = `${tileSize * 2}px`;
  startBtn.style.width = `${tileSize * 6}px`;
  startBtn.style.fontSize = `${tileSize * 0.65}px`;

  startBtn.style.top = `${marginTop + tileSize * 8}px`;
  startBtn.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;

  const startBtnAsGod = document.getElementById("startBtnAsGod");
  startBtnAsGod.style.height = `${tileSize}px`;
  startBtnAsGod.style.width = `${tileSize * 6}px`;
  startBtnAsGod.style.fontSize = `${tileSize * 0.55}px`;

  startBtnAsGod.style.top = `${marginTop + tileSize * 10.5}px`;
  startBtnAsGod.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;
  startBtnAsGod.style.padding = `${9.5 * pixelUnit}px`;

  mainMenuCanvas.width = gameScreen.width + sideScreen.width;
  mainMenuCanvas.height = gameScreen.height;
  mainMenuCanvas.style.top = `${marginTop}px`;
  mainMenuCanvas.style.left = `${marginLeft}px`;
}

function drawSideScreenBackground(ctx, screen, sideScreen) {
  ctx.save();
  ctx.fillStyle = "rgba(50,50,50, 1)";
  ctx.fillRect(screen.width, 0, sideScreen.width, sideScreen.height);
  ctx.restore();
}

const stars = [];

function drawBackGameBackground(ctx, screen, isMainMenu = false) {
  const maxStars = 200;

  const mainMenuStars = [];
  let starsArray;
  starsArray = isMainMenu ? mainMenuStars : stars;
  ctx.save();
  ctx.fillStyle = "rgba(10, 10, 10, 1)";
  ctx.fillRect(0, 0, screen.width, screen.height);
  ctx.restore();
  if (stars.length < maxStars) {
    for (let i = 0; i < maxStars; i++) {
      generateStars(starsArray, screen);
    }
  }
  drawStars(ctx, starsArray);
}

function generateStars(starsArray, screen) {
  const xStar = Math.random() * screen.width;
  const yStar = Math.random() * screen.height;
  const starSize = Math.random() * 4 * pixelUnit;
  const brightness = Math.random() * (0.5 - 0.1) + 0.1;

  starsArray.push({
    xStar: xStar,
    yStar: yStar,
    starSize: starSize,
    brightness: brightness,
  });
}

function drawStars(ctx, starsArray) {
  for (let star = 0; star < starsArray.length; star++) {
    ctx.save();
    ctx.fillStyle = `rgba(250, 250, 250, ${starsArray[star].brightness})`;
    ctx.fillRect(
      starsArray[star].xStar,
      starsArray[star].yStar,
      starsArray[star].starSize,
      starsArray[star].starSize
    );
    ctx.restore();
  }
}

export {
  screenInit,
  drawSideScreenBackground,
  drawBackGameBackground,
  marginTop,
  marginLeft,
};























let isPause = true;
function inversePause() {
  isPause = !isPause;
  updateStatusText(pixelUnit);
}

function updatePause(bool) {
  isPause = bool;
}

export { isPause, inversePause, updatePause };

// Declare & export arrays used to store game elements

let monsters;
let damageTexts;
let particles = [];

export { monsters, particles, damageTexts };

// Declare & export the canvas variables used to draw on.

const canvasScreen = document.getElementById("canvasScreen");
const ctxScreen = canvasScreen.getContext("2d");

const mainMenuCanvas = document.getElementById("mainMenuCanvas");
const ctxmainMenuCanvas = canvasScreen.getContext("2d");

ctxScreen.imageSmoothingEnabled = false;

export { ctxScreen, canvasScreen, mainMenuCanvas, ctxmainMenuCanvas };
// Create and initialize the game screen and map

const tileMap = new TileMap();
loadAssets(canvasScreen);

const beforeInit = document.getElementById("beforeInit");
beforeInit.classList.add("disable");

// Declare & export the variable use to uniformization of any sprite
// The tileSize is use to calibrate screen size and elements size

const tileSize = tileMap.tileSize;
document.documentElement.style.setProperty("--tileSize", tileSize + "px");
const pixelUnit = tileSize / 32;
const gameScreen = {
  width: mapSizeX * tileSize,
  height: mapSizeY * tileSize,
};

const sideScreen = {
  width: canvasScreen.width - gameScreen.width,
  height: canvasScreen.height,
};

export { tileMap, tileSize, pixelUnit, gameScreen, sideScreen };

// As this method need the tileSize variable it must be execute after its declaration

drawBackGameBackground(ctxmainMenuCanvas, mainMenuCanvas, true);

// Declare the variable containing the main menu is order to hide it

const mainMenu = document.getElementById("mainMenu");

// Handle click on start game button

document.getElementById("startBtn").addEventListener("click", () => {
  const clicAudio = ASSETS["clic"];
  clicAudio.play();
  startGame();
});

let isGod = false;
document.getElementById("startBtnAsGod").addEventListener("click", () => {
  isGod = true;
  const clicAudio = ASSETS["clic"];
  clicAudio.play();
  startGame();
});

// Method used to initialize the variable to start the game with clean values

function init() {
  resetBonus();
  resetTileCards();
  tileMap.init();
  levelUp = true;
  monsters = [];
  damageTexts = [];
  particles = [];
}

// Method used to start the game after clicking on the start game button

export function startGame() {
  init();
  isPause = false;
  drawCardsDeck();
  createActionButton(pixelUnit);
  mainMenu.classList.add("disable");
  mainMenuCanvas.classList.add("disable");
  animate();
}

// Declare elements used to maintain stable speed for the animation

let lastFrameTimeMs = 0; // The last time the loop was run
let lastFrameBeforePause = 0;
let maxFPS = 90; // The maximum FPS we want to allow
let deltaFactor = 10;
let delta = 0;
let pauseDelta = 0;
let levelUp = true;

function inverseLeveUp() {
  levelUp = !levelUp;
  updateStatusText(pixelUnit);
}

let selectedBtn;

function updateSelectedBtn(btn) {
  selectedBtn = btn;
}

export { delta, pauseDelta, inverseLeveUp };

const mainLoop = ASSETS["mainLoop"];
let musicPause = false;

// Game Loop method use to create the animation

function animate(timestamp) {
  if (musicPause) {
    mainLoop.pause();
  } else {
    mainLoop.play();
  }
  if (isPause) {
    pauseDelta = timestamp - lastFrameBeforePause;
    lastFrameTimeMs = timestamp;
    requestAnimationFrame(animate);
    return;
  }
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    requestAnimationFrame(animate);
    return;
  }

  delta = (timestamp - lastFrameTimeMs) / deltaFactor; // get the delta time since last frame

  lastFrameTimeMs = timestamp;
  lastFrameBeforePause = timestamp;
  ctxScreen.clearRect(0, 0, canvasScreen.width, canvasScreen.height);

  drawBackGameBackground(ctxScreen, gameScreen);

  tileMap.draw(ctxScreen); // draw the map
  const mainPlayer = tileMap.players[0];
  isGod ? (mainPlayer.stats.soulResource = 9999) : null;
  isGod ? (mainPlayer.maxHp = 9999) : null;
  isGod ? (mainPlayer.stats.hp = 9999) : null;
  spawnMonsters(); // method that handle any spawning monsters
  if (levelUp) {
    isPause = true;
    updateStatusText(pixelUnit);
    levelUpScreen(levelUp);
  }

  // Delete particles when too small

  particles.forEach((particle, index) => {
    particle.update(ctxScreen);
    if (particle.radius < 0) {
      particles.splice(index, 1);
    }
  });

  for (let i = 0; i < tileMap.spawnPoints.length; i++) {
    const spawnPoint = tileMap.spawnPoints[i];
    spawnPoint.update(ctxScreen);
  }
  // Loop on all monsters to update / draw it

  monsters.forEach((monster, index) => {
    drawLifeBar(ctxScreen, monster);

    // When a monster has no possibility to move, it is transformed into bomb
    if (!monster.path || monster.path.length === 0) {
      monster.findingPath();
      monsters.push(
        new Monster(
          monster.x - tileSize / 2,
          monster.y - tileSize / 2,
          tileSize,
          "bombMonster",
          "air"
        )
      );
      monsters.splice(index, 1);
    }

    monster.update(ctxScreen);

    // Touch player

    const distance = Math.hypot(
      mainPlayer.x - monster.x,
      mainPlayer.y - monster.y
    );
    if (distance - monster.hitBox < 1) {
      mainPlayer.takingDamage(monster.stats.force);
      monster.stats.hp = 0;
    }

    // Handle the death for monsters when hp === 0

    if (monster.stats.hp <= 0) {
      for (let i = 0; i < 20; i++) {
        particles.push(
          new Particle(monster.x, monster.y, Math.random() * 2 * pixelUnit, {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
          })
        );
      }

      // Remove the monster from the array
      monsters = monsters.filter((item) => {
        return item !== monster;
      });
    }
  });

  // Loop on the damage text array to delete when needed

  damageTexts.forEach((damageText, damageTextIndex) => {
    damageText.draw(ctxScreen);
    if (damageText.hue <= 0) {
      damageTexts.splice(damageTextIndex, 1);
    }
  });

  for (let i = 0; i < tileMap.stars.length; i++) {
    const star = tileMap.stars[i];
    star.update(ctxScreen);
  }

  for (let i = 0; i < tileMap.villages.length; i++) {
    const village = tileMap.villages[i];
    village.update(ctxScreen);
  }

  for (let i = 0; i < tileMap.trees.length; i++) {
    const tree = tileMap.trees[i];
    tree.update(ctxScreen);
  }

  for (let i = 0; i < thunders.length; i++) {
    const thunder = thunders[i];
    thunder.update(ctxScreen);
    if (thunder.radius >= thunder.maxRadius) {
      thunders.splice(i, 1);
    }
  }

  for (let i = 0; i < tileMap.towers.length; i++) {
    const tower = tileMap.towers[i];
    tower.update(ctxScreen);

    tower.projectiles.forEach((projectile, projectileIndex) => {
      monsters.forEach((monster, index) => {
        const distance = Math.hypot(
          projectile.x - monster.x,
          projectile.y - monster.y
        );
        if (distance - monster.hitBox - projectile.radius < 1) {
          tower.projectiles.splice(projectileIndex, 1);
          !monster.isTakingDame ? monster.takingDamage(projectile.force) : null;
          return;
        }
      });
      projectile.update(ctxScreen);
      if (
        projectile.x + projectile.radius < 1 ||
        projectile.y + projectile.radius < 1 ||
        projectile.x - projectile.radius > gameScreen.width ||
        projectile.y - projectile.radius > gameScreen.height
      ) {
        setTimeout(() => {
          tower.projectiles.splice(projectileIndex, 1);
        });
      }
    });
  }

  drawSideScreenBackground(ctxScreen, gameScreen, sideScreen);

  tileMap.players.forEach((player, index) => {
    player.draw(ctxScreen);
    // Condition of death GAME OVER
    if (mainPlayer.stats.hp <= 0) {
      isPause = true;
      init();
      setTimeout(() => {
        gameOverScreen(mainPlayer.level);
      }, 300);
    }
    // Loop on any player's projectiles & monsters to check if it touch an monster
    player.projectiles.forEach((projectile, projectileIndex) => {
      monsters.forEach((monster, index) => {
        const distance = Math.hypot(
          projectile.x - monster.x,
          projectile.y - monster.y
        );
        if (distance - monster.hitBox - projectile.radius < 1) {
          player.projectiles.splice(projectileIndex, 1);
          !monster.isTakingDame ? monster.takingDamage(projectile.force) : null;
          return;
        }
      });
      projectile.update(ctxScreen);
      if (
        projectile.x + projectile.radius < 1 ||
        projectile.y + projectile.radius < 1 ||
        projectile.x - projectile.radius > gameScreen.width ||
        projectile.y - projectile.radius > gameScreen.height
      ) {
        setTimeout(() => {
          player.projectiles.splice(projectileIndex, 1);
        });
      }
    });
  });

  pauseDelta = 0;
  requestAnimationFrame(animate);
}

// Declare & export the button pressed in order to delete it after it was used
// Declare & export function to update this button

export { selectedBtn, updateSelectedBtn };

canvasScreen.addEventListener("click", (event) => {
  handleClick(event);
});

function cleanMap() {
  for (let row = 0; row < mapSizeY; row++) {
    for (let column = 0; column < mapSizeX; column++) {
      let tile = tileMap.map[row][column];
      if (tile === "green") {
        tileMap.map[row][column] = "0";
      }
    }
  }
}

export { cleanMap };

window.addEventListener("blur", () => {
  mainLoop.pause();
  musicPause = true;
  isPause = true;
  updateStatusText(pixelUnit);
});

window.addEventListener("focus", (event) => {
  musicPause = false;
});

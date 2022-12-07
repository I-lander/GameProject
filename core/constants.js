const CARD_ELEMENTS = [
  {
    type: "arrows",
    value: -10,
    title: "Spawn",
    description:
      "Generate a spawning point.</br>Monster will start to pop from it.</br>Posing this tile will generate 10 manas.",
  },
  {
    type: "spider",
    value: 0,
    title: "Spider",
    description: "Generate a spider monster.",
  },
  {
    type: "mountain",
    value: 5,
    title: "Mountain",
    description:
      "A natural obstacle that will block path for attacking monsters.",
  },
  {
    type: "thunder",
    value: 50,
    title: "Thunder",
    description:
      "Create a lightning that strike monsters and deals 10 damages to all monsters in its area.",
  },
  {
    type: "river",
    value: 5,
    title: "River",
    description: "The ground monster walking in it is drowned.",
  },
  {
    type: "village",
    value: 20,
    title: "Village",
    description: "Generate 3 mana every 5 seconds.",
  },
  {
    type: "tower",
    value: 30,
    title: "Tower",
    description: "A tower that will shoot on monsters.",
  },
  {
    type: "bomb",
    value: 20,
    title: "Bomb",
    description: "Destroy an element on the grid.",
  },
  {
    type: "lava",
    value: 30,
    title: "Lava",
    description: "Any monster that pass through it take damage.",
  },
  {
    type: "desert",
    value: 30,
    title: "Desert",
    description: "Any monster that pass through it are slowed down.",
  },
  {
    type: "tree",
    value: 100,
    title: "Tree",
    description: "Heal 1 HP every 5 seconds.",
  },
  {
    type: "star",
    value: 20,
    title: "Star",
    description: "Force monster to follow their path.",
  },
];

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

const FRANCHISSABLE_ELEMENTS = ["lava", "desert", "star"];

const MONTERS_STATS = [
  {
    name: "worm",
    type: "ground",
    level: 1,
    hp: 6,
    force: 1,
    attackRate: 1,
  },
  {
    name: "spider",
    type: "ground",
    level: 3,
    hp: 10,
    force: 1,
    attackRate: 1,
  },
  {
    name: "fly",
    type: "air",
    level: 5,
    hp: 12,
    force: 4,
    attackRate: 1,
  },
  {
    name: "slime",
    type: "ground",
    level: 7,
    hp: 30,
    force: 3,
    attackRate: 1,
  },
  {
    name: "bat",
    type: "air",
    level: 7,
    hp: 23,
    force: 3,
    attackRate: 1,
  },
  {
    name: "skull",
    type: "ground",
    level: 9,
    hp: 42,
    force: 10,
    attackRate: 1,
  },
  {
    name: "ghost",
    type: "air",
    level: 12,
    hp: 52,
    force: 24,
    attackRate: 1,
  },
  {
    name: "bombMonster",
    type: "air",
    level: 9999,
    hp: 150,
    force: 30,
    attackRate: 1,
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
  CARD_ELEMENTS,
  MONSTERS_LIST,
  MONTERS_STATS,
  SOLID_ELEMENTS,
  FRANCHISSABLE_ELEMENTS,
};

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
    value: 1,
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
    description:
      "Create a river path. It can block monsters.</br> The river start from the center.</br>A river Tile must be connected to the last one.",
  },
  {
    type: "village",
    value: 10,
    title: "Village",
    description: "Generate 3 mana every 5 seconds.",
  },
  {
    type: "tower",
    value: 15,
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
    value: 20,
    title: "Lava",
    description: "Any monster that pass through it take damage.",
  },
  {
    type: "desert",
    value: 15,
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

const MONSTERS_LIST = ["worm", "slime", "bat", "skull", "spider", "fly"];

// Elements that ground monster must dodge

const SOLID_ELEMENTS = [
  "mountain",
  "river",
  "tower",
  "village",
  "desert",
  "tree",
  "lava",
  "star"
];

const FRANCHISSABLE_ELEMENTS = ["lava", "desert","star"];

export { CARD_ELEMENTS, MONSTERS_LIST, SOLID_ELEMENTS, FRANCHISSABLE_ELEMENTS };

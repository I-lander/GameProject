const CARD_ELEMENTS = [
  {
    type: "arrows",
    value: -10,
    title: "Spawn Point",
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
      "Create a river path. It can block monsters.</br> The river start from the center. </br> A river Tile must be connected to the last one.",
  },
  {
    type: "village",
    value: 10,
    title: "Village",
    description: "Generate 3 mana every 5 sec.",
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
];

const MONSTERS_LIST = ["worm", "slime", "bat", "skull", "spider", "fly"];

// Elements that ground monster must dodge

const SOLID_ELEMENTS = ["mountain", "river", "tower", "village"];

export { CARD_ELEMENTS, MONSTERS_LIST, SOLID_ELEMENTS };

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

const CARD_ELEMENTS = [
  { type: "arrows", value: -10, title: "Spawn Point", description: "" },
  { type: "spider", value: 0, title: "Spider", description: "" },
  {
    type: "mountain",
    value: 1,
    title: "Mountain",
    description:
      "A natural obstacle that will block path for attacking monsters.",
  },
  { type: "thunder", value: 50, title: "Thunder", description: "" },
  { type: "river", value: 5, title: "River", description: "" },
  { type: "village", value: 10, title: "Village", description: "Generate a ressource" },
  { type: "tower", value: 15, title: "Tower", description: "" },
  { type: "bomb", value: 20, title: "Bomb", description: "Destroy an element on the grid." },
];

const MONSTERS_LIST = ["worm", "slime", "bat", "skull", "spider", "fly"];

// Elements that ground monster must dodge

const SOLID_ELEMENTS = ["mountain", "river", "tower", "village"];

export { CARD_ELEMENTS, MONSTERS_LIST, SOLID_ELEMENTS };

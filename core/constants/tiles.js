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
      value: 50,
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
  
  const FRANCHISSABLE_ELEMENTS = ["lava", "river", "desert", "star"];

  export {
    CARD_ELEMENTS,
    SOLID_ELEMENTS,
    FRANCHISSABLE_ELEMENTS,
  };
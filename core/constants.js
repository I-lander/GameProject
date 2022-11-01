const CARD_ELEMENTS = [
  { type: 'arrows', value: -10 },
  { type: 'spider', value: 0 },
  { type: 'mountain', value: 1 },
  { type: 'thunder', value: 50 },
  { type: 'river', value: 5 },
  { type: 'village', value: 10 },
  { type: 'tower', value: 15 },
];

const MONSTERS_LIST = {worm:'worm',slime:'slime',bat:'bat'}

// Elements that ground monster must dodge

const SOLID_ELEMENTS = ['mountain', 'river', 'tower', 'village'];

export { CARD_ELEMENTS, SOLID_ELEMENTS };

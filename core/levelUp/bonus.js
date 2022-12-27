const BONUS = {
  TOWER_FORCE: 0,
  TOWER_COOLDOWN: 0,
  TOWER_RANGE: 0,
  GOD_FORCE: 0,
  GOD_COOLDOWN: 0,
  GOD_RANGE: 0,
  LAVA_FORCE: 0,
  STAR_RANGE: 0,
};

export function resetBonus() {
  for (let bonus in BONUS) {
    BONUS[bonus] = 0;
  }
}

export { BONUS };

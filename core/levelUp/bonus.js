const BONUS = {
  TOWER_FORCE: 0,
  TOWER_ATTACK_RATE: 0,
  TOWER_RANGE: 0,
  GOD_FORCE: 0,
  GOD_ATTACK_RATE: 0,
  GOD_RANGE: 0,
};

export function resetBonus() {
  for (let bonus in BONUS) {
    BONUS.bonus = 0;
  }
}

export { BONUS };

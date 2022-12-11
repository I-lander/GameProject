let TOWER_FORCE = 0;
export function update_tower_force(bonus) {
  TOWER_FORCE += bonus;
  if (TOWER_FORCE < 1) {
    TOWER_FORCE = 1;
  }
}

let TOWER_ATTACK_RATE = 0;
export function update_tower_attack_rate(bonus) {
  TOWER_ATTACK_RATE += bonus;
  if (TOWER_ATTACK_RATE < 0) {
    TOWER_ATTACK_RATE = 0;
  }
}

let GOD_FORCE = 0;
export function update_god_force(bonus) {
  GOD_FORCE += bonus;
  if (GOD_FORCE < 1) {
    GOD_FORCE = 1;
  }
}

let GOD_ATTACK_RATE = 0;
export function update_god_attack_rate(bonus) {
  GOD_ATTACK_RATE += bonus;
  if (GOD_ATTACK_RATE < 0) {
    GOD_ATTACK_RATE = 0;
  }
}

export function resetBonus() {
  TOWER_FORCE = 0;
  TOWER_ATTACK_RATE = 0;
  GOD_FORCE = 0;
  GOD_ATTACK_RATE = 0;
}

export { TOWER_FORCE, TOWER_ATTACK_RATE, GOD_FORCE, GOD_ATTACK_RATE };

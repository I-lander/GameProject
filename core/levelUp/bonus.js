let TOWER_FORCE = 0;
export function update_tower_force(bonus) {
    TOWER_FORCE += bonus
    console.log(TOWER_FORCE);
}

let TOWER_ATTACK_RATE = 0;
export function update_tower_attack_rate(bonus) {
    TOWER_ATTACK_RATE += bonus
}

let GOD_FORCE = 0;
export function update_god_force(bonus) {
    GOD_FORCE += bonus
}

let GOD_ATTACK_RATE = 0;
export function update_god_attack_rate(bonus) {
    GOD_ATTACK_RATE += bonus
}


export { TOWER_FORCE, TOWER_ATTACK_RATE, GOD_FORCE, GOD_ATTACK_RATE };

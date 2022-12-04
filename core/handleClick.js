import { cleanMap, selectedBtn, tileMap, inversePause, updateSelectedBtn, monsters, particles, pixelUnit } from "../app.js";
import { bombMecanics } from "../level/element/bomb.js";
import { Thunder } from "../player/thunder.js";
import { Particle } from "../player/visualEffects.js";
import { marginLeft, marginTop } from "../UI/ScreenInit.js";
import { CARD_ELEMENTS, SOLID_ELEMENTS } from "./constants.js";

export const thunders = [];

export function handleClick(event) {
  if (selectedBtn) {
    CARD_ELEMENTS.some((card) => card.type === selectedBtn.type);
  }
  const xZero = marginLeft;
  const yZero = marginTop;
  const x = event.x - xZero;
  const y = event.y - yZero;
  const clickPositionInGrid = tileMap.getPosition(x, y);
  if (
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] === "green" &&
    CARD_ELEMENTS.some((card) => card.type === selectedBtn.type)
  ) {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] =
      selectedBtn.type;
    tileMap.players[0].stats.manaRessource -= parseInt(selectedBtn.value);

    cleanMap();
    updateSelectedBtn(undefined);
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.remove();
    }
    monsters.forEach((monster) => {
      monster.findingPath();
    });
    inversePause();
  }
  if (selectedBtn && selectedBtn.type === "thunder") {
    const thunder = new Thunder(x, y);
    thunders.push(thunder);
    tileMap.players[0].stats.manaRessource -= parseInt(selectedBtn.value);
    updateSelectedBtn(undefined);
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.remove();
    }
    inversePause();
  }

  if (
    selectedBtn &&
    selectedBtn.type === "bomb" &&
    SOLID_ELEMENTS.includes(
      tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x]
    )
  ) {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] =
      selectedBtn.type;
    bombMecanics(clickPositionInGrid);
    updateSelectedBtn(undefined)
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.remove();
    }
    inversePause();
    for (let i = 0; i < 40; i++) {
      particles.push(
        new Particle(x, y, Math.random() * 2 * pixelUnit, {
          x: Math.random() - 0.5,
          y: Math.random() - 0.5,
        })
      );
    }
  }
}

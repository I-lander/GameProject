import {
  cleanMap,
  selectedBtn,
  tileMap,
  inversePause,
  updateSelectedBtn,
  monsters,
  particles,
  pixelUnit,
} from "../app.js";
import { bombMecanics } from "../level/element/bomb.js";
import { Thunder } from "../player/thunder.js";
import { Particle } from "../player/visualEffects.js";
import { cardButtons } from "../UI/card-creation.js";
import { renderCardDescription } from "../UI/card-description.js";
import { marginLeft, marginTop } from "../UI/ScreenInit.js";
import { CARD_ELEMENTS, SOLID_ELEMENTS } from "./constants/tiles.js";
import { getNumberOfElement } from "./utils.js";

export const thunders = [];

export function handleClick(event) {
  if (selectedBtn) {
    CARD_ELEMENTS.some((card) => card.type === selectedBtn.type);
  }
  const cardSelected = selectedBtn
    ? CARD_ELEMENTS.find((card) => {
        return card.type === selectedBtn.type;
      })
    : null;

    console.log(getNumberOfElement(cardSelected) , cardSelected.maximum);
  const xZero = marginLeft;
  const yZero = marginTop;
  const x = event.x - xZero;
  const y = event.y - yZero;
  const clickPositionInGrid = tileMap.getPosition(x, y);
  if (
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] === "green" &&
    CARD_ELEMENTS.some((card) => card.type === selectedBtn.type) &&
    selectedBtn.value <= tileMap.players[0].stats.soulResource &&
    tileMap.players[0].stats.soulResource >= 0 &&
    getNumberOfElement(cardSelected) < cardSelected.maximum
  ) {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] =
      selectedBtn.type;
    tileMap.players[0].stats.soulResource -= parseInt(selectedBtn.value);

    cleanMap();
    updateSelectedBtn(undefined);
    renderCardDescription(selectedBtn);
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.remove();
    }
    monsters.forEach((monster) => {
      monster.findingPath();
    });
    const addTileAudio = new Audio("./src/sounds/addTile.wav");
    addTileAudio.volume = 0.5;
    addTileAudio.play();
    inversePause();
    for (let button of cardButtons) {
      button.disabled === true ? (button.disabled = false) : null;
    }
  }
  if (
    selectedBtn &&
    selectedBtn.type === "thunder" &&
    selectedBtn.value <= tileMap.players[0].stats.soulResource &&
    tileMap.players[0].stats.soulResource >= 0
  ) {
    const thunder = new Thunder(x, y);
    thunders.push(thunder);
    const thunderStrike = new Audio("./src/sounds/thunderStrike.wav");
    thunderStrike.volume = 0.2;
    thunderStrike.play();
    tileMap.players[0].stats.soulResource -= parseInt(selectedBtn.value);
    updateSelectedBtn(undefined);
    renderCardDescription(selectedBtn);
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.remove();
    }
    inversePause();
    for (let button of cardButtons) {
      button.disabled === true ? (button.disabled = false) : null;
    }
  }

  if (
    selectedBtn &&
    selectedBtn.type === "bomb" &&
    SOLID_ELEMENTS.includes(
      tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x]
    ) &&
    selectedBtn.value <= tileMap.players[0].stats.soulResource &&
    tileMap.players[0].stats.soulResource >= 0
  ) {
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] =
      selectedBtn.type;
    bombMecanics(clickPositionInGrid);
    updateSelectedBtn(undefined);
    renderCardDescription(selectedBtn);
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.remove();
    }
    inversePause();
    for (let button of cardButtons) {
      button.disabled === true ? (button.disabled = false) : null;
    }
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

import {
  cleanMap,
  selectedBtn,
  tileMap,
  inversePause,
  updateSelectedBtn,
  monsters,
  particles,
  pixelUnit,
  lowResources,
  emptyLowResourcesArray,
  gameScreen,
} from "../app.js";
import { bombMecanics } from "../level/element/bomb.js";
import { Thunder } from "../player/thunder.js";
import { Particle } from "../player/visualEffects.js";
import { cardButtons } from "../UI/card-creation.js";
import { renderCardDescription } from "../UI/card-description.js";
import { marginLeft, marginTop } from "../UI/ScreenInit.js";
import { CARD_ELEMENTS, SOLID_ELEMENTS } from "./constants/tiles.js";
import { ASSETS } from "./loadAssets.js";
import { LowResource } from "./lowResource.js";
import { getNumberOfElement, playSound } from "./utils.js";

export const thunders = [];

export function handleClick(event) {
  if(event.x > gameScreen.width){
    return
  }
  if (selectedBtn) {
    CARD_ELEMENTS.some((card) => card.type === selectedBtn.type);
  }
  const cardSelected = selectedBtn
    ? CARD_ELEMENTS.find((card) => {
        return card.type === selectedBtn.type;
      })
    : null;

  const xZero = marginLeft;
  const yZero = marginTop;
  const x = event.x - xZero;
  const y = event.y - yZero;
  const clickPositionInGrid = tileMap.getPosition(x, y);
  if (selectedBtn.value > tileMap.players[0].stats.soulResource) {
     lowResources.push(new LowResource()) 
    return;
  }
  if (
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] === "green" &&
    CARD_ELEMENTS.some((card) => card.type === selectedBtn.type)
    // &&
    // getNumberOfElement(cardSelected) < cardSelected.maximum
  ) {
    emptyLowResourcesArray()
    tileMap.map[clickPositionInGrid.y][clickPositionInGrid.x] =
      selectedBtn.type;
    tileMap.players[0].stats.soulResource -= parseInt(selectedBtn.value);
    tileMap.players[0].updateHp(true)
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
    playSound("addTile");

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
    playSound("thunderStrike");
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
    tileMap.players[0].updateHp(true)
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

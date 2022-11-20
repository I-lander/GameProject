import { monsters, tileMap } from "../../app.js";

function bombMecanics(bombPos) {
  for (let i = 0; i < tileMap.deletableElements.length; i++) {
    deleteFromElementArray(tileMap.deletableElements[i], bombPos);
  }
}

function deleteFromElementArray(elementArray, bombPos) {
  for (let i = 0; i < elementArray.length; i++) {
    const element = elementArray[i];
    if (element.type === "star") {
      for (let i = 0; i < monsters.length; i++) {
        let monster = monsters[i];
        monster.findingPath();
      }
    }
    if (element.position.x === bombPos.x && element.position.y === bombPos.y) {
      elementArray.splice(i, 1);
    }
  }
}

export { bombMecanics };

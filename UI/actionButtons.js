import { inversePause } from "../app.js";
import { updateSpeedFactore } from "../core/utils.js";

export function createActionButton() {
  const pauseButton = document.getElementById("pause");
  pauseButton.onclick = function () {
    inversePause()
  };

  const playButton = document.getElementById("play");
  playButton.onclick = function () {
    updateSpeedFactore(1)
  };

  const fastForwardButton = document.getElementById("fastForward");
  fastForwardButton.onclick = function () {
    updateSpeedFactore(2)
  };
}

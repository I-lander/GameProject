import { inversePause, isPause, pixelUnit, selectedBtn } from "../app.js";
import { speedFactor, updateSpeedFactore } from "../core/utils.js";

export function createActionButton(pixelUnit) {
  const actionStatus = window.document.getElementById("actionStatus");
  actionStatus.innerHTML = `<span style=font-size:${5 * pixelUnit}px>x</span>1`;
  actionStatus.style.fontSize = `${8 * pixelUnit}px`;

  const pauseButton = document.getElementById("pause");
  pauseButton.onclick = function () {
    if (!selectedBtn) {
      inversePause();
    }
    updateStatusText(pixelUnit);
  };

  const playButton = document.getElementById("play");
  playButton.onclick = function () {
    if (isPause && !selectedBtn) {
      inversePause();
    }
    if (!selectedBtn) {
      updateSpeedFactore(1);
      updateStatusText(pixelUnit);
    }
  };

  const fastForwardButton = document.getElementById("fastForward");
  fastForwardButton.onclick = function () {
    if (isPause && !selectedBtn) {
      inversePause();
    }
    if (!selectedBtn) {
      updateSpeedFactore(2);
      updateStatusText(pixelUnit);
    }
  };
}

export function updateStatusText(pixelUnit) {
  const actionStatus = window.document.getElementById("actionStatus");
  speedFactor === 1
    ? (actionStatus.innerHTML = `<span style=font-size:${
        5 * pixelUnit
      }px>x</span>1`)
    : null;
  speedFactor === 2
    ? (actionStatus.innerHTML = `<span style=font-size:${
        5 * pixelUnit
      }px>x</span>2`)
    : null;
  isPause ? (actionStatus.innerText = "pause") : null;
}

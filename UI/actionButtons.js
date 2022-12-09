import { inversePause, isPause, tileSize, selectedBtn } from "../app.js";
import { speedFactor, updateSpeedFactore } from "../core/utils.js";
import { marginLeft, marginTop } from "./ScreenInit.js";

export function createActionButton(pixelUnit) {
  const actionStatus = window.document.getElementById("actionStatus");
  actionStatus.classList.remove("disable")
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

  const actionButtons = document.getElementById("actionButtons");
  actionButtons.classList.remove("disable")
  actionButtons.style.height = `${tileSize}px`;
  actionButtons.style.width = `${tileSize * 3}px`;
  actionButtons.style.top = `${tileSize + marginTop}px`;
  actionButtons.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 3.5 - 2 * pixelUnit)
  }px`;

  const pause = document.getElementById("pause");
  pause.style.height = `${tileSize}px`;
  pause.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 3.5 - 2 * pixelUnit)
  }px`;

  const play = document.getElementById("play");
  play.style.height = `${tileSize}px`;
  play.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 2.5 - 2 * pixelUnit)
  }px`;

  const fastForward = document.getElementById("fastForward");
  fastForward.style.height = `${tileSize}px`;
  fastForward.style.left = `${
    marginLeft + canvasScreen.width - (tileSize * 1.5 - 2 * pixelUnit)
  }px`;

  actionStatus.style.top = `${tileSize * 2 + marginTop}px`;
  actionStatus.style.left = `${
    marginLeft + canvasScreen.width - tileSize * 3.5
  }px`;
  actionStatus.style.width = `${tileSize * 3}px`;
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

import { canvasScreen, delta, gameScreen, pixelUnit, tileSize } from "../app.js";
import { marginLeft, marginTop } from "../UI/ScreenInit.js";

export class LowResource {
  constructor() {
    this.width = gameScreen.width
    this.x = marginLeft + canvasScreen.width / 2 - this.width/2;
    this.y = marginTop + tileSize * 5;
    this.opacity = 1;
    this.text = "Not enought resources";
  }


  update() {
    const previousText = document.getElementById("lowResource")
    previousText ? previousText.remove() : null

    const text = document.createElement("p");
    text.id = "lowResource"
    text.classList.add("lowResource")
    const gameScreen = document.getElementById("gameScreen");
    gameScreen.appendChild(text);
    text.innerHTML = this.text;
    text.style.position = "absolute";
    text.style.width = `${this.width}px`;
    text.style.height = `${tileSize}px`;
    text.style.fontSize = `${tileSize*3/4}px`;
    text.style.color = `rgba(230,85,85,${this.opacity})`;
    text.style.backgroundColor = `rgba(0,0,0,${this.opacity})`;
    text.style.top = `${this.y}px`;

    this.opacity -= 0.01;
    this.y -= 0.5 * pixelUnit * delta
  }
}

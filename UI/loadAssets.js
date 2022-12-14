export function loadAssets() {
    const assets = []
    assets.push(new Audio("./src/sounds/shoot.wav"));
    assets.push(new Audio("./src/sounds/clic.wav"));
    assets.push(new Audio("./src/sounds/damage.wav"));
    const pauseButtonClicked = new Image
    pauseButtonClicked.src = "./src/images/pauseButton-clicked.png"
    const bullet = new Image
    bullet.src = "./src/images/bullet.png"
    assets.push(pauseButtonClicked)
    assets.push(bullet)
}
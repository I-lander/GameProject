export function loadAssets() {
    const assets = []
    // sounds
    assets.push(new Audio("./src/sounds/shoot.wav"));
    assets.push(new Audio("./src/sounds/clic.wav"));
    assets.push(new Audio("./src/sounds/damage.wav"));
    assets.push(new Audio("./src/sounds/godDame.wav"));
    assets.push(new Audio("./src/sounds/addTile.wav"));

    // images
    const pauseButtonClicked = new Image
    pauseButtonClicked.src = "./src/images/pauseButton-clicked.png"
    const playButtonClicked = new Image
    playButtonClicked.src = "./src/images/playButton-clicked.png"
    const fastForwardButtonClicked = new Image
    fastForwardButtonClicked.src = "./src/images/fastForwardButton-clicked.png"
    const bullet = new Image
    bullet.src = "./src/images/bullet.png"
    assets.push(pauseButtonClicked)
    assets.push(playButtonClicked)
    assets.push(fastForwardButtonClicked)
    assets.push(bullet)
}
export function loadAssets() {
    const assets = []
    // sounds
    const test = new Audio("./src/sounds/shoot.wav")
    assets.push(new Audio("./src/sounds/shoot.wav"));
    assets.push(new Audio("./src/sounds/clic.wav"));
    assets.push(new Audio("./src/sounds/damage.wav"));
    assets.push(new Audio("./src/sounds/godDamage.wav"));
    assets.push(new Audio("./src/sounds/addTile.wav"));
    assets.push(new Audio("./src/sounds/resourcePoping.wav"));
    assets.push(new Audio("./src/sounds/thunderStrike.wav"));

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
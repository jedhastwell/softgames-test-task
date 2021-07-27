import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { loadAssets } from './assets'

import * as sizeUtils from './utils/utils'
import { GameController } from './GameController'
import { MenuScene } from './scenes/MenuScene'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const main = async () => {
  const app = new PIXI.Application()

  // Stop shared ticker.
  app.ticker.stop()

  // Use gsap as for game loop.
  gsap.ticker.add(() => {
    app.ticker.update()
  })

  // Load assets.
  await loadAssets()

  // Add view to page.
  document.body.appendChild(app.view)

  // Init game controller and initial scene.
  const gameController = new GameController(app)
  gameController.setScene(new MenuScene(gameController))

  // Resize logic for running full screen with minimum dimenions.
  const resize = () => {
    const targetSize = { width: 800, height: 600 }
    const windowSize = { width: window.innerWidth, height: window.innerHeight }
    // Calculate size for renderer.
    const gameSize = sizeUtils.calculateViewSize(targetSize, windowSize)

    // Resize Pixi renderer.
    app.renderer.resize(gameSize.width, gameSize.height)

    // Adjust canvas to fill screen.
    app.view.style.width = `${windowSize.width}px`
    app.view.style.height = `${windowSize.height}px`

    // Alert the game controller of the new size, to pass along to the current scene.
    gameController.onResize(gameSize.width, gameSize.height)
  }

  window.addEventListener('resize', resize)
  resize()
}

main()

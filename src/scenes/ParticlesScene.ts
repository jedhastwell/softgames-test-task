import { GameController } from '../GameController'
import { DemoBaseScene } from './DemoBaseScene'
import { Emitter } from 'pixi-particles'
import emitterConfig from '../assets/json/emitter.json'
import { Texture } from '@pixi/core'
import { Container, IDestroyOptions } from '@pixi/display'
import { Text, TextStyle } from '@pixi/text'
import { Sprite } from '@pixi/sprite'

export class ParticlesScene extends DemoBaseScene {
  statsLabel: Text
  container: Container
  emitter: Emitter
  background: Sprite

  constructor(gameController: GameController) {
    super(gameController)

    // Add black background
    this.background = Sprite.from('black')
    this.addChildAt(this.background, 0)

    // Label for displaying statistics.
    this.statsLabel = new Text(
      'Particles: 0',
      new TextStyle({
        fontFamily: 'Arial',
        fontSize: 26,
        fill: '#ffffff',
      }),
    )
    this.statsLabel.anchor.set(0, 0)
    this.statsLabel.position.set(20, 20)
    this.addChild(this.statsLabel)

    // Container for positioning particles.
    this.container = new Container()
    this.addChild(this.container)

    // Add the emitter.
    this.emitter = new Emitter(this.container, Texture.from('particle'), emitterConfig)

    // Call update every frame.
    this.gameController.app.ticker.add(this.update, this)

    // Trigger initial layout.
    this.onResize(gameController.app.view.width, gameController.app.view.height)
  }

  update(delta: number): void {
    this.emitter.update(delta / 60)
    const fps = this.gameController.app.ticker.FPS
    this.statsLabel.text = `Particles: ${this.emitter.particleCount}, FPS: ${fps.toFixed(2)}`
  }

  destroy(options?: boolean | IDestroyOptions): void {
    this.gameController.app.ticker.remove(this.update, this)
    super.destroy(options)
  }

  onResize(width: number, height: number): void {
    super.onResize(width, height)
    this.background.width = width
    this.background.height = height
    this.container.x = width / 2
    this.container.y = height / 2
  }
}

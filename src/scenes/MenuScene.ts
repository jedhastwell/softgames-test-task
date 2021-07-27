import { Sprite } from '@pixi/sprite'
import { Text, TextStyle } from '@pixi/text'
import { GameController } from '../GameController'
import { CardStackScene } from './CardStackScene'
import { MixedTextScene } from './MixedTextScene'
import { ParticlesScene } from './ParticlesScene'
import { Scene } from './Scene'

export class MenuScene extends Scene {
  buttons: Sprite[]

  constructor(gameController: GameController) {
    super(gameController)

    this.buttons = []

    this.addButton('Card Stack', () => {
      this.gameController.setScene(new CardStackScene(gameController))
    })
    this.addButton('Mixed Text', () => {
      this.gameController.setScene(new MixedTextScene(gameController))
    })
    this.addButton('Particles', () => {
      this.gameController.setScene(new ParticlesScene(gameController))
    })

    this.onResize(gameController.app.view.width, gameController.app.view.height)
  }

  addButton(text: string, onClick: () => void): Sprite {
    const button = Sprite.from('button')
    button.anchor.set(0.5)
    button.interactive = true
    button.on('pointerdown', onClick)

    const label = new Text(
      text,
      new TextStyle({
        fontFamily: 'Arial',
        fontSize: 46,
        fontWeight: 'bold',
        fill: '#ffffff',
      }),
    )
    label.anchor.set(0.5)
    button.addChild(label)

    this.addChild(button)
    this.buttons.push(button)

    return button
  }

  onResize(width: number, height: number): void {
    const { buttons } = this
    buttons.forEach((button, i) => {
      button.y = height / 2 - (buttons.length / 2 - i) * 90 + 45
      button.x = width / 2
    })
  }
}

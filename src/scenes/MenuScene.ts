import { Sprite } from '@pixi/sprite'
import { GameController } from '../GameController'
import { Scene } from './Scene'

export class MenuScene extends Scene {
  demoSprite: Sprite

  constructor(gameController: GameController) {
    super(gameController)

    const sprite = (this.demoSprite = Sprite.from('logo'))
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    this.addChild(sprite)

    this.onResize(gameController.app.view.width, gameController.app.view.height)
  }

  onResize(width: number, height: number): void {
    const { demoSprite } = this
    demoSprite.x = width / 2
    demoSprite.y = height / 2
  }
}

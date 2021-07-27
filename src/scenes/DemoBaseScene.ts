import { Sprite } from '@pixi/sprite'
import { GameController } from '../GameController'
import { MenuScene } from './MenuScene'
import { Scene } from './Scene'

export class DemoBaseScene extends Scene {
  backButton: Sprite

  constructor(gameController: GameController) {
    super(gameController)

    const backButton = (this.backButton = Sprite.from('back-button'))
    backButton.anchor.set(1, 0)
    backButton.interactive = true
    backButton.on('pointerdown', () => gameController.setScene(new MenuScene(gameController)))
    this.addChild(backButton)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResize(width: number, height: number): void {
    this.backButton.x = width - 20
    this.backButton.y = 20
  }
}

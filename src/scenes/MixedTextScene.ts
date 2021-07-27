import { GameController } from '../GameController'
import { DemoBaseScene } from './DemoBaseScene'

export class MixedTextScene extends DemoBaseScene {
  constructor(gameController: GameController) {
    super(gameController)

    this.onResize(gameController.app.view.width, gameController.app.view.height)
  }

  onResize(width: number, height: number): void {
    super.onResize(width, height)
  }
}

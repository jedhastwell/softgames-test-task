import { Container } from '@pixi/display'
import { GameController } from '../GameController'

export abstract class Scene extends Container {
  gameController: GameController

  constructor(gameController: GameController) {
    super()
    this.gameController = gameController
  }

  abstract onResize(width: number, height: number): void
}

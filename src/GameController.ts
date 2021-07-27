import { Application } from '@pixi/app'
import { Scene } from './scenes/Scene'

export class GameController {
  app: Application
  scene: Scene

  constructor(app: Application) {
    this.app = app
  }

  setScene(scene: Scene): void {
    if (this.scene !== scene) {
      this.app.stage = scene
      this.scene && this.scene.destroy({ children: true })
      this.scene = scene
    }
  }

  onResize(width: number, height: number): void {
    if (this.scene) {
      this.scene.onResize(width, height)
    }
  }
}

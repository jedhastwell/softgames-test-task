import { Container } from '@pixi/display'
import { Sprite } from '@pixi/sprite'
import { Text, TextStyle } from '@pixi/text'
import gsap from 'gsap/all'
import { GameController } from '../GameController'
import { randomItem } from '../utils/utils'
import { DemoBaseScene } from './DemoBaseScene'

interface Stack {
  sprites: Sprite[]
  x: number
  y: number
}

const Defaults = {
  InitialStackCount: 144,
  Images: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
  Spacing: { x: 0, y: 1 },
  MoveDuration: 2,
  NextMoveDelay: 1,
}

export class CardStackScene extends DemoBaseScene {
  stackContainer = new Container()
  fpsLabel: Text

  constructor(gameController: GameController) {
    super(gameController)

    // Label for displaying fps
    this.fpsLabel = new Text(
      'FPS: 0',
      new TextStyle({
        fontFamily: 'Arial',
        fontSize: 26,
        fill: '#ffffff',
      }),
    )
    this.fpsLabel.anchor.set(0, 0)
    this.addChild(this.fpsLabel)

    gameController.app.ticker.add(this.update, this)

    const stack1 = CardStackScene.createStack(Defaults.InitialStackCount, -265, -160)
    const stack2 = CardStackScene.createStack(0, 144, -160)

    this.addChild(this.stackContainer)
    this.stackContainer.sortableChildren = true
    this.stackContainer.addChild(...stack1.sprites)

    const moveCard = (duration: number): void => {
      if (stack1.sprites.length) {
        const sprite = <Sprite>stack1.sprites.pop()
        if (stack2.sprites.length) {
          sprite.zIndex = stack2.sprites[stack2.sprites.length - 1].zIndex + 1
        }
        stack2.sprites.push(sprite)

        gsap.to(sprite, {
          x: stack2.x + stack2.sprites.length * Defaults.Spacing.x,
          y: stack2.y + stack2.sprites.length * Defaults.Spacing.y,
          ease: 'quad.inOut',
          duration,
        })
      }
    }

    const moveNext = () => {
      moveCard(Defaults.MoveDuration)
      if (stack1.sprites.length) {
        gsap.delayedCall(Defaults.NextMoveDelay, moveNext)
      }
    }

    moveNext()

    this.onResize(gameController.app.view.width, gameController.app.view.height)
  }

  update(): void {
    this.fpsLabel.text = `FPS: ${this.gameController.app.ticker.FPS.toFixed(2)}`
  }

  static createStack(count: number, x: number, y: number): Stack {
    const sprites: Sprite[] = []

    for (let i = 0; i < count; i++) {
      const randomImage = randomItem<string>(Defaults.Images)
      const sprite = Sprite.from(randomImage, {})
      sprite.x = x + Defaults.Spacing.x * i
      sprite.y = y + Defaults.Spacing.y * i
      sprite.scale.x = 0.5
      sprite.scale.y = 0.5
      sprite.zIndex = i
      sprites.push(sprite)
    }

    return { sprites, x, y }
  }

  destroy(): void {
    this.gameController.app.ticker.remove(this.update, this)
    super.destroy()
  }

  onResize(width: number, height: number): void {
    super.onResize(width, height)
    this.stackContainer.x = width / 2
    this.stackContainer.y = height / 2
    this.fpsLabel.x = 20
    this.fpsLabel.y = 20
  }
}

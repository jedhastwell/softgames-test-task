import { Texture } from '@pixi/core'
import { IDestroyOptions } from '@pixi/display'
import { TextStyle } from '@pixi/text'
import gsap from 'gsap/all'
import { GameController } from '../GameController'
import { MixedText } from '../objects/MixedText'
import { randomItem } from '../utils/utils'
import { DemoBaseScene } from './DemoBaseScene'

export class MixedTextScene extends DemoBaseScene {
  mixedTextLabel: MixedText

  constructor(gameController: GameController) {
    super(gameController)

    const Defaults = {
      elements: [
        Texture.from('coin'),
        Texture.from('heart'),
        Texture.from('gem'),
        Texture.from('key'),
        Texture.from('lives'),
        'Coins',
        'Hearts',
        'Gems',
        'Keys',
        'Lives',
        '5',
        '21',
        '2187',
      ],
      maxFontSize: 90,
      minFontSize: 20,
      fontStyle: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 3,
        dropShadowDistance: 3,
        wordWrap: false,
        lineJoin: 'round',
      }),
    }

    const randomContent = () => randomItem<string | Texture>(Defaults.elements)

    this.mixedTextLabel = new MixedText([], Defaults.fontStyle, 60)
    this.addChild(this.mixedTextLabel)

    const updateContent = (): void => {
      this.mixedTextLabel.setContent(
        [randomContent(), randomContent(), randomContent()],
        gsap.utils.random(Defaults.minFontSize, Defaults.maxFontSize, 1),
      )
      this.layout()
      gsap.delayedCall(2, () => {
        updateContent()
      })
    }

    updateContent()

    this.onResize(gameController.app.view.width, gameController.app.view.height)
  }

  destroy(options?: boolean | IDestroyOptions): void {
    gsap.globalTimeline.getChildren().forEach((tween) => tween.kill())
    super.destroy(options)
  }

  layout(): void {
    const { view } = this.gameController.app
    this.mixedTextLabel.x = view.width / 2 - this.mixedTextLabel.width / 2
    this.mixedTextLabel.y = view.height / 2 - this.mixedTextLabel.height / 2
  }

  onResize(width: number, height: number): void {
    super.onResize(width, height)
    this.layout()
  }
}

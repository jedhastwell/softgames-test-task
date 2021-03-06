import { Texture } from '@pixi/core'
import { Container } from '@pixi/display'
import { Sprite } from '@pixi/sprite'
import { Text, TextStyle } from '@pixi/text'

export class MixedText extends Container {
  textPool: Text[] = []
  spritePool: Sprite[] = []
  style: TextStyle

  constructor(items: (string | Texture)[], style: TextStyle, fontSize: number) {
    super()

    this.style = style
    this.setContent(items, fontSize)
  }

  setContent(items: (string | Texture)[], fontSize: number): void {
    let x = 0
    const labels: Text[] = []
    const sprites: Sprite[] = []

    items.forEach((element) => {
      if (typeof element === 'string') {
        // Try re-use existing element
        let label = this.textPool.pop()
        if (label) {
          label.text = element
          label.style.fontSize = fontSize
          label.dirty = true
        } else {
          label = new Text(element, { ...this.style, fontSize })
          this.addChild(label)
        }
        label.x = x
        x += label.width + fontSize / 10
        labels.push(label)
      } else if (element instanceof Texture) {
        // Try re-use existing element
        let sprite = this.spritePool.pop()
        if (sprite) {
          sprite.texture = element
        } else {
          sprite = Sprite.from(element)
          this.addChild(sprite)
        }
        sprite.height = fontSize
        sprite.scale.x = sprite.scale.y
        sprite.x = x
        x += sprite.width + fontSize / 10
        sprites.push(sprite)
      }
    })
    this.textPool.forEach((item) => {
      this.removeChild(item)
      item.destroy
    })
    this.spritePool.forEach((item) => {
      this.removeChild(item)
      item.destroy
    })
    this.textPool.splice(0, this.textPool.length, ...labels)
    this.spritePool.splice(0, this.spritePool.length, ...sprites)
  }
}

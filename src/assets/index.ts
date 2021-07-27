import * as PIXI from 'pixi.js'
import atlasImage from './sheets/atlas.png'
import atlasData from './sheets/atlas.json'

const loader = PIXI.Loader.shared

export const loadAssets = (): Promise<void> => {
  return new Promise((resolve) => {
    loader.add('atlas', atlasImage, (resource) => {
      if (resource.error) {
        console.error(resource.error)
      } else {
        const texture = PIXI.Texture.from('atlas').baseTexture
        const sheet = new PIXI.Spritesheet(texture, atlasData)
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        sheet.parse(() => {})
      }
    })

    loader.onComplete.add(resolve)
    loader.load()
  })
}

import * as PIXI from 'pixi.js'
import logo from './images/logo.png'

const loader = PIXI.Loader.shared

export const loadAssets = (): Promise<void> => {
  return new Promise((resolve) => {
    loader.add('logo', logo)
    loader.onComplete.add(resolve)
    loader.load()
  })
}

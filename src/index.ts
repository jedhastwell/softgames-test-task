import * as PIXI from 'pixi.js'
import logo from './assets/images/logo.png'

const app = new PIXI.Application()

document.body.appendChild(app.view)

app.loader.add('logo', logo).load((loader, resources) => {
  const sprite = new PIXI.Sprite(resources.logo.texture)

  sprite.x = app.renderer.width / 2
  sprite.y = app.renderer.height / 2

  sprite.anchor.x = 0.5
  sprite.anchor.y = 0.5

  app.stage.addChild(sprite)
})

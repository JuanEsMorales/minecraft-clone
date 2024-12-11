import { grassImg, dirtImg, glassImg, logImg, woodImg } from "./images.ts"
import { NearestFilter, RepeatWrapping, TextureLoader } from "three"

const grassTexture = new TextureLoader().load(grassImg)
const groundTexture = new TextureLoader().load(grassImg)
const dirtTexture = new TextureLoader().load(dirtImg)
const glassTexture = new TextureLoader().load(glassImg)
const logTexture = new TextureLoader().load(logImg)
const woodTexture = new TextureLoader().load(woodImg)

groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping

const BLOCKS_TEXTURES = [
  dirtTexture,
  glassTexture,
  logTexture,
  woodTexture,
  grassTexture,
  groundTexture
]

BLOCKS_TEXTURES.forEach(texture => {
  texture.magFilter = NearestFilter
})

export {
  groundTexture,
  grassTexture,
  dirtTexture,
  glassTexture,
  logTexture,
  woodTexture
}

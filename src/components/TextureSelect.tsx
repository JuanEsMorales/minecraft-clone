import { useEffect, useState } from "react"
import * as images from "../images/images"
import { useStore } from "../hooks/useStore"
import { useKeyboard } from "../hooks/useKeyboard"
import { div, texture } from "three/webgpu"

export function TextureSelect() {
  const [visible, setVisible] = useState(true)
  const setTexture = useStore(state => state.setTexture)
  const textureImg = useStore(state => state.texture)

  const {
    dirt,
    wood,
    glass,
    grass,
    log,
  } = useKeyboard()

  useEffect(() => {
    const options = {
      dirt,
      wood,
      glass,
      grass,
      log,
    }

    const selectedTexture = Object.entries(options).find(([texture, isEnabled]) => isEnabled)
    
    if (selectedTexture) {
      setTexture(selectedTexture[0])
    }
  }, [dirt, wood, glass, grass, log, setTexture])

  /* useEffect(() => {
    setVisible(true)

    setTimeout(() => {
      setVisible(false)
    }, 300)
  }, [textureImg]) */

  if (!visible) return null

  return (
    <div className="texture-selector">
      {
        Object.entries(images).map(([texture, image]) => (
          <img key={texture} src={image} alt={texture} className={texture === textureImg + 'Img' ? 'Active' : ''}/>
        ))
      }
    </div>
  )
}
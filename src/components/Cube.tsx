import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures";
import { useState } from "react";
import { useStore } from "../hooks/useStore";
import { ThreeEvent } from "@react-three/fiber";

export function Cube({ id, texture, position }) {
  const [isHovered, setIsHovered] = useState(false);
  const removeCube = useStore(state => state.removeCube)
  const addCube = useStore(state => state.addCube)
  const [ref] = useBox(() => ({
    type: "Static",
    position
  }))
  
  const handlePutCube = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    if (!event.faceIndex) return
    const faceClicked = Math.floor(event.faceIndex / 2)
    const { x, y, z } = ref.current.position
    
    if (faceClicked === 0) {
      addCube(x + 1, y, z)
    }
    else if (faceClicked === 1) {
      addCube(x - 1, y, z)
    }
    else if (faceClicked === 2) {
      addCube(x, y + 1, z)
    }
    else if (faceClicked === 3) {
      addCube(x, y - 1, z)
    }
    else if (faceClicked === 4) {
      addCube(x, y, z + 1)
    }
    else if (faceClicked === 5) {
      addCube(x, y, z - 1)
    }
  }
  const activeTexture = textures[texture + "Texture"]

  return (
    <mesh
     onPointerOver={(e) => {
       e.stopPropagation()
       setIsHovered(true)
     }}
     onPointerOut={(e) => {
       e.stopPropagation()
       setIsHovered(false)
     }}
     onClick={(e) => {
       e.stopPropagation()
       if (e.altKey) {
        removeCube(id)
        return
       }
       handlePutCube(e)
     }}
     ref={ref} 
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial 
      attach="material" 
      color={isHovered ? "#a3a3a3" : "white"} 
      map={activeTexture}
      transparent={true}
      opacity={texture === "glass" ? 0.7 : 1}
      />
    </mesh>
  )
}
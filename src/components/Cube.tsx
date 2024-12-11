import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures";
import { useState } from "react";
import { useStore } from "../hooks/useStore";

export function Cube({ id, texture, position }) {
  const [isHovered, setIsHovered] = useState(false);
  const removeCube = useStore(state => state.removeCube)
  const [ref] = useBox(() => ({
    type: "Static",
    position
  }))

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
       }
     }}
     ref={ref} 
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={isHovered ? "#a3a3a3" : "white"} map={activeTexture} />
    </mesh>
  )
}
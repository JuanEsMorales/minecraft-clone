import { useStore } from "../hooks/useStore.ts";
import { Cube } from "./Cube";

export function Cubes() {
  const cubes = useStore(state => {
   return state.cubes
  })

  if (!Array.isArray(cubes)) {
    console.error("Cubes is not an array:", cubes);
    return null; // O muestra un mensaje de error en la interfaz
  }

  return cubes.map(({ id, texture, pos }) => {
    return (
      <Cube key={id} id={id} texture={texture} position={pos} />
    )
  })
}
import { useStore } from "../hooks/useStore.ts";
import { Cube } from "./Cube";

export function Cubes() {
  const cubes = useStore(state => {
   return state.cubes
  })

  return cubes.map(({ id, texture, pos }) => {
    return (
      <Cube key={id} id={id} texture={texture} position={pos} />
    )
  })
}
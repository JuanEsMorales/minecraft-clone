import { useStore } from "../hooks/useStore";

export function Menu() {
  const saveWorld = useStore(state => state.saveWorld)
  const resetWorld = useStore(state => state.resetWorld)

  return (
    <div className="menu">
      <button onClick={saveWorld}>Save</button>
      <button onClick={resetWorld}>Reset</button>
    </div>
  )
}
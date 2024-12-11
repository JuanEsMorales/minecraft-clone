import { Physics } from "@react-three/cannon"
import { Sky } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Ground } from "./components/Ground.js"
import { FPV } from "./components/FPV.js"
import { Player } from "./components/Player.js"
import { Cubes } from "./components/Cubes.js"
import { TextureSelect } from "./components/TextureSelect.js"

function App() {
  return (
    <>
      <TextureSelect />
      <Canvas>
        <Sky sunPosition={[10, 10, 10]} />
        <ambientLight intensity={1} />
        <FPV />
        <Physics>
          <Cubes />
          <Player />
          <Ground />
        </Physics>
      </Canvas>
      <div className="pointer">+</div>
    </>
  )
}

export default App

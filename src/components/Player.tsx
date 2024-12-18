import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const CHARACTER_SPEED = 4
const JUMP_FORCE = 3

export function Player() {
  const { moveBackward, moveForward, moveLeft, moveRight, jump, sprint } = useKeyboard()
  
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 1, 0],
    type: 'Dynamic',
  }))

  const pos = useRef([0, 0, 0])
  useEffect(() => {
    api.position.subscribe(p => {
      pos.current = p
    })
  }, [api.position])

  const vel = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe(v => {
      vel.current = v
    })
  }, [api.velocity])

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        pos.current[0], // x
        pos.current[1], // y
        pos.current[2] // z
      )
    )

    const direction = new Vector3()

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )

    const sideVector = new Vector3(
      (moveRight ? 1 : 0) - (moveLeft ? 1 : 0),
      0,
      0
    )

    direction.addVectors(frontVector, sideVector)
    direction.normalize()
    direction.multiplyScalar(CHARACTER_SPEED)
    direction.applyEuler(camera.rotation)

    api.velocity.set(
      direction.x,
      vel.current[1],
      direction.z
    )

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2])
    }
  })

  return (
    <mesh ref={ref} />
  )
}
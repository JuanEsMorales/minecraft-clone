import { useEffect, useState } from "react";

const ACTIONS_KEYBOARD_MAP: Record<string, string> = {
  KeyW: "moveForward",
  KeyA: "moveLeft",
  KeyS: "moveBackward",
  KeyD: "moveRight",
  Space: "jump",
  ShiftLeft: "sprint",
  Digit1: "dirt",
  Digit2: "glass",
  Digit3: "grass",
  Digit4: "log",
  Digit5: "wood",
}

export function useKeyboard() {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    sprint: false,
    dirt: false,
    wood: false,
    grass: false,
    glass: false,
    log: false,
  })

  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const action = ACTIONS_KEYBOARD_MAP[event.code]
      
      if (action) {
        setActions(prev => ({
          ...prev,
          [action]: true
        }))
      }
    }
  
    const handleKeyUp = (event: KeyboardEvent) => {
      const action = ACTIONS_KEYBOARD_MAP[event.code]
      
      if (action) {
        setActions(prev => ({
          ...prev,
          [action]: false
        }))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return actions
}
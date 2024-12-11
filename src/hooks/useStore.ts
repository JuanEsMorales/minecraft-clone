import { create } from "zustand";

export const useStore = create((set) => ({
  texture: "dirt",
  setTexture: (texture) => set(() => ({ texture })),
  cubes: [
    {
      id: crypto.randomUUID(),
      texture: "dirt",
      pos: [1, -0.5, 1],
    },
    {
      id: crypto.randomUUID(),
      texture: "glass",
      pos: [2, 2, 2],
    }
  ],
  addCube: (x, y, z) =>
    set((state) => ({
      cubes: [...state.cubes, {
        id: crypto.randomUUID(),
        texture: state.texture,
        pos: [x, y, z],
      }], // Siempre agrega al array
    })),
  removeCube: (id) =>
    set((state) => ({
      cubes: state.cubes.filter((cube) => cube.id !== id), // Filtra el array
    })),
  saveWorld: () => {
    console.log("World saved!");
  },
  resetWorld: () =>
    set(() => ({
      cubes: [], // Reinicia a un array vacío
    })),
}));
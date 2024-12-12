import { create } from "zustand";

const getLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const setLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useStore = create((set, get) => ({
  texture: "dirt",
  setTexture: (texture) => set(() => ({ texture })),
  cubes: getLocalStorage("cubes") || [], // Obtiene el array de cubes guardado en localStorage
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
    setLocalStorage("cubes", get().cubes); // Guarda el array en localStorage
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
import {create} from "zustand/react";
import {MeshStandardMaterial, Vector3} from "three";
import {randFloat, randFloatSpread, randInt} from "three/src/math/MathUtils.js";

export const balloonColors = ["#fff", "#81c0f2", "#f199ca"];
export const balloonMaterials = {}

balloonColors.forEach(color => {
  balloonMaterials[color] = new MeshStandardMaterial({color})
})

export const useGame = create((set, get) => ({
  axeLaunched: false,
  ballons: [],
  launchAxe: () => {
    set({ axeLaunched: true });

    setTimeout(() => {
      set({ axeLaunched: false });
    }, 2000)
  },
  startGame: () => {
    set({
      ballons: new Array(60).fill(0).map((_, index) => ({
        id: `ballon_${index}_${Math.random()}`,
        position: new Vector3(
          randFloat(8, 18),
          randFloat(-30, 0),
          randFloatSpread(1)
        ),
        color: balloonColors[randInt(0, balloonColors.length - 1)],
      }))
    })
  }
}))

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
  balloons: [],
  firstGame: true,
  targetHit: 0,
  balloonsHit: 0,
  throws: 0,
  launchAxe: () => {
    if (get().axeLaunched || get().throws <= 0) {
      return
    }

    set({axeLaunched: true, throws: get().throws - 1})

    setTimeout(() => {
      set({axeLaunched: false})
    }, 2000)
  },
  startGame: () => {
    set({
      firstGame: false,
      axeLaunched: false,
      targetHit: 0,
      balloonsHit: 0,
      throws: 5,
      balloons: new Array(60).fill(0).map((_, index) => ({
        id: `ballon_${index}_${Math.random()}`,
        position: new Vector3(
          randFloat(8, 18),
          randFloat(-30, 0),
          randFloatSpread(1)
        ),
        color: balloonColors[randInt(0, balloonColors.length - 1)],
      }))
    })
  },
  onTargetHit: () => {
    set(state => ({
      targetHit: state.targetHit + 1
    }))
  },
  onBalloonHit: () => {
    set(state => ({
      balloonsHit: state.balloonsHit + 1
    }))
  }
}))

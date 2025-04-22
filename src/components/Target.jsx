import {Gltf} from "@react-three/drei";
import {degToRad} from "three/src/math/MathUtils.js";
import {RigidBody, vec3} from "@react-three/rapier";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

const Target = () => {
  const rb = useRef()

  useFrame(({ clock }) => {
    if(rb.current) {
      rb.current.setTranslation(
        vec3({ x: 20, y: Math.sin(clock.elapsedTime * 2 ) * 2, z: 0 })
      )
    }
  })

  return (
    <RigidBody colliders="hull" type="kinematicPosition" name="target" ref={rb}>
      <Gltf
        src="models/target.glb"
        rotation-y={degToRad(-90)}
        position-x={0}
        scale={3}
      />
    </RigidBody>
  )
}

export default Target